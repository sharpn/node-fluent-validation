import { expect } from 'chai';
import * as sinon from 'sinon';
import { ValidationError } from '../../src/shared/validation-error';
import { Severity } from '../../src/shared/validation-severity';
import { PropertyValidator } from '../../src/validators/property-validator';
import { ValidationRule } from '../../src/validation/validation-rule';

const BASE_VALIDATOR = {
  errorMessage: 'errorMessage',
  errorCode: 'errorCode',
  severity: Severity.info,
};

describe('validation-rule', () => {
  let validationRule: ValidationRule<any, any>;

  let successIsValid: sinon.SinonStub;
  let failIsValid: sinon.SinonStub;

  beforeEach(() => {
    validationRule = new ValidationRule((x) => x.test);

    successIsValid = sinon.stub().resolves(true);
    failIsValid = sinon.stub().resolves(false);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if the cascadeMode is throwOnFirstError and the severity is error', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
      severity: Severity.error,
    });

    try {
      await validationRule.apply({}, 'throwOnFirstError');
      expect.fail('should have thrown an error here');
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
    }
  });

  it('should ignore the severity if there are no validators', async () => {
    validationRule.addSeverity(Severity.error);
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(1);

    const [failure] = response.failures;
    expect(failure.severity).to.eq(Severity.info);
  });

  it('should add the severity to the latest validator', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addSeverity(Severity.error);

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(2);

    const [failure1, failure2] = response.failures;
    expect(failure1.severity).to.eq(Severity.info);
    expect(failure2.severity).to.eq(Severity.error);
  });

  it('should ignore the errorCode if there are no validators', async () => {
    validationRule.addErrorCode('message');
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(1);

    const [failure] = response.failures;
    expect(failure.errorCode).to.eq('errorCode');
  });

  it('should add the errorCode to the latest validator', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addErrorCode('newCode');

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(2);

    const [failure1, failure2] = response.failures;
    expect(failure1.errorCode).to.eq('errorCode');
    expect(failure2.errorCode).to.eq('newCode');
  });

  it('should ignore the message if there are no validators', async () => {
    validationRule.addErrorMessage('message');
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(1);

    const [failure] = response.failures;
    expect(failure.errorMessage).to.eq('errorMessage');
  });

  it('should add the message to the latest validator', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addErrorMessage('message');

    const response = await validationRule.apply({}, 'continue');
    expect(response.failures).to.have.lengthOf(2);

    const [failure1, failure2] = response.failures;
    expect(failure1.errorMessage).to.eq('errorMessage');
    expect(failure2.errorMessage).to.eq('message');
  });

  it('it should use the string lambda when it cannot generate a prop name', async () => {
    const invalidRule = new ValidationRule('invalid lambda' as any);
    expect(invalidRule.propertyName).to.eq('invalid lambda');
  });

  it('should use the correct property name', async () => {
    expect(validationRule.propertyName).to.eq('test');
  });

  it('should call isValid on a single validator', async () => {
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');

    expect(response.isValid).to.be.true;
    expect(successIsValid.callCount).to.eq(1);

    expect(response.failures).to.have.lengthOf(0);
  });

  it('should call isValid when there is more than one validator', async () => {
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');

    expect(response.isValid).to.be.true;
    expect(successIsValid.callCount).to.eq(2);

    expect(response.failures).to.have.lengthOf(0);
  });

  it('should return a failure if the validation fails', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'continue');

    expect(response.isValid).to.be.false;
    expect(failIsValid.callCount).to.eq(1);

    expect(response.failures).to.have.lengthOf(1);
  });

  it('should stop on the first failure if the cascade mode is set to stop', async () => {
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: failIsValid,
      ...BASE_VALIDATOR,
    });

    const response = await validationRule.apply({}, 'stop');

    expect(response.isValid).to.be.false;
    expect(failIsValid.callCount).to.eq(1);

    expect(response.failures).to.have.lengthOf(1);
  });

  it('should skip the validation if validation is not required', async () => {
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });

    validationRule.addCondition({
      shouldValidate: async () => {
        return false;
      },
    });

    const response = await validationRule.apply({}, 'continue');
    expect(successIsValid.callCount).to.eq(0);
  });

  it('should continue the validation if validation if required', async () => {
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });

    validationRule.addCondition({
      shouldValidate: async () => {
        return true;
      },
    });

    const response = await validationRule.apply({}, 'continue');
    expect(successIsValid.callCount).to.eq(1);
  });

  it('should continue if the validator returns no errors', async () => {
    validationRule.addValidator({
      isValid: async (input: any, model: any) => {
        return [];
      },
      ...BASE_VALIDATOR,
    });
    validationRule.addValidator({
      isValid: successIsValid,
      ...BASE_VALIDATOR,
    });

    const result = await validationRule.apply({}, 'continue');
    expect(result.isValid).to.be.true;
    expect(successIsValid.callCount).to.eq(1);
  });
});
