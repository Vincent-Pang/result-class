import {AbstractResult} from './AbstractResult';

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

// export class Ok<T> implements Result<T, any>
// {
//     public constructor(private value: T)
//     {
//     }
//
//     public is_ok(): boolean
//     {
//         return true;
//     }
//
//     public is_err(): boolean
//     {
//         return false;
//     }
//
//     public ok(): Option<T>
//     {
//         return new Some<T>(this.value);
//     }
//
//     public err(): Option<any>
//     {
//         return None.newInstance();
//     }
//
//     public map<U>(op: (input: T) => U): Ok<U>
//     {
//         return new Ok<U>( op(this.value) );
//     }
//
//     public map_err<F>(op: (input: any) => F): Result<T, F>
//     {
//         return this;
//     }
//
//     public and<U>(res: Result<U, any>): Result<U, any>
//     {
//         return res;
//     }
//
//     public and_then<U>(op: (input: T) => Result<U, any>): Result<U, any>
//     {
//         return op(this.value);
//     }
//
//     public or<F>(res: Result<T, F>): Result<T, F>
//     {
//         return this;
//     }
//
//     public or_else<F>(op: (input: any) => Result<T, F>): Result<T, F>
//     {
//         return this;
//     }
//
//     public unwrap(): T
//     {
//         return this.value;
//     }
//
//     public unwrap_or(optb: T): T
//     {
//         return this.value;
//     }
//
//     public unwrap_or_else(op: (input: never) => T): T
//     {
//         return this.value;
//     }
//
//     public unwrap_err(): never
//     {
//         throw new Error('cannot call unwrap_err on class Ok');
//     }
// }
