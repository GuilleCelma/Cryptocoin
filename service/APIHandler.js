const axios = require("axios")




class CoinsApi {
    constructor() {
      this.api = axios.create({
        baseURL: 'https://api.coingecko.com/api/v3'
      });
    }
   
    getAllCoinsP1 = () => this.api.get("/coins/markets?vs_currency=eur&per_page=10&page=1&sparkline=false");

    getAllCoinsP2 = () => this.api.get("/coins/markets?vs_currency=eur&per_page=10&page=2&sparkline=false");

    getAllCoinsP3 = () => this.api.get("/coins/markets?vs_currency=eur&per_page=10&page=3&sparkline=false");

    getAllCoinsP4 = () => this.api.get("/coins/markets?vs_currency=eur&per_page=10&page=4&sparkline=false");
                     
    getOneCoin = coinId => this.api.get(`coins/${coinId}?localization=false`);
   
  }
   
  module.exports = CoinsApi;
