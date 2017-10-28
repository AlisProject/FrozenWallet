const fs = require('fs');

const FrozenWallet = artifacts.require('FrozenWallet.sol');
const walletParams = JSON.parse(fs.readFileSync('../config/FrozenWallet.json', 'utf8'));

module.exports = function deployContracts(deployer) {
  deployer.deploy(
    FrozenWallet, walletParams.owners, walletParams.required,
    walletParams.thawingTime,
  );
};
