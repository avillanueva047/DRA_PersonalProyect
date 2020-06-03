import { Component, OnInit } from '@angular/core';
import { faBars, faTruck, faBox, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  faTruck = faTruck;
  faBox = faBox;
  faSignOutAlt = faSignOutAlt;
  
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  /* Open and closes responsive side menu */
  
  reveal_menu(){
    var menu = document.getElementById("menu");
    if(!menu.classList.contains('reveal')){
      menu.classList.add('reveal');
    }
    else{
      menu.classList.remove('reveal');
    }
  }

  /* Getter of the router */

  getRouter(){
    return this.router;
  }

  /* Navigation functions to show some components */

  show_pending(){
    this.router.navigateByUrl('/user/pending')
  }

  show_delivered(){
    this.router.navigateByUrl('/user/delivered')
  }

  logOut(){
    this.apiService.logOut().subscribe(
      (data) => {
        this.toastr.success('Logged out successfully')
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigateByUrl('');
      }
    )
  }
}
