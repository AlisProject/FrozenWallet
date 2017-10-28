import ether from './helpers/ether';
import EVMThrow from './helpers/EVMThrow';
import {
  FrozenWallet,
  owners,
  required,
  thawingTime,
  setTimingToBeforeThawingTime,
  setTimingToThawingTime,
  setTimingToAfterThawingTime,
} from './helpers/test_helper';

contract('FrozenWallet', (accounts) => {
  let wallet;

  beforeEach(async () => {
    wallet = await FrozenWallet.new(owners, required, thawingTime);
  });

  describe('initialized correctly', () => {
    it('should be correct required number', async () => {
      const expect = 1;
      const actual = await wallet.required();
      actual.should.be.bignumber.equal(expect);
    });

    it('should be correct owners count', async () => {
      const expect = 1;
      const actualOwners = await wallet.getOwners();
      const actual = await actualOwners.length;
      actual.should.be.bignumber.equal(expect);
    });

    it('should be correct owner', async () => {
      const expect = '0x9f874e3dd3b765430682a62649933acdaae1d424';
      const actualOwners = await wallet.getOwners();
      const actual = await actualOwners[0];
      actual.should.be.equal(expect);
    });

    it('should be correct thawing time', async () => {
      const expect = 2145798000;
      const actual = await wallet.thawingTime();
      actual.should.be.bignumber.equal(expect);
    });
  });

  describe('thawing', () => {
    it('should be reject transfer until thawing time', async () => {
      await wallet.submitTransaction(accounts[0], ether(1), '0x')
        .should.be.rejectedWith(EVMThrow);
    });

    it('should be accept transfer before 10 seconds from thawing time', async () => {
      await setTimingToBeforeThawingTime();

      await wallet.submitTransaction(accounts[0], ether(1), '0x')
        .should.be.rejectedWith(EVMThrow);
    });

    it('should be accept transfer just thawing time', async () => {
      await setTimingToThawingTime();

      await wallet.submitTransaction(accounts[0], ether(1), '0x')
        .should.not.be.fulfilled;
    });

    it('should be accept transfer after thawing time', async () => {
      await setTimingToAfterThawingTime();

      await wallet.submitTransaction(accounts[0], ether(1), '0x')
        .should.not.be.fulfilled;
    });

    it('should be reject if not wallet owner', async () => {
      await setTimingToAfterThawingTime();

      await wallet.submitTransaction(accounts[0], ether(1), '0x', { from: accounts[0] })
        .should.be.rejectedWith(EVMThrow);
    });
  });
});
