import { expect } from 'chai';
import { GreaterThanValidator } from '../../../src/validators/number';

describe('number/greater-than', () => {
  it('should return false if the input is undefined', async () => {
    const validator = new GreaterThanValidator(1);
    const valid = await validator.isValid(undefined);
    expect(valid).to.be.false;
  });

  it('should return false if the number is less than the threshold', async () => {
    const validator = new GreaterThanValidator(10);
    const valid = await validator.isValid(1);
    expect(valid).to.be.false;
  });

  it('should return true if the input is greater than the threshold', async () => {
    const validator = new GreaterThanValidator(10);
    const valid = await validator.isValid(11);
    expect(valid).to.be.true;
  });

  it('should return false when the value is 0', async () => {
    const validator = new GreaterThanValidator(10);
    const valid = await validator.isValid(0);
    expect(valid).to.be.false;
  });

  it('should return false if the value is the same as the threshold', async () => {
    const validator = new GreaterThanValidator(10);
    const valid = await validator.isValid(10);
    expect(valid).to.be.false;
  });
});
