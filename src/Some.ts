import {AbstractOption} from './AbstractOption';

export class Some<T> extends AbstractOption<T>
{
    public constructor(private value: T)
    {
        super();
    }

    protected getValue(): T
    {
        return this.value;
    }

    public is_some(): boolean
    {
        return true;
    }
}
