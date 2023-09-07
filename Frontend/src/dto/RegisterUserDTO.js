// dtos/userDTO.js
export class RegisterUserDTO {
    constructor(email, password, firstName,lastName,phoneNumber,addL1,addL2,addL3,role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.addressL1 = addL1;
        this.addressL2 = addL2;
        this.addressL3 = addL3;
        this.password = password;
        this.role = role;
    }
}
