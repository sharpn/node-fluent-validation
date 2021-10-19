import { expect } from 'chai';
import { IsNotEmptyValidator } from '../../../src/validators/common';

describe('common/is-not-empty', () => {
  let validator: IsNotEmptyValidator<any>;

  beforeEach(() => {
    validator = new IsNotEmptyValidator();
  });

  it('should return true if the value is not empty', async () => {
    const result = await validator.isValid('test');
    expect(result).to.be.true;
  });

  it('should return false if the value is an empty string', async () => {
    const result = await validator.isValid('');
    expect(result).to.be.false;
  });

  it('should return false if the value is null', async () => {
    const result = await validator.isValid(null);
    expect(result).to.be.false;
  });

  it('should return false if the value is undefined', async () => {
    const result = await validator.isValid(undefined);
    expect(result).to.be.false;
  });
});
