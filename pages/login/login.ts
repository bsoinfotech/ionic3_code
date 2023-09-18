import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams ,ModalController,AlertController,LoadingController} from 'ionic-angular';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';private fb: Facebook,
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

import { Network } from '@ionic-native/network';  
//import { Subscription } from 'rxjs/Subscription';

import { User,Api,General } from '../../providers';
 

@IonicPage() 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage { 
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  
  //connected: Subscription;  //biplab
  //disconnected: Subscription;
  
    account: {isd_code: any, phone: any, email: string, utype: string, device_id: string} = 
  { 
    isd_code: '',
    phone: '',
    utype: '',
    email: '' ,
    device_id: ''
  };
  
utype:any;
cvers:any;
pvers:any;
counties:any;

//url_new  : string = 'https://bsoinfotech.com/servicefinder/api/api_prod.php?action=getlatestversion&data=test';

   constructor(public navCtrl: NavController,public user: User,public toastCtrl: ToastController, public general: General, 
   public api: Api,private storage: Storage,public http: HttpClient, public navParams: NavParams, private fb: Facebook, 
   private googlePlus: GooglePlus,private network: Network,public loadingCtrl: LoadingController,
   private ConnectivityServiceProvider:ConnectivityServiceProvider,public modalCtrl: ModalController)
   {
      this.account.utype=this.navParams.get('utype');
      this.utype=this.navParams.get('utype');
     // alert('api_url_login='+localStorage.getItem('api_url'));

     // alert('login screen');
     
       	this.api.get('getCountry').subscribe((res:any) => {
          this.counties=res.counties;

          //alert('country status='+res.status+'--'+res.counties[0].isd_code);



       });

       if(localStorage.getItem('device_id'))
       {
        this.account.device_id=localStorage.getItem('device_id');
       }



     // alert ('Device_id='+this.account.device_id);
     // });
  }

  // Attempt to login in through our User service
  doUserLogin() {

 // alert('xxx='+this.account.isd_code);
      //this.general.showLoading();
      if(this.account.isd_code==''||this.account.isd_code==undefined)
      {
          this.general.showToast('Select Country');
      }
      else if(this.account.phone=='')
      {
          this.general.showToast('Enter Whatsapp Number');
      }
      else if(this.account.phone.length!='10')
      { 
        this.general.showToast('Whatsapp Number Must be 10 digits');
      }
           else
          {
			

			/*			
				//----------------added on Apr 05 ---------------------------------
				//this.cvers = '22';
				this.pvers = '22';
				
				//alert('usertype='+this.utype);
				
			if (this.utype=='p') //for partner
			{
			//this.api.post('getlatestversion').subscribe((sd:any) => 
			        this.http.get(this.url_new).subscribe((sd: any) => 
			{
				if(sd.version!='' && sd.version!=null && sd.version!=undefined)
				{

						if(sd.ref2!=this.pvers)
						{
						let profileModal = this.modalCtrl.create('WrongversionPage');
						profileModal.present();

						}
						else
						{
						  //--------------------------------------------------							
							let loading = this.loadingCtrl.create({
							spinner:'hide',
							content: '<img src="assets/img/busy.gif">',
							dismissOnPageChange: true 
							//content: 'Loading Please Wait...'
							});
							loading.present();

							this.api.post('sendLoginOtp', this.account).subscribe((res:any) => {

							   if(res.status=='success')
							   {    
								  this.general.showToast(res.message); 
								  this.navCtrl.push('OtpPage', { phone:res.phone,utype:this.utype });                  
								  loading.dismiss();
							   }
							   else
							   {
									this.general.showToast(res.message);
									loading.dismiss();

							   }
							});
						   //---------------------------------------------------							

						}


				}			  

			});
			  
			}
			else   /// for customer
			{
				
			*/	
			  //--------------------------------------------------							
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true 
				//content: 'Loading Please Wait...'
				});
				loading.present();

      //  this.storage.get('device_id').then(device_id=>{

        
        
            this.api.post('sendLoginOtp', this.account).subscribe((res:any) => {
//alert('sendloginotp='+this.account);
//alert('status='+res.status);
                      if(res.status=='success')
                      {    
                          this.general.showToast(res.message); 
                          this.navCtrl.push('OtpPage', {isd_code:this.account.isd_code, otp:res.otp,autootp:res.autootp,phone:res.phone,utype:this.utype }); 
                         // this.navCtrl.push('OtpPage',{email:this.signup.email,name:this.signup.first_name,
                          //  otp:res.otp,autootp:res.autootp,phone:this.signup.phonenumber,utype:this.utype1,pin:this.signup.pin });                 
                          loading.dismiss();
                      }
                      else
                      {
                this.general.showToast(res.message);
                loading.dismiss();

                      }
            });
            
        
      //  });

			   //---------------------------------------------------				
				
			//}
			  
			  

         }

  }
  signupTapped(utype) 
  {

			
			
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true 
						});
				loading.present();
				
				/*	
				if (this.network.type === 'none' )  
				{
					
					alert('Please Check your network connection!');
					loading.dismiss();
					//this.general.showLoading();
					//return true;
					
				}
				*/
				
				this.navCtrl.push('SignupPage', {utype:utype});
				loading.dismiss();
	
  }

 //-------------- added by biplab to check network connection
 /* 
  displayNetworkUpdate(connectionState: string){
	 // let networkType = this.network.type
	  
	    		let toast = this.toastCtrl.create({
				message: 'You are now ' +connectionState, 
				//message: 'You are now ' +connectionState+ ' via '+networkType,  				
				duration: 3000,
				position: 'bottom'
				});
				toast.present();
	  
	  
  }

ionViewWillLeave(){
	this.connected.unsubscribe();
	this.disconnected.unsubscribe();
	
	
}


  ionViewDidEnter() {
	  this.connected = this.network.onConnect().subscribe(data =>{
		  console.log(data)
		  
		  this.displayNetworkUpdate(data.type);
	  },error =>console.error(error));
	  
	  this.disconnected = this.network.onDisconnect().subscribe(data =>{
		  console.log(data)
		  this.displayNetworkUpdate(data.type);
		             let alert = this.alertCtrl.create({
               title: 'Network was disconnected :-(',
               subTitle: 'Please check your connection. And try again',
               buttons: ['OK']
           });
           alert.present();
	  },error =>console.error(error));
  }  
*/
 //-----------------------------------------------------------

googleLogin(){
    this.googlePlus.login({}).then(resp => {
      this.api.post('sociallogin', {email:resp.email,name:resp.displayName,type:'google',id:resp.id,picture:resp.imageUrl}).subscribe((res: any) => {
          if(res.status=='success'){
            localStorage.setItem("userid",res.user.id);
            localStorage.setItem("utype",this.utype);
                if(this.utype=="c")
                {
                  this.navCtrl.push('RegDetailsPage',{ uid:res.user.id});
                }
                else
                {
                  this.navCtrl.setRoot('RefferalPage',{ uid:res.user.id, utype:this.utype});
                }
          }
      });

 }).catch(e => {
      this.general.showToast('Some Error Occured Try Again');
    }); 
 }




doSocialLogin()
  {   
  
 
     
     this.fb.login(['public_profile', 'email'])    	 
     .then((respa: FacebookLoginResponse) => { 
       this.http.get("https://graph.facebook.com/v2.6/me", { params: { access_token: respa.authResponse.accessToken, fields: "id,name,email,gender,picture", format: "json" }}).subscribe((resp:any) => {
         this.general.showLoading();

	  
       this.api.post('sociallogin', {email:resp.email,name:resp.name,type:'facebook',id:resp.id,picture:resp.picture.data.url,utype:this.utype}).subscribe((res:any) => {
           if(res.status=='success'){    
  
              this.general.hideLoading();    
             this.general.showToast(res.message);         
             localStorage.setItem("userid",res.user.id); 
             localStorage.setItem("utype",this.utype);
             if(this.utype=='c')
              {
                this.navCtrl.push('RegDetailsPage',{ uid:res.user.id});
               }
              else
              {
                this.navCtrl.setRoot('RefferalPage',{ uid:res.user.id, utype:this.utype});
              }
           }
           else
           {
            this.general.showToast('Some Issues occured'); 
           }
         });
       });
     })
     .catch(e => {
        this.general.showToast('Some Error Occured Try Again');
     });
     
     
   } 
}
