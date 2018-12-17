'use strict'

import angular from 'angular'

class HomeController {
  constructor() {
    this.title = 'Home'
  }
}

class HomeAppComponent {
  constructor() {
    this.template = require('./home.view.html')
    this.controller = HomeController
  }
}

const HOME_APP_COMPONENT = angular
  .module('app', [])
  .component('homeApp', new HomeAppComponent())

export { HOME_APP_COMPONENT }
