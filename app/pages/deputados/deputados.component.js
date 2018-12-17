import angular from 'angular'
import {
  DeputadosService
} from './deputados.service'

class DeputadosController {
  constructor(DeputadosService) {
    this.depService = DeputadosService
    this.title = 'Deputados'
    this.deputados = []
    this.legislaturas = []
    this.partidos = []
    this.deputadosSelecionados = []
    this.filtros = {}
  }

  $onInit() {
    this.filtros = {
      ordem: 'ASC',
      ordenarPor: 'nome',
      pagina: 1,
      itens: 25
    }
    
    this.depService.obterLegislaturas().then(res => {
      this.legislaturas = angular.copy(res)
    })
    
    this.depService.obterPartidos().then(res => {
      this.partidos = angular.copy(res)
    })
  }

  pesquisarDeputados(filtros) {
    this.depService.obterDeputados(filtros).then(res => {
      this.deputados = angular.copy(res)
    })
  }

  compararDeputados() {
     alert(this.deputadosSelecionados)
  }

  /**
   * Valida selecao de até três deputados para serem comparados
   * @param {*} value 
   */
  validaSelecaoCheckbox(value) {
    if (this.deputadosSelecionados.length === 3 && !this.deputadosSelecionados.includes(value)) {
      return true
    }
    return false
  }

  /**
   * Verifica se há mais de um deputado selecionado para habilitar 
   * o botão de Comparação
   */
  habilitaBotaoComparar() {
    return this.deputadosSelecionados.length < 2 ? true : false
  }

  limparFiltos() {
    this.filtros = {
      ordem: 'ASC',
      ordenarPor: 'nome',
      pagina: 1,
      itens: 25
    }
    this.deputados = {}
  }
}

DeputadosController.$inject = ['DeputadosService'];

class DeputadosComponent {
  constructor() {
    this.template = require('./deputados.view.html')
    this.controller = DeputadosController
  }
}

const DEPUTADOS_COMPONENT = angular
  .module('app', [])
  .component('deputadosComponent', new DeputadosComponent())
  .service('DeputadosService', DeputadosService)

export {
  DEPUTADOS_COMPONENT
}