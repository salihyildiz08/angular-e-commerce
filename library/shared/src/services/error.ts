import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FlexiToastService } from 'flexi-toast';

@Injectable({
  providedIn: 'root',
})
export class Error {
  readonly #toast = inject(FlexiToastService);

  handle(err: HttpErrorResponse) {
    console.log(err);

    switch (err.status) {
      case 0:
        this.#toast.showToast('Error', err.message, 'error');
        break;
      case 400:
        this.#toast.showToast('Error', err.message, 'error');
        break;
      case 500:
        this.#toast.showToast('Error', err.message, 'error');
        break;
    }
  }
}
