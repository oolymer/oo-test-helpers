# oo-test-helpers

A set of utility classes and best practices for [Polymer 2.x](https://github.com/Polymer/polymer) to make testing easier with [web-component-tester](https://github.com/Polymer/web-component-tester).

**Table of Contents:**

<!-- TOC depthFrom:2 -->

- [Questions and Answers](#questions-and-answers)
    - [How run tests in a headless browser environment on a CI machine (continuous integration)?](#how-run-tests-in-a-headless-browser-environment-on-a-ci-machine-continuous-integration)
    - [How run tests in a development environment on a local machine?](#how-run-tests-in-a-development-environment-on-a-local-machine)
    - [How to test custom elements reasonably?](#how-to-test-custom-elements-reasonably)
    - [How to setup and cleanup test fixtures (js objects from json files)?](#how-to-setup-and-cleanup-test-fixtures-js-objects-from-json-files)
    - [How to setup and cleanup test fixtures (custom components)?](#how-to-setup-and-cleanup-test-fixtures-custom-components)
    - [How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?](#how-to-pause-on-setup-or-on-cleanup-to-see-and-interact-with-test-fixtures-custom-components-manually)
    - [How to simulate user interactions on test fixtures (custom components)?](#how-to-simulate-user-interactions-on-test-fixtures-custom-components)

<!-- /TOC -->

## Questions and Answers

### How run tests in a headless browser environment on a CI machine (continuous integration)?

*To be done.*

### How run tests in a development environment on a local machine?

*To be done.*

### How to test custom elements reasonably?

*To be done.*

### How to setup and cleanup test fixtures (js objects from json files)?

*To be done.*

### How to setup and cleanup test fixtures (custom components)?

You can define your test fixtures within a `<template>` using https://github.com/PolymerElements/test-fixture (which is included in `web-component-tester`).

### How to pause on setup or on cleanup to see and interact with test fixtures (custom components) manually?

*To be done.*

### How to simulate user interactions on test fixtures (custom components)?

You can import `iron-test-helpers.html` from https://github.com/PolymerElements/iron-test-helpers and use the methods provides in `global.MockInteractions` within your test suites.
