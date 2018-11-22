import { BookingProvider } from './../../providers/booking/booking';
import { AccountPage } from './../account/account';
import { Component } from '@angular/core';
import {Alert, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import firebase, { User } from 'firebase/app';
import 'firebase/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  townships:string;
  Booking:firebase.database.Reference;
  currentUser:User;
  load: any;
  userForm:FormGroup;
  public form  : FormGroup;
  DPPrice = 380;
  DCPrice=800;
  DJPrice=350;
  PCPrice=100;
  PJPrice=40;
  CJPrice=900;


  TotalPrice=0;
  // TotalPrice=(this.DurbanPretiaPrice  * 0.05) + this.DurbanPretiaPrice;
  fromCity:string;
  toCity:string;
  Date:string;
  Time:string;
  seatNum:Number;
  booking:string;
  firebaseRef: firebase.database.Reference;
  town=['Durban','Pretoria','Cape town','Johannesburg'];

  constructor(public navCtrl: NavController, public navParams:NavParams,
    public alertCtrl:AlertController,private FB:FormBuilder,private loadingCtrl:LoadingController, private bookingProv:BookingProvider) {
  
     this.userForm= this.FB.group({

      
      fromCity:['',Validators.compose([Validators.required,
        ])],

        toCity:['',Validators.compose([Validators.required,
        ])], 
        
        Date:['',Validators.compose([Validators.required])],
  
        Time:['',Validators.compose([Validators.required,
        Validators.pattern('[0-9]*')
         ])],

         seatNum:['',Validators.compose([Validators.required,
          Validators.pattern('[0-9]*')
           ])],

        
  })

  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      console.log(user)
    this.currentUser=user;
    this.firebaseRef = firebase.database().ref(`/BookinDetails/${user.uid}`)
    }
  })
  }

  
  SaveUserData(){
    if(this.fromCity === '' || this.toCity==='' || this.Date ==='' || this.Time ===''|| this.seatNum===0){
      const alertName:Alert =this.alertCtrl.create({
      subTitle:'Please provide all your details',
      buttons:[{text:'ok'}]
          })
           alertName.present();
      }
    else{  
      this.bookingProv.updateBooking(this.userForm.controls['fromCity'].value,this.userForm.controls['toCity'].value,this.userForm.controls['Date'].value,this.userForm.controls['Time'].value,this.userForm.controls['seatNum'].value);

      if(this.userForm.controls['fromCity'].value==='Durban' && this.userForm.controls['toCity'].value==='Pretoria' || this.userForm.controls['fromCity'].value==='Pretoria' && this.userForm.controls['toCity'].value==='Durban')
          {
            this.TotalPrice = (this.DPPrice * 0.05) + this.DPPrice;
          }
          else if (this.userForm.controls['fromCity'].value=='Durban' && this.userForm.controls['toCity'].value==='Cape town' || this.userForm.controls['fromCity'].value==='Cape town' && this.userForm.controls['toCity'].value==='Durban')
          {
      
            this.TotalPrice = (this.DCPrice * 0.05) + this.DCPrice;
      
          }
          else if(this.userForm.controls['fromCity'].value==='Durban' && this.userForm.controls['toCity'].value==='Johannesburg' || this.userForm.controls['fromCity'].value==='Johannesburg' && this.userForm.controls['toCity'].value==='Durban')
          {
      
            this.TotalPrice = (this.DJPrice * 0.05) + this.DJPrice;
      
          }
          else if(this.userForm.controls['fromCity'].value==='Pretoria' && this.userForm.controls['toCity'].value==='Cape town' || this.userForm.controls['fromCity'].value==='Cape town' && this.userForm.controls['toCity'].value==='Pretoria')
          {
      
            this.TotalPrice = (this.PCPrice * 0.05) + this.PCPrice;
      
          }
          else if(this.userForm.controls['fromCity'].value==='Pretoria' && this.userForm.controls['toCity'].value==='Johannesburg' || this.userForm.controls['fromCity'].value==='Johannesburg' && this.userForm.controls['toCity'].value==='Pretoria')
          {
      
            this.TotalPrice = (this.PJPrice * 0.05) + this.PJPrice;
      
          }
          else
          {
      
            this.TotalPrice = (this.CJPrice * 0.05) + this.CJPrice;
          }
          
      
   
      const alertName:Alert =this.alertCtrl.create({
        subTitle:'You have successfully made CityBus bookings !! \n' + '\n',
        message:'You travelling from ' + this.userForm.controls['fromCity'].value + '\n' +  '  to ' + this.userForm.controls['toCity'].value + '.'
         + '\n' +  '\n Date: ' + this.userForm.controls['Date'].value + '.'
          + '\n' + '\n Time:' + this.userForm.controls['Time'].value + '\n' + '.' 
          + '\n Number of Seat : ' + this.userForm.controls['seatNum'].value + '\n' +'.'
           + '\n Price :'+ this.TotalPrice +' for each seat',

        buttons:[{text:'ok'}]
            })
       alertName.present();
      //  this.navCtrl.setRoot(ProfilePage);
          }
        }

       
      

  gotProfile(){
    this.navCtrl.push(AccountPage);
  }



}
