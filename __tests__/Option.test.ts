import {None, Some} from '../src/Option';
import {Err, Ok} from '../src/Result';

describe('Test Option.ts', () => {
    test('getValue', () =>
    {
       class SomeTest extends Some<number>
       {
           public constructor()
           {
               super(3);
           }

           public getValue(): number
           {
               return super.getValue();
           }
       }

       class NoneTest extends None
       {
           public constructor()
           {
               super();
           }

           public getValue(): never
           {
               return super.getValue();
           }
       }

       const someTest = new SomeTest();
       const noneTest = new NoneTest();

       expect( someTest.getValue() ).toBe(3);
       expect( () => noneTest.getValue() ).toThrow();
    });

    test('is_some', () =>
    {
        const some = new Some(2);
        const none = None.getInstance();

        expect( some.is_some() ).toBe(true);
        expect( none.is_some() ).toBe(false);
    });

    test('is_none', () =>
    {
        const some = new Some(2);
        const none = None.getInstance();

        expect( some.is_none() ).toBe(false);
        expect( none.is_none() ).toBe(true);
    });

    test('unwrap', () =>
    {
        const some = new Some(2);
        const none = None.getInstance();

        expect( some.unwrap() ).toBe(2);
        expect( () => none.unwrap() ).toThrow();
    });

    test('unwrap_or', () =>
    {
        const some = new Some('car');
        const none = None.getInstance();

        expect( some.unwrap_or('bike') ).toBe('car');
        expect( none.unwrap_or('bike') ).toBe('bike');
    });

    test('unwrap_or_else', () =>
    {
        const some = new Some(2);
        const none = None.getInstance();

        const fn = () => 10;

        expect( some.unwrap_or_else(fn) ).toBe(2);
        expect( none.unwrap_or_else(fn) ).toBe(10);
    });

    test('map', () =>
    {
        const some = new Some('Hello, World!');
        const none = None.getInstance();

        expect( some.map(x => x.length) ).toEqual( new Some(13) );
        expect( none.map( x => x.toString() ) ).toEqual( None.getInstance() );
    });

    test('map_or', () =>
    {
        const some = new Some('Hello, World!');
        const none = None.getInstance();

        expect( some.map_or(42, x => x.length) ).toBe(13);
        expect( none.map_or(42, x => x.valueOf()) ).toBe(42);
    });

    test('map_or_else', () =>
    {
        const some = new Some('Hello, World!');
        const none = None.getInstance();

        const fn = () => 42;

        expect( some.map_or_else(fn, x => x.length) ).toBe(13);
        expect( none.map_or_else(fn, x => x.valueOf()) ).toBe(42);

    });

    test('ok_or', () =>
    {
        const some = new Some('foo');
        const none = None.getInstance();

        expect( some.ok_or(0) ).toEqual( new Some('foo') );
        expect( none.ok_or(0) ).toEqual( new Err(0) );
    });

    test('ok_or_else', () =>
    {
        const some = new Some('foo');
        const none = None.getInstance();

        const fn = () => 0;

        expect( some.ok_or_else(fn) ).toEqual( new Ok('foo') );
        expect( none.ok_or_else(fn) ).toEqual( new Err(0) );
    });

    test('and', () =>
    {
        const some = new Some(2);
        const someFoo = new Some('foo');
        const none = None.getInstance();

        expect( some.and(none) ).toEqual( None.getInstance() );
        expect( none.and(someFoo) ).toEqual( None.getInstance() );
        expect( some.and(someFoo) ).toEqual( new Some('foo') );
    });

    test('and_then', () =>
    {
        const some = new Some(2);
        const none = None.getInstance();

        const sq = (x: number) => new Some(x * x);
        const nope = (x: number) => None.getInstance();

        expect( some.and_then(sq).and_then(sq) ).toEqual( new Some(16) );
        expect( some.and_then(sq).and_then(nope) ).toEqual( None.getInstance() );
        expect( some.and_then(nope).and_then(sq) ).toEqual( None.getInstance() );
        expect( none.and_then(sq).and_then(sq) ).toEqual( None.getInstance() );
    });

    test('or', () =>
    {
        const some = new Some(2);
        const some100 = new Some(100);
        const none = None.getInstance();

        // expect( some.or(none) ).toEqual( new Some(2) );
        expect( none.or(some) ).toEqual( new Some(2) );
        expect( some.or(some100) ).toEqual( new Some(2) );
    });

    test('or_else', () =>
    {
        const nobody = () => None.getInstance();
        const vikings = () => new Some('vikings');

        const barbarians = new Some('barbarians');
        const none = None.getInstance();

        expect( barbarians.or_else(vikings) ).toEqual( new Some('barbarians') );
        expect( none.or_else(vikings) ).toEqual( new Some('vikings') );
        expect( none.or_else(nobody) ).toEqual( None.getInstance() );
    });
});
