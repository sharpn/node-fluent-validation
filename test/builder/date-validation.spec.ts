import * as sinon from 'sinon';
import moment = require('moment');
import { DateValidator } from '../../src/builder';
import { ValidationRule } from '../../src/validation/validation-rule';
import { expect } from 'chai';
import { IsBetweenValidator } from '../../src/validators/date';
import { IsSameOrAfterValidator } from '../../src/validators/date/is-same-or-after';

describe('builder/date-validator', () => {
  let dateValidator: DateValidator<any>;

  let addValidationSpy: sinon.SinonSpy;

  beforeEach(() => {
    const validationRule = new ValidationRule<any, any>((x) => x.test);
    dateValidator = new DateValidator(validationRule);

    addValidationSpy = sinon.spy(validationRule, 'addValidator');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('is-betweeen', () => {
    it('should call the validator with the correct dates', async () => {
      const date1 = moment().toDate();
      const date2 = moment(date1).add(1, 'day').toDate();

      dateValidator.isBetween(date1, date2);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsBetweenValidator,
      );
    });
  });

  describe('is-after', () => {
    it('should call the validator with the correct date', async () => {
      const date1 = moment().toDate();

      dateValidator.isSameOrAfter(date1);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsSameOrAfterValidator,
      );
    });
  });
});
