import { Component, computed, inject, input, output, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { PricePipe } from '../../../shared/ui';
import { WishlistProduct } from '../util';
import { ProblemDetails, toProblem } from '../../../shared/util';
import { WishlistStore } from '../data-access';
import { makeWishlistResource } from '../data-access/wishlist-api';

@Component({
  imports: [RouterLink, PricePipe],
  selector: 'app-wishlist-item',
  styles: ``,
  // standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<li class="list-group-item d-flex justify-content-between">
    @if (product.isLoading()) {
      <!-- ładowanie -->
      <span class="text-body-secondary">Loading…</span>
    } @else if (product.error()) {
      @if (problemDetail().status === 404) {
        <span class="text-danger">Product can not be found </span>
      } @else {
        <span class="text-danger">Could not load wishlist product :( </span>
        <button type="button" class="btn btn-sm btn-outline-secondary" (click)="product.reload()">
          Try again
        </button>
      }
    } @else if (product.hasValue()) {
      @let p = product.value();
      <a [routerLink]="['/products', slug()]">{{ p.name }}</a>
      @if (p.stock === 0) {
        <span class="badge text-bg-secondary">Sold out</span>
      } @else {
        {{ p.priceCents | price }}
      }
      <button
        type="button"
        class="btn btn-sm btn-outline-danger"
        (click)="wishlistStore.toggleOnList(slug())"
      >
        <!-- <button
        type="button"
        class="btn btn-sm btn-outline-danger"
        (click)="remove.emit(slug())"
      > -->
        Remove
      </button>
    }
  </li>`,
})
export class WishlistItem {
  slug = input.required<string>();
  remove = output<string>();

  protected readonly wishlistStore: WishlistStore = inject(WishlistStore);

  product = makeWishlistResource(this.slug);

  problemDetail: Signal<ProblemDetails> = computed(() => toProblem(this.product.error()));

  // constructor() {
  //   setTimeout(() => {
  //       // this.slug.se
  //   }, 3000)
  // }
}
