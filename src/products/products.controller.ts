import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

//zahtevi koji dolaze na /products
@Controller('products')
export class ProductsController {
  //injecting the service
  constructor(private productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get('all') //products/all
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  //na osnovu id
  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  //Patch - parcijalno azuriranje
  //Put - mora se azurirati ceo objekat!!! salje se ceo
  //azuriranje - kriterijum za identifikaciju u url, a podaci za azuriranje u body
  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}
