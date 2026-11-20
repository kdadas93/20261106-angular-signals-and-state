import { httpResource } from '@angular/common/http';
import { WishlistProduct } from '../util';
import { Signal } from '@angular/core';


const PRODUCT_URL = '/api/products/';
// factory function
export function makeWishlistResource(slug: Signal<string>) {
  return httpResource<WishlistProduct>(() => PRODUCT_URL + slug());
}
