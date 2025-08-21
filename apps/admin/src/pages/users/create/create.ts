import { HttpClient } from '@angular/common/http';
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
import { lastValueFrom } from 'rxjs';
import { initialUser, UserModel } from '../users';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from '../../../components/blank';

@Component({
  imports: [FormsModule,Blank],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUser {
  readonly id = signal<string | undefined>(undefined);
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<UserModel>(`api/users/${this.id()}`)
      );
      return res;
    },
  });

  readonly data=linkedSignal(()=>this.result.value()??{...initialUser});
  readonly cardTitle=computed(() => this.id() ? 'User Edit' : 'User Create');
  readonly btnName=computed(() => this.id() ? 'Update' : 'Create');

  readonly #http = inject(HttpClient);
  readonly #activate=inject(ActivatedRoute);
  readonly #router=inject(Router);
  readonly #toast=inject(FlexiToastService);

  constructor(){
    this.#activate.params.subscribe(res=>{
      if(res['id']){
        this.id.set(res['id']);
      }
    })
  }

  save(from:NgForm){
    if(!from.valid) return;

    this.data.update((prev)=> ({...prev,fullName:`${prev.firstName} ${prev.lastName}`}));

    if(!this.id()){
      this.#http.post("api/users",this.data()).subscribe(res=>{
        this.#toast.showToast('Success','User created successfully');
        this.#router.navigateByUrl('/users');
      })
    }
    else{
      this.#http.put(`api/users/${this.id()}`,this.data()).subscribe(res=>{
        this.#toast.showToast('Success','User updated successfully');
        this.#router.navigateByUrl('/users');
      })
    }
  }

}
