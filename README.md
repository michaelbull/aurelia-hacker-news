<p align="center">
  <a href="#readme">
    <img 
      src="https://raw.githubusercontent.com/michaelbull/aurelia-hacker-news/master/assets/logo.svg?sanitize=true"
      alt="Aurelia Hacker News"
      width="400"
      height="200" 
    />
  </a>
</p>
<p align="center">
  A recreation of the <a href="https://news.ycombinator.com/news" rel="nofollow">Hacker News</a> website written in 
  <a href="https://www.typescriptlang.org/" rel="nofollow">TypeScript</a> and built with
  <a href="https://aurelia.io/" rel="nofollow">Aurelia</a>.
</p>
<p align="center">
  <a href="https://michaelbull.github.io/aurelia-hacker-news" rel="nofollow">Demo</a>
</p>
<p align="center">
  <a href="https://david-dm.org/michaelbull/aurelia-hacker-news" title="dependencies status" rel="nofollow"><img src="https://david-dm.org/michaelbull/aurelia-hacker-news/status.svg?style=flat-square"/></a> <a href="https://david-dm.org/michaelbull/aurelia-hacker-news?type=dev" title="devDependencies status" rel="nofollow"><img src="https://david-dm.org/michaelbull/aurelia-hacker-news/dev-status.svg?style=flat-square"/></a>
</p>
<p align="center">
  <a href="https://michaelbull.github.io/aurelia-hacker-news">
    <img
      src="https://raw.githubusercontent.com/michaelbull/aurelia-hacker-news/master/assets/preview.png"
      alt="Preview"
      width="888"
      height="600"
    />
  </a>
</p>
<br />
<br />


## Features

- News list with filters for the
  [top][topstories]/[newest][newstories]/[best][beststories] stories.
- Topic view with collapsible comment threads.
- Responsive design for tablet and mobile platforms.
- User profile pages.
- Improved pagination.

## Components

- [Webpack][webpack] as the build system.
- [Aurelia][aurelia] as the client framework.
- [TypeScript][ts] as the primary programming language.
- [Sassy CSS][scss] as the stylesheet language, following the [7-1 pattern][7-1]
  and the [“Block Element Modifier” methodology][bem].
- [Firebase][firebase] as a data store for the [Hacker News API][hn-api].

## Building

The following scripts are configured to run via [npm][npm]:

- `npm start`
  - Runs the [webpack-dev-server][dev-server] at
    [`http://localhost:8080`][localhost]
- `npm run build`
  - Builds the production distribution and places it under the `./dist`
    directory.
- `npm run clean`
  - Cleans the `./dist` directory.

## Contributing

Bug reports and pull requests are welcome on [GitHub][github].

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`](LICENSE) file for the copyright information and licensing terms.

[topstories]: https://michaelbull.github.io/aurelia-hacker-news/#/news
[newstories]: https://michaelbull.github.io/aurelia-hacker-news/#/newest
[beststories]: https://michaelbull.github.io/aurelia-hacker-news/#/best
[webpack]: https://webpack.github.io/
[aurelia]: https://aurelia.io/
[ts]: https://www.typescriptlang.org/
[scss]: http://sass-lang.com/
[7-1]: https://sass-guidelin.es/#the-7-1-pattern
[bem]: http://getbem.com/
[firebase]: https://www.npmjs.com/package/firebase
[hn-api]: https://github.com/HackerNews/API
[npm]: https://www.npmjs.com/
[dev-server]: https://github.com/webpack/webpack-dev-server
[localhost]: http://localhost:8080
[github]: https://github.com/michaelbull/aurelia-hacker-news
