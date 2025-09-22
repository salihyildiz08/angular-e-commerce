import { Component, computed, signal, ViewEncapsulation, ChangeDetectionStrategy, effect } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TrCurrencyPipe } from 'tr-currency';
import { httpResource } from '@angular/common/http';
import { ProductModel } from '@shared/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrCurrencyPipe, InfiniteScrollModule],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);
  readonly result = httpResource<ProductModel[]>(() =>{
    const endpoint=`api/products?_limit=${this.limit()}&_start=${this.start()}`;
    return endpoint;
  });
  readonly data = computed(() => this.result.value() ?? []);
  readonly dataSignal=signal<ProductModel[]>([]);

  constructor() {
    effect(() => {
      this.dataSignal.update(prev=>[...prev,...this.data()]);
    });
  }

  onScroll() {
    this.limit.update((c) => c + 6);
    this.start.update((c) => c + 6);
  }
}
