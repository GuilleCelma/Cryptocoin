const router = require("express").Router()
const Transaction = require("../models/Transaction.model.js")
const isAuth = require("../passport/authMiddleware").isAuth
const User = require("../models/User.model")


/* ====================================
          TRANSACTIONS ROUTES
   ========================================*/  

router.get("/transactions",isAuth, (req, res) =>{ //RENDER TRANSACTIONS PAGE
    
    Transaction
    .find({author:req.user.id})
    .sort({createdAt:-1})
    .then(transactions => res.render("page/transactions" , {transactions}))
    .catch(err => console.log(err))

})

router.post("/transaction/create",isAuth, (req,res)  => { //CREATE TRANSACTION ROUTE

    
    const {type , coin, value , date} = req.body
    const author = req.user.id 
    console.log(author)

    Transaction.create({type, coin, value, date, author })
    .then(transaction =>{

        User.findById(req.user.id)

        .then(user => {
        user.transactions.push(transaction.id)
        user.save()
        res.redirect("/transactions")
        })
        
        
    })
    .catch(err => console.log(err))

})


router.get("/transactions/delete/:id",isAuth, (req, res) =>{ //DELETE TRANSACTION ROUTE

    const{id} = req.params


   Transaction.findByIdAndDelete(id)
   .then(deleted =>
     
    User.findById(req.user.id)

        .then(user => {
        let filteredTransactions = user.transactions.filter(transaction => transaction !=deleted.id ) //FILTERING USER TRANSACTIONS AND DELETING THE ONE THAT IS SELECTED TO BE DELETED
        user.transactions = filteredTransactions
        user.save()
        res.redirect("/transactions")
        })

    )
})



router.get("/transactions/update/:id",isAuth, (req,res) =>{ //START EDITING TRANSACTION ROUTE

    const {id} = req.params
    
    Transaction.find({author:req.user.id})
    
    .sort({createdAt:-1})
   .then(response =>
    
    {for( let i = 0; i < response.length; i++){ //ADDING EDIT PROPERTY TO THE TRANSACTION WE WANT TO UPDATE
        console.log(response[i])
            if(response[i].id === id){
                response[i].edit = true
            }
        }
        res.render("page/transactions" , {transactions: response})
        })
})

router.post("/transactions/update/:id",isAuth, (req, res) =>{ //UPDATING TRANSACTION ROUTE

    const {id} = req.params
const{type, coin, value, date} = req.body

Transaction.findByIdAndUpdate(id,{type,coin, value, date}, {new:true})
.then(updated => {
    console.log(updated),
    res.redirect("/transactions")
})
})

module.exports = router