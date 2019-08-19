export interface IMerch {
    _id: string;
    merchName: string;
    price: number;
    typeOfMerch: string;
    imagesOfMerch: object;
    sizes: Array<string>;
    colors: Array<string>;
}
