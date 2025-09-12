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
import EsriDijit from "esri-widgets/EsriDijit";
import Binding from "apprt-binding/Binding";
import Sketching from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";

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

    createInstance(): typeof EsriDijit {
        return this.getWidget();
    }

    private getWidget(): typeof EsriDijit {
        const sketchingWidget = this.sketchingWidget = new Sketching();
        const mapWidgetModel = this._mapWidgetModel;
        this.binding = Binding.for(sketchingWidget, mapWidgetModel)
            .syncToLeft("view")
            .enable()
            .syncToLeftNow();

        sketchingWidget.viewModel.layer = this.findOrBuildGraphicsLayer(mapWidgetModel);

        return new EsriDijit(sketchingWidget);
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
}
