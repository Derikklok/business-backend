import { Customer } from "../models/Customer";
import { CreateCustomerDTO, CustomerResponseDTO } from "../types/customer.types"

// Create Customers
export const createCustomer = async({body,set}:any) => {
    try{
        const dto = body as CreateCustomerDTO;
        const customer = await Customer.create(dto);
        return mapCustomer(customer);
    }catch(err:any){
        set.status = 400;
        return {message:err.message}
    }
}




/**
 * Mapper
 */
const mapCustomer = (customer: any): CustomerResponseDTO => ({
  id: customer._id.toString(),
  registrationNumber: customer.registrationNumber,
  companyName: customer.companyName,
  contactPerson: customer.contactPerson,
  email: customer.email,
  phone:customer.phone,
  address: customer.address,
  description: customer.description,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
});