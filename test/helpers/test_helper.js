const fs = require('fs');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiBigNumber = require('chai-bignumber');

const walletParams = JSON.parse(fs.readFileSync('./config/FrozenWallet.json', 'utf8'));

// exports

export const BigNumber = web3.BigNumber;
export const should = chai
  .use(chaiAsPromised)
  .use(chaiBigNumber(BigNumber))
  .should();

export const FrozenWallet = artifacts.require('FrozenWallet.sol');
export const owners = walletParams.owners;
export const required = walletParams.required;
export const thawingTime = walletParams.thawingTime;
