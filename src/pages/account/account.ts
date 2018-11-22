import { ProfileProvider } from './../../providers/profile/profile';
import { SigninPage } from './../signin/signin';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  userProfile:any;
  fname:string;
  sname:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private authPROV:AuthProvider,private ProfilePROV:ProfileProvider) {
  }
  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.ProfilePROV.getuserdetails().then((res: any) => {
      this.fname= res.firstName;
      this.sname= res.lastName;
      console.log('userProfile',res)
     
    })
  }

  signoutConfirm(){
    let alert = this.alertCtrl.create({
      subTitle:'Are you sure you want to signout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authPROV.signOut().then(() => {
              this.authPROV.signOut();
              this.navCtrl.setRoot(SigninPage);
            });
          }
        }
      ]
    });
    alert.present();
  } 

}
