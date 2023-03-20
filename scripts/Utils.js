const Blocks = require('Blocks');
const Diagnostics = require('Diagnostics');

import { _DEBUG } from './GameManager';

/**
 * Downloads and instantantiates a dynamic block in the scene
 * @param {string} blockName name of the block asset to download, also used to name the instantiated block object
 * @param {SceneObjectBase} root scene object inside which the block will be instantiated
 * @returns {Promise<BlockSceneRoot>} a promise containing the instantiated block or undefined if there was any error
 */
export async function DownloadAndInsantiateBlock(blockName, root)
{
  return Blocks.download(blockName)
    .then(() =>
    {
      if (_DEBUG) Diagnostics.log(`Block ${blockName} downloaded sucessfully`);
      return Blocks.instantiate(blockName, {name : blockName}).then(async function(blockSceneRoot)
      {
          if (_DEBUG) Diagnostics.log(`Block has just been instantiated. It will be added to the scene now...`);
          await root.addChild(blockSceneRoot);
          if (_DEBUG) Diagnostics.log(`Block added to the scene`);

          return blockSceneRoot;
      })
    })
    .catch(() =>
    {
      if (_DEBUG) Diagnostics.log(`There was an error trying to download block ${blockName}`);
      return null;
    }
  );
};