import { OpenDoorAnimation } from "./VFX"

export const _DEBUG = true;

const S = require('Scene');
const P = require('Patches');
const Diagnostics = require('Diagnostics');

Promise.all(
[
  S.root.findFirst("leftDoorPivot"),
  S.root.findFirst("rightDoorPivot"),
])
.then(main)
.catch((err) => 
{
  Diagnostics.log("Error found while executing DoorController logic");
  Diagnostics.log("Error message: " + error.message);
});

async function main(assets) {  // Enables async/await in JS [part 1]

  const leftDoorPivot = assets[0];
  const rightDoorPivot = assets[1];

  P.outputs.getPulse("openDoor").then((openDoorEvt) => openDoorEvt.subscribe(() =>
  {
    OpenDoorAnimation(leftDoorPivot, rightDoorPivot);
  }))

}; // Enables async/await in JS [part 2]
