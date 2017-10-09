import {Result} from './Result';

export interface Option<T>
{
    is_some(): boolean;
    is_none(): boolean;

    // isSomeAnd(fn: (a: T) => boolean): boolean;
    // isNoneAnd(fn: () => boolean): boolean;

    unwrap(): T;
    unwrap_or(def: T): T;
    unwrap_or_else(f: () => T): T;

    map<U>(f: (input: T) => U): Option<U>;
    map_or<U>(def: U, f: (input: T) => U): U;
    map_or_else<U>(def: () => U, f: (input: T) => U): U;

    ok_or<E>(err: E): Result<T, E>;
    ok_or_else<E>(err: () => E): Result<T, E>;

    and<U>(optb: Option<U>): Option<U>;
    and_then<U>(f: (input: T) => Option<U>): Option<U>;

    or(optb: Option<T>): Option<T>;
    or_else(f: () => Option<T>): Option<T>;
}
