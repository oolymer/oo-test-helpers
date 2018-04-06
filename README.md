# oo-test-helpers

A set of utility classes and best practices for [Polymer 2.x](https://github.com/Polymer/polymer) to make testing easier with [web-component-tester](https://github.com/Polymer/web-component-tester).

**Table of Contents:**

<!-- TOC depthFrom:2 -->

- [Questions and Answers](#questions-and-answers)
    - [How to write a basic test for a custom element?](#how-to-write-a-basic-test-for-a-custom-element)
    - [How to test custom elements reasonably?](#how-to-test-custom-elements-reasonably)
    - [How run tests in a headless browser environment on a CI machine (continuous integration)?](#how-run-tests-in-a-headless-browser-environment-on-a-ci-machine-continuous-integration)
    - [How run tests in a development environment on a local machine?](#how-run-tests-in-a-development-environment-on-a-local-machine)
    - [How to setup and cleanup test fixtures (serialized objects from json files)?](#how-to-setup-and-cleanup-test-fixtures-serialized-objects-from-json-files)
    - [How to setup and cleanup test fixtures (custom components)?](#how-to-setup-and-cleanup-test-fixtures-custom-components)
    - [How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?](#how-to-pause-on-setup-or-on-cleanup-to-see-and-interact-with-test-fixtures-custom-components-manually)
    - [How to simulate user interactions on test fixtures (custom components)?](#how-to-simulate-user-interactions-on-test-fixtures-custom-components)

<!-- /TOC -->

## Questions and Answers

### How to write a basic test for a custom element?

*To be done.*

### How to test custom elements reasonably?

*To be done.*

### How run tests in a headless browser environment on a CI machine (continuous integration)?

*To be done.*

> Headless Chrome is shipping in Chrome 59 (2017-06-05).
- https://developers.google.com/web/updates/2017/04/headless-chrome

> File: `package.json` (excerpt)
~~~json
"test:polymer:headless": "./node_modules/.bin/wct --local chrome --local firefox --configFile 'wct-headless.conf.json'",
~~~

> File: `wct-headless.conf.json`
~~~json
{
  "suites": [
    "test/index.html"
  ],
  "environmentImports": [
    "test-fixture/test-fixture.html"
  ],
  "plugins": {
    "local": {
      "browserOptions": {
        "chrome": [
          "window-size=1920,1080",
          "headless",
          "disable-gpu",
          "no-sandbox"
        ],
        "firefox": [
          "-headless"
        ]
      }
    }
  }
}
~~~

### How run tests in a development environment on a local machine?

*To be done.*

> File: `package.json` (excerpt)
~~~json
"serve": "./node_modules/.bin/polymer serve --port 9000",
~~~

> File: `package.json` (excerpt)
~~~json
"test:polymer": "./node_modules/.bin/polymer test --local chrome --local firefox --persistent --skip-selenium-install",
~~~

### How to setup and cleanup test fixtures (serialized objects from json files)?

*To be done.*

~~~js
window.fetch("./fixtures/properties-for-custom-element.json")
  .then(response => response.json())
  .then(json => console.log(json))
~~~

- https://github.com/github/fetch

### How to setup and cleanup test fixtures (custom components)?

You can define your test fixtures within a `<template>` using https://github.com/PolymerElements/test-fixture (which is included in `web-component-tester`).

### How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?

*To be done.*

### How to simulate user interactions on test fixtures (custom components)?

You can import `iron-test-helpers.html` from https://github.com/PolymerElements/iron-test-helpers and use the methods provides in `global.MockInteractions` within your test suites.
