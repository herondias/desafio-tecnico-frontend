'use strict'
import angular from 'angular'
import { MainApp } from '../app'

angular.bootstrap(document, [ MainApp.name ], {
    strictDi: false
});