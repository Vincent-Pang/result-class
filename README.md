# result-class

Port the Result and Option classes from Rust to Typescript.

## Installation

```
yarn add result-class
```

## API
Please refer to the rust document  
https://doc.rust-lang.org/std/result/enum.Result.html  
https://doc.rust-lang.org/std/option/enum.Option.html

## Usage

### `Option<T>`, `Some<T>`, `None`
```
function getUserName(userId: number): Option<string>
{
    return 1 === userId ? new Some('Vincent') : None.getInstance();
}

getUserName(1).match({
    Some: v => console.log(`User found = ${v}`),
    None: () => console.log('User cannot be found')
});

or

const name = getUserName(1).match({
    Some: v => v,
    None: () => 'Guest'
});

console.log(name);  // Vincent
```

### `Result<T, E>`, `Ok<T>`, `Err<E>`
```
function division(dividend: number, divisor: number): Result<number, string>
{
    if (divisor === 0)
    {
        return new Err('Division by zero');
    }
    else
    {
        return new Ok(dividend / divisor);
    }
}

division(dividend, divisor).match({
    Ok: v => console.log(`Answer = ${v}`),
    Err: e => console.log(`Error = ${e}`)
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
