import angular from 'angular'
import { DeputadosService } from './deputados.service'

class CompararDeputadosController {
  constructor(DeputadosService, $stateParams, blockUI) {
    this.depService = DeputadosService
    this.stateParams = $stateParams
    this.blockUI = blockUI
    this.title = 'Comparar'
    this.deputados = []
    this.despesas = []
  }

  $onInit() {
    this.detalharDeputado();
  }
  
  detalharDeputado() {
    var ids = this.stateParams.id.split(",").map(Number);    
    ids.forEach(elm => {
      this.depService.obterDeputadoPorId(elm).then((response) => {
          this.deputados.push(angular.copy(response))
      })
    });
    console.log(this.deputados)
  }

}

CompararDeputadosController.$inject = ['DeputadosService', '$stateParams', 'blockUI']

class CompararDeputadosComponent {
  constructor() {
    this.template = require('./comparar.view.html')
    this.controller = CompararDeputadosController
  }
}

const COMPARAR_DEPUTADO_COMPONENT = angular
  .module('app', [])
  .component('compararDeputadosComponent', new CompararDeputadosComponent())
  .service('DeputadosService', DeputadosService)

export {
    COMPARAR_DEPUTADO_COMPONENT
}