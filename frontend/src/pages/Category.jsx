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