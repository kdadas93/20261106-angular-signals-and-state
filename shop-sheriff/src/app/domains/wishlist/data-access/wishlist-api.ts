import { httpResource } from '@angular/common/http';
import { WishlistProduct } from '../util';
import { Signal } from '@angular/core';


const PRODUCT_URL = '/api/products/';
// factory function
export function makeWishlistResource(slug: Signal<string>) {
  return httpResource<WishlistProduct>(() => PRODUCT_URL + slug(), {
    // https://angular.dev/guide/http/http-resource#response-parsing-and-validation
    // mapowanie DTO
    // parse: (raw: WishlistProduct) => {
    //   return raw;
    // },
  });
}
