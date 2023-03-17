import { DownloadAndInsantiateBlock } from './Utils.js';
export const Diagnostics = require('Diagnostics');
const Scene = require('Scene');

let trackerRoot;

Promise.all(
  [
    Scene.root.findFirst("dragHere"),
  ]
).then(main).catch((error) =>
  {
    // we are catching errors while executing main here as the catch() follows the then()
    Diagnostics.log("Error found while executing game logic");
    Diagnostics.log("Error message: " + error.message);
  }
);

async function main(assets) { // Enables async/await in JS [part 1]

  trackerRoot = assets[0];

  DownloadAndInsantiateBlock("mainButtonAndDoor", trackerRoot).then((block) => 
  {
    block.outputs.getPulse("onButtonPressed").then((buttonPress) => 
    {
      buttonPress.subscribe(() => Diagnostics.log("Button pressed!"));
    });
  });

}; // Enables async/await in JS [part 2]


