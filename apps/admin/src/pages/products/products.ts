import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import {CategoryModel} from '@shared/models/category.model';
import {ProductModel} from '@shared/models/product.model';

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(
    () => 'api/products'
  );

  readonly data = computed(() => this.result.value() || []);
  readonly loading = computed(() => this.result.isLoading());



  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  readonly categoryResult = httpResource<CategoryModel[]>(() => 'api/categories');
  readonly categoryFilter =computed<FlexiGridFilterDataModel[]>(() =>{
    const categories = this.categoryResult.value() ?? [];
    return categories.map<FlexiGridFilterDataModel>((c) => ({name: c.name, value: c.name }));
  } );

  delete(id: string) {
    console.log('Deleting product with ID:', id);
    this.#toast.showSwal(
      'Ürünü Sil?',
      'Ürünü silmek istiyor musunuz?',
      'Sil',
      () => {
        this.#http
          .delete(`api/products/${id}`)
          .subscribe((res) => {
            this.result.reload();
          });
      }
    );
  }
}
