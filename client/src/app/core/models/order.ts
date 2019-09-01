import { ICartProduct } from './cart-product';

export interface IOrder {
    _id: string;
    fullName: string;
    email: string;
    adress: string;
    country: string;
    city: string;
    postalCode: string;
    phone: string;
    items: Array<ICartProduct>;
    orderDate: string;
    status: string;
}
