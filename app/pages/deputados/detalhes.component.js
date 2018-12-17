import angular from 'angular'
import { DeputadosService } from './deputados.service'

class DetalhesDeputadoController {
  constructor(DeputadosService, $stateParams, blockUI, $scope) {
    this.depService = DeputadosService
    this.blockUI = blockUI
    this.scp = $scope
    this.title = 'Detalhes'
    this.deputado = {}
    this.despesas = []
    this.todalDespesas = []
    this.habilitaGrafico = false
    this.filtro = {
      id: $stateParams.id,
      pagina: 0,
      ano: 2018,
      itens: 100,
      ordem: 'ASC',
      ordenarPor: 'mes'
    }
    this.data = []
    this.labels = []
  }
  
  $onInit() {
    this.detalharDeputado()
    
    // this.scp.$watch(() => this.data, (newValue, oldValue) => {
    //   if (newValue !== oldValue) {
    //     this.habilitaGrafico = true
    //   }
    // });
  }
  
  // $onChanges() { 
  //   if (this.data.length > 0) {
  //     this.habilitaGrafico = true
  //   }
  // }

  detalharDeputado() {
    this.depService.obterDeputadoPorId(this.filtro.id).then((result) => {
      this.deputado = angular.copy(result)
    })
    this.concatenarDespesasPaginadas(this.filtro)
    this.habilitaGrafico = true
  }

  async concatenarDespesasPaginadas(filtro) {
    var isData = true
    while (isData) {
      filtro.pagina += 1
      var despesas = await this.depService.obterDespesasDeputado(filtro)
      if (despesas.length > 0) {
        this.depService.mergeList(despesas, this.despesas)
      } else {
        isData = false
      }
    }
    this.todalDespesas = this.listarTotalDespesasPorTipo(this.despesas, 'tipoDespesa')
  }

  listarTotalDespesasPorTipo(data, field) {
    var grp = data.reduce((acc, obj) => {
      const key = obj[field]
      if (!acc[key]) acc[key] = []
      acc[key].push(obj)
      return acc
    }, {})
        
    let despesas = []
    Object.keys(grp).forEach((elem, idx) => {
      despesas[Object.keys(grp)[idx].toUpperCase()] = grp[elem].reduce((acc, ntx) => {
        return (parseFloat(acc) + parseFloat(ntx.valorLiquido)).toFixed(2)
      }, 0)
    })

    this.data = Object.values(despesas)
    this.labels = Object.keys(despesas)
    return despesas
  }

  mergeList(arr, result = []) {
    arr.forEach((element, idx) => {
      const objValue = arr[idx]
      if (Array.isArray(objValue)) {
        this.mergeList(objValue, result)
      } else {
        result.push(objValue)
      }
    })
    return result
  }

  montarGraficoDespesas() {
    /*eslint-disable */
    this.habilitaGrafico = true
  }
}

DetalhesDeputadoController.$inject = ['DeputadosService', '$stateParams', 'blockUI', '$scope']

class DetalhesDeputadoComponent {
  constructor() {
    this.template = require('./detalhes.view.html')
    this.controller = DetalhesDeputadoController
  }
}

const DETALHES_DEPUTADO_COMPONENT = angular
  .module('app', [])
  .component('detalhesDeputadoComponent', new DetalhesDeputadoComponent())
  .service('DeputadosService', DeputadosService)

export { DETALHES_DEPUTADO_COMPONENT }