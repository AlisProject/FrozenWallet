import {FrozenWallet, owners, required} from './helpers/test_helper';

contract('FrozenWallet', (accounts) => {
  let wallet;

  beforeEach(async function () {
    wallet = await FrozenWallet.new(owners, required);
  });

  describe('initialized correctly', () => {
    it('should be correct required number', async () => {
      const expect = 1;
      const actual = await wallet.required();
      actual.should.be.bignumber.equal(expect);
    });
  });
});
