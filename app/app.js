import angular from 'angular'
import '@uirouter/angularjs'
import 'oclazyload'
import 'checklist-model'
import 'angular-resource'
import 'angular-chart.js'
import 'angular-block-ui'

import { appRouting } from './app.routes'
import { ApiService } from './app.services'

const MainApp = angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'checklist-model',
        'ngResource',
        'chart.js',
        'blockUI'
    ])
    .service('ApiService', ApiService)
    .config(appRouting)

export { MainApp }