import Sinon = require('sinon');
import { expect } from 'chai';
import * as sinon from 'sinon';
import { CommonValidation } from '../../src/builder';
import { Severity } from '../../src/shared/validation-severity';
import { ValidationRule } from '../../src/validation/validation-rule';
import {
  WhenCondition,
  WhenDefinedCondition,
  WhenUndefinedCondition,
} from '../../src/validation/when';
import {
  IsDefinedValidator,
  IsEmptyValidator,
  IsNotEmptyValidator,
} from '../../src/validators/common';
import { IsInValidator } from '../../src/validators/common/is-in';

async function responseShouldBeInstanceOf<T>(response: any, instance: T) {
  expect(response).to.not.be.undefined;
  expect(response).to.be.instanceOf(instance);
}

describe('builder/common-validator', () => {
  let commonValidator: CommonValidation<any, any>;
  let addValidationSpy: sinon.SinonSpy;
  let addConditionSpy: sinon.SinonSpy;
  let addMessageSpy: sinon.SinonSpy;
  let addErrorCodeSpy: sinon.SinonSpy;
  let addSeveritySpy: sinon.SinonSpy;

  let validationRule: ValidationRule<any, any>;

  beforeEach(() => {
    validationRule = new ValidationRule<any, any>((x) => x.test);
    commonValidator = new CommonValidation<any, any>(validationRule);

    addValidationSpy = sinon.spy(validationRule, 'addValidator');
    addConditionSpy = sinon.spy(validationRule, 'addCondition');
    addMessageSpy = sinon.spy(validationRule, 'addErrorMessage');
    addErrorCodeSpy = sinon.spy(validationRule, 'addErrorCode');
    addSeveritySpy = sinon.spy(validationRule, 'addSeverity');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('withErrorMessage', () => {
    it('should add the custom error message to the validation rule', async () => {
      commonValidator
        .must(async (x) => x.test === 'test')
        .withErrorMessage('hello this is a message');

      expect(addMessageSpy.callCount).to.eq(1);
      const [message] = addMessageSpy.firstCall.args;

      expect(message).to.eq('hello this is a message');
    });
  });

  describe('withErrorCode', () => {
    it('should add the custom error code to the validation rule', async () => {
      commonValidator
        .must(async (x) => x.test === 'test')
        .withErrorCode('CODE');

      expect(addErrorCodeSpy.callCount).to.eq(1);
      const [code] = addErrorCodeSpy.firstCall.args;

      expect(code).to.eq('CODE');
    });
  });

  describe('withSeverity', () => {
    it('should add the custom severity to the validation rule', async () => {
      commonValidator
        .must(async (x) => x.test === 'test')
        .withSeverity(Severity.error);

      expect(addSeveritySpy.callCount).to.eq(1);
      const [severity] = addSeveritySpy.firstCall.args;

      expect(severity).to.eq(Severity.error);
    });
  });

  describe('must', () => {
    it('should call the function in the must', async () => {
      commonValidator.must(async (x) => x.test === 'test');
      expect(addValidationSpy.callCount).to.eq(1);
    });

    it('should return validation options', async () => {
      const response = commonValidator.must(async (x) => x === 't');
      await responseShouldBeInstanceOf(response, CommonValidation);
    });

    it('should call the must lambda when running validation', async () => {
      const mustStub = sinon.stub().resolves(true);
      commonValidator.must(mustStub);

      await validationRule.apply({ test: 'test' }, 'continue');
      expect(mustStub.callCount).to.eq(1);
    });
  });

  describe('when', () => {
    it('should add a contition', async () => {
      commonValidator.when((x) => x.test === 'test');

      expect(addConditionSpy.callCount).to.eq(1);
      expect(addConditionSpy.firstCall.args[0]).to.be.instanceOf(WhenCondition);
    });

    it('should return validation options', async () => {
      const response = commonValidator.when((x) => x === 't');
      await responseShouldBeInstanceOf(response, CommonValidation);
    });
  });

  describe('whenDefined', () => {
    it('should add a condition', async () => {
      commonValidator.whenDefined();

      expect(addConditionSpy.callCount).to.eq(1);
      expect(addConditionSpy.firstCall.args[0]).to.be.instanceOf(
        WhenDefinedCondition,
      );
    });

    it('should return validation options', async () => {
      const response = commonValidator.whenDefined();
      await responseShouldBeInstanceOf(response, CommonValidation);
    });
  });

  describe('whenPropertyDefined', () => {
    it('should add a condition', async () => {
      commonValidator.whenPropertyDefined((x) => x.test);

      expect(addConditionSpy.callCount).to.eq(1);
      expect(addConditionSpy.firstCall.args[0]).to.be.instanceOf(
        WhenDefinedCondition,
      );
    });

    it('should return validation options', async () => {
      const response = commonValidator.whenPropertyDefined((x) => x.a);
      await responseShouldBeInstanceOf(response, CommonValidation);
    });
  });

  describe('whenPropertyUndefined', () => {
    it('should add a condition', async () => {
      commonValidator.whenPropertyUndefined((x) => x.test);

      expect(addConditionSpy.callCount).to.eq(1);
      expect(addConditionSpy.firstCall.args[0]).to.be.instanceOf(
        WhenUndefinedCondition,
      );
    });
  });

  describe('isDefined', () => {
    it('should add a validation', async () => {
      commonValidator.isDefined();

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsDefinedValidator,
      );
    });

    it('should return validation options', async () => {
      const response = commonValidator.isDefined();
      await responseShouldBeInstanceOf(response, CommonValidation);
    });
  });

  describe('isEmpty', () => {
    it('should add the validation', async () => {
      commonValidator.isEmpty();

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsEmptyValidator,
      );
    });
  });

  describe('isNotEmpty', () => {
    it('should add the validation', async () => {
      commonValidator.isNotEmpty();

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsNotEmptyValidator,
      );
    });
  });

  describe('isIn', () => {
    it('should add the validation', async () => {
      commonValidator.isIn([]);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsInValidator,
      );
    });
  });
});
