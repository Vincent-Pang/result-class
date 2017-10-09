import {Option} from './Option';
import {AbstractOption} from './AbstractOption';

export class None extends AbstractOption<any>
{
    private static noneInstance: Option<any>;

    public static newInstance<U>(): Option<U>
    {
        if (this.noneInstance)
        {
            return this.noneInstance;
        }

        this.noneInstance = new None();

        return this.noneInstance;
    }

    protected getValue(): never
    {
        throw new Error('called getValue on class None');
    }

    public is_some(): boolean
    {
        return false;
    }
}
