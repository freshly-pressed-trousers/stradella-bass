# Stradella Bass

This app serves to demonstrate the functionality of the Stradella Bass system widely used on accordions through the means of a React & Redux app utilising the web audio api.

The Stradella Bass system is a layout for creating accompaniments with your left hand - although I'm confident this app will demonstrate its functionality - it's musicality is probably best left to a real accordion!

![Screenshot](/screenShot.png?raw=true "Stradella Bass")

## Installing && Running

Make sure you have node & npm installed, this projected was created with node v9.11.2 & npm v5.6.0 - although it was bootstrapped from create-react-app so as per their documentation this should work on node version >= 8.10.0.

To install run in the root of the repo:

`npm i`

To run the application:

`npm start`

This will compile and open in a browser. Make sure to use Chrome as this hasn't been tested on other browsers!

## Implementation

The app is split into three separate layers of concern

-   UI is handled via React in `src/components`
-   State management is handled via Redux in `src/store`
-   Sound processing is handled via the web audio API in `src/soundEngine`

The api connecting these modules to make it all work together is:

-   Containserisation via react-redux in `src/containers` connecting the React UI to application state
-   Event-driven audio processing is interfaced via custom redux middleware in `src/store/middleware/soundEngineMiddleware` - this listens for note actions and interfaces with the soundEngine

The minimal styling is done via CSS modules `COMPONENTNAME.module.css`, which tends to be my flavour of choice for CSS componentisation as it produces tightly scoped CSS styles, albeit with the trade off of not being very DRY - but personally I prefer reusability at the component level rather than style level :)

Components, state management are done in a functional pure-function style where possible, however the soundEngine is modelled using stateful objects as a wrapper around the stateful OOP design of the web audio API. See SignalPath.js, and Envelope.js; I've found this models the graph-node nature of audio processing quite well.

## Tests

Tests can be run via Jest via running `npm test` in the root.
