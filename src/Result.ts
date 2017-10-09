import {Option} from './Option';

export interface Result<T, E>
{
    is_ok(): boolean;
    is_err(): boolean;

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
}
