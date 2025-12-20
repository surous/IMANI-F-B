import { Lucid, Blockfrost } from 'lucid-cardano';
import { blockfrost } from './blockfrost';

const seedPhrase = process.env.BACKEND_WALLET_SEED!; // 24-word phrase (keep secret!)

export const lucid = Lucid.new(
  new Blockfrost('https://cardano-preprod.blockfrost.io/api/v0', process.env.BLOCKFROST_PROJECT_ID_PREPROD!),
  'Preprod'
).then((instance) => {
  instance.selectWalletFromSeed(seedPhrase);
  return instance;
});