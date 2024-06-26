import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import {Site, SiteRes} from '../models/Site';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  allSites !: Observable<Array<any>>;
  isSuccess : boolean = false
  formState : string = "Add Site";
  site : SiteRes = {
    siteName: '',
    siteImgUrl: '',
    siteUrl: ''
  }
  siteUpdate!: Site;
  alertMessage : string = ""
  constructor(private passwordManager: PasswordManagerService) { 
    this.allSites = this.loadSites();
  }

  ngOnInit(): void {
  }
  onSubmit(value:object)
  {
    if(this.formState === "Edit")
    {
      this.passwordManager.updateSite((value as Site).id, value as Site)
      .then(()=> {this.alertMessage = "Edit Successfull"})
      .catch((err)=> {console.log(err)})
      this.isSuccess = true

    }
    else if(this.formState === "Add Site")
    {
      console.log(value);
      this.passwordManager.addSite(value)
      .then(()=>{
        this.alertMessage = "Save successful"
      })
      .catch(err=> console.log(err));
      this.isSuccess = true
  }
}

  loadSites()
  {
    return this.passwordManager.loadSites();
  }

  editSite(siteInp:object)
  {
    this.site = siteInp as Site;
    this.formState = "Edit"
  }

  deleteSite(site: object)
  {
    return this.passwordManager.deleteSite((site as Site).id).then(()=>{
      this.alertMessage = "Delete Successful";
    })
  }
  showAlert()
  { 
    if(this.formState == "Add Site")
    {
      this.alertMessage = "Site added successfully"
    }
    else if( this.formState == "Edit Site")
    {
      this.alertMessage = "Site edited successfully"
    }
  }

}
