import { expect } from 'chai';
import { IsTrueValidator } from '../../../src/validators/boolean/is-true';

describe('boolean/is-true', () => {
  let validator: IsTrueValidator<any>;

  beforeEach(() => {
    validator = new IsTrueValidator();
  });

  it('should return true if the value is true', async () => {
    const response = await validator.isValid(true);
    expect(response).to.be.true;
  });

  it('should return false if the value is false', async () => {
    const response = await validator.isValid(false);
    expect(response).to.be.false;
  });

  it('should return false if the value is undefined', async () => {
    const response = await validator.isValid(undefined);
    expect(response).to.be.false;
  });
});
