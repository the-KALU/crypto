import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
var results = [];

app.use(express.static("public"));

app.get("/" , async (req, res) => {

    try{
        const response = await axios.get("https://api.coinpaprika.com/v1/coins");
        for(var i=0;i<response.data.length;i++){
        results.push(response.data[i].id);
        }
        res.render("index.ejs", {results: results}); 
    } catch(error) {
         console.log( error.response.data);
    }
});

app.get("/details", async(req,res) =>{
    try{
        const request = req.query.crypto;
        const response = await axios.get(`https://api.coinpaprika.com/v1/coins/${request}`);
        const info = await axios.get(`https://api.coinpaprika.com/v1/tickers/${request}`);
        const details = response.data;
        const prices = info.data;

        res.render("index.ejs", {results: results, details: details, prices:prices}); 

    }catch(error){
         console.log( error.response.data);
    }
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});