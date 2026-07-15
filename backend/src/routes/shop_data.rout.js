import * as shop_dataController from "../controller/shop_data.control.js";
import { Router } from "express";


const shop_dataRouter = Router();



/*
get shop_dat from catogries 
*/

shop_dataRouter.get( "/catogries", shop_dataController.catogries)


export default shop_dataRouter;