export interface RegisterDTO{
    name : string;
    email:string;
    password:string;
    active:boolean;
}

export interface UserResponseDTO{
    _id:string;
    name:string;
    email:string;
    active:boolean;
}