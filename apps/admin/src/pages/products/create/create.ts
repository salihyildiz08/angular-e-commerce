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
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { initialProduct, ProductModel } from '../products';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<ProductModel>(
          `http://localhost:3000/products/${this.id()}`
        )
      );
      return res;
    },
  });

  readonly data = linkedSignal(() => this.result.value()?? initialProduct);

  readonly cardTitle = computed(() =>this.id() ? 'Product Edit' : 'Product Create');
  readonly btnName = computed(() =>this.id() ? 'Update' : 'Create');

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);
  //readonly #location=inject(Location);

  constructor() {
    this.#activate.params.subscribe((params) => {
      if (params['id']) this.id.set(params['id']);
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if(!this.id()) {
      this.#http
      .post('http://localhost:3000/products', this.data())
      .subscribe(() => {
        this.#router.navigateByUrl('/products');
        this.#toast.showToast(
          'Success',
          'Product created successfully!',
          'success'
        );
      });
    }
    else{
      this.#http
      .put(`http://localhost:3000/products/${this.id()}`, this.data())
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
}
