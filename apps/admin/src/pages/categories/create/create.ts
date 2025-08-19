import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../../components/blank';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { CategoryModel, initialCategory } from '../categories';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<CategoryModel>(
          `http://localhost:3000/categories/${this.id()}`
        )
      );
      return res;
    },
  });

  readonly data = computed(() => this.result.value() ?? {...initialCategory});

  readonly cardTitle = computed(() =>
    this.id() ? 'Category Edit' : 'Category Create'
  );
  readonly btnName = computed(() => (this.id() ? 'Update' : 'Create'));

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #activate = inject(ActivatedRoute);

  constructor() {
    this.#activate.params.subscribe((params) => {
      if (params['id']) this.id.set(params['id']);
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http
        .post('http://localhost:3000/categories', this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/categories');
          this.#toast.showToast(
            'Success',
            'Category created successfully!',
            'success'
          );
        });
    } else {
      this.#http
        .put(`http://localhost:3000/categories/${this.id()}`, this.data())
        .subscribe(() => {
          this.#router.navigateByUrl('/categories');
          this.#toast.showToast(
            'Success',
            'Category updated successfully!',
            'info'
          );
        });
    }
  }
}
