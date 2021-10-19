import { IsSameOrAfterValidator } from '../../../src/validators/date/is-same-or-after';
import * as moment from 'moment';
import { expect } from 'chai';

describe('date/is-same-or-after', () => {
  it('should return true if the date is after the passed in one', async () => {
    const afterDate = moment().startOf('day').toDate();

    const validator = new IsSameOrAfterValidator(afterDate);

    const valid = await validator.isValid(moment().toDate());
    expect(valid).to.be.true;
  });

  it('should be false if the date is after the passed in one', async () => {
    const afterDate = moment().startOf('day').toDate();

    const validator = new IsSameOrAfterValidator(afterDate);

    const valid = await validator.isValid(moment().add(-2, 'days').toDate());
    expect(valid).to.be.false;
  });

  it('should return false if the date is undefined', async () => {
    const afterDate = moment().startOf('day').toDate();

    const validator = new IsSameOrAfterValidator(afterDate);

    const valid = await validator.isValid(undefined);
    expect(valid).to.be.false;
  });

  it('should return false if the date is null', async () => {
    const afterDate = moment().startOf('day').toDate();

    const validator = new IsSameOrAfterValidator(afterDate);

    const valid = await validator.isValid(null);
    expect(valid).to.be.false;
  });

  it('should return true if the values are equal', async () => {
    const afterDate = moment().startOf('day').toDate();

    const validator = new IsSameOrAfterValidator(afterDate);

    const valid = await validator.isValid(afterDate);
    expect(valid).to.be.true;
  });
});
