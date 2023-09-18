import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
 import { Storage } from '@ionic/storage';
import { User,Api,General } from '../../providers';
/**
 * Generated class for the MobilnumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobilnumber',
  templateUrl: 'mobilnumber.html',
})
export class MobilnumberPage {
 
   account: { phone: any, email:any} = 
  { 
    phone: '', 
    email: ''
  };
  
  constructor(public navCtrl: NavController,public user: User,public toastCtrl: ToastController, public general: General, public api: Api,private storage: Storage) {
    this.storage.get('email').then(email=>{
      this.account.email=email;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobilnumberPage');
  }
  doUserLogin() {
    //this.general.showLoading();
       if(this.account.phone=='')
      {
          this.general.showToast('Enter Phone Number');
      }
      else if(this.account.phone.length!='10')
      { 
        this.general.showToast('Phone Number Must be 10 digits');
      }
           else
          {
              this.general.showLoading();
              this.api.post('sendLoginOtp', this.account).subscribe((res:any) => {
                   if(res.status=='success')
                   {    
                      this.general.hideLoading(); 
                      this.general.showToast(res.message); 
                      this.navCtrl.push('OtpPage',{
                        phone:res.phone
                      });                  
                      
                   }
                   else
                   {
                        this.general.hideLoading();
                        this.general.showToast(res.message);
                        
                   }
               });
         }

  }
}
