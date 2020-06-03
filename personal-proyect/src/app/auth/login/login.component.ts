import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User
  data: any
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

  async login(form: NgForm){
    await this.apiService.login(form.value.email, form.value.password).toPromise().catch(
      () => {
        this.toastr.error('Incorrect email or password');
      }
    );
    this.apiService.getUser().subscribe(
      (user) => {
        if(!user.admin){
          this.router.navigateByUrl('/user/pending');
          this.toastr.success('Logged in successfully');
        }
        else{
          this.router.navigateByUrl('/admin/current');
          this.toastr.success('Logged in successfully');
        }
      },
    )
  }

  registerPage(){
    this.router.navigate(['register']);
  }
}
