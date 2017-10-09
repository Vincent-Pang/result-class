import {Result} from './Result';
import {Option} from './Option';
import {Some} from './Some';
import {None} from './None';
import {Ok} from './Ok';
import {Err} from './Err';

export abstract class AbstractResult<T, E> implements Result<T, E>
{
    protected abstract getValue(): T;
    // protected abstract setValue(): T;

    protected abstract getError(): E;
    // protected abstract setError(): E;

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

        return None.newInstance();
    }

    public err(): Option<E>
    {
        if ( this.is_err() )
        {
            return new Some<E>( this.getError() );
        }

        return None.newInstance();
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
