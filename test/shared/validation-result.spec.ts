import { expect } from 'chai';
import { ValidationResult } from '../../src/shared/validation-result';

describe('shared/validation-result', () => {
  let validationResult: ValidationResult;

  beforeEach(() => {
    validationResult = new ValidationResult();
  });

  it('should not add a failure if its undefined', async () => {
    await validationResult.addFailures(undefined);

    expect(validationResult.failures).to.have.lengthOf(0);
  });

  it('should add failures if its not undefined', async () => {
    await validationResult.addFailures([
      {
        attemptedValue: 'attemptedValue',
        propertyName: 'propertyName',
        target: 'target',
        errorMessage: '',
        errorCode: '',
        severity: undefined,
      },
    ]);

    expect(validationResult.failures).to.have.lengthOf(1);
  });

  it('should return invalid if there are errors', async () => {
    await validationResult.addFailures([
      {
        attemptedValue: 'attemptedValue',
        propertyName: 'propertyName',
        target: 'target',
        errorMessage: '',
        errorCode: '',
        severity: undefined,
      },
    ]);

    expect(validationResult.isValid).to.be.false;
  });

  it('should return valid if there are no errors', async () => {
    const valid = validationResult.isValid;
    expect(valid).to.be.true;
  });
});
