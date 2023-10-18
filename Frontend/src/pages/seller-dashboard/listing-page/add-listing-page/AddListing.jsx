import React, {useState} from "react";
import './AddListing.css'
import uploadImg from '../../../../assets/Image-upload.png'
import {firebaseService} from "../../../../services/firebase.service";
import {ref , uploadBytes,deleteObject, getDownloadURL} from "firebase/storage"
import {productService} from "../../../../services/product.service"
import {manageAccount} from "../../../../services/manage-account.service";
import {ProductDTO} from "../../../../dto/ProductDTO";
import {Link} from "react-router-dom";


class AddListing extends React.Component{



    constructor() {
        super();
        this.state = {
            productName: '',
            productQty:'',
            description:'',
            productPrice:'',
            subCategoryID :'',
            image1:'',
            image2:'',
            image3:'',
            image4:'',
            image5:'',
            category : [],
            subCategory : [],
            belongSubCategories:[],
            fileSelected: false,
            isSubmitted:true
        }

        this.imgUrls = []
        this.isComponentMounted = false;
    }
    componentDidMount() {

        this.isComponentMounted = true;
        this.getCategory()
    }

    componentWillUnmount() {
        this.isComponentMounted = false; // Mark the component as unmounted when it unmounts
    }

    getCategory=()=>{
        productService.getCategories().then(response=>{

            const { category, subCategory } = response;
            this.setState({category:category});
            this.setState({subCategory:subCategory});
            //this.forceUpdate();
        }).catch((err)=>{
            console.error('Error fetching combined data:', err);
        })

    }


    uploadImg = (file)=>{
        if(file ===null)return;
        const imgRef = `/product/${manageAccount.getSellerID()}/${file.name}`

        firebaseService.uploadImage(file,imgRef).then((response)=>{
            firebaseService.getUrl(imgRef)
                .then((downloadURL) => {
                    console.log("Image Successfully Uploaded!");
                    console.log("Download URL:", downloadURL); // This is the correct URL
                    this.imgUrls.push({ref:imgRef,url:downloadURL});
                    this.setState({ fileSelected: true }, () => {
                        this.forceUpdate(); // Force a re-render
                    });
                })
        }).catch((e)=>{
            console.log(e)
        })


    }
    removeImage = (imageRef,index) => {
        const imgRef = imageRef
        firebaseService.removeImage(imgRef).then(() => {
            console.log(`Image successfully deleted from Firebase Storage.`);
            this.imgUrls.splice(index, 1);
            this.forceUpdate();
        })
            .catch((error) => {
                console.error(`Error deleting image from Firebase Storage:`, error);
            });
    };

    handleFileChange = (event) =>{

        const files = Array.from(event.target.files).slice(0, 5);
        for (let i = 0; i < 5; i++) {
            const file = files[i];
            if (file) {
                this.uploadImg(file)

            }
        }


    }
    handleCategoryChange = (event)=>{
        const selectedCategory = parseInt(event.target.value);

        const filteredSubCategories = this.state.subCategory.filter((options) => {
            return options['categoryID'] === selectedCategory;
        });
        console.log(filteredSubCategories);
        this.setState({
            belongSubCategories: filteredSubCategories,
        });





    }
    handleSubCategoryChange = (event)=>{
        const selectedSubCategory = event.target.value;
        this.setState({subCategoryID:selectedSubCategory})

    }

    handleAddProduct=(event)=>{
        event.preventDefault();
        if(manageAccount.getSellerID()===undefined && this.state.productName==='' ,this.state.productQty==='', this.state.description===''){
            alert("Please Fill The All the Fields")
        }else if(this.state.subCategoryID===''){
            alert("Please Select a Category")
        }else if(this.imgUrls[0]===undefined){
            alert("Please Add At least one Product Image")
        }else {
            const dto = new ProductDTO(
                manageAccount.getSellerID(),
                this.state.productName,
                this.state.subCategoryID,
                this.state.productPrice,
                this.state.productQty,
                this.imgUrls[0] ? this.imgUrls[0]['url'] : '',
                this.imgUrls[1] ? this.imgUrls[1]['url'] : '',
                this.imgUrls[2] ? this.imgUrls[2]['url'] : '',
                this.imgUrls[3] ? this.imgUrls[3]['url'] : '',
                this.imgUrls[4] ? this.imgUrls[4]['url'] : '',
                this.state.description
            )
            console.log(dto)
            productService.addProduct(dto).then((resp)=>{
                if(resp.message === 'Product Added'){
                    console.log('Product Added!');
                    alert("Product Added Succesfully!")
                    this.setState({isSubmitted:true})


                }
            }).catch((error) =>{
                console.error('Error Adding roduct:', error);
                alert("Error Occured In Product Adding!")
            })
        }



    }


    render() {
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
                                        <img src={uploadImg} className="image" alt="image uploading" />

                                        <label htmlFor="file-input">
                                            <p className="link-primary">Drop your Files Here, or Browse</p>
                                        </label>
                                        <input
                                            type="file"
                                            id="file-input"
                                            onChange={this.handleFileChange}
                                            style={{ display: 'none' }}
                                            multiple
                                            accept=".jpg, .jpeg, .png"
                                        />
                                    </div>
                                </div>

                                <div className="image-container">
                                    {this.state.fileSelected && this.imgUrls.map((image, index) => (
                                        <div className="image-wrapper">
                                            <img
                                                key={index}
                                                src={image['url']}
                                                alt={`Image ${index + 1}`}
                                                className="image-item border "
                                                onClick={() => this.removeImage(image["ref"],index)}
                                            />
                                            <div className="cross" onClick={() => this.removeImage(image["ref"],index)}>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <form action='post' className="container">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                               onChange={event => this.setState({productName:event.target.value})}
                                        />
                                        <label htmlFor="floatingInput">Product Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                               onChange={event => this.setState({productPrice:event.target.value})}
                                        />
                                        <label htmlFor="floatingInput">Product Price($)</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                                               onChange={event => this.setState({productQty:event.target.value})}
                                        />
                                        <label htmlFor="floatingInput">Quantity</label>
                                    </div>
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelectDisabled"
                                                aria-label="Floating label select example"
                                                onChange={this.handleCategoryChange}
                                        >
                                            <option selected>Open this select menu</option>
                                            { this.state.category.map((option, index) => (

                                                <option key={index} value={option['categoryID']}>
                                                    {option['categoryName']}

                                                </option>


                                            ))}
                                        </select>
                                        <label htmlFor="floatingSelectDisabled">Category</label>
                                    </div>
                                    <div className="form-floating" style={{ marginTop:"15px"}} >
                                        <select className="form-select" id="floatingSelectDisabled"
                                                aria-label="Floating label select example"
                                                onChange={this.handleSubCategoryChange}
                                        >
                                            <option selected>Open this select menu</option>
                                            { this.state.belongSubCategories.map((option, index) => (

                                                <option key={index} value={option['subCategoryID']}>
                                                    {option['subCategoryName']}
                                                </option>


                                            ))}
                                        </select>
                                        <label htmlFor="floatingSelectDisabled">Sub Category</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                      <textarea className="form-control" placeholder="Leave a comment here"
                                                id="floatingTextarea" style={{height: "100px", marginTop:"15px"}}
                                                onChange={event => this.setState({description:event.target.value})}
                                      ></textarea>
                                        <label htmlFor="floatingTextarea">Product Details</label>
                                    </div>

                                    <button className="btn btn-warning" onClick={this.handleAddProduct}>Add Product</button>
                                    {this.state.isSubmitted && <Link to='/dashboard'></Link> }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default AddListing;
