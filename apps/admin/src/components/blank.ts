import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';
import { Common } from '../services/common';

@Component({
  selector: 'app-blank',
  imports: [],
  template: `
  <title>E-Commerce | {{pageTitle()}}</title>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Blank implements AfterViewInit{
   readonly pageTitle = input.required<string>();
  readonly breadcrumbs = input.required<BreadcrumbModel[]>();

  readonly #common = inject(Common);

  ngAfterViewInit(): void {
    this.#common.set(this.breadcrumbs());
  }

}
