import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().toString();
    this.products.push(new Product(prodId, title, description, price));
    return prodId;
  }

  getAllProducts() {
    return this.products;
  }
}
