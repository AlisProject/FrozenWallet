pragma solidity ^0.4.13;


import './lib/MultiSigWallet.sol';


/**
 * TODO:
*/
contract FrozenWallet is MultiSigWallet {

  function FrozenWallet(address[] _owners, uint _required)
  public
  validRequirement(_owners.length, _required)
  MultiSigWallet(_owners, _required)
  {
    // TODO:
  }
}
