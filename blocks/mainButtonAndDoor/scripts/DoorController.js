import { OpenDoorAnimation, CloseDoorAnimation, CloseOpenDoorAnimation } from "./VFX"

export const _DEBUG = true;

const S = require('Scene');
const P = require('Patches');
const Diagnostics = require('Diagnostics');
const B = require('Blocks');

Promise.all(
[
  S.root.findFirst("leftDoorPivot"),
  S.root.findFirst("rightDoorPivot"),
])
.then(main)
.catch((error) => 
{
  Diagnostics.log("Error found while executing DoorController logic");
  Diagnostics.log("Error message: " + error.message);
});

async function main(assets) {  // Enables async/await in JS [part 1]

  // B.inputs.getPulse("SetReady").then((readySignal) => 
  // {
  //   readySignal.subscribe(() => Diagnostics.log("The main project set the SetReady pulse, so WE ARE READY!!"));
  // });

  const leftDoorPivot = assets[0];
  const rightDoorPivot = assets[1];

  P.outputs.getPulse("openDoor").then((openDoorEvt) => openDoorEvt.subscribe(() =>
  {
    OpenDoorAnimation(leftDoorPivot, rightDoorPivot, 2000);
  }));

  P.outputs.getPulse("closeDoor").then((closeDoorEvt) => closeDoorEvt.subscribe(() =>
  {
    CloseDoorAnimation(leftDoorPivot, rightDoorPivot, 1000);
  }));

  P.outputs.getPulse("openCloseDoor").then((openCloseDoorEvt) => openCloseDoorEvt.subscribe(() =>
  {
    Diagnostics.log("The door will be closed and then opened again");
    CloseOpenDoorAnimation(leftDoorPivot, rightDoorPivot, 1000, 1000, 0);
  }));

}; // Enables async/await in JS [part 2]
