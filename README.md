# result-class

Port the Result and Option classes from Rust to Typescript.

## Installation

```
yarn add result-class
```

## Usage

```
function getUserName(userId: number): Option<string>
{
    return 1 === userId ? new Some('Vincent') : None.getInstance();
}

const userName1 = getUserName(1);
console.log( userName1.unwrap_or('Cannot found') );  // Vincent

const userName100 = getUserName(100);
console.log( userName100.unwrap_or('Cannot found') );  // Cannot found
```

```
function getPid(processName: string): Result<number, string>
{
    return 'zsh' === processName ? new Ok(123) : new Err('Process not found');
}

const pidZsh = getPid('zsh')
                    .map(pid => 'Pid = ' + pid)
                    .unwrap_or('Pid Not Found');

console.log(pidZsh);    // Pid = 123

const pidBash = getPid('bash')
                    .map(pid => 'Pid = ' + pid)
                    .unwrap_or('Pid Not Found');

console.log(pidBash);   // 'Pid Not Found'
```

More usage can be found in rust document  
https://doc.rust-lang.org/std/result/enum.Result.html  
https://doc.rust-lang.org/std/option/enum.Option.html

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
