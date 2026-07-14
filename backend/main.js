import express from 'express';
import cors from "cors";
import morgan  from 'morgan';
import connect_to_db from './src/config/database.js';
import shop_dataRouter from './src/routes/shop_data.rout.js';


const app = express();
const port = 3000;

app.use(cors())
app.use(morgan("dev"));
app.use("/api/shop_data" , shop_dataRouter)



connect_to_db();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});