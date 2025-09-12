[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-simple-sketching/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-simple-skecthing/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/Tested_for_map.apps-4.19.2-%20?labelColor=%233E464F&color=%232FC050)
![Static Badge](https://img.shields.io/badge/Requires_map.apps-4.15.0-%20?labelColor=%233E464F&color=%232FC050)

# Simple Sketching

The `dn_simplesketching` bundle provides simple sketching functionality within map.apps applications. It wraps the Esri Sketch widget to enable users to create, edit, and manage graphics on the map. The bundle creates and manages a graphics layer specifically for sketch content and provides a dockable widget interface for sketching operations.


![Screenshot App](https://github.com/conterra/mapapps-attribute-slider/blob/main/screenshot.png)

### Sample App

[Sample App Link](https://demos.conterra.de/mapapps/resources/apps/public_demo_simplesketching/index.html)

### Documentation & Installation

[Attribute Slider Documentation Link](https://github.com/conterra/mapapps-attribute-slider/tree/master/src/main/js/bundles/dn_simplesketching)

## Development Quick Start

### Software Requirements

- Java >= 17
- Maven >= 3.9.0

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```

For more details refer to the [Developer's Guide](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/).
