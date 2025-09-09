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

export class SketchingWidgetFactory {

    #binding = null;
    #sketchingWidget = null;

    deactivate() {
        this._deactivateBinding();
        this._destroyWidget();
    }

    createInstance() {
        return this._getWidget();
    }

    _getWidget() {
        // const sketchingProperties = this._sketchingWidgetController.getSketchingWidgetProperties();
        const sketchingWidget = this.#sketchingWidget = new Sketching();
        const mapWidgetModel = this._mapWidgetModel;
        const binding = this.#binding = Binding.for(sketchingWidget, mapWidgetModel)
            .syncToLeft("view")
            .enable()
            .syncToLeftNow();

        sketchingWidget.own(binding);

        return new EsriDijit(sketchingWidget);
    }

    _destroyWidget() {
        this.#sketchingWidget?.destroy();
        this.#sketchingWidget = null;
    }

    _deactivateBinding() {
        this.#binding?.unbind();
        this.#binding = null;
    }
}
