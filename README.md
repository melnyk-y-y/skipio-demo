## Welcome to the Skipio Demo Application
It was build by [me](https://github.com/melnyk-y-y), using [react-boilerplate project](https://github.com/react-boilerplate/react-boilerplate) as a boilerplate, which contains 'hello world' React+Redux+Jest+Webpack application 

## Quick start

1. Clone this repo using `git clone https://github.com/melnyk-y-y/skipio-demo.git`
2. Run `npm install` to install dependencies.<br />
3. Run `npm start` to see the example app at `http://localhost:3000`.

## Important Note

Currently Skipio stage API does not return 'Access-Control-Allow-Origin' header,
in order to demonstrate application we should temporarily add it to API responces,
for exaple, this is how should contacts list response must look:

Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, vnd.skipio.token

## License

MIT license, Copyright (c) 2018.
