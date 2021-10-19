import { expect } from 'chai';
import moment = require('moment');
import { AbstractValdator } from '../src/abstract-validator';

interface ITest {
  string: string;
  number: number;
  date: Date;
  boolean: boolean;
  list: {
    hello: string;
  }[];
  object: {
    test: 'test';
  };
}

const date = moment();

class TestingList extends AbstractValdator<{ hello: string }> {
  constructor() {
    super();

    this.RuleForString((x) => x.hello).isDefined();
  }
}

class TestingValidator extends AbstractValdator<ITest> {
  constructor() {
    super();

    this.RuleForString((x) => x.string)
      .isDefined()
      .isEmail();

    this.RuleForNumber((x) => x.number).greaterThan(0);

    this.RuleForDate((x) => x.date).isBetween(
      moment(date).add(-1, 'day').toDate(),
      moment(date).add(1, 'day').toDate(),
    );

    this.RuleForBoolean((x) => x.boolean).isTrue();

    this.RuleForEach((x) => x.list)
      .withValidator(new TestingList())
      .isDefined();

    this.RuleForObject((x) => x.object).isDefined();
  }
}

class TestingValidatorNoCascade extends TestingValidator {
  constructor() {
    super();

    this.setCascadeMode('stop');
  }
}

describe('abstract-validator', () => {
  let validator: TestingValidator;
  let noCascadeValidation: TestingValidatorNoCascade;
  let baseProp: ITest;

  beforeEach(() => {
    validator = new TestingValidator();
    noCascadeValidation = new TestingValidatorNoCascade();

    baseProp = {
      string: 'test@urban.co',
      number: 1,
      date: date.toDate(),
      boolean: true,
      list: [],
      object: {
        test: 'test',
      },
    };
  });

  describe('validate', () => {
    it('should throw an error if the array validator fails', async () => {
      const result = await validator.validate({
        ...baseProp,
        list: [
          {
            hello: undefined,
          },
        ],
      });

      expect(result.isValid).to.be.false;
    });

    it('should return a valid response', async () => {
      const result = await validator.validate(baseProp);
      expect(result.isValid).to.be.true;
    });

    it('should return a failure if the string is not defined', async () => {
      const result = await validator.validate({
        ...baseProp,
        string: undefined,
      });

      expect(result.isValid).to.be.false;
    });

    it('should return failure if the string is not an email', async () => {
      const result = await validator.validate({
        ...baseProp,
        string: 'test',
      });

      expect(result.isValid).to.be.false;
    });

    it('should return false if the date isnt between the values', async () => {
      const result = await validator.validate({
        ...baseProp,
        date: moment().add(-10, 'days').toDate(),
      });

      expect(result.isValid).to.be.false;
    });

    it('should return false if the number is less then 0', async () => {
      const result = await validator.validate({
        ...baseProp,
        number: -1,
      });

      expect(result.isValid).to.be.false;
    });

    it('should return false if the boolean is false', async () => {
      const result = await validator.validate({
        ...baseProp,
        boolean: false,
      });

      expect(result.isValid).to.be.false;
    });

    it('should only return one error if cascade mode is stop', async () => {
      const result = await noCascadeValidation.validate({
        ...baseProp,
        string: undefined,
        number: -1,
      });

      expect(result.isValid).to.be.false;

      expect(result.failures).to.have.lengthOf(1);
    });
  });
});
