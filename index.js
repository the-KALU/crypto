import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var results = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" , async (req, res) => {

    try{
        const response = await axios.get("https://api.coinpaprika.com/v1/coins");
        // for(var i=0;i<response.data.length;i++){
        // results.push(response.data[i].id);
        // }

        results = response.data.map(function(item) {
            return item.id;
        })
        // console.log (results)

        results = response.data;
        res.render("index.ejs", {results: results}); 
    } catch(error) {
         console.log( error.response.data);
    }
});

app.post("/", async(req,res) =>{
    try{
        const request = req.body.crypto;
        const response = await axios.get(`https://api.coinpaprika.com/v1/coins/${request}`);
        const info = await axios.get(`https://api.coinpaprika.com/v1/tickers/${request}`);
        const logo = response.data.logo;
        const name = response.data.name;
        const symbol = response.data.symbol;
        const description = response.data.description;
        const launched = response.data.first_data_at;
        const price = info.data.quotes.USD.price;
        const marketCap = info.data.quotes.USD.market_cap;
        const rank = info.data.quotes.rank;
        const totalSupply = info.data.quotes.total_supply;
        const maxSupply = info.data.quotes.max_supply;

        res.render("index.ejs", {results: results, logo: logo, name:name, symbol:symbol, description:description, launched:launched, price:price, marketCap:marketCap, rank:rank, totalSupply:totalSupply, maxSupply: maxSupply}); 

    }catch(error){
         console.log( error);
    }
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});