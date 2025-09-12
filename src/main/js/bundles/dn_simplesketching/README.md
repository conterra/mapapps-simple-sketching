### dn_simplesketching

### Bundle Description
The `dn_simplesketching` bundle provides simple sketching functionality within map.apps applications. It wraps the Esri Sketch widget to enable users to create, edit, and manage graphics on the map. The bundle creates and manages a graphics layer specifically for sketch content and provides a dockable widget interface for sketching operations.

### Usage
To use the `dn_simplesketching` bundle in an app:
- The bundle must be added to the app.json in "allowedBundles" using `dn_simplesketching`
- The tool `simpleSketchingToggleTool` must be added to a toolset in the `app.json`

### Configuration Reference
```json
{
    "dn_simplesketching": {
        "Config": {
            "graphicsLayerId": "sketchLayer",
            "graphicsLayerTitle": "Sketches",
            "graphicsLayerListMode": "show"
        }
    }
}
```

| Property              | Type   | Values                   | Default                 | Description                                 |
|-----------------------|--------|--------------------------|-------------------------|---------------------------------------------|
| graphicsLayerId       | String | Any valid layer ID       | "graphicsLayerId"       | ID of the graphics layer used for sketching |
| graphicsLayerTitle    | String | Any string               | "graphicsLayerTitle"    | Title displayed for the graphics layer      |
| graphicsLayerListMode | String | "show", "hide", "hidden" | "graphicsLayerListMode" | Controls layer visibility in the layer list |
