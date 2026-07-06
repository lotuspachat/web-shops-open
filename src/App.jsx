

import './App.css';
import { useState } from 'react';
import ShopCard from './shopcard';
function App(){
  const [ search, setSearch]=useState("");

  const shops = [
    {name: "Canteen", status: "Open", stocks: "snacks, juice, tea"},
    {name: "Stationery Shop", status: "Closed", stocks: "Books, Pens, Pencils"},
    {name: "Xerox Shop", status: "Open", stocks: "Printing, binding"},
    {name: "Bakery", status: "Open", stocks: "Bread, Cakes, Pastries"},
    {name: "Grocery Store", status: "Closed", stocks: "Vegetables, Fruits, Dairy"},
    {name: "Pharmacy", status: "Open", stocks: "Medicines, Health Products"},
    {name: "Electronics Store", status: "Open", stocks: "Smartphones, Laptops, Tablets"},
    {name: "Clothing Store", status: "Closed", stocks: "Shirts, Pants, Dresses"},
    {name: "Sports Shop", status: "Open", stocks: "Sports Equipment, Apparel"},
    {name: "Toy Store", status: "Closed", stocks: "Toys, Games, Puzzles"},
    {name: "Jewelry Store", status: "Open", stocks: "Necklaces, Rings, Bracelets"},
    {name: "Furniture Store", status: "Closed", stocks: "Sofas, Tables, Chairs"},
    {name: "Bookstore", status: "Open", stocks: "Novels, Textbooks, Magazines"},
    {name: "Pet Store", status: "Closed", stocks: "Pet Food, Accessories, Toys"},
    {name: "Florist", status: "Open", stocks: "Flowers, Bouquets, Plants"},
    {name: "Coffee Shop", status: "Closed", stocks: "Coffee, Tea, Pastries"},
    {name: "Ice Cream Parlor", status: "Open", stocks: "Ice Cream, Sundaes, Milkshakes"},
    {name: "Music Instrument Store", status: "Closed", stocks: "Instruments, Sheet Music, Accessories"},
    {name: "Art Supply Store", status: "Open", stocks: "Paints, Brushes, Canvases"},
    {name: "Hardware Store", status: "Closed", stocks: "Tools, Building Materials, Paints"},
    {name: "Beauty Salon", status: "Open", stocks: "Hair Care, Skincare, Makeup"},
    {name: "Barbershop", status: "Closed", stocks: "Haircuts, Shaves, Beard Trims"},
    {name: "Spa", status: "Open", stocks: "Massages, Facials, Body Treatments"},
    {name: "Nail Salon", status: "Closed", stocks: "Manicures, Pedicures, Nail Art"},
    {name: "Tattoo Parlor", status: "Open", stocks: "Tattoos, Piercings, Body Art"},
    {name: "saras parlour", status: "open", stocks: "softy ,icecreams ,cold coffee"},
    
    

  ];
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a shop"
        value={search}
        onChange={(e) =>setSearch(e.target.value)}
    />  
    <div className="shop-list">
      {shops
      .filter((shop) => shop.name.toLowerCase().includes(search.toLowerCase()))
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
export default App;