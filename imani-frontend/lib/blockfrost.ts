import { Blockfrost } from '@blockfrost/blockfrost-js';

export const blockfrost = new Blockfrost({
  projectId: process.env.BLOCKFROST_PROJECT_ID_PREPROD!,
  network: 'preprod',
});