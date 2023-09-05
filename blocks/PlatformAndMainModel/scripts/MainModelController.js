const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Blocks = require('Blocks');
const Patches = require('Patches');

const BlockGlobalState = { Init : 0, GettingReadyForWorkout : 1, ReadyForWorkout : 2, DoingWorkout : 3, WorkoutCompleted : 4, AllWorkoutsCompleted : 5 };
const SelectedWorkout = { None : -1, Pushups : 0, Burpees : 1, Situps : 2 };

let state = BlockGlobalState.Init;
let workout = SelectedWorkout.None;

(async function () { // Enables async/await in JS [part 1]

  Blocks.inputs.getPulse('getReadyForPushups').then((readySignal) => 
  {
    readySignal.subscribe(() => 
    {
      if (state == BlockGlobalState.Init)
      {
          Diagnostics.log("Get ready for pushups signal received");
          state = BlockGlobalState.GettingReadyForWorkout;
          workout = SelectedWorkout.Pushups;
      }
    });
  });

  Blocks.inputs.getPulse('getReadyForBurpees').then((readySignal) => 
  {
    readySignal.subscribe(() => 
    {
      if (state == BlockGlobalState.Init)
      {
        Diagnostics.log("Get ready for burpees signal received");
        state = BlockGlobalState.GettingReadyForWorkout;
        workout = SelectedWorkout.Burpees;
      }
    });
  });

  Blocks.inputs.getPulse('getReadyForSitups').then((readySignal) => 
  {
    readySignal.subscribe(() => 
    {
      if (state == BlockGlobalState.Init)
      {
          Diagnostics.log("Get ready for situps signal received");
          state = BlockGlobalState.GettingReadyForWorkout;
          workout = SelectedWorkout.Situps;
      }
    });
  });

  Patches.outputs.getPulse("readyForWorkout").then((readySignal) =>
  {
    readySignal.subscribe(() => 
    {
      Diagnostics.log("Ready in place for workout!");
      state = BlockGlobalState.ReadyForWorkout;
    })
  });

})(); // Enables async/await in JS [part 2]
