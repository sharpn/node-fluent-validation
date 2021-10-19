import { expect } from 'chai';
import { ValidationError } from '../../src/shared/validation-error';

describe('shared/validation-error', () => {
  it('should have the failures on the error', async () => {
    try {
      throw new ValidationError({
        attemptedValue: 'attemptedValue',
        propertyName: 'propertyName',
        target: 'target',
        errorMessage: 'ErrorMessage',
        errorCode: 'ERRORCODE',
        severity: undefined,
      });
    } catch (err) {
      expect(err.code).to.eq('ERRORCODE');
      expect(err.message).to.eq('ErrorMessage');
    }
  });
});
