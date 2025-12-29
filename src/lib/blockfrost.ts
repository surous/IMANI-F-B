import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

export const blockfrost = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID_PREPROD!,
  network: 'preprod',
});