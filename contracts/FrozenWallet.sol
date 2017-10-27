pragma solidity ^0.4.13;


import './lib/MultiSigWallet.sol';


/**
 * TODO:
*/
contract FrozenWallet is MultiSigWallet {

  uint256 public thawingTime;

  function FrozenWallet(address[] _owners, uint _required, uint256 _thawingTime)
  public
  validRequirement(_owners.length, _required)
  MultiSigWallet(_owners, _required)
  {
    thawingTime = _thawingTime;
  }
}
