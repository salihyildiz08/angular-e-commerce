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
import { BreadcrumbModel } from '../../layouts/breadcrumb';

@Component({
  imports: [Blank, FormsModule, NgxMaskDirective],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryCreate {
  readonly id = signal<string | undefined>(undefined);
  readonly breadcrumbs = signal<BreadcrumbModel[]>([
    { title: 'Categories', url: '/users', icon: 'deployed_code' },
  ]);

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<CategoryModel>(`api/categories/${this.id()}`)
      );
      this.breadcrumbs.update((prev) => [
        ...prev,
        { title: res.name, url: `/categories/edit/${this.id()}`, icon: 'edit' },
      ]);
      return res;
    },
  });

  readonly data = computed(() => this.result.value() ?? { ...initialCategory });

  readonly title = computed(() =>
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
      else {
        this.breadcrumbs.update((prev) => [
          ...prev,
          { title: 'Create', url: '/categories/create', icon: 'add' },
        ]);
      }
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;

    if (!this.id()) {
      this.#http.post('api/categories', this.data()).subscribe(() => {
        this.#router.navigateByUrl('/categories');
        this.#toast.showToast(
          'Success',
          'Category created successfully!',
          'success'
        );
      });
    } else {
      this.#http
        .put(`api/categories/${this.id()}`, this.data())
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
