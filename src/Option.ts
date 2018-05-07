import { Err, Ok, Result } from './Result';

export interface OptionMatchPattern<T, U, V> {
  Some: (some: T) => U;
  None: () => V;
}

export interface Option<T> {
  is_some(): this is Some<T>;

  is_none(): this is None;

  unwrap(): T;

  unwrap_or(def: T): T;

  unwrap_or_else(f: () => T): T;

  unwrap_or_null(): T | null;

  unwrap_or_undefined(): T | undefined;

  map<U>(f: (input: T) => U): Option<U>;

  map_or<U>(def: U, f: (input: T) => U): U;

  map_or_else<U>(def: () => U, f: (input: T) => U): U;

  ok_or<E>(err: E): Result<T, E>;

  ok_or_else<E>(err: () => E): Result<T, E>;

  and<U>(optb: Option<U>): Option<U>;

  and_then<U>(f: (input: T) => Option<U>): Option<U>;

  or(optb: Option<T>): Option<T>;

  or_else(f: () => Option<T>): Option<T>;

  match<U, V>(pattern: OptionMatchPattern<T, U, V>): U | V;
}

export abstract class AbstractOption<T> implements Option<T> {
  protected abstract getValue(): T;

  public abstract is_some(): boolean;

  public is_none(): boolean {
    return !this.is_some();
  }

  public unwrap(): T {
    if (this.is_some()) {
      return this.getValue();
    }
    else {
      throw Error('called `Option::unwrap()` on a `None` value');
    }
  }

  public unwrap_or(def: T): T {
    return this.is_some() ? this.getValue() : def;
  }

  public unwrap_or_else(f: () => T): T {
    return this.is_some() ? this.getValue() : f();
  }

  public unwrap_or_null(): T | null {
    return this.is_some() ? this.getValue() : null;
  }

  public unwrap_or_undefined(): T | undefined {
    return this.is_some() ? this.getValue() : undefined;
  }

  public map<U>(f: (input: T) => U): Option<U> {
    return this.is_some() ? new Some( f(this.getValue()) ) : None.getInstance();
  }

  public map_or<U>(def: U, f: (input: T) => U): U {
    return this.is_some() ? f( this.getValue() ) : def;
  }

  public map_or_else<U>(def: () => U, f: (input: T) => U): U {
    return this.is_some() ? f( this.getValue() ) : def();
  }

  public ok_or<E>(err: E): Result<T, E> {
    return this.is_some() ? new Ok( this.getValue() ) : new Err(err);
  }

  public ok_or_else<E>(err: () => E): Result<T, E> {
    return this.is_some() ? new Ok( this.getValue() ) : new Err( err() );
  }

  public and<U>(optb: Option<U>): Option<U> {
    return this.is_some() ? optb : None.getInstance();
  }

  public and_then<U>(f: (input: T) => Option<U>): Option<U> {
    return this.is_some() ? f( this.getValue() ) : None.getInstance();
  }

  public or(optb: Option<T>): Option<T> {
    return this.is_some() ? this : optb;
  }

  public or_else(f: () => Option<T>): Option<T> {
    return this.is_some() ? this : f();
  }

  public match<U, V>(pattern: OptionMatchPattern<T, U, V>): U | V {
    return this.is_some() ? pattern.Some( this.getValue() ) : pattern.None();
  }
}

export class Some<T> extends AbstractOption<T> {
  public constructor(private value: T) {
    super();
  }

  protected getValue(): T {
    return this.value;
  }

  public is_some(): boolean {
    return true;
  }
}

export class None extends AbstractOption<any> {
  protected static instance: Option<any>;

  public static getInstance<U>(): Option<U> {
    if (!this.instance) {
      this.instance = new None();
    }

    return this.instance;
  }

  protected constructor() {
    super();
  }

  protected getValue(): never {
    throw new Error('called getValue on class None');
  }

  public is_some(): boolean {
    return false;
  }
}
