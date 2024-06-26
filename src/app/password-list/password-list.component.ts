import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Site, UserDetail,UserDetailRes } from '../models/Site';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import {enc, AES  } from 'crypto-js';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {

  site!: Site;

  default: UserDetail = {
    id: '',
    userName: '',
    emailId:'',
    password:''

  }
  userDet: UserDetail = this.default;
  formState : string = "Add";
  isSuccess: boolean =false;
  alertMessage :string='';
  secretKey: string="dihkXklz0wx2bQO9XUZdo5PPRt9s16cL";

  passwordList:Array<any> =[];
  constructor(private route: ActivatedRoute, private passwordManager: PasswordManagerService) { 
    this.route.queryParams.subscribe(val=>{
      this.site = val as Site
    })
    this.loadPassword();
    this.isSuccess = false;
  }

  ngOnInit(): void {
  }
 onSubmit(val:any){
  if(this.formState === "Add")
  {
    val.password = AES.encrypt(val.password, this.secretKey).toString();
    console.log(val.password);
    this.passwordManager.addPassword(val, this.site.id)
    .then((val)=>{
       this.setAlertMessage("Saved successfully"); 
       this.isSuccess=true;
      })
    .catch(err => console.log(err));
  }
  else if(this.formState === "Edit")
  {
    this.editPassword(val as UserDetail);
  }
 }
 setAlertMessage(message: string)
 {
  this.alertMessage = message;
 }
 loadPassword()
 {
   this.passwordManager.loadPassword(this.site.id).subscribe((val)=>{
    this.passwordList = val;
   });
 }

 editForm(password: UserDetail)
 {
  this.userDet = password;
  this.formState = "Edit";
 }
 editPassword(password: UserDetail)
 {
  console.log(password, this.userDet);
  this.passwordManager
  .editPassword(password,this.userDet.id, this.site.id)
  .then((val)=> {
    this.setAlertMessage("Edit Successful");
    this.isSuccess=true;
  });

  this.userDet = this.default;
 }
 decrypt(password:string, index:number)
 {
  let passwr = AES.decrypt(password, this.secretKey).toString(enc.Utf8);
  this.passwordList[index].password = passwr;

 }
 deletePassword(id: string)
 {
  this.passwordManager
  .deletePassword(id, this.site.id)
  .then((val)=>{
    this.setAlertMessage("Deelted");
    this.isSuccess = true;
  });
 }
}
