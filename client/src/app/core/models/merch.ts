export interface IMerch {
    _id: string,
    merchName: string,
    price: number,
    typeOfMerch: string,
    imagesOfMerch: Array<string>,
    sizes: Array<string>,
    colors: Array<string>
}