import { Component, computed, signal, ViewEncapsulation, ChangeDetectionStrategy, effect, inject, untracked, Signal } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TrCurrencyPipe } from 'tr-currency';
import { httpResource } from '@angular/common/http';
import { ProductModel } from '@shared/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrCurrencyPipe, InfiniteScrollModule],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
readonly categoryUrl = signal<string | undefined>(undefined);
  readonly categoryUrlPrev = this.computedPrevious(this.categoryUrl);

  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() =>{
     let endpoint = 'api/products?';
    if (this.categoryUrl()) {
      endpoint += `categoryUrl=${this.categoryUrl()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly dataSignal=signal<ProductModel[]>([]);

readonly #actived=inject(ActivatedRoute);

  constructor() {
this.#actived.params.subscribe(res=>{
  if(res['categoryUrl']){
    this.categoryUrl.set(res['categoryUrl']);
  }
});

effect(() => {
      this.dataSignal.update(prev => [...prev, ...this.data()]);
      if (this.categoryUrlPrev() !== this.categoryUrl()) {
        this.dataSignal.set([...this.data()]);
        this.limit.set(6);
        this.start.set(0);
      } else {
        this.dataSignal.update(prev => [...prev, ...this.data()]);
      }
    })
  }
  onScroll() {
    this.limit.update((c) => c + 6);
    this.start.update((c) => c + 6);
  }


  computedPrevious<T>(s: Signal<T>): Signal<T> {
    let current = null as T;
    let previous = untracked(() => s());

    return computed(() => {
      current = s();
      const result = previous;
      previous = current;
      return result;
    });
  }
}
