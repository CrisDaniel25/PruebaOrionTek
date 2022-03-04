import { IAdresses } from "./adresses";

export interface ICustomers {
    customerId: number,
    firstname: string,
    lastname: string,
    email: string,
    phonenumber: string,
    gender: boolean,
    createdAt: Date,
    updatedAt: Date,
    addresses: IAdresses[]
}