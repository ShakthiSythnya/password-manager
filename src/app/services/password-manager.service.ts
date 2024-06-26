import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UserDetail } from '../models/Site';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore, private auth:Auth) { }

  addSite(value: object)
  {
    const dbInstance = collection(this.firestore,'sites');
    console.log(dbInstance);
    return addDoc(dbInstance, value);
  }

  loadSites()
  {
    const dbInstance = collection(this.firestore, 'sites');
    console.log(collectionData(dbInstance, {idField: 'id'}))
    return collectionData(dbInstance, {idField: 'id'})
  }

  updateSite(id:string, data:object)
  {
    console.log("update called" , id)
    const docu = doc(this.firestore,'sites', id)
    console.log(docu)
    return updateDoc(docu, data);
  }
  deleteSite(id: string)
  {
    const docu = doc(this.firestore, 'sites', id);
    return deleteDoc(docu);

  }

  addPassword(passwordData: object, siteId:string)
  {
    const dbInstance = collection(this.firestore, `sites/${siteId}/password`);
    //const dbInstance = collection(this.firestore, '/sites/YvtXZpjJBeO5YSePLg0x/password');

    
    return addDoc(dbInstance, passwordData );
  }

  loadPassword(siteId:string)
  {
    const dbInstance = collection(this.firestore, `sites/${siteId}/password`)
    console.log(collectionData(dbInstance, {idField: 'id'}))
    return collectionData(dbInstance, {idField: 'id'});
  }

  editPassword(passwordData: UserDetail,passwordId:string, siteId: string)
  {
    //const docu = doc(this.firestore,`sites/${passwordData.id}/password/${passwordData.id}`);
    const docu = doc(this.firestore,`sites/${siteId}/password/${passwordId}`);
    
    return updateDoc(docu, passwordData);
  }

  deletePassword(id:string, siteId: string)
  {
    console.log(`sites/${siteId}/password/${id}`);
    const docu = doc(this.firestore, `sites/${siteId}/password/${id}`);
    return deleteDoc(docu);
  }

  login(emailId:string, password: string){
    return signInWithEmailAndPassword(this.auth, emailId, password);
  }


}
