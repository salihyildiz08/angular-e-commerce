import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../../components/blank';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, httpResource } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model';
import { FlexiSelectModule } from 'flexi-select';
import { BreadcrumbModel } from '../../layouts/breadcrumb';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective, FlexiSelectModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
    readonly breadcrumbs = signal<BreadcrumbModel[]>([
      { title: 'Products', url: '/products', icon: 'deployed_code' },
    ]);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<ProductModel>(
          `api/products/${this.id()}`
        )
      );
      this.breadcrumbs.update((prev) => [
        ...prev,
        { title: res.name, url: `/products/edit/${this.id()}`, icon: 'edit' },
      ]);
      return res;
    },
  });

  readonly data = linkedSignal(() => this.result.value() ?? { ...initialProduct });

  readonly categoryResult = httpResource<CategoryModel[]>(() => 'api/categories');
  readonly categories = computed(() => this.categoryResult.value() || []);
  readonly categoryLoading = computed(() => this.categoryResult.isLoading());

  readonly title = computed(() => this.id() ? 'Product Edit' : 'Product Create');
  readonly btnName = computed(() => this.id() ? 'Update' : 'Create');

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);
  //readonly #location=inject(Location);

  constructor() {
    this.#activate.params.subscribe((params) => {
      if (params['id']) this.id.set(params['id']);
       else {
        this.breadcrumbs.update((prev) => [
          ...prev,
          { title: 'Create', url: '/products/create', icon: 'add' },
        ]);
      }
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http
        .post('api/products', this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/products');
          this.#toast.showToast(
            'Success',
            'Product created successfully!',
            'success'
          );
        });
    }
    else {
      this.#http
        .put(`api/products/${this.id()}`, this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/products');
          this.#toast.showToast(
            'Success',
            'Product updated successfully!',
            'info'
          );
        });
    }
}

  setCategoryName() {
    const id = this.data().categoryId;
    const category = this.categories().find(c => c.id === id);
    this.data.update((prev) => ({ ...prev, categoryName: category?.name ?? "", categoryUrl: category?.url ?? "" }));
  }
}
