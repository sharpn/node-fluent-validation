import { expect } from 'chai';
import { IsFalseValidator } from '../../../src/validators/boolean/is-false';

describe('boolean/is-false', () => {
  let validator: IsFalseValidator<any>;

  beforeEach(() => {
    validator = new IsFalseValidator();
  });

  it('should return false if the value is true', async () => {
    const response = await validator.isValid(false);
    expect(response).to.be.true;
  });

  it('should return true if the value is false', async () => {
    const response = await validator.isValid(true);
    expect(response).to.be.false;
  });

  it('should return false if the value is undefined', async () => {
    const response = await validator.isValid(undefined);
    expect(response).to.be.false;
  });
});
