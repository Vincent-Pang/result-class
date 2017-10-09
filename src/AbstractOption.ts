import {Option} from './Option';
import {Some} from './Some';
import {None} from './None';
import {Result} from './Result';
import {Ok} from './Ok';
import {Err} from './Err';

export abstract class AbstractOption<T> implements Option<T>
{
    protected abstract getValue(): T;

    public abstract is_some(): boolean;

    public is_none(): boolean
    {
        return !this.is_some();
    }

    public unwrap(): T
    {
        if ( this.is_some() )
        {
            return this.getValue();
        }
        else
        {
            throw Error('called `Option::unwrap()` on a `None` value');
        }
    }

    public unwrap_or(def: T): T
    {
        if ( this.is_some() )
        {
            return this.getValue();
        }
        else
        {
            return def;
        }
    }

    public unwrap_or_else(f: () => T): T
    {
        if ( this.is_some() )
        {
            return this.getValue();
        }
        else
        {
            return f();
        }
    }

    public map<U>(f: (input: T) => U): Option<U>
    {
        if ( this.is_some() )
        {
            return new Some( f( this.getValue() ) );
        }
        else
        {
            return None.newInstance();
        }
    }

    public map_or<U>(def: U, f: (input: T) => U): U
    {
        if ( this.is_some() )
        {
            return f( this.getValue() );
        }
        else
        {
            return def;
        }
    }

    public map_or_else<U>(def: () => U, f: (input: T) => U): U
    {
        if ( this.is_some() )
        {
            return f( this.getValue() );
        }
        else
        {
            return def();
        }
    }

    public ok_or<E>(err: E): Result<T, E>
    {
        if ( this.is_some() )
        {
            return new Ok( this.getValue() );
        }
        else
        {
            return new Err(err);
        }
    }

    public ok_or_else<E>(err: () => E): Result<T, E>
    {
        if ( this.is_some() )
        {
            return new Ok( this.getValue() );
        }
        else
        {
            return new Err( err() );
        }
    }

    public and<U>(optb: Option<U>): Option<U>
    {
        if ( this.is_some() )
        {
            return optb;
        }
        else
        {
            return None.newInstance();
        }
    }

    public and_then<U>(f: (input: T) => Option<U>): Option<U>
    {
        if ( this.is_some() )
        {
            return f( this.getValue() );
        }
        else
        {
            return None.newInstance();
        }
    }

    public or(optb: Option<T>): Option<T>
    {
        if ( this.is_some() )
        {
            return this;
        }
        else
        {
            return optb;
        }
    }

    public or_else(f: () => Option<T>): Option<T>
    {
        if ( this.is_some() )
        {
            return this;
        }
        else
        {
            return f();
        }
    }
}
