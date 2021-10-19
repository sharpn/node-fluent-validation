export async function isIterable(input: any): Promise<boolean> {
  if (input) {
    return typeof input[Symbol.iterator] === 'function';
  }

  return false;
}
