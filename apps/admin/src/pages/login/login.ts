import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserModel } from '../users/users';
import { FlexiToastService } from 'flexi-toast';
import { Router } from '@angular/router';



@Component({
  imports: [FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {
readonly #http=inject(HttpClient);
readonly #toast=inject(FlexiToastService);
readonly #router=inject(Router);

  signIn(form:NgForm){
    if(!form.valid) return;
    this.#http.get<UserModel[]>(`api/users?username=${form.value['userName']}&password=${form.value['password']}`).subscribe((res)=>{
      if(res.length===0){
       this.#toast.showToast("Error","Invalid username or password","error");
       return;
      }
      localStorage.setItem("response",JSON.stringify(res[0]));
      this.#router.navigateByUrl("/");
    });
  }
}
