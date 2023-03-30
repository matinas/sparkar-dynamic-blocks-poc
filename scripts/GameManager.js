import { DownloadAndInsantiateBlock } from './Utils.js';

export const _DEBUG = true;

const Diagnostics = require('Diagnostics');
const S = require('Scene');
const R = require('Reactive');

let trackerRoot;
let mainButtonAndDoorPromise, platformAndMainModelPromise;
let buttonPressPromise;

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

  // mainButtonAndDoorPromise = DownloadAndInsantiateBlock("MainButtonAndDoor", trackerRoot)
  // mainButtonAndDoorPromise.then((mainButtonAndDoorBlock) => 
  // {
  //   mainButtonAndDoorBlock.outputs.getPulse("onButtonPressed").then((buttonPress) => 
  //   {
  //     mainButtonAndDoorBlock.inputs.setPulse("SetReady", R.once()).then(function() {
  //       Diagnostics.log('Pulse signal successfully set!');
  //     }, function(error) {
  //         Diagnostics.log(error);
  //     });

  //     buttonPress.subscribe(() =>
  //     {
  //       Diagnostics.log("Button pressed!");
  //       platformAndMainModelPromise = DownloadAndInsantiateBlock("PlatformAndMainModel", trackerRoot);
  //       platformAndMainModelPromise.then((platformAndMainModelBlock) => 
  //       {
  //         Diagnostics.log("PlatformAndMainModel instantiated!");
  //       });
  //     });
  //   });
  // });

  DownloadAndInsantiateBlock("MainButtonAndDoor", trackerRoot).then((mainButtonAndDoorBlock) => 
  {
    mainButtonAndDoorBlock.outputs.getPulse("onButtonPressed").then((buttonPress) => 
    {
      buttonPress.subscribe(() =>
      {
        Diagnostics.log("Button pressed!");
        DownloadAndInsantiateBlock("PlatformAndMainModel", trackerRoot).then((platformAndMainModelBlock) => 
        {
          platformAndMainModelBlock.outputs.getPulse("onPlatformUp").then((platformUp) =>
          {
            platformUp.subscribe(() => 
            {
              Diagnostics.log("Platform lifted up!");
              DownloadAndInsantiateBlock("WorkoutButtonsAndMessage", trackerRoot).then((workoutButtonsAndMessageBlock) => 
              {
                Diagnostics.log("WorkoutButtonsAndMessage instantiated!");
              });
            });
          });
        });
      });
    });
  });

}; // Enables async/await in JS [part 2]


