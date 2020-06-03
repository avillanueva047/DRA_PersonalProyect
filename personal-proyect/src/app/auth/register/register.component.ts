import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  loginPage(){
    this.router.navigate(['login']);
  }

  register(form: NgForm){
    if(form.value.password != form.value.confirm_password){
      this.toastr.error('Passwords do not match');
    }
    if(String(form.value.password).length < 6){
      this.toastr.error('Password must have at least 6 characters');
    }
    else{
      var name = new String(form.value.fName + " " + form.value.lName);
      this.apiService.register(name, form.value.email, form.value.password).subscribe(
        (data) => {
          
        },
        error => {
          console.log(error);
          this.toastr.error('An error has occurred, please try again')
        },
        () => {
          this.router.navigateByUrl('');
          this.toastr.success('Register Successfully')
        }
      );
    }
  }

}
