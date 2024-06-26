import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError:boolean=false;
  constructor(private passwordManager: PasswordManagerService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(value:any)
  {
    this.passwordManager.login(value.email, value.password)
    .then(()=>{
      this.router.navigate(['/site-list'])
    }).catch(()=>{
      this.isError=true;
    })
  }


}
