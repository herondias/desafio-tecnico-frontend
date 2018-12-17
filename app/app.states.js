const msg = 'Ooops, Houve um erro durante a chamada da rota '

const appHomeState = {
  name: 'home',
  url: '/home',
  component: 'homeApp',
  lazyLoad: ($transition$) => {
    const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')

    return import('./pages/home/home.component')
      .then(mod => $ocLazyLoad.load(mod.HOME_APP_COMPONENT))
      .catch(err => {
        throw new Error(msg + err)
      })
  }
}

const deputadosState = {
  name: 'deputados',
  url: '/deputados',
  component: 'deputadosComponent',
  lazyLoad: ($transition$) => {
    const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')
    return import('./pages/deputados/deputados.component')
      .then(mod => $ocLazyLoad.load(mod.DEPUTADOS_COMPONENT))
      .catch(err => {
        throw new Error(msg + err)
      })
  }
}

const detalharDeputadoState = {
  name: 'deputados.detalhes',
  url: '/detalhes/:id',
  component: 'detalhesDeputadoComponent',
  bindings: {
    id: 'id',
  },
  id: ['$stateParams', function ($stateParams) {
    return $stateParams.id;
  }],
  lazyLoad: ($transition$) => {
    const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')
    return import('./pages/deputados/detalhes.component')
      .then(mod => $ocLazyLoad.load(mod.DETALHES_DEPUTADO_COMPONENT))
      .catch(err => {
        throw new Error(msg + err)
      })
  }
}

const compararDeputadosState = {
  name: 'deputados.comparar',
  url: '/comparar/:id',
  component: 'compararDeputadosComponent',
  bindings: {
    id: 'id',
  },
  id: ['$stateParams', function ($stateParams) {
    return $stateParams.id;
  }],
  lazyLoad: ($transition$) => {
    const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad')
    return import('./pages/deputados/comparar.component')
      .then(mod => $ocLazyLoad.load(mod.COMPARAR_DEPUTADO_COMPONENT))
      .catch(err => {
        throw new Error(msg + err)
      })
  }
}

export { appHomeState, deputadosState, detalharDeputadoState, compararDeputadosState }