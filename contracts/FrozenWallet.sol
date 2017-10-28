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

  /// overriding MultiSigWallet#submitTransaction
  /// - To frozen until thawingTime.
  ///
  /// @dev Allows an owner to submit and confirm a transaction.
  /// @param destination Transaction target address.
  /// @param value Transaction ether value.
  /// @param data Transaction data payload.
  /// @return Returns transaction ID.
  function submitTransaction(address destination, uint value, bytes data)
  public
  returns (uint transactionId)
  {
    require(now >= thawingTime);

    return super.submitTransaction(destination, value, data);
  }
}
