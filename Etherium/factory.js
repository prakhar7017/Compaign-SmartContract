import path from "path";
require("dotenv").config({path:path.resolve(__dirname,"../.env")}); 
import web3 from "./web3";

const compiledFactory=require("./build/CampaignFactory.json");

const instance=new web3.eth.Contract(JSON.parse(compiledFactory.interface),process.env.ADDRESS);

export default instance;