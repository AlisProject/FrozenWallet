import { FrozenWallet, owners, required } from './helpers/test_helper';

contract('FrozenWallet', () => {
  let wallet;

  beforeEach(async () => {
    wallet = await FrozenWallet.new(owners, required);
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
  });
});
