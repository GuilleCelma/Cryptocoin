const axios = require("axios")




class CoinsApi {
    constructor() {
      this.api = axios.create({
        baseURL: 'https://api.coingecko.com/api/v3'
      });
    }
   
    getAllCoins = () => this.api.get('/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false');
   
    getOneCoin = coinId => this.api.get(`coins/${coinId}?localization=false`);
   
    createCharacter = characterInfo => this.api.post(`/characters`, characterInfo);
   
    editCharacter = (characterId, characterInfo) => this.api.put(`/characters/${characterId}`, characterInfo);
   
    deleteCharacter = characterId => this.api.delete(`/characters/${characterId}`);
  }
   
  module.exports = CoinsApi;
