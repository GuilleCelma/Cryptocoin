const router = require("express").Router()
const isAuth = require("../passport/authMiddleware").isAuth
const Transaction = require("../models/Transaction.model")


router.get("/charts", isAuth ,(req, res, next)=>{



    Transaction
    .find({author:req.user.id})
    .sort({createdAt:1})
    .then(transactions => {
        

        let objetoTrans = {}
       
            for(let j= 0; j < transactions.length; j++){


                let newDate = transactions[j].date

                if(transactions[j].type === "Purchase"){
                

                if(objetoTrans[newDate]){
                    objetoTrans[newDate] -= Number(transactions[j].value)
                }else{objetoTrans[newDate] = -Number(transactions[j].value)}
                  
            }else{
                if(objetoTrans[newDate]){
                    objetoTrans[newDate] += Number(transactions[j].value)
                }else{objetoTrans[newDate] = Number(transactions[j].value)}
            }
            
          
        }

        
            
        console.log(objetoTrans)
       let final=Object.entries(objetoTrans)
        console.log(final)
        
            res.render("page/charts", {final})
        
        


        


       
        //console.log(totalBalcancePerDate)
        /*
        let sales = []
        let spendings = []

        function myFunc(num1, num2) {
            return num1 + num2;
          }
          
          for(transaction of transactions){
              if(transaction.type === "Purchase"){
                  spendings.push(parseInt(transaction.value))
                }else{sales.push(parseInt(transaction.value))}
                
            }


            let positive = sales.reduce(myFunc)
            let negative = spendings.reduce(myFunc)
            let balance = positive - negative
        console.log(sales, spendings, positive, negative, balance)
*/
        
})
    .catch(err => console.log(err))
})


module.exports=router