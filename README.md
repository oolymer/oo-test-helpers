# oo-test-helpers

A set of utility classes and best practices for [Polymer 2.x](https://github.com/Polymer/polymer) to make testing easier with [web-component-tester](https://github.com/Polymer/web-component-tester).

**Table of Contents:**

<!-- TOC depthFrom:2 -->

- [Questions and Answers](#questions-and-answers)
    - [:question: How to write a basic test for a custom element?](#question-how-to-write-a-basic-test-for-a-custom-element)
    - [:question: How to test custom elements reasonably?](#question-how-to-test-custom-elements-reasonably)
    - [:question: How run tests in a headless browser environment on a CI machine (continuous integration)?](#question-how-run-tests-in-a-headless-browser-environment-on-a-ci-machine-continuous-integration)
    - [:question: How run tests in a development environment on a local machine?](#question-how-run-tests-in-a-development-environment-on-a-local-machine)
    - [:question: How to setup and cleanup test fixtures (serialized objects from json files)?](#question-how-to-setup-and-cleanup-test-fixtures-serialized-objects-from-json-files)
    - [:question: How to setup and cleanup test fixtures (custom components)?](#question-how-to-setup-and-cleanup-test-fixtures-custom-components)
    - [:question: How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?](#question-how-to-pause-on-setup-or-on-cleanup-to-see-and-interact-with-test-fixtures-custom-components-manually)
    - [:question: How to simulate user interactions on test fixtures (custom components)?](#question-how-to-simulate-user-interactions-on-test-fixtures-custom-components)
    - [:question: How to use stub elements (custom components)?](#question-how-to-use-stub-elements-custom-components)

<!-- /TOC -->

## Questions and Answers

### :question: How to write a basic test for a custom element?

*To be done.*

- Uses Mocha's TDD-style interface (`suite`, `test`, `setup`, `suiteSetup`, `teardown`, `suiteTeardown`): https://mochajs.org/#tdd
- Uses Chai's BDD-style `expect` interface (`expect(foo).to.equal("bar")`): http://www.chaijs.com/guide/styles/#expect

### :question: How to test custom elements reasonably?

*To be done.*

### :question: How run tests in a headless browser environment on a CI machine (continuous integration)?

*To be done.*

> File: `package.json` (excerpt)
~~~json
"test:headless": "./node_modules/.bin/wct --local chrome --local firefox --configFile 'wct-headless.conf.json'",
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

References:
> Headless Chrome is shipping in Chrome 59 (June 5, 2017).
- https://developers.google.com/web/updates/2017/04/headless-chrome

> Headless Firefox works on Fx55+ (August 8, 2017) on Linux, and 56+ (September 28, 2017) on Windows/Mac.
- https://developer.mozilla.org/en-US/Firefox/Headless_mode

### :question: How run tests in a development environment on a local machine?

*To be done.*

> File: `package.json` (excerpt)
~~~json
"serve": "./node_modules/.bin/polymer serve --port 9000",
~~~

> File: `package.json` (excerpt)
~~~json
"test:polymer": "./node_modules/.bin/polymer test --local chrome --local firefox --persistent --skip-selenium-install",
~~~

> Browsersync works by injecting an asynchronous script tag (`<script async>...</script>`) right after the `<body>` tag during initial request. In order for this to work properly the `<body>` tag must be present.

- https://github.com/BrowserSync/browser-sync#requirements

### :question: How to setup and cleanup test fixtures (serialized objects from json files)?

*To be done.*

~~~js
window.fetch("./fixtures/properties-for-custom-element.json")
  .then(response => response.json())
  .then(json => console.log(json))
~~~

References:
- https://github.com/github/fetch

### :question: How to setup and cleanup test fixtures (custom components)?

You can define your test fixtures within a `<template>` using https://github.com/PolymerElements/test-fixture (which is included in `web-component-tester`).

`<test-fixture>` is used to prevent shared state, i.e. it will copy a clean, new instance of template content into each test suite (see: https://www.polymer-project.org/2.0/docs/tools/tests#test-fixtures).

### :question: How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?

*To be done.*

~~~js
function setupBlocked(block) {
  setup(function(done) {
    this.enableTimeouts(false)
    block(done)
  })
}

suite("button", () => {
  setupBlocked(() => {
    const button = fixture("button-fixture")
  })
})
~~~

~~~js
const tddMocha = Mocha.interfaces.tdd
Mocha.interfaces.tdd = function tdd(suite) {
  tddMocha(suite)
  suite.on("pre-require", (context, file, mocha) => {
    context.setup.blocked = function blocked(block) {
      context.setup(function(done) {
        this.enableTimeouts(false)
        block(done)
      })
    }
  })
}

suite("button", () => {
  setup.blocked(() => {
    const button = fixture("button-fixture")
  })
})
~~~

### :question: How to simulate user interactions on test fixtures (custom components)?

You can import `iron-test-helpers.html` from https://github.com/PolymerElements/iron-test-helpers and use the methods provides in `global.MockInteractions` within your test suites.

### :question: How to use stub elements (custom components)?

You can replace elements with stub elements to test them in isolation.

~~~js
setup(() => {
  replace("paper-button").with("fake-paper-button")
})
~~~

You can overwrite (replace) default implementions with custom methods.

~~~js
setup(() => {
  stub("paper-button", {
    click: () => {
      console.log("paper-button#click() called")
    }
  })
})
~~~

References:
- https://www.polymer-project.org/2.0/docs/tools/tests#create-stub-elements
- https://www.polymer-project.org/2.0/docs/tools/tests#create-stub-methods
