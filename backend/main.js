import express, { json } from 'express';
import cors from "cors";
import morgan  from 'morgan';
import connect_to_db from './src/config/database.js';
import shop_dataRouter from './src/routes/shop_data.rout.js';
import authRouter  from './src/routes/auth.routes.js';
import cookieParser  from 'cookie-parser';
const app = express();
const port = 3000;
app.use(json())
app.use(cors())
app.use (cookieParser());
app.use(morgan("dev"));
app.use("/api/shop_data" , shop_dataRouter)
app.use("/api/auth" , authRouter )


connect_to_db();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});