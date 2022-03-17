# json-with-padding

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/json-with-padding/CI/main?style=flat-square
[github_actions_link]: https://github.com/fisker/json-with-padding/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/json-with-padding/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/json-with-padding?branch=main
[license_badge]: https://img.shields.io/npm/l/json-with-padding.svg?style=flat-square
[license_link]: https://github.com/fisker/json-with-padding/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/json-with-padding.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/json-with-padding

> Send JSONP (JSON with Padding) request.

## Install

```bash
yarn add json-with-padding
```

## Usage

```html
<script type="importmap">
  {
    "imports": {
      "browser-load-script": "https://unpkg.com/browser-load-script",
      "json-with-padding": "https://unpkg.com/json-with-padding"
    }
  }
</script>
<script type="module">
  import requestJsonp from 'json-with-padding'

  const {ip: myIpAddress} = await requestJsonp(
    'https://api64.ipify.org?format=jsonp',
  )
  console.log(`My IP address: ${myIpAddress}`)
  // -> My IP address: ...
</script>
```

## API

### `requestJsonp(url, options?)`

[TBD]
