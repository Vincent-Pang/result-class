import { Ok, None } from '../src';

describe('Test Option.ts', () => {
  test('test import', () => {
    const ok = new Ok(1);
    const none = None.getInstance();

    expect(ok).not.toBeNull();
    expect(none).not.toBeNull();
  });
});
