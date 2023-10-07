import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { productService } from '../../../services/product.service';


const Categor = () => {

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    
    const fetchCategoryData = async (categoryId, categoryName) => {

      try {
        const countResponse = await productService.getCategoriescount(categoryId);
        const count = countResponse[0].count;
        
        //console.log('API Response:', countResponse[0]);
        //console.log(`Received data for Category ${categoryId}:`, count);
        return { id: categoryId, name: categoryName, count };

      } catch (error) {

        console.error(`Error fetching data for Category ${categoryId}:`, error);
        return { id: categoryId, name: categoryName, count: 0 }; 

      }

    };



    const categories = [

      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Fashion' },
      { id: 3, name: 'Home and Furniture' },
      { id: 4, name: 'Sports and Outdoors' },
      { id: 5, name: 'Beauty and Personal Care' },
      { id: 6, name: 'Toys and Games' },
      { id: 7, name: 'Books and Media' },
      { id: 8, name: 'Jewelry and Watches' },
      { id: 9, name: 'Health and Wellness' },
      { id: 10, name: 'Food and Beverages' },
      { id: 11, name: 'Automotive and Tools' },
      { id: 12, name: 'Office Supplies' }
      
    ];

    
    Promise.all(categories.map(category => fetchCategoryData(category.id, category.name)))

      .then(categoryData => {

        setCategoryData(categoryData);
      })

      .catch(error => {
        console.error('Error fetching category data:', error);
      });

  }, []);

  return (
    <div className="container-fluid pt-5">

      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">

        <span className="bg-white pr-3">Categories</span>

      </h2>
      <div className="row px-xl-5 pb-3">

        {categoryData.map(category => (

          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category.id}>

            <a className="text-decoration-none" href={`/${category.name}/${category.id}/${category.count}`} >

              <div className="cat-item d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{ width: 100, height: 100 }}>

                  <img className="img-fluid" src={`img/cat-${category.id}.jpg`} alt='.' />
                </div>
                <div className="catname custom-text-warning flex-fill pl-3">
                  <h6>{category.name}</h6>
                  
                  <small className="text-body">{category.count} Products</small>
                </div>
              </div>
            </a>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Categor;
