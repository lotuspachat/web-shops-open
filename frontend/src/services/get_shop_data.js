import react from 'react';


export async function get_shop_name(slug) {
  //remove & from selected catogary ( "Apple & Banana" == "Apple Banan")
  slug = slug.replace("&", "");
  //split it into array of string ( "apple banana" == ["apple" , "banana"])
  slug = slug.trim().split(/\s+/);
  //for url
  let url = new URL("http://localhost:3000/api/shop_data/catogries");
  //add tags in get request url 
  // "http://localhost:3000/api/shop_name?tags=Food&tags=Grocery" 
  slug.forEach(tag => url.searchParams.append('tags', tag));

  try {

    const temp = await fetch(url);
    if (!temp.ok) {
      throw new Error(`HTTP error ! status : ${temp.status}`);
    }
    let data = await temp.json();

    if ( !Array.isArray(data))
    {
      data = [data];
    }
    return data;

  } catch (error) {
    console.error("Farial error occure :", error)
  }
  return [];
}