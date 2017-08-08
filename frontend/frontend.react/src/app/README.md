# README
## Quirks and patches
1. The paper element inside the autosuggest has zIndex increased to avoid getting behind a button that is displayed inches below the control
2. The robo font type, which is used by material ui (material.io) is referenced as a link in the index.html
## TODO
1. Store messages(redux) into the localstorage to avoid losing messages when navigating to another page
2. it would be nice to find a way to make the side menu (a drawer component in the header) encapsuled in a single component. For now it is not possible because the drawer has to listen to the click events from the parent component's toggleMenu function (which is based on the internal state of the header component) which then gets passed as internal state to the menu, which means the event handling of the state is not synchronized.