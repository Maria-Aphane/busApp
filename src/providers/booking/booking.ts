import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  BookinDetails:firebase.database.Reference;
  currentUser:User;
  firedata=firebase.database().ref('/BookinDetails');
  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.BookinDetails=firebase.database().ref(`/BookinDetails/${user.uid}`)
      }
    })
  }
  getBooking():firebase.database.Reference{
    return this.BookinDetails;
  }
  updateBooking(fromCity:string,toCity:string,Date:string,Time:string,seatNum:Number):Promise<any>{
     return this.BookinDetails.update({fromCity,toCity,Date,Time,seatNum})
  }
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
   }
   getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      let userdata = snapshot.val();
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
  }