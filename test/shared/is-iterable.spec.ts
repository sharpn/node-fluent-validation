import { expect } from 'chai';
import { isIterable } from '../../src/shared/is-iterable';

enum TestEnum {
  Test = 'Test',
}

describe('shared/is-iterable', () => {
  it('should return true if the input it iterable', async () => {
    const iterable = await isIterable(['hello']);
    expect(iterable).to.be.true;
  });

  it('should return false if the input is not iterable', async () => {
    const iterable = await isIterable(TestEnum);
    expect(iterable).to.be.false;
  });

  it('should return false if there is no input', async () => {
    const iterable = await isIterable(undefined);
    expect(iterable).to.be.false;
  });
});
