import {AbstractResult} from './AbstractResult';

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
