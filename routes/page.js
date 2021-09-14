const router = require("express").Router()
const CoinService = require("../service/APIHandler.js")
const coinAPI = new CoinService()
const Transaction = require("../models/Transaction.model.js")

/* ====================================
         COIN MARKET ROUTES
   ========================================*/  

router.get("/home", (req,res) =>{  // FIRST 10 COINS ROUTE PER MARKET CAP
      
    coinAPI.getAllCoinsP1()
    .then(coins => {
        res.render("page/home", {coin: coins.data})
    })
    .catch(err => res.send(err))

})



router.get("/home/:id", (req,res) =>{ //PAGINATION ROUTES
    
    const {id} = req.params

    console.log(id)

    if(id === "1"){ // PAGE 1 WITH 10 COINS ROUTE
        coinAPI.getAllCoinsP1()
    .then(coins => {
        
        res.render("page/home", {coin: coins.data})
    })
    .catch(err => res.send(err))

    } else if(id === "2"){ // PAGE 2 WITH 10 COINS ROUTE

    coinAPI.getAllCoinsP2()
    .then(coins => {
        res.render("page/home", {coin: coins.data})
    })
    .catch(err => res.send(err))
    }else if(id === "3"){ // PAGE 3 WITH 10 COINS ROUTE

        coinAPI.getAllCoinsP3()
        .then(coins => {
            res.render("page/home", {coin: coins.data})
    })} else{
        coinAPI.getAllCoinsP4() // PAGE 4 WITH 10 COINS ROUTE
        .then(coins => {
            res.render("page/home", {coin: coins.data})
    })}
            
    
})




router.post("/home/search", (req,res) =>{   //SINGLE COIN SEARH ROUTE

    const {id} = req.body 

    coinAPI.getOneCoin(id)
    
    .then(coins => {
        console.log(coins.data.symbol),
        res.render("page/singleCoin",  {coins:coins.data} )
    })
    .catch(err => res.render("page/singleCoin", {errorMessage : err }))
})



module.exports=router