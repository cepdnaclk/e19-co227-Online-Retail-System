import React, {useState} from "react";


class AddListing extends React.Component{

    constructor() {
        super();
    }

    render() {
        return (
          <div>
              <div>
                  <div className="main-wrap">
                      <div className="row">
                          <div className="col-12 col-md-6 border-1">
                              <p>Add Image</p>
                          </div>
                          <div className="col-12 col-md-6 border-1">
                              <div>
                                  <p>Product Name</p>
                                  <input type="text" className="text-input is-invalid" placeholder="Product Name"/>
                              </div>
                              <div>
                                  <p>Category</p>
                                  <input type="text" className="text-input" placeholder="Product Name"/>
                              </div>
                              <div>
                                  <p>Sub Category</p>
                                  <input type="text" className="text-input" placeholder="Product Name"/>
                              </div>
                              <div>
                                  <p>Price</p>
                                  <input type="text" className="text-input" placeholder="Product Name"/>
                              </div>
                              <div>
                                  <p>Description</p>
                                  <input type="text" className="text-input" placeholder="Product Name"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
        );
    }

}

export default AddListing;
