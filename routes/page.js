const router = require("express").Router()
const CoinService = require("../service/APIHandler.js")
const coinAPI = new CoinService()


router.get("/home", (req,res) =>{

    coinAPI.getAllCoins()
    .then(coins => {
        res.render("page/home", {coin: coins.data})
    })
    .catch(err => res.send(err))
})


router.post("/home/search", (req,res) =>{

    const {id} = req.body 

    
    coinAPI.getOneCoin(id)
    
    .then(coins => {
        console.log(coins.data.symbol),
        res.render("page/singleCoin",  {coins:coins.data} )
    })
})




module.exports=router