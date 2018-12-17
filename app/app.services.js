class ApiService {
    constructor($http) {
        this.http = $http
        this.apiUrl = 'https://dadosabertos.camara.leg.br/api/v2/'
    }

    _createQueryString(paramsForQueryString) {
        return Object.keys(paramsForQueryString).reduce((previousValue, key) => {
            if(previousValue)
                return previousValue + '&' + key + '=' + paramsForQueryString[key];
            else if(paramsForQueryString[key] !== '')
                return key + '=' + paramsForQueryString[key];
        },'');
    }

    _getOnlyData(response) {
        return response.data;
    }

    getQueryString(url, paramsForQueryString) {
        var queryString = this._createQueryString(paramsForQueryString);
        var fullUrl = this.apiUrl + url + '/?' + queryString;
        
        return this.http
            .get(fullUrl)
            .then(this._getOnlyData)
    }

    getUrlAndQueryString(url, id, urlOption, paramsForQueryString) {
        var queryString = this._createQueryString(paramsForQueryString);
        var fullUrl = this.apiUrl + url + id + urlOption + '/?' + queryString;
        
        return this.http
            .get(fullUrl)
            .then(this._getOnlyData)
    }
}

ApiService.$inject = ['$http'];

export { ApiService }