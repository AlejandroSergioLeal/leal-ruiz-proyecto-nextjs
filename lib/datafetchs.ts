import { Product } from "./definitions";
import * as dao from "./productDAO"

//aca podemos poner las funciones para los filtros
export async function getBestSellers() : Promise<Product[]>{
    let ventas_minimas = 80;
    return await dao.getProductsByMinSales(ventas_minimas)
}

export async function getMostRecentProducts(cant:number) : Promise<Product[]>{
    return dao.getMostRecentProducts(cant);
}