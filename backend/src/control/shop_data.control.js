import config from "../config/config.js";
import { test } from "../models/test_data.js";

export async function catogries(req, res){

    let tags = req.query.tags;
  if (!Array.isArray(tags)) {
    tags = [tags];
  }
  const new_tags = tags.map(vab => { return new RegExp(vab, "i") })
  try {
    // let to = await test.find({ $or : 
    //   [ {name: {$in: new_tags}}  , 
    //     {stocks: {$in: new_tags}},
    //     {category: {$in: new_tags}} 
    //   ]});
    let to = await test.find( { category: { $in: new_tags } });
    if (to.length == 0) {
      return res.status(200).json({
        error: "Nothing found related lol "
        , ok: true })
    }
    res.json(to);
  } catch (error) {
    console.error("Database search error:", error);
    res.status(500).json({ error: "Internal server error , not able to connect to the database" });
  }
}