import { fail } from 'assert/strict';
import { expect } from 'chai';
import { ValidationFailure } from '../../src/shared/validation-failure';
import { Severity } from '../../src/shared/validation-severity';

describe('shared/validation-failure', () => {
  it('should write all the properties correctyr', async () => {
    const failure = new ValidationFailure(
      'target',
      'propertyName',
      'attemptedValue',
      'errorMessage',
      'errorCode',
      Severity.info,
    );

    expect(failure.target).to.eq('target');
    expect(failure.propertyName).to.eq('propertyName');
    expect(failure.attemptedValue).to.eq('attemptedValue');
    expect(failure.errorMessage).to.eq('errorMessage');
    expect(failure.errorCode).to.eq('errorCode');
    expect(failure.severity).to.eq(Severity.info);
  });
});
