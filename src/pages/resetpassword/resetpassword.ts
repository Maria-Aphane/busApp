import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  load: any;
  email:string;

  userForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authPROV:AuthProvider,private alertCtrl:AlertController,
    public FB:FormBuilder) {

      this.userForm= this.FB.group({
        email:['',Validators.compose([Validators.required,
        ])]
  })

  }

resetPassword(){
  if(!this.userForm.valid){
    console.log(this.userForm.valid)
  }else{
    this.authPROV.passwordreset(this.userForm.value.email)
    .then(user=>{
      const alert:Alert= this.alertCtrl.create({
        message:'Check your email for the reset password link',
        buttons:[{
          text:'ok',
          role:'cancel',
          handler:()=>{
            this.navCtrl.setRoot(HomePage);
          }
        }]
      })
      alert.present()
    },error=>{
      const errorAlert=this.alertCtrl.create({
        message:error.message,
        buttons:[{
          text:'ok',
          role:'cancel'
        }]
      })
      errorAlert.present();
    }
  )
  }
 
}

}
