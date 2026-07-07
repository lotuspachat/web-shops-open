import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [search, setSearch]= useState ("");
    const navigate = useNavigate();

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
            {categories
            .filter((category)=> category.toLowerCase().includes(search.toLowerCase()))
            .map((category)=>(
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
       </div>
    );
}

export default Home;
