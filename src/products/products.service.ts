import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = (Math.random() * 10).toFixed(2).toString();
    this.products.push(new Product(prodId, title, description, price));
    return prodId;
  }

  getAllProducts() {
    return [...this.products]; //ne zelimo originalnu referencu, nego kopiju, da ne bi mogo kontroler da je menja
  }

  getProduct(productId: string) {
    const prod = this.products.find((p) => p.id === productId);
    if (!prod) {
      throw Error('Nije pronadjen proizvod sa tim id-jem');
    }
    return { ...prod };
  }

  updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    //const prod = this.products.find((p) => p.id === prodId);
    const prodIndex = this.products.findIndex((prod) => prod.id === prodId);
    const prod = this.products[prodIndex];
    if (!prod) {
      throw Error('Nije pronadjen proizvod sa tim id-jem');
    }
    const updatedProd = { ...prod };
    if (title) {
      updatedProd.title = title;
    }
    if (description) {
      updatedProd.description = description;
    }
    if (price) {
      updatedProd.price = price;
    }
    this.products[prodIndex] = updatedProd;
    return this.products;
  }
}
