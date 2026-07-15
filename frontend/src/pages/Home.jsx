import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopCard from '../shopcard';

function Home() {
    const [search, setSearch]= useState ("");
    const navigate = useNavigate();
    useEffect (()=> {
      if (search)
      {
        console.log(search);
      }
    })
    const categories = [
        "Food & Grocery",
        "Stationery & Books",
        "Printing & Services",
        "Health & Wellness",
        "Electronics",
        "Clothing & Accessories",
        "Hobbies & Entertainment",
        "Home & Hardware",
        "Pets & Plants"
    ];

    const shops = [
        {name: "Canteen", status: "Open", stocks: "snacks, juice, tea",category: "Food & Grocery"},
        {name: "Stationery Shop", status: "Closed", stocks: "Books, Pens, Pencils", category: "Stationery & Books"},
        {name: "Xerox Shop", status: "Open", stocks: "Printing, binding", category: "Printing & Services"},
        {name: "Bakery", status: "Open", stocks: "Bread, Cakes, Pastries", category: "Food & Grocery"},
        {name: "Grocery Store", status: "Closed", stocks: "Vegetables, Fruits, Dairy",category: "Food & Grocery"},
        {name: "Pharmacy", status: "Open", stocks: "Medicines, Health Products", category: "Health & Wellness"},
        {name: "Electronics Store", status: "Open", stocks: "Smartphones, Laptops, Tablets", category: "Electronics"},
        {name: "Clothing Store", status: "Closed", stocks: "Shirts, Pants, Dresses", category: "Clothing & Accessories"},
        {name: "Sports Shop", status: "Open", stocks: "Sports Equipment, Apparel", category: "Hobbies & Entertainment"},
        {name: "Toy Store", status: "Closed", stocks: "Toys, Games, Puzzles", category: "Hobbies & Entertainment"},
        {name: "Jewelry Store", status: "Open", stocks: "Necklaces, Rings, Bracelets", category: "Clothing & Accessories"},
        {name: "Furniture Store", status: "Closed", stocks: "Sofas, Tables, Chairs",category: "Home & Hardware"},
        {name: "Bookstore", status: "Open", stocks: "Novels, Textbooks, Magazines", category: "Stationery & Books"},
        {name: "Pet Store", status: "Closed", stocks: "Pet Food, Accessories, Toys", category: "Pets & Plants"},
        {name: "Florist", status: "Open", stocks: "Flowers, Bouquets, Plants", category: "Pets & Plants"},
        {name: "Coffee Shop", status: "Closed", stocks: "Coffee, Tea, Pastries",category: "Food & Grocery"},
        {name: "Ice Cream Parlor", status: "Open", stocks: "Ice Cream, Sundaes, Milkshakes",category: "Food & Grocery"},
        {name: "Music Instrument Store", status: "Closed", stocks: "Instruments, Sheet Music, Accessories", category: "Hobbies & Entertainment"},
        {name: "Art Supply Store", status: "Open", stocks: "Paints, Brushes, Canvases", category: "Hobbies & Entertainment"},
        {name: "Hardware Store", status: "Closed", stocks: "Tools, Building Materials, Paints",category: "Home & Hardware"},
        {name: "Beauty Salon", status: "Open", stocks: "Hair Care, Skincare, Makeup", category: "Health & Wellness"},
        {name: "Barbershop", status: "Closed", stocks: "Haircuts, Shaves, Beard Trims", category: "Health & Wellness"},
        {name: "Spa", status: "Open", stocks: "Massages, Facials, Body Treatments", category: "Health & Wellness"},
        {name: "Nail Salon", status: "Closed", stocks: "Manicures, Pedicures, Nail Art", category: "Health & Wellness"},
        {name: "Tattoo Parlor", status: "Open", stocks: "Tattoos, Piercings, Body Art", category: "Health & Wellness"},
        {name: "saras parlour", status: "open", stocks: "softy ,icecreams ,cold coffee",category: "Food & Grocery"},
    ];

    const term = search.toLowerCase();

    const matchingCategories =categories.filter((category) => category.toLowerCase().includes(term));

    const matchingShops = shops.filter((shop) => shop.name.toLowerCase().includes(term) || shop.stocks.toLowerCase().includes(term));

    return (
       <div className="home-page">
        <h1 className="home-title">CampusConnect</h1>
        <p className="home-subtitle">Check real time status and stocks availability of nearby shops</p>

        <input
            type="text"
            placeholder="Search for a shop"
            value={search}
            onChange={(e) =>setSearch(e.target.value)}
        />  

        <div className="categories-section">
          <h2 className="section-heading">Categories</h2>
        
          <div className="category-list">
            {(search === "" ? categories: matchingCategories).map((category) => (
                <div 
                key={category} 
                className="category-box"
                onClick={() => navigate(`/category/${category}`)}
                >
                    {category}
                </div>
            ))}
          </div>
        </div>

       {search !== "" && (
        <div className ="shops-section">
          <h2 className="section-heading">Shops</h2>
          <div className ="shop-list">
             {matchingShops.length > 0 ? (
                matchingShops.map((shop) => (
                  <ShopCard
                    key={shop.name}  
                    name={shop.name}
                    status={shop.status}
                    stocks={shop.stocks}
                   />
                ))
            ) : (
              <p style={{color:"white", textAlign: "center"}}> No matching shops</p>
             )}
          </div>
        </div>
       )}
      </div>
    );
}

export default Home;
