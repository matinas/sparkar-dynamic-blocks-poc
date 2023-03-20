const Diagnostics = require("Diagnostics");
const A = require('Animation');

import { _DEBUG } from "./DoorController";
import { RadToDeg } from "./Utils";

/**
 * Plays the door open Animation
 * @param {SceneObjectBase} leftDoor left door object
 * @param {SceneObjectBase} rightDoor right door object
 */
export function OpenDoorAnimation(leftDoor, rightDoor)
{
  if (_DEBUG) Diagnostics.log("Starting OpenDoorAnimation");

  const timeDriverParams =
  {
    durationMilliseconds : 2000,
    loopCount : 1,
    mirror : false
  };

  const timeDriver = A.timeDriver(timeDriverParams);
  const sampler = A.samplers.easeOutBounce(0, -150);
  
  const rotSignal = RadToDeg(A.animate(timeDriver, sampler));

  leftDoor.transform.rotationY = rotSignal;
  rightDoor.transform.rotationY = rotSignal;

  timeDriver.start();
}