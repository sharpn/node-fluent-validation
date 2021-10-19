import { expect } from 'chai';
import { RuleOutcome } from '../../src/validation/rule-outcome';

describe('rule-outcome', () => {
  it('should return valid false when there are errors', async () => {
    const outcome = new RuleOutcome([
      {
        target: '',
        propertyName: '',
        attemptedValue: '',
        errorMessage: '',
        errorCode: '',
        severity: undefined,
      },
    ]);

    const valid = outcome.isValid;
    expect(valid).to.be.false;
  });

  it('should return valid true when there are no errors', async () => {
    const outcome = new RuleOutcome();
    const valid = outcome.isValid;
    expect(valid).to.be.true;
  });

  it('should return the errors', async () => {
    const errors = [
      {
        target: '',
        propertyName: '',
        attemptedValue: '',
        errorMessage: '',
        errorCode: '',
        severity: undefined,
      },
    ];

    const outcome = new RuleOutcome(errors);
    expect(outcome.failures).to.deep.eq(errors);
  });
});
