import { None, Option, Some } from './Option';

export interface ResultMatchPattern<T, U, E, V> {
  Ok: (value: T) => U;
  Err: (error: E) => V;
}

export interface Result<T, E> {
  is_ok(): this is Ok<T>;

  is_err(): this is Err<E>;

  ok(): Option<T>;

  err(): Option<E>;

  map<U>(op: (input: T) => U): Result<U, E>;

  map_err<F>(op: (input: E) => F): Result<T, F>;

  and<U>(res: Result<U, E>): Result<U, E>;

  and_then<U>(op: (input: T) => Result<U, E>): Result<U, E>;

  or<F>(res: Result<T, F>): Result<T, F>;

  or_else<F>(op: (input: E) => Result<T, F>): Result<T, F>;

  unwrap(): T;

  unwrap_or(optb: T): T;

  unwrap_or_else(op: (input: E) => T): T;

  unwrap_err(): E;

  match<U, V>(pattern: ResultMatchPattern<T, U, E, V>): U | V;
}

export abstract class AbstractResult<T, E> implements Result<T, E> {
  protected abstract getValue(): T;

  protected abstract getError(): E;

  public abstract is_ok(): boolean;

  public is_err(): boolean {
    return !this.is_ok();
  }

  public ok(): Option<T> {
    return this.is_ok() ? new Some<T>( this.getValue() ) : None.getInstance();
  }

  public err(): Option<E> {
    return this.is_err() ? new Some<E>( this.getError() ) : None.getInstance();
  }

  public map<U>(op: (input: T) => U): Result<U, E> {
    return this.is_ok() ? new Ok<U>( op(this.getValue()) ) : new Err<E>( this.getError() );
  }

  public map_err<F>(op: (input: E) => F): Result<T, F> {
    return this.is_ok() ? new Ok<T>( this.getValue() ) : new Err<F>( op(this.getError()) );
  }

  public and<U>(res: Result<U, E>): Result<U, E> {
    return this.is_ok() ? res : new Err<E>( this.getError() );
  }

  public and_then<U>(op: (input: T) => Result<U, E>): Result<U, E> {
    return this.is_ok() ? op( this.getValue() ) : new Err<E>( this.getError() );
  }

  public or<F>(res: Result<T, F>): Result<T, F> {
    return this.is_ok() ? new Ok( this.getValue() ) : res;
  }

  public or_else<F>(op: (input: E) => Result<T, F>): Result<T, F> {
    return this.is_ok() ? new Ok( this.getValue() ) : op( this.getError() );
  }

  public unwrap(): T {
    if ( this.is_ok() ) {
      return this.getValue();
    }
    else {
      throw new Error('called `Result::unwrap()` on an `Err` value');
    }
  }

  public unwrap_or(optb: T): T {
    return this.is_ok() ? this.getValue() : optb;
  }

  public unwrap_or_else(op: (input: E) => T): T {
    return this.is_ok() ? this.getValue() : op( this.getError() );
  }

  public unwrap_err(): E {
    if ( this.is_ok() ) {
      throw new Error('called `Result::unwrap_err()` on an `Ok` value');
    }
    else {
      return this.getError();
    }
  }

  public match<U, V>(pattern: ResultMatchPattern<T, U, E, V>): U | V {
    return this.is_ok() ? pattern.Ok( this.getValue() ) : pattern.Err( this.getError() );
  }
}

export class Ok<T> extends AbstractResult<T, any> {
  public constructor(private value: T) {
    super();
  }

  protected getValue(): T {
    return this.value;
  }

  protected getError(): never {
    throw new Error('called getError on class Ok');
  }

  public is_ok(): boolean {
    return true;
  }
}

export class Err<E> extends AbstractResult<any, E> {
  public constructor(private error: E) {
    super();
  }

  protected getValue(): never {
    throw new Error('called getValue on class Err');
  }

  protected getError(): E {
    return this.error;
  }

  public is_ok(): boolean {
    return false;
  }
}
