const Diagnostics = require("Diagnostics");
const A = require('Animation');
const T = require('Time');

import { _DEBUG } from "./DoorController";
import { RadToDeg } from "./Utils";

/**
 * Plays the door open animation
 * @param {SceneObjectBase} leftDoor left door object
 * @param {SceneObjectBase} rightDoor right door object
 */
export function OpenDoorAnimation(leftDoor, rightDoor, duration)
{
  if (_DEBUG) Diagnostics.log("Starting OpenDoorAnimation");

  const timeDriverParams =
  {
    durationMilliseconds : duration,
    loopCount : 1,
    mirror : false
  };

  const timeDriver = A.timeDriver(timeDriverParams);
  const sampler = A.samplers.easeOutBounce(0, -150);
  
  const rotSignal = RadToDeg(A.animate(timeDriver, sampler));

  leftDoor.transform.rotationY = rotSignal;
  rightDoor.transform.rotationY = rotSignal;

  timeDriver.start();

  return timeDriver.onCompleted();
}

/**
 * Plays the door close animation
 * @param {SceneObjectBase} leftDoor left door object
 * @param {SceneObjectBase} rightDoor right door object
 */
export function CloseDoorAnimation(leftDoor, rightDoor, duration)
{
  if (_DEBUG) Diagnostics.log("Starting CloseDoorAnimation");

  const timeDriverParams =
  {
    durationMilliseconds : duration,
    loopCount : 1,
    mirror : false
  };

  const timeDriver = A.timeDriver(timeDriverParams);
  const sampler = A.samplers.easeInOutExpo(-150, 0);
  
  const rotSignal = RadToDeg(A.animate(timeDriver, sampler));

  leftDoor.transform.rotationY = rotSignal;
  rightDoor.transform.rotationY = rotSignal;

  timeDriver.start();

  return timeDriver.onCompleted();
}

/**
 * Plays the open door animation followed by the close door animation
 * @param {SceneObjectBase} leftDoor left door object
 * @param {SceneObjectBase} rightDoor right door object
 */
export function CloseOpenDoorAnimation(leftDoor, rightDoor, closeDuration, openDuration, delay)
{
  if (_DEBUG) Diagnostics.log("Starting CloseOpenDoorAnimation");

  let closeEvt = CloseDoorAnimation(leftDoor, rightDoor, closeDuration);
  closeEvt.subscribe(() => 
  {
    T.setTimeout(() => OpenDoorAnimation(leftDoor, rightDoor, openDuration), delay);
  });
}