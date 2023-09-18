import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController ,NavParams,LoadingController ,ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { User,Api,General } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  EMAIL_REGEXP : any = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  signup: { isd_code: any,first_name: string, utype: string, 
      phonenumber: string, email: string,pin: string } = {
      isd_code:'', 
      first_name: '',   
      utype: '',
      phonenumber: '',
      email: '',
      pin:''
  };

utype1:any;
counties:any;

  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,
  public api: Api, public navParams: NavParams,
  public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController) {

    this.signup.utype=this.navParams.get('utype');
    this.utype1=this.navParams.get('utype');
    this.api.get('getCountry').subscribe((res:any) => {
      this.counties=res.counties;

   });
  }

  doUserSignup() {

   if(this.signup.isd_code=='')
   {
      this.general.showToast('Select Country');
    }
    else if(this.signup.first_name=='')
    {
       this.general.showToast('Enter Name');
     }
	 /*

	*/
	 else if(this.signup.phonenumber=='')
    {
       this.general.showToast('Enter Whatsapp Number');
    }
    else if(this.signup.phonenumber.length != 10)
    {
       this.general.showToast('Enter Valid Whatsapp Number');
    }     
     else if(!this.EMAIL_REGEXP.test(this.signup.email) && this.signup.email!='')
    {
      this.general.showToast('Invalid Email');
    }
    else
    {
            this.general.showLoading();


         //   alert("gello="+this.signup.phonenumber+'--'+this.utype1 );

            this.api.post('signupUserp&utype='+'p', this.signup).subscribe((res:any) => {
			//loading.dismiss();

    // alert("hello="+res.message+'--'+res.autootp+'--'+res.otp );

           if(res.status=='success')
           {

              this.general.showToast(res.message);
              this.navCtrl.push('OtpPage',{isd_code:this.signup.isd_code,email:this.signup.email,name:this.signup.first_name,otp:res.otp,autootp:res.autootp,phone:this.signup.phonenumber,utype:this.utype1,pin:this.signup.pin });

			  // this.navCtrl.push('OtpPage', { otp:res.opt,autootp:res.autootp,phone:res.phone,utype:this.utype });
			  this.general.hideLoading();



           }
           else
           {
              this.general.hideLoading();
			 // loading.dismiss();
              this.general.showToast(res.message);
           }
       });
}


  }
}
