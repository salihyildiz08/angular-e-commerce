import { Injectable } from '@angular/core';
import { BreadcrumbModel } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class Common {
  data: BreadcrumbModel[] = [];

  set(data: BreadcrumbModel[]) {
    const val: BreadcrumbModel = {
      title: 'Home',
      icon: 'home',
      url: '/',
    };
    this.data = data;
    this.data.unshift(val);
  }
}
