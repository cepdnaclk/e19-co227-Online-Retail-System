// dtos/userDTO.js
export class ProductDTO {
    constructor(sellerID, productName, categoryID,productPrice,productQty,productImage1,productImage2,productImage3,productImage4,productImage5,productDetails) {
        this.sellerID = sellerID;
        this.productName = productName;
        this.categoryID = categoryID;
        this.productPrice = productPrice;
        this.productQty = productQty;
        this.productImage1 = productImage1;
        this.productImage2 = productImage2;
        this.productImage3 = productImage3;
        this.productImage4 = productImage4;
        this.productImage5 = productImage5;
        this.productDetails = productDetails;

    }
}
