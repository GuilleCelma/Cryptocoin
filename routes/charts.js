const router = require("express").Router()
const isAuth = require("../passport/authMiddleware").isAuth
const Transaction = require("../models/Transaction.model")


router.get("/charts", isAuth ,(req, res, next)=>{

    Transaction
    .find({author:req.user.id})
    .sort({createdAt:1})
    .then(transactions => {
        
        let objectTrans = {}
       
            for(let j= 0; j < transactions.length; j++){

                let newCoin = transactions[j].date

                if(transactions[j].type === "Purchase"){
                
                    if(objectTrans[newCoin]){
                        objectTrans[newCoin] -= Number(transactions[j].value)
                    }else{objectTrans[newCoin] = -Number(transactions[j].value)}
                  
                }else{
                    if(objectTrans[newCoin]){
                        objectTrans[newCoin] += Number(transactions[j].value)
                    }else{objectTrans[newCoin] = Number(transactions[j].value)}
                }
            }

            
            let final=Object.entries(objectTrans)
            res.render("page/charts", {final})
        
})
    .catch(err => console.log(err))
})





router.get("/charts/coins", isAuth ,(req, res, next)=>{

    Transaction
    .find({author:req.user.id})
    .sort({createdAt:1})
    .then(transactions => {
        
        let objectTrans = {}
       
            for(let j= 0; j < transactions.length; j++){

                let newCoin = transactions[j].coin

                if(transactions[j].type === "Purchase"){
                
                    if(objectTrans[newCoin]){
                        objectTrans[newCoin] -= Number(transactions[j].value)
                    }else{objectTrans[newCoin] = -Number(transactions[j].value)}
                  
                }else{
                    if(objectTrans[newCoin]){
                        objectTrans[newCoin] += Number(transactions[j].value)
                    }else{objectTrans[newCoin] = Number(transactions[j].value)}
                }
            }

            let transactionCount = []

            for(let j= 0; j < transactions.length; j++){
                let newCoin = transactions[j].coin
                console.log(newCoin)
                if(transactionCount[newCoin]){
                    console.log("if")
                    transactionCount[newCoin] = transactionCount[newCoin] + 1
                }else{
                    transactionCount[newCoin] = 1 
                    console.log("else" , transactionCount[newCoin])
                }
            }


            let final=Object.entries(objectTrans)
            console.log(final)
            let final2 =Object.entries(transactionCount)
            console.log(final2)
            res.render("page/chartsCoins",{ final2, final} )
        
})
    .catch(err => console.log(err))
})

module.exports=router