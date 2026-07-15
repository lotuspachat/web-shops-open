import { useEffect , useState   } from 'react';
import ShopCard from '../shopcard';
import { useParams, Link } from 'react-router-dom';
import {get_shop_name} from "../services/get_shop_data.js"



function Category() {
  const { categoryName } = useParams();
  const selectedCategory = categoryName;
  const [shops , setshops] = useState ([]);

  useEffect(()=>{
    const fun =  async ()  => {
      const data = await get_shop_name(selectedCategory);
      setshops( data);
    }
    fun();
  } , [selectedCategory]);

  // const shops = [
  //   { name: "Canteen", status: "Open", stocks: "snacks, juice, tea", category: "Food & Grocery" },
  //   { name: "Stationery Shop", status: "Closed", stocks: "Books, Pens, Pencils", category: "Stationery & Books" },
  //   { name: "Xerox Shop", status: "Open", stocks: "Printing, binding", category: "Printing & Services" },
  //   { name: "Bakery", status: "Open", stocks: "Bread, Cakes, Pastries", category: "Food & Grocery" },
  //   { name: "Grocery Store", status: "Closed", stocks: "Vegetables, Fruits, Dairy", category: "Food & Grocery" },
  //   { name: "Pharmacy", status: "Open", stocks: "Medicines, Health Products", category: "Health & Wellness" },
  //   { name: "Electronics Store", status: "Open", stocks: "Smartphones, Laptops, Tablets", category: "Electronics" },
  //   { name: "Clothing Store", status: "Closed", stocks: "Shirts, Pants, Dresses", category: "Clothing & Accessories" },
  //   { name: "Sports Shop", status: "Open", stocks: "Sports Equipment, Apparel", category: "Hobbies & Entertainment" },
  //   { name: "Toy Store", status: "Closed", stocks: "Toys, Games, Puzzles", category: "Hobbies & Entertainment" },
  //   { name: "Jewelry Store", status: "Open", stocks: "Necklaces, Rings, Bracelets", category: "Clothing & Accessories" },
  //   { name: "Furniture Store", status: "Closed", stocks: "Sofas, Tables, Chairs", category: "Home & Hardware" },
  //   { name: "Bookstore", status: "Open", stocks: "Novels, Textbooks, Magazines", category: "Stationery & Books" },
  //   { name: "Pet Store", status: "Closed", stocks: "Pet Food, Accessories, Toys", category: "Pets & Plants" },
  //   { name: "Florist", status: "Open", stocks: "Flowers, Bouquets, Plants", category: "Pets & Plants" },
  //   { name: "Coffee Shop", status: "Closed", stocks: "Coffee, Tea, Pastries", category: "Food & Grocery" },
  //   { name: "Ice Cream Parlor", status: "Open", stocks: "Ice Cream, Sundaes, Milkshakes", category: "Food & Grocery" },
  //   { name: "Music Instrument Store", status: "Closed", stocks: "Instruments, Sheet Music, Accessories", category: "Hobbies & Entertainment" },
  //   { name: "Art Supply Store", status: "Open", stocks: "Paints, Brushes, Canvases", category: "Hobbies & Entertainment" },
  //   { name: "Hardware Store", status: "Closed", stocks: "Tools, Building Materials, Paints", category: "Home & Hardware" },
  //   { name: "Beauty Salon", status: "Open", stocks: "Hair Care, Skincare, Makeup", category: "Health & Wellness" },
  //   { name: "Barbershop", status: "Closed", stocks: "Haircuts, Shaves, Beard Trims", category: "Health & Wellness" },
  //   { name: "Spa", status: "Open", stocks: "Massages, Facials, Body Treatments", category: "Health & Wellness" },
  //   { name: "Nail Salon", status: "Closed", stocks: "Manicures, Pedicures, Nail Art", category: "Health & Wellness" },
  //   { name: "Tattoo Parlor", status: "Open", stocks: "Tattoos, Piercings, Body Art", category: "Health & Wellness" },
  //   { name: "saras parlour", status: "open", stocks: "softy ,icecreams ,cold coffee", category: "Food & Grocery" },
  // ];


  return (
    <div className="category-page">
      <Link to="/" className="back-link">Back to Home</Link>
      <h1 className="category-title">{selectedCategory}</h1>
      <div className="shop-list">
        {shops
          .map((shop) => (
            <ShopCard
              key={shop.name}
              name={shop.name}
              status={shop.status}
              stocks={shop.stocks}
            />
          ))}
      </div>
    </div>
  );
}

export default Category;