// dtos/userDTO.js
export class UpdateUserDTO {
    constructor(firstName,lastName,phoneNumber,addL1,addL2,addL3) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.addressL1 = addL1;
        this.addressL2 = addL2;
        this.addressL3 = addL3;


    }
}
