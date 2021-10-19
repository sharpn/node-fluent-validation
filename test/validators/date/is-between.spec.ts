import { expect } from 'chai';
import moment = require('moment');
import { IsBetweenValidator } from '../../../src/validators/date/is-between';

describe('date/is-between', () => {
  it('should return false if the input is undefined', async () => {
    const beforeDate = moment().add(-5, 'days').toDate();
    const afterDate = moment().add(5, 'days').toDate();

    const validator = new IsBetweenValidator(beforeDate, afterDate);

    const valid = await validator.isValid(undefined);
    expect(valid).to.be.false;
  });

  it('should return false if the input is null', async () => {
    const beforeDate = moment().add(-5, 'days').toDate();
    const afterDate = moment().add(5, 'days').toDate();

    const validator = new IsBetweenValidator(beforeDate, afterDate);

    const valid = await validator.isValid(null);
    expect(valid).to.be.false;
  });

  it('should return true if the date is inbetween 2 others', async () => {
    const date = moment();

    const beforeDate = moment().add(-5, 'days').toDate();
    const afterDate = moment().add(5, 'days').toDate();

    const validator = new IsBetweenValidator(beforeDate, afterDate);

    const valid = await validator.isValid(date.toDate());

    expect(valid).to.be.true;
  });

  it('should return false if the date is before the boundaries', async () => {
    const date = moment().toDate();
    const beforeDate = moment().add(5, 'days').toDate();
    const afterDate = moment().add(10, 'days').toDate();

    const validator = new IsBetweenValidator(beforeDate, afterDate);
    const valid = await validator.isValid(date);

    expect(valid).to.be.false;
  });

  it('should return false if the date is after the boundaries', async () => {
    const date = moment().add(20, 'days').toDate();
    const beforeDate = moment().add(5, 'days').toDate();
    const afterDate = moment().add(10, 'days').toDate();

    const validator = new IsBetweenValidator(beforeDate, afterDate);
    const valid = await validator.isValid(date);

    expect(valid).to.be.false;
  });

  it('should return true if the date is exactly on the lower bounds and [ is passed', async () => {
    const date = moment().toDate();
    const afterDate = moment().add(10, 'days').toDate();

    const validator = new IsBetweenValidator(date, afterDate, '[');
    const valid = await validator.isValid(date);

    expect(valid).to.be.true;
  });

  it('should return false of the data is exactly on the lower bound with default settings', async () => {
    const date = moment().toDate();
    const afterDate = moment().add(10, 'days').toDate();

    const validator = new IsBetweenValidator(date, afterDate);
    const valid = await validator.isValid(date);

    expect(valid).to.be.false;
  });

  it('should return true if the date is exactly on the upper bounds and ] is passed', async () => {
    const date = moment().toDate();
    const lowerDate = moment().add(-10, 'days').toDate();

    const validator = new IsBetweenValidator(lowerDate, date, '(', ']');
    const valid = await validator.isValid(date);

    expect(valid).to.be.true;
  });

  it('should return false of the data is exactly on the upper bound with default settings', async () => {
    const date = moment().toDate();
    const lowerDate = moment().add(-10, 'days').toDate();

    const validator = new IsBetweenValidator(lowerDate, date);
    const valid = await validator.isValid(date);

    expect(valid).to.be.false;
  });
});
