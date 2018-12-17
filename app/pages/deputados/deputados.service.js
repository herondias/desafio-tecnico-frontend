class DeputadosService {
    constructor(ApiService, $q) {
        this.apiService = ApiService
        this.q = $q
    }

    /**
     * Efetua consulta de deputados por nome, legislatura, partido, estado
     */
    obterDeputados(filtro) {
        var deferred = this.q.defer()
        this.apiService.getQueryString('deputados', filtro).then((response) => {
            deferred.resolve(response.dados)
        }).catch((err) => {
            deferred.reject(err)
            /*eslint-disable */
            console.error(err)
        });
        return deferred.promise
    }

    /**
     * Carrega lista com legislaturas para preenchimento do combo
     */
    obterLegislaturas() {
        var deferred = this.q.defer()
        this.apiService.getQueryString('legislaturas/', {
            ordem: 'DESC',
            ordenarPor: 'id',
            pagina: 1,
            itens: 100
        }).then((response) => {
            deferred.resolve(response.dados)
        }).catch((err) => {
            deferred.reject(err)
            /*eslint-disable */
            console.error(err)
        });
        return deferred.promise
    }

    /**
     * Carrega lista com partidos para preenchimento do combo
     */
    obterPartidos() {
        var deferred = this.q.defer()
        this.apiService.getQueryString('partidos/', {
            ordem: 'DESC',
            ordenarPor: 'sigla',
            pagina: 1,
            itens: 100
        }).then((response) => {
            deferred.resolve(response.dados)
        }).catch((err) => {
            deferred.reject(err)
            /*eslint-disable */
            console.error(err)
        });
        return deferred.promise
    }

    // Detalhes de um deputado

    /**
     *                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 -
     */
    obterDeputadoPorId(id) {
        var deferred = this.q.defer()
        this.apiService.getUrlAndQueryString('deputados/', id, '/', '').then((result) => {
            deferred.resolve(result.dados)
        }).catch((err) => {
            deferred.reject(err)
            /*eslint-disable */
            console.error(err)
        })
        return deferred.promise
    }

    obterDespesasDeputado(filtro) {
        var deferred = this.q.defer()
        this.apiService.getUrlAndQueryString('deputados/', filtro.id, '/despesas', filtro).then((result) => {
            deferred.resolve(result.dados)
        }).catch((err) => {
            deferred.reject(err)
            /*eslint-disable */
            console.error(err)
        })
        return deferred.promise
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
}

DeputadosService.$inject = ['ApiService', '$q'];

export {
    DeputadosService
}