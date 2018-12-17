import { appHomeState, deputadosState, detalharDeputadoState, compararDeputadosState } from './app.states'

appRouting.$inject = ['$urlRouterProvider', '$stateProvider']

function appRouting($urlRouterProvider, $stateProvider) {

  $stateProvider.state(appHomeState)
  $stateProvider.state(deputadosState)
  $stateProvider.state(detalharDeputadoState)
  $stateProvider.state(compararDeputadosState)
  
  $urlRouterProvider.otherwise('/home')
  // $locationProvider.html5Mode(true)
}

export { appRouting }