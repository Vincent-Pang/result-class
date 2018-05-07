import { Err, None, Ok, Some } from '../src';

describe('Test Result.ts', () => {
  test('getValue and getError', () => {
    class OkTest extends Ok<number> {
      public constructor() {
        super(3);
      }

      public getValue(): number {
        return super.getValue();
      }

      public getError(): never {
        return super.getError();
      }
    }

    class ErrTest extends Err<number> {
      public constructor() {
        super(4);
      }

      public getValue(): never {
        return super.getValue();
      }

      public getError(): number {
        return super.getError();
      }
    }

    const okTest = new OkTest();
    const errTest = new ErrTest();

    expect( okTest.getValue() ).toBe(3);
    expect( () => okTest.getError() ).toThrow();

    expect( () => errTest.getValue() ).toThrow();
    expect( errTest.getError() ).toBe(4);
  });

  test('is_ok', () => {
    const ok = new Ok(-3);
    const error = new Err('Some error message');

    expect( ok.is_ok() ).toBe(true);
    expect( error.is_ok() ).toBe(false);
  });

  test('is_err', () => {
    const ok = new Ok(-3);
    const error = new Err('Some error message');

    expect( ok.is_err() ).toBe(false);
    expect( error.is_err() ).toBe(true);
  });

  test('ok', () => {
    const ok = new Ok(2);
    const error = new Err('Nothing here');

    expect( ok.ok() ).toEqual( new Some(2) );
    expect( error.ok() ).toEqual( None.getInstance() );
  });

  test('err', () => {
    const ok = new Ok(2);
    const error = new Err('Nothing here');

    expect( ok.err() ).toEqual( None.getInstance() );
    expect( error.err() ).toEqual( new Some('Nothing here') );
  });

  test('map', () => {
    const ok = new Ok(2);
    const error = new Err('Nothing here');

    expect( ok.map(x => x * x) ).toEqual( new Ok(4) );
    expect( error.map(x => x * x) ).toEqual( new Err('Nothing here') );
  });

  test('map_err', () => {
    const ok = new Ok(2);
    const error = new Err(13);

    expect( ok.map_err(x => x * x) ).toEqual( new Ok(2) );
    expect( error.map_err(x => x * x) ).toEqual( new Err(169) );
  });

  test('and', () => {
    const ok = new Ok(2);
    const okStr = new Ok('different result type');
    const err = new Err('some errors');
    const earlyErr = new Err('early error');
    const lateErr = new Err('late error');

    expect( ok.and(lateErr) ).toEqual( new Err('late error') );
    expect( earlyErr.and(ok) ).toEqual( new Err('early error') );
    expect( err.and(lateErr) ).toEqual( new Err('some errors') );
    expect( ok.and(okStr) ).toEqual( new Ok('different result type') );
  });

  test('and_then', () => {
    const ok = new Ok(2);
    const err = new Err(3);

    const sq = (x: number) => new Ok(x * x);
    const errFn = (x: number) => new Err(x);

    expect( ok.and_then(sq).and_then(sq) ).toEqual( new Ok(16) );
    expect( ok.and_then(sq).and_then(errFn) ).toEqual( new Err(4) );
    expect( ok.and_then(errFn).and_then(errFn) ).toEqual( new Err(2) );
    expect( err.and_then(sq).and_then(sq) ).toEqual( new Err(3) );
  });

  test('or', () => {
    const ok = new Ok(2);
    const ok100 = new Ok(100);
    const err = new Err('some errors');
    const earlyErr = new Err('early error');
    const lateErr = new Err('late error');

    expect( ok.or(lateErr) ).toEqual( new Ok(2) );
    expect( earlyErr.or(ok) ).toEqual( new Ok(2) );
    expect( err.or(lateErr) ).toEqual( new Err('late error') );
    expect( ok.or(ok100) ).toEqual( new Ok(2) );
  });

  test('or_else', () => {
    const ok = new Ok(2);
    const err = new Err(3);

    const sq = (x: number) => new Ok(x * x);
    const errFn = (x: number) => new Err(x);

    expect( ok.or_else(sq).or_else(sq) ).toEqual( new Ok(2) );
    expect( ok.or_else(errFn).or_else(sq) ).toEqual( new Ok(2) );
    expect( err.or_else(sq).or_else(errFn) ).toEqual( new Ok(9) );
    expect( err.or_else(errFn).or_else(errFn) ).toEqual( new Err(3) );
  });

  test('unwrap', () => {
    const ok = new Ok(2);
    const err = new Err('some errors');

    expect( ok.unwrap() ).toBe(2);
    expect( () => err.unwrap() ).toThrow();
  });

  test('unwrap_or', () => {
    const optb = 2;

    const ok = new Ok(2);
    const err = new Err('some errors');

    expect( ok.unwrap_or(optb) ).toBe(2);
    expect( err.unwrap_or(optb) ).toBe(optb);
  });

  test('unwrap_or_else', () => {
    const ok = new Ok(2);
    const err = new Err(3);

    const sq = (x: number) => x * x;

    expect( ok.unwrap_or_else(sq) ).toBe(2);
    expect( err.unwrap_or_else(sq) ).toBe(9);

  });

  test('unwrap_err', () => {
    const ok = new Ok(2);
    const err = new Err('some errors');

    expect( () => ok.unwrap_err() ).toThrow();
    expect( err.unwrap_err() ).toBe('some errors');
  });

  test('match', () => {
    const ok = new Ok(2);
    const err = new Err('some errors');

    const matchResultOk = ok.match({
      Ok: value => value - 1,
      Err: () => -1
    });

    const matchResultErr = err.match({
      Ok: value => value - 1,
      Err: () => -1
    });

    expect(matchResultOk).toBe(1);
    expect(matchResultErr).toBe(-1);
  });
});
