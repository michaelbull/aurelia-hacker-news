# Aurelia Hacker News Clone

<p align="center">
  <a href="#readme">
    <img src="./assets/preview.png" />
  </a>
</p>

A recreation of the [Hacker News][hn] website written in [TypeScript][ts] and
[Aurelia][aurelia], with [webpack][webpack] as a module bundler.

## Demo

A running demonstration can be found [here][demo].

## Features

- News list with filters for the
  [top][topstories]/[newest][newstories]/[best][beststories] stories.
- Topic view with collapsible comments.
- Responsive design for tablet and mobile platforms.
- User profile pages.
- Improved pagination.

## Components

- [Webpack][webpack] as the build system.
- [Aurelia][aurelia] as the client framework.
- [TypeScript][ts] as the primary programming language.
- [Sassy CSS][scss] as the stylesheet language, following the [7-1 pattern][7-1]
  the ["Block Element Modifier" methodology][bem].
- [Firebase][firebase] as a data store for the [Hacker News API][hn-api].

## Documentation

Documentation is generated in the `./dist/docs` directory by [TypeDoc][typedoc]
and can be viewed online [here][docs].

## Building

The following scripts are configured to run via [npm][npm]:

- `npm start` or `npm run server:dev`
  - Runs the [webpack-dev-server][dev-server] at
    [`http://localhost:8080`][localhost]
- `npm run build`
  - Builds the production distribution and places it under the `./dist`
    directory.
- `npm run server:prod`
  - Starts a local-web-server listening on [`http://localhost:8080`][localhost]
    that serves the `./dist` directory.
- `npm test`
  - Runs the unit tests then generates success and coverage reports under the
    `./reports` directory.
- `npm run docs`
  - Generates source code documentation under the `./dist/docs` directory using
    [TypeDoc][typedoc].
- `npm run clean`
  - Cleans the `./dist` and `./reports` directories.

## Testing

Unit tests are written using the [Jasmine][jasmine] framework and ran with the
[Karma][karma] test runner.

## Contributing

Bug reports and pull requests are welcome on [GitHub][github].

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`][license] file for the copyright information and licensing terms.

[hn]: https://news.ycombinator.com/news
[ts]: https://www.typescriptlang.org/
[aurelia]: http://aurelia.io/
[webpack]: https://webpack.github.io/
[demo]: https://mikebull94.github.io/aurelia-hacker-news
[topstories]: https://mikebull94.github.io/aurelia-hacker-news/#/news
[beststories]: https://mikebull94.github.io/aurelia-hacker-news/#/best
[newstories]: https://mikebull94.github.io/aurelia-hacker-news/#/newest
[scss]: http://sass-lang.com/
[7-1]: https://sass-guidelin.es/#the-7-1-pattern
[bem]: http://getbem.com/
[firebase]: https://www.npmjs.com/package/firebase
[hn-api]: https://github.com/HackerNews/API
[typedoc]: https://github.com/TypeStrong/typedoc
[docs]: https://mikebull94.github.io/aurelia-hacker-news/dist/docs/
[npm]: https://www.npmjs.com/
[localhost]: http://localhost:8080
[dev-server]: https://github.com/webpack/webpack-dev-server
[jasmine]: https://jasmine.github.io/
[karma]: https://karma-runner.github.io/
[github]: https://github.com/MikeBull94/aurelia-hacker-news
[license]: https://github.com/MikeBull94/aurelia-hacker-news/blob/master/LICENSE
