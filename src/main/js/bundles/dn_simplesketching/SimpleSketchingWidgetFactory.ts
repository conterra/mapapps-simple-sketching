///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Sketching from "@arcgis/core/widgets/Sketch";
import { createDijit, type EsriDijit } from "esri-widgets/EsriDijit";
import Binding from "apprt-binding/Binding";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { MapWidgetModel } from "map-widget/MapWidgetModel";

export class SimpleSketchingWidgetFactory {
    private binding?: Binding | null;
    private sketchingWidget?: Sketching | null;

    private _properties: InjectedReference<Record<string, any>>;
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;

    deactivate(): void {
        this.deactivateBinding();
        this.destroyWidget();
    }

    createInstance(): EsriDijit<Sketching> {
        return this.getWidget();
    }

    private getWidget(): EsriDijit<Sketching> {
        const sketchingWidget = this.sketchingWidget = new Sketching();
        const mapWidgetModel = this._mapWidgetModel;
        this.binding = Binding.for(sketchingWidget, mapWidgetModel)
            .syncToLeft("view")
            .enable()
            .syncToLeftNow();

        const sketchViewModel = sketchingWidget.viewModel;
        sketchViewModel.layer = this.findOrBuildGraphicsLayer(mapWidgetModel);
        sketchViewModel.pointSymbol = this.createSymbology("tree");
        sketchViewModel.polylineSymbol = this.createSymbology("border");
        sketchViewModel.polygonSymbol = this.createSymbology("building");

        return createDijit(sketchingWidget);
    }

    private findOrBuildGraphicsLayer(mapWidgetModel: MapWidgetModel): __esri.GraphicsLayer {
        const props = this._properties!;
        const layerId = props.graphicsLayerId;

        let layer = mapWidgetModel.map.findLayerById(layerId);
        if (layer && layer.type === "graphics") {
            return layer as __esri.GraphicsLayer;
        }

        layer = new GraphicsLayer({
            id: layerId,
            title: props.graphicsLayerTitle,
            listMode: props.graphicsLayerListMode
        });
        mapWidgetModel.map.layers.add(layer);

        return layer as __esri.GraphicsLayer;
    }

    private destroyWidget(): void {
        this.sketchingWidget?.destroy();
        this.sketchingWidget = null;
    }

    private deactivateBinding(): void {
        this.binding?.unbind();
        this.binding = null;
    }

    private createSymbology(type: string): any {
        switch (type) {
            case "building":
                return new PolygonSymbol3D({
                    symbolLayers: [
                        new ExtrudeSymbol3DLayer({
                            size: 3.5, // extrude by 3.5 meters
                            material: { color: [255, 255, 255, 0.8] },
                            edges: new SolidEdges3D({ size: 1, color: [82, 82, 122, 1] })
                        })
                    ]
                });

            case "border":
                return new LineSymbol3D({
                    symbolLayers: [
                        new PathSymbol3DLayer({
                            profile: "quad", // creates a path symbol with rectangular profile
                            width: 0.3, // symbology width in meters
                            height: 2.6, // symbology height in meters
                            material: { color: "#a57e5e" },
                            cap: "square",
                            profileRotation: "heading"
                        })
                    ]
                });

            case "tree":
                return new PointSymbol3D({
                    symbolLayers: [
                        new ObjectSymbol3DLayer({
                            resource: {
                                href: "https://static.arcgis.com/arcgis/styleItems/ThematicTrees/gltf/resource/PlatanusOccidentalis.glb"
                            },
                            height: 10
                        })
                    ]
                });

            default:
                throw new Error("Invalid symbology type");
        }
    }
}
