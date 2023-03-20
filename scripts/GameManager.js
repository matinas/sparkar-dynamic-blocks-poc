import { DownloadAndInsantiateBlock } from './Utils.js';

export const _DEBUG = true;

const Diagnostics = require('Diagnostics');
const S = require('Scene');

let trackerRoot;

Promise.all(
[
  S.root.findFirst("dragHere"),
])
.then(main)
.catch((error) =>
{
  Diagnostics.log("Error found while executing GameManager logic");
  Diagnostics.log("Error message: " + error.message);
});

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


