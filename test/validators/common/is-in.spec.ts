import { expect } from 'chai';
import { IsInValidator } from '../../../src/validators/common/is-in';

export enum AddressType {
  Home = 'home',
  Work = 'work',
  Custom = 'custom',
}

describe('common/is-in', () => {
  let arrayValidator: IsInValidator<any>;
  let enumValidator: IsInValidator<any>;

  beforeEach(() => {
    arrayValidator = new IsInValidator(['testing']);
    enumValidator = new IsInValidator(AddressType);
  });

  it('should return true if the input is in the list', async () => {
    const result = await arrayValidator.isValid('testing');
    expect(result).to.be.true;
  });

  it('should return false if the input is not in the list', async () => {
    const result = await arrayValidator.isValid('testing2');
    expect(result).to.be.false;
  });

  it('should return true if the input is in the enum', async () => {
    const result = await enumValidator.isValid('home');
    expect(result).to.be.true;
  });

  it('should return false if the input is not in the enum', async () => {
    const result = await enumValidator.isValid('home2');
    expect(result).to.be.false;
  });
});
