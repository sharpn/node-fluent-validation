import { expect } from 'chai';
import { IsDefinedValidator } from '../../../src/validators/common/is-defined';

describe('common/is-defined', () => {
  let validator: IsDefinedValidator<any>;

  beforeEach(() => {
    validator = new IsDefinedValidator();
  });

  it('should return true if the value is defined', async () => {
    const result = await validator.isValid('testing');
    expect(result).to.be.true;
  });

  it('should return false if the value is undefined', async () => {
    const result = await validator.isValid(undefined);
    expect(result).to.be.false;
  });
});
