import moment from 'moment';
import increaseTime from '../helpers/increaseTime';

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

// Set time to before 10 seconds from thawing time
export async function setTimingToBeforeThawingTime() {
  const now = await Math.floor(Date.now() / 1000);
  const increaseDuration = thawingTime - now - 10;
  await increaseTime(moment.duration(increaseDuration, 'second'));
}

// Set time to thawing time
export async function setTimingToThawingTime() {
  await setTimingToBeforeThawingTime();
  await increaseTime(moment.duration(10, 'second'));
}

// Set time to after 1 day from thawing time.
export async function setTimingToAfterThawingTime() {
  await setTimingToThawingTime();
  await increaseTime(moment.duration(1, 'day'));
}
