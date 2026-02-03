export interface CreateCustomerDTO{
    companyName:string;
    address?:string;
    contactPerson?:string;
    phone?:number;
    email?:string,
    description?:string
}

export interface CustomerResponseDTO {
  id: string;
  registrationNumber?:string
  companyName: string;
  address?: string;
  contactPerson?: string;
  phone?: number;
  email?: string;
  description?:string;
  createdAt: Date;
  updatedAt: Date;
}