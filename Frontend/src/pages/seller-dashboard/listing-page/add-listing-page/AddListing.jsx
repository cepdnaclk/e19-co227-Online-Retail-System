import React, {useState} from "react";
import './AddListing.css'
import uploadImg from '../../../../assets/Image-upload.png'
import storage from "../../../../services/firebase.service";
import {ref , uploadBytes,deleteObject, getDownloadURL} from "firebase/storage"


class AddListing extends React.Component{


    constructor() {
        super();
        this.state = {
            productName: 'product4',
            fileSelected: true
        }
        this.imgUrls = []
    }
    uploadImg = (file)=>{
        if(file ===null)return;
        const imageRef = ref(storage,`products/${this.state.productName}/${file.name}`)
        uploadBytes(imageRef,file).then(()=>{
            getDownloadURL(imageRef)
                .then((downloadURL) => {
                    console.log("Image Successfully Uploaded!");
                    console.log("Download URL:", downloadURL); // This is the correct URL
                    this.imgUrls.push({ref:imageRef,url:downloadURL});
            this.setState({ fileSelected: true }, () => {
                this.forceUpdate(); // Force a re-render
            });
                })
        }).catch((e)=>{
            console.log(e)
        })

    }
    removeImage = (imageRef,index) => {
        // Remove the image from Firebase Storage

        deleteObject(imageRef)
            .then(() => {
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

                console.log(file)
            }
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
                              <p>Add Image</p>


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
                                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                          <label htmlFor="floatingInput">Product Name</label>
                                  </div>
                                  <div className="form-floating mb-3">
                                      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                      <label htmlFor="floatingInput">Product Price</label>
                                  </div>
                                  <div className="form-floating">
                                      <select className="form-select" id="floatingSelectDisabled"
                                              aria-label="Floating label select example" >
                                          <option selected>Open this select menu</option>
                                          <option value="1">One</option>
                                          <option value="2">Two</option>
                                          <option value="3">Three</option>
                                      </select>
                                      <label htmlFor="floatingSelectDisabled">Category</label>
                                  </div>
                                  <div className="form-floating" style={{ marginTop:"15px"}} >
                                      <select className="form-select" id="floatingSelectDisabled"
                                              aria-label="Floating label select example" >
                                          <option selected>Open this select menu</option>
                                          <option value="1">One</option>
                                          <option value="2">Two</option>
                                          <option value="3">Three</option>
                                      </select>
                                      <label htmlFor="floatingSelectDisabled">Sub Category</label>
                                  </div>

                                  <div className="form-floating mb-3">
                                      <textarea className="form-control" placeholder="Leave a comment here"
                                                id="floatingTextarea" style={{height: "100px", marginTop:"15px"}} ></textarea>
                                      <label htmlFor="floatingTextarea">Product Details</label>
                                  </div>

                                  <button className="btn btn-primary ">Add Product</button>
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
