
# CryptoCoin




## Demo

[Go to Site!](https://cryptocoin-project.herokuapp.com/)

[![Cryptocoin-intro.png](https://i.postimg.cc/htdkw4CN/Cryptocoin-intro.png)](https://postimg.cc/v4G2xywv)

  
## Sumary
CryptoCoin is a web app for those interested in the world of cryptocurrencies, it allows you to see in real time the prices of the most relevant cryptocurrencies and keep track of all your transactions to later visualize information about them in convinient graphs.

 

  
## Motivation
The purpose of this project was to get familiar with back-end development. The main objective was to create a back-end based in node.js/express, mongo Db and external API's.



  
## Built With
-Handlebars  
-CSS  
-Javascript ES6  
-Node.js  
-Express  
-Mongo DB  
-Passport.js  
-CoinGecko API








  
## API Reference

#### HOME



|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /home | Display a list of all cryptocurrencies  |

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /home/id | Display the page of cryptocurrencies corresponding to id value |

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /home/search | Display the searched cryptocurrency  |

  

#### TRANSACTIONS


|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /transactions | Display user's transactions |

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| POST |   /transactions/create | Creates a transaction and stores it in the Database  |  

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /transactions/delete/id |Deletes the selected transaction |    

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /transactions/update/id |Opens an edit form in the selected transaction|

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| POST |   /transactions/update/id |Updates the selected transaction |



  #### CHARTS

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /charts | Sends information about total/day balance of user transactions |

|  Method  | HTTP request | Description                |
| :-------- | :------- | :------------------------- |
| GET |   /chart/coins | Sends information about total transaction in each coin and balance/coin |
 
## Features

- SignIn/LogIn with Passport middleware.
- Home page with a chart of cryptocurrencies ordered by most market value.
- Home page search bar for more specific searches. 
- Transaction page where you can add, edit and delete your sale or purchase transactions.
- Charts displaying your balance and coin information.

  
## Authors

- [@GuilleCelma](https://github.com/GuilleCelma)

  