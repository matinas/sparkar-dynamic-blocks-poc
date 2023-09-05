import { DownloadAndInsantiateBlock } from './Utils.js';

export const _DEBUG = true;

const Diagnostics = require('Diagnostics');
const S = require('Scene');
const R = require('Reactive');
const T = require('Time');

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

  let mainButtonAndDoorBlock, platformAndMainModelBlock, workoutButtonsAndMessageBlock;

  async function myFunc() 
  {
    mainButtonAndDoorBlock = await DownloadAndInsantiateBlock("MainButtonAndDoor", trackerRoot);
    let mainButtonPress = await mainButtonAndDoorBlock.outputs.getPulse("onButtonPressed");
    let allBlocksLoaded = false;
    mainButtonPress.subscribe(async () =>
    {
      Diagnostics.log("Main button pressed!");
      platformAndMainModelBlock = await DownloadAndInsantiateBlock("PlatformAndMainModel", trackerRoot); 

      let platformUp = await platformAndMainModelBlock.outputs.getPulse("onPlatformUp");
      platformUp.subscribe(async () => 
      {
        Diagnostics.log("Platform lifted up!");
        workoutButtonsAndMessageBlock = await DownloadAndInsantiateBlock("WorkoutButtonsAndMessage", trackerRoot);
        allBlocksLoaded = true;
      });
    });
    await until(_ => allBlocksLoaded);
  }

  function until(conditionFunction)
  {
    const poll = resolve =>
    {
      if(conditionFunction()) resolve();
      else T.setTimeout(_ => poll(resolve), 400);
    }
    return new Promise(poll);
  }

  await myFunc();
  
  Diagnostics.log("Starting this...");
  let pushupButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onPushupsButtonPressed");
  pushupButtonPressed.subscribe(() =>
  {
    Diagnostics.log("Pushup button pressed!");
    platformAndMainModelBlock.inputs.setPulse("getReadyForPushups", R.once());
    
    platformAndMainModelBlock.inputs.setPulse("liftDownUp", R.once()).then(() => 
    {
      Diagnostics.log("Pulse sent to the block. The platform will lift down and up...");
    });

    platformAndMainModelBlock.outputs.getPulse("onPlatformDown").then((platformDown) =>
    {
      mainButtonAndDoorBlock.inputs.setPulse("closeOpenDoor", R.once()).then(() => {
        Diagnostics.log("Pulse sent to the block. The door should close...");
      });
    });
  });

  let burpeesButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onBurpeesButtonPressed");
  burpeesButtonPressed.subscribe(() =>
  {
    Diagnostics.log("Burpees button pressed!");
    platformAndMainModelBlock.inputs.setPulse("getReadyForBurpees", R.once());
  });

  let situpsButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onSitupsButtonPressed");
  situpsButtonPressed.subscribe(() =>
  {
    Diagnostics.log("Situps button pressed!");
    platformAndMainModelBlock.inputs.setPulse("getReadyForSitups", R.once());
  });

  // mainButtonAndDoorBlock = await DownloadAndInsantiateBlock("MainButtonAndDoor", trackerRoot);
  // let mainButtonPress = await mainButtonAndDoorBlock.outputs.getPulse("onButtonPressed");
  // mainButtonPress.subscribe(async () =>
  // {
  //   Diagnostics.log("Main button pressed!");
  //   platformAndMainModelBlock = await DownloadAndInsantiateBlock("PlatformAndMainModel", trackerRoot); 
  //   let platformUp = await platformAndMainModelBlock.outputs.getPulse("onPlatformUp");
  //   platformUp.subscribe(async () => 
  //   {
  //     Diagnostics.log("Platform lifted up!");
  //     workoutButtonsAndMessageBlock = await DownloadAndInsantiateBlock("WorkoutButtonsAndMessage", trackerRoot);

  //     let pushupButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onPushupsButtonPressed");
  //     pushupButtonPressed.subscribe(() =>
  //     {
  //       Diagnostics.log("Pushup button pressed!");
  //       platformAndMainModelBlock.inputs.setPulse("getReadyForPushups", R.once());

  //       platformAndMainModelBlock.inputs.setPulse("liftDownUp", R.once()).then(() => 
  //       {
  //         Diagnostics.log("Pulse sent to the block. The platform will lift down and up...");
  //       });

  //       platformAndMainModelBlock.outputs.getPulse("onPlatformDown").then((platformDown) =>
  //       {
  //         mainButtonAndDoorBlock.inputs.setPulse("closeOpenDoor", R.once()).then(() => {
  //           Diagnostics.log("Pulse sent to the block. The door should close...");
  //         });
  //       });
  //     });

  //     let burpeesButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onBurpeesButtonPressed");
  //     burpeesButtonPressed.subscribe(() =>
  //     {
  //       Diagnostics.log("Burpees button pressed!");
  //       platformAndMainModelBlock.inputs.setPulse("getReadyForBurpees", R.once());
  //     });

  //     let situpsButtonPressed = await workoutButtonsAndMessageBlock.outputs.getPulse("onSitupsButtonPressed");
  //     situpsButtonPressed.subscribe(() =>
  //     {
  //       Diagnostics.log("Situps button pressed!");
  //       platformAndMainModelBlock.inputs.setPulse("getReadyForSitups", R.once());
  //     });
  //   });
  // });

  // let platformUp = await platformAndMainModelBlock.outputs.getPulse("onPlatformUp");
  // platformUp.subscribe(() => 
  // {
  //   Diagnostics.log("Platform lifted up!");
  // });

  // DownloadAndInsantiateBlock("MainButtonAndDoor", trackerRoot).then((mainButtonAndDoorBlock) => 
  // {
  //   mainButtonAndDoorBlock.outputs.getPulse("onButtonPressed").then((buttonPress) => 
  //   {
  //     buttonPress.subscribe(() =>
  //     {
  //       Diagnostics.log("Main button pressed!");
  //       DownloadAndInsantiateBlock("PlatformAndMainModel", trackerRoot).then((platformAndMainModelBlock) => 
  //       {
  //         platformAndMainModelBlock.outputs.getPulse("onPlatformUp").then((platformUp) =>
  //         {
  //           platformUp.subscribe(() => 
  //           {
  //             Diagnostics.log("Platform lifted up!");
  //             DownloadAndInsantiateBlock("WorkoutButtonsAndMessage", trackerRoot).then((workoutButtonsAndMessageBlock) => 
  //             {
  //               workoutButtonsAndMessageBlock.outputs.getPulse("onPushupsButtonPressed").then((pushupButtonPressed) =>
  //               {
  //                 pushupButtonPressed.subscribe(() =>
  //                 {
  //                   Diagnostics.log("Pushup button pressed!");

  //                   platformAndMainModelBlock.inputs.setPulse("getReadyForPushups", R.once());
  //                   platformAndMainModelBlock.inputs.setPulse("liftDownUp", R.once()).then(() => 
  //                   {
  //                     Diagnostics.log("Pulse sent to the block. The platform will lift down and up...");
  //                   });

  //                   platformAndMainModelBlock.outputs.getPulse("onPlatformDown").then((platformDown) =>
  //                   {
  //                     mainButtonAndDoorBlock.inputs.setPulse("closeOpenDoor", R.once()).then(() => {
  //                       Diagnostics.log("Pulse sent to the block. The door should close...");
  //                     });
  //                   });
  //                 });
  //               });

  //               workoutButtonsAndMessageBlock.outputs.getPulse("onBurpeesButtonPressed").then((burpeesButtonPressed) =>
  //               {
  //                 burpeesButtonPressed.subscribe(() =>
  //                 {
  //                   Diagnostics.log("Burpees button pressed!");

  //                   platformAndMainModelBlock.inputs.setPulse("getReadyForBurpees", R.once());
  //                 });
  //               });

  //               workoutButtonsAndMessageBlock.outputs.getPulse("onSitupsButtonPressed").then((situpsButtonPressed) =>
  //               {
  //                 situpsButtonPressed.subscribe(() =>
  //                 {
  //                   Diagnostics.log("Situps button pressed!");

  //                   platformAndMainModelBlock.inputs.setPulse("getReadyForSitups", R.once());
  //                 });
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

}; // Enables async/await in JS [part 2]


