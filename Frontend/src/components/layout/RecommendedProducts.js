import React from 'react';
import { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import ProductCarouselItem from './ProductCarouselItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { HeaderContext } from '../../contexts/HeaderContext'

const RecommendedProducts = ({ id }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const{rec,setRec} = useContext(HeaderContext)

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/v1/productRCMND/" + id);
        setProduct(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductDetails();
  }, [id]);


  return (
    <>
    
     
    {product && ( <> 
        <div className="container-fluid py-5 " >
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4" >
            <span className=" bg-white pr-3 pl-3" >You May Also Like</span>
          </h2>

       

          <div className="row px-xl-5" >
            <Carousel responsive={responsive}>
              {product.map((productids) => (
                <div key={productids}>
                  <ProductCarouselItem id={productids} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        </> 
        
      )}
    </>
  );
};

export default RecommendedProducts;
