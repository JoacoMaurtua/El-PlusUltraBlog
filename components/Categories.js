import React, {useState, useEffect} from 'react'
import Link from 'next/link';

import { getCategories } from '../services/index';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  
  console.log(categories)

  return (

    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Categorías
      </h3>
      {categories.map((category,index)=>(
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>

    
  )
}

export default Categories;


