import { expect } from 'chai';
import {
  WhenCondition,
  WhenDefinedCondition,
  WhenUndefinedCondition,
} from '../../src/validation/when';

describe('when', () => {
  it('should return true when the value exists', async () => {
    const when = new WhenCondition<{ testing: string }>(
      (x) => x.testing === 'hello',
    );

    const shouldValidate = await when.shouldValidate({ testing: 'hello' });
    expect(shouldValidate).to.be.true;
  });

  it('should return false when the expression is not valid', async () => {
    const when = new WhenCondition<{ testing: string }>(
      (x) => x.testing === 'hello',
    );

    const shouldValidate = await when.shouldValidate({ testing: 'bye' });
    expect(shouldValidate).to.be.false;
  });
});

describe('when-defined', () => {
  it('should return true when the value is defined', async () => {
    const when = new WhenDefinedCondition<{ testing: string }>(
      (x) => x.testing,
    );

    const shouldValidate = await when.shouldValidate({ testing: 'hello' });
    expect(shouldValidate).to.be.true;
  });

  it('should return false when the value is undefined', async () => {
    const when = new WhenDefinedCondition<{ testing: string }>(
      (x) => x.testing,
    );

    const shouldValidate = await when.shouldValidate({ testing: undefined });
    expect(shouldValidate).to.be.false;
  });
});

describe('when-undefined', () => {
  it('should return true when the value is undefined', async () => {
    const when = new WhenUndefinedCondition<{ testing: string }>(
      (x) => x.testing,
    );
    const shouldValidate = await when.shouldValidate({ testing: undefined });
    expect(shouldValidate).to.be.true;
  });

  it('should return false when the value is not undefined', async () => {
    const when = new WhenUndefinedCondition<{ testing: string }>(
      (x) => x.testing,
    );
    const shouldValidate = await when.shouldValidate({ testing: 'value' });
    expect(shouldValidate).to.be.false;
  });
});
