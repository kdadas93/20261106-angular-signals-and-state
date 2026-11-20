import { computed, Service, signal, Signal, WritableSignal } from '@angular/core';

// @Service( { autoProvided: false } ) // === @Injectable()
@Service() // === @Injectable({ providedIn: 'root' })
export class WishlistStore {
  private _slugs: WritableSignal<string[]> = signal<string[]>([]);

  slugs: Signal<string[]> = this._slugs.asReadonly();
  count: Signal<number> = computed(() => this._slugs().length);

  toggleOnList(slug: string): void {
    this._slugs.update((sl) => (this.has(slug) ? sl.filter((s) => s !== slug) : [...sl, slug]));
  }

  has(lookFor: string): boolean {
    return this._slugs().includes(lookFor);
  }
}

/*
@Injectable({ providedIn: 'root' })
export class WishlistStore {
  private _slugs: string[] = [
    'typeforge-tkl-mechanical-keyboard',
    'typeforge-75-wireless-keyboard',
  ];

  get slugs(): readonly string[] {
    return this._slugs;
  }

  get count(): number {
    return this._slugs.length;
  }

  toggleOnList(slug: string) {
    if(this.has(slug)) {
      this._slugs = this._slugs.filter((s) => s !== slug);
    } else {
      this._slugs.push(slug);
    }
  }

  has(lookFor: string): boolean {
    return this._slugs.includes(lookFor)
  }
}
* */
