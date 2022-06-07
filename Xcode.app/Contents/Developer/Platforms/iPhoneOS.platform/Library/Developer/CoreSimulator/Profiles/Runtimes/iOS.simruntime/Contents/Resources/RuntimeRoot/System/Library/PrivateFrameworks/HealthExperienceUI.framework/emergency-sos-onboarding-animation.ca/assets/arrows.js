 Built-in variables (don't uncomment, for documentation only).
 var layer;
  -- this script's layer
 var document;
-- this script's document
 var system;    -- Properties about the current system. Local to each context
                   (version, build, productType, model, platform, appVersion)
 Script initialization functions:
 init(): Initialize variables and state. This will be called when a script is loaded 
         or updated. Do not depend on the ordering. Do not assume that all other scripts
         have been initialized.
 ready(): Called after all scripts are initialized. If a single script is updated,
          only that script will have ready() called. Do not depend on the ordering.
// function init() {
// }
// function ready() {
// }
// function eventHandler(event) {
// }
// function layoutSublayers() {
// }
// Called on display refresh. Use 'link.duration' for time passed since the previous frame.
// function updateForDisplay(link) {
// }
// function signalHandler(signalName) {
// }
// function drawLayer(ctx) {
// }
If you want to have an Inspector tab:
1. Declare a function to update the UI: updateInspectorView(inspector). The "inspector"
   will be the inspector for the tab. You can request it to be reloaded to reconfigure the UI. The
   return value should be an array of InspectorItem objects. See InspectorItem for details.
2. Declare a property getting function: getPropertyValue(key) that returns a value for a key
3. Declare a property setting function: setPropertyValue(key, value) thta stores the value for the key
4. Optionally declare a specially named JS variable for the title: var inspectorTabTitle = "My Title";
// var inspectorTabTitle = "My Title";
// function updateInspectorView(inspector) { // Return array of InspectorItem
// }
// function getPropertyValue(key) {
// }
// function setPropertyValue(key, value) {
// }
If you want to persist properties from your script:
1. Declare a function to store properties when the document is saved: storePropertyValues(storage)
2. Declare a function to initialize your stored properties when the document is reopened: initializePropertyValue(key, value)
3. Optionally declare a `properties` object to make it easier to have both an inspector tab and persistant storage.
// let properties = {
//   "myValue": 10
// };
// function initializePropertyValue(key, value) {
//   properties[key] = value;
// }
// function storePropertyValues(storage) {
//   for (const [key, value] of Object.entries(properties)) {
//     storage.setItem(key, value)
//   }
// }
