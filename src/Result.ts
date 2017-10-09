import {None, Option, Some} from './Option';

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

export abstract class AbstractResult<T, E> implements Result<T, E>
{
    protected abstract getValue(): T;
    protected abstract getError(): E;

    public abstract is_ok(): boolean;

    public is_err(): boolean
    {
        return !this.is_ok();
    }

    public ok(): Option<T>
    {
        if ( this.is_ok() )
        {
            return new Some<T>( this.getValue() );
        }

        return None.getInstance();
    }

    public err(): Option<E>
    {
        if ( this.is_err() )
        {
            return new Some<E>( this.getError() );
        }

        return None.getInstance();
    }

    public map<U>(op: (input: T) => U): Result<U, E>
    {
        if ( this.is_ok() )
        {
            return new Ok<U>( op(this.getValue()) );
        }
        else
        {
            return new Err<E>( this.getError() );
        }
    }

    public map_err<F>(op: (input: E) => F): Result<T, F>
    {
        if ( this.is_ok() )
        {
            return new Ok<T>( this.getValue() );
        }
        else
        {
            return new Err<F>( op(this.getError()) );
        }
    }

    public and<U>(res: Result<U, E>): Result<U, E>
    {
        if ( this.is_ok() )
        {
            return res;
        }
        else
        {
            return new Err<E>( this.getError() );
        }
    }

    public and_then<U>(op: (input: T) => Result<U, E>): Result<U, E>
    {
        if ( this.is_ok() )
        {
            return op( this.getValue() );
        }
        else
        {
            return new Err<E>( this.getError() );
        }
    }

    public or<F>(res: Result<T, F>): Result<T, F>
    {
        if ( this.is_ok() )
        {
            return new Ok( this.getValue() );
        }
        else
        {
            return res;
        }
    }

    public or_else<F>(op: (input: E) => Result<T, F>): Result<T, F>
    {
        if ( this.is_ok() )
        {
            return new Ok( this.getValue() );
        }
        else
        {
            return op( this.getError() );
        }
    }

    public unwrap(): T
    {
        if ( this.is_ok() )
        {
            return this.getValue();
        }
        else
        {
            throw new Error('called `Result::unwrap()` on an `Err` value');
        }
    }

    public unwrap_or(optb: T): T
    {
        if ( this.is_ok() )
        {
            return this.getValue();
        }
        else
        {
            return optb;
        }
    }

    public unwrap_or_else(op: (input: E) => T): T
    {
        if ( this.is_ok() )
        {
            return this.getValue();
        }
        else
        {
            return op( this.getError() );
        }
    }

    public unwrap_err(): E
    {
        if ( this.is_ok() )
        {
            throw new Error('called `Result::unwrap_err()` on an `Ok` value');
        }
        else
        {
            return this.getError();
        }
    }
}

export class Ok<T> extends AbstractResult<T, any>
{
    public constructor(private value: T)
    {
        super();
    }

    protected getValue(): T
    {
        return this.value;
    }

    protected getError(): never
    {
        throw new Error('called getError on class Ok');
    }

    public is_ok(): boolean
    {
        return true;
    }
}

export class Err<E> extends AbstractResult<any, E>
{
    public constructor(private error: E)
    {
        super();
    }

    protected getValue(): never
    {
        throw new Error('called getValue on class Err');
    }

    protected getError(): E
    {
        return this.error;
    }

    public is_ok(): boolean
    {
        return false;
    }
}
