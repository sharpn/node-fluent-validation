import { expect } from 'chai';
import { IsEmailValidator } from '../../../src/validators/string/is-email';

describe('string/is-email', () => {
  let validator: IsEmailValidator<any>;

  beforeEach(() => {
    validator = new IsEmailValidator();
  });

  it('should return true if the email is valid', async () => {
    const valid = await validator.isValid('test@urban.co');
    expect(valid).to.be.true;
  });

  it('should return false if the email is invalid', async () => {
    const valid = await validator.isValid('test@urban.con');
    expect(valid).to.be.false;
  });

  it('should return false if the input is undefined', async () => {
    const valid = await validator.isValid(undefined);
    expect(valid).to.be.false;
  });
});
