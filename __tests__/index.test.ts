import {Ok, None} from '../src/index';

describe('Test Option.ts', () => {
    test('test import', () =>
    {
        const ok = new Ok(1);
        const none = None.getInstance();

        expect(ok).not.toBeNull();
        expect(none).not.toBeNull();
    });
});
