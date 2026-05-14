import { products } from "@/data/products";
import type { Product } from "@/types/Product";

export const getAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products)
    })
  })
}