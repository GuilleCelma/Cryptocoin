const router = require("express").Router()
const transaction = require("../models/Transaction.model.js")
const Transaction = require("../models/Transaction.model.js")



/* ====================================
          TRANSACTIONS ROUTES
   ========================================*/  

router.get("/transactions", (req, res) =>{ //RENDER TRANSACTIONS PAGE
    
    Transaction
    .find({})
    
    .sort({createdAt:-1})
    .then(transactions => res.render("page/transactions" , {transactions}))
    .catch(err => console.log(err))

})

router.post("/transaction/create", (req,res)  => { //CREATE TRANSACTION ROUTE
    const {type , coin, value , date} = req.body
   
    Transaction.create({type, coin, value, date})
    .then(res.redirect("/transactions"))
    .catch(err => console.log(err))

})

router.get("/transactions/delete/:id", (req, res) =>{ //DELETE TRANSACTION ROUTE
    const{id} = req.params
   Transaction.findByIdAndDelete(id)
   .then(res.redirect("/transactions"))
})



router.get("/transactions/update/:id", (req,res) =>{ //START EDITING TRANSACTION ROUTE

    const {id} = req.params
    
    Transaction.find()
    
    .sort({createdAt:-1})
   .then(response =>
    
    {for( let i = 0; i < response.length; i++){
        console.log(response[i])
            if(response[i].id === id){
                response[i].edit = true
            }
        }
        res.render("page/transactions" , {transactions: response})
        })
})

router.post("/transactions/update/:id", (req, res) =>{

    const {id} = req.params
const{type, coin, value, date} = req.body

transaction.findByIdAndUpdate(id,{type,coin, value, date}, {new:true})
.then(updated => {
    console.log(updated),
    res.redirect("/transactions")
})
})

module.exports = router