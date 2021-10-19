import validation from 'validator';
import { ContainsValidator } from '../../../src/validators/string/contains';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('contains', () => {
  let validator: ContainsValidator<any>;
  let validatorSpy: sinon.SinonSpy;

  beforeEach(() => {
    validator = new ContainsValidator('testing');
    validatorSpy = sinon.spy(validation, 'contains');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call the validation library with the correct information', async () => {
    const result = await validator.isValid('testing string');

    expect(validatorSpy.callCount).to.eq(1);
    const [string1, string2] = validatorSpy.firstCall.args;

    expect(string1).to.eq('testing string');
    expect(string2).to.eq('testing');
    expect(result).to.be.true;
  });

  it('should return false if no string is passed', async () => {
    const result = await validator.isValid(undefined);
    expect(result).to.be.false;
  });
});
