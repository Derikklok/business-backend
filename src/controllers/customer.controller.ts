import { Customer } from "../models/Customer";
import { CreateCustomerDTO, CustomerResponseDTO, UpdateCustomerDTO } from "../types/customer.types"

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
 * Get all customers
 */
export const getCustomers = async () => {
  const customers = await Customer.find();
  return customers.map(mapCustomer);
};

/**
 * Get customer by ID
 */
export const getCustomerById = async ({ params, set }: any) => {
  const customer = await Customer.findById(params.id);

  if (!customer) {
    set.status = 404;
    return { message: "Customer not found" };
  }

  return mapCustomer(customer);
};

/**
 * Update customer
 */
export const updateCustomer = async ({ params, body, set }: any) => {
  try {
    const dto = body as UpdateCustomerDTO;

    const customer = await Customer.findByIdAndUpdate(
      params.id,
      dto,
      { new: true }
    );

    if (!customer) {
      set.status = 404;
      return { message: "Customer not found" };
    }

    return mapCustomer(customer);
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

/**
 * Delete customer
 */
export const deleteCustomer = async ({ params, set }: any) => {
  try {
    const customer = await Customer.findByIdAndDelete(params.id);

    if (!customer) {
      set.status = 404;
      return { message: "Customer not found" };
    }

    return { message: "Customer deleted successfully" };
  } catch (err: any) {
    set.status = 400;
    return { message: err.message };
  }
};

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