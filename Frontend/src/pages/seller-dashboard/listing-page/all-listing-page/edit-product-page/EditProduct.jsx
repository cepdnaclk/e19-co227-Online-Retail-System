import React, { useState, useEffect } from 'react';
import './EditProduct.component.css';
import dropvector from '../../../../../assets/Image-upload.png'
import { firebaseService } from '../../../../../services/firebase.service';
import { productService } from '../../../../../services/product.service';
import { manageAccount } from '../../../../../services/manage-account.service';
import { ProductDTO } from '../../../../../dto/ProductDTO';
import { getStorage } from 'firebase/storage';
import { Link, useParams } from 'react-router-dom';
import {useLocation} from "react-router";



function EditProduct() {
    const { productId } = useParams();
    const location = useLocation();
    const { product} = location.state;

    const [productName, setProductName] = useState(product.productName);
    const [productQty, setProductQty] = useState(product.productQty);
    const [description, setDescription] = useState(product.productDetails);
    const [productPrice, setProductPrice] = useState(product.productPrice);
    const [subCategoryID, setSubCategoryID] = useState(product.subCategoryID);
    const [images, setImages] = useState([product.productImage1,product.productImage2,product.productImage3,product.productImage4,product.productImage5]);
    //const [isSubmitted, setIsSubmitted] = useState(false);

    let deletedImg = [];
    let isSubmitted = false


    useEffect(() => {
        //remove empty slotes in images array

        const updatedImages = [...images];
        const emptyIndex = updatedImages.indexOf('');
        updatedImages.splice(emptyIndex,5-emptyIndex);
        setImages(prevState => {
            return updatedImages
        })

      return () => {
          console.log('Component unmounted');

      };
  }, []);



  const uploadImg = (file) => {
      if (file === null) return;
      const imgRef = `/product/${manageAccount.getSellerID()}/${file.name}`;

      firebaseService
          .uploadImage(file, imgRef)
          .then((response) => {
              firebaseService
                  .getUrl(imgRef)
                  .then((downloadURL) => {
                      console.log('Image Successfully Uploaded!');
                      console.log('Download URL:', downloadURL);


                      setImages(prevState => {
                          return  [...prevState,downloadURL]
                      })

                      updateProductDB()

                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const removeImage = (imageRef, index) => {

        deletedImg.push(imageRef)

        const newImages = [...images]; // Create a copy of the original array
        newImages.splice(index, 1, ''); // Remove the item at the specified index
        setImages(newImages);
        removeImgFromFirebase()

    };

    const removeImgFromFirebase = ()=>{

        deletedImg.map((imageRef,index)=> {
            firebaseService
                .removeImage(imageRef)
                .then(() => {
                    console.log(`Image successfully deleted from Firebase Storage.`);
                    updateProductDB()

                })
                .catch((error) => {
                    console.error(`Error deleting image from Firebase Storage:`, error);
                });
        })

    }

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files).slice(0, 5);
        for (let i = 0; i < 5; i++) {
            const file = files[i];
            if (file) {
                uploadImg(file)

            }
        }

    };

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        if (
            manageAccount.getSellerID() === undefined &&
            productName === '' &&
            productQty === '' &&
            description === ''
        ) {
            alert('Please Fill The All the Fields');
        } else if (subCategoryID === '') {
            alert('Please Select a Category');
        } else if (images[0] === '' && images[1] === '' && images[2] === '' && images[3] === '' && images[4] === '') {
            alert('Please Add at least one Product Image');
        } else {
            updateProductDB()

        }
    };

    const updateProductDB=()=>{
        //Set First Image Visible
        if(images[0]===''){
            images.map((image,index)=>{
                if(image!==''){
                    const arr = [...images]
                    arr[0]=image
                    arr.splice(index,1)
                    setImages((prevState)=>{
                        return  arr
                    })

                }
            })
        }


        const dto = new ProductDTO(
            manageAccount.getSellerID(),
            productName,
            subCategoryID,
            productPrice,
            productQty,
            images[0]===undefined ? '':images[0],
            images[1]===undefined ? '':images[1],
            images[2]===undefined ? '':images[2],
            images[3]===undefined ? '':images[3],
            images[4]===undefined ? '':images[4],
            description
        );

        productService
            .updateProduct(dto,productId)
            .then((resp) => {
                if (resp.message === 'Product Updated') {
                    if(isSubmitted===true){
                        console.log('Product Updated!');
                        alert('Product Updated Succesfully!');
                        isSubmitted=false
                    }else {
                        console.log('Image Updated!');
                    }

                }
            })
            .catch((error) => {
                console.error('Error Updating roduct:', error);
                alert('Error Occured In Product Updating!');
            });

    }

    return (
        <div>
            <div>
                <div className="main-wrap">
                    <label className="title">Add Product</label>
                    <div className="row m-2">
                        <div className="col-12 col-md-6 border border-1 my-2">
                            <p>Add Image(Max 5 images)</p>

                            <div className="drop-zone">
                                <div>
                                    <img src={dropvector} className="image" alt="image uploading" />

                                    <label htmlFor="file-input">
                                        <p className="link-primary">
                                            Drop your Files Here, or Browse
                                        </p>
                                    </label>
                                    <input
                                        type="file"
                                        id="file-input"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        multiple
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </div>
                            </div>

                            <div className="image-container">
                                {images.map((image, index) => {
                                    if (image !== "") {
                                        return (
                                            <div className="image-wrapper">
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Image ${index + 1}`}
                                                    className="image-item border "
                                                    onClick={() => removeImage(image, index)}
                                                />
                                                <div
                                                    className="cross"
                                                    onClick={() => removeImage(image, index)}
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path
                                                                d="M10 12V17"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M14 12V17"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M4 7H20"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                            <path
                                                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                                stroke="#000000"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    }

                                })}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <form action="post" className="container">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(event) =>
                                            setProductName(event.target.value)
                                        }
                                        value={productName}
                                    />
                                    <label htmlFor="floatingInput">Product Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(event) =>
                                            setProductPrice(event.target.value)
                                        }
                                        value={productPrice}
                                    />
                                    <label htmlFor="floatingInput">Product Price($)</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(event) => setProductQty(event.target.value)}
                                        value={productQty}
                                    />
                                    <label htmlFor="floatingInput">Quantity</label>
                                </div>

                                <div className="form-floating mb-3">
                  <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                      style={{ height: '100px', marginTop: '15px' }}
                      onChange={(event) =>
                          setDescription(event.target.value)
                      }
                      value={description}
                  ></textarea>
                                    <label htmlFor="floatingTextarea">Product Details</label>
                                </div>

                                <button
                                    className="btn btn-warning "
                                    onClick={(e) => {

                                        isSubmitted=true;

                                        handleUpdateProduct(e);

                                    }}

                                >
                                    Update
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
