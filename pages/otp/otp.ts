import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  otpverify: {isd_code:any, otp: any ,otpenter:any, phone: any, utype: any,pin:any,device_id:any,email:any,name:any,autootp:any} =
  {
    isd_code:'',
    otp: '',
    otpenter:'',
    phone:'',
    utype:'',
    pin:'',
    device_id:'',
    email:'',
    name:'',
    autootp:''
  };

	banners:any;
	categories:any;
	location: any;
	userid:any;
	userid1:any;

	timeInSeconds:any;
	 time:any;
    runTimer:any;
    hasStarted:any;
    hasFinished:any;
    remainingTime:any;
	displayTime:any;
	autootp:any;
	otpvalue:any;
	phoneno:any;
  teamaccess:any;

  showrefer:any;
  jobimage:any;
  adslist:any;
  currentdeals:any;
  showsspromise:any;
  promiseimage:any;
  cstory:any;
  ssphone:any;




  constructor(public navCtrl: NavController,public user: User,public general: General,public api: Api,public navParams: NavParams,
  private storage: Storage,public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,
  private alertCtrl: AlertController) {

  this.otpverify.isd_code=this.navParams.get('isd_code');
  this.otpverify.phone=this.navParams.get('phone');
  this.otpverify.utype=this.navParams.get('utype');
  this.otpverify.pin=this.navParams.get('pin');
  this.otpverify.autootp=this.navParams.get('autootp');
  this.otpverify.otp=this.navParams.get('otp');
  this.otpverify.email=this.navParams.get('email');
  this.otpverify.name=this.navParams.get('name');

    
    this.otpverify.device_id=localStorage.getItem('device_id');
   // this.otpverify.device_id='1111111111111id';

    // alert ('Device_id='+this.otpverify.device_id);
 




   }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OtpPage');
        /* 
				   this.api.post('getuser_id',{phonenumber:this.otpverify.phone}).subscribe((res:any) => {

                   if(res.status=='success')
                   {
                      this.userid=res.userid;
					  this.userid1=res.userid;
            this.storage.set('userid',res.userid);
					
                   }

				   this.api.post('save_version',{phonenumber:this.otpverify.phone,version:'1.0.0'}).subscribe((res:any) => {

                   if(res.status=='success')
                   {

					//this.general.showToast('userid='+this.userid);
                   }
				   });

            this.api.post('getteamaccess',{userid:this.userid}).subscribe((res:any) => {

      			       if(res.status=='success')
                  {
                        this.teamaccess=1;

                  }
                  else
                  {
                        this.teamaccess=0;
                  }
      			});



      });

      */

				   //----------------------------------------------



				   //------------------------------------------------
  }
	verifyOtp()
	{
    
    //alert('OTP='+this.otpverify.otp+'--'+this.otpverify.otpenter);

		if(this.otpverify.otpenter=='')
		{
              this.general.showToast('Please Enter Otp');
		}
		else if (this.otpverify.otp!=this.otpverify.otpenter)
    {
      this.general.showToast('Invalid OTP Entered');
    }
    else
		{


				//this.general.showLoading();
					let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true
				//content: 'Loading Please Wait...'
				});
				loading.present();


              this.api.post('verifyOtp', this.otpverify).subscribe((res:any) => {
				//loading.dismiss();
                   if(res.status=='success')
                   {


                        if(res.utype=="p")
                        {

                        //  alert('res.uid='+res.uid);
                               this.api.post('checkloginstatus', {userid:res.uid}).subscribe((res1:any) => {
                                    if(res1.status=='success')
                                    {
                                        //  this.storage.set("userid",res1.uid);
                                        //  this.storage.set("utype",res1.utype);
                                        localStorage.setItem("userid",res.uid);
                                        localStorage.setItem("utype",res.utype);
                                         
                                          //this.navCtrl.setRoot('PrimaryBusinessPage');
                                          //this.navCtrl.push('RefferalPage');

                                        if(res.rstatus=='true')
                                        {

                                          this.navCtrl.push('RefferalPage',{userid:res1.uid});
                                        }
                                        else if(res1.verifystatus=='address')
                                        {
                                         
                                         // this.storage.set("userid",res1.uid);
                                         // this.storage.set("utype",res1.utype);
                                       // alert('calling page DetailAddressPage'+res1.uid);
                                          this.navCtrl.push('DetailAddressPage',{userid:res1.uid});
                                        }
                                        else if(res1.verifystatus=='contact')
                                        {
                                         // this.storage.set("userid",res1.uid);
                                         // this.storage.set("utype",res1.utype);
                                          this.navCtrl.setRoot('Profile1Page',{userid:res1.uid});
                                        }
                                        else if(res1.verifystatus=='cat')
                                        {
                                         // this.storage.set("userid",res1.uid);
                                         // this.storage.set("utype",res1.utype);
                                          this.navCtrl.push('PrimaryBusinessPage',{userid:res1.uid});
                                        }
                                        else if(res1.verifystatus=='dash')
                                        {
                                         // this.storage.set("userid",res1.uid);
                                         // this.storage.set("utype",res1.utype);
                                          this.navCtrl.setRoot('DashboardPage',{userid:res1.uid});
                                        }
                                        else
                                        {
                                         // this.storage.set("userid",res1.uid);
                                          this.navCtrl.push('ProfileStatusPage',{userid:res1.uid});
                                        }
                                        
                                      //  {
                                          //this.navCtrl.push('PrimaryBusinessPage');
                                        // test  this.navCtrl.push('DetailAddressPage',{page:'registration'});
                                       // this.navCtrl.push('ProfileStatusPage');  //test
                                       // }

                                    }
                                   else
                                   {

                                    alert('Facing some issue with your account.. Please connect admin');

                                   }
//this.general.hideLoading();
                               });

                        }
loading.dismiss();
// this.general.hideLoading();


                   }
                   else
                   {
//this.general.hideLoading();
                        this.general.showToast(res.message);

                   }
               });
loading.dismiss();

		}
 	}
  resendOtp()
  {
     this.api.post('sendLoginOtp', this.otpverify).subscribe((res:any) => {
                   if(res.status=='success')
                   {
                       // this.general.hideLoading();
                      //  this.general.showToast(res.message);
					this.initTimer();
					this. startTimer();
						let toast = this.toastCtrl.create({
							message: res.message,
							duration: 8000,
							position: 'bottom'
						});
						toast.present();

                   }
                   else
                   {
                       // this.general.hideLoading();
                        this.general.showToast(res.message);

                   }
               });
  }
//==================================================timer ===========================

ngOnInit() {

	//alert('phone='.this.otpverify.phone);


		this.initTimer();
		this.startTimer();
  }

  initTimer() {
     // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      //this.timeInSeconds = 1500;
	  this.timeInSeconds = 40;
    }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
  //  hoursString = (hours < 10) ? "0" + hours : hours.toString();
   // minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    //return hoursString + ':' + minutesString + ':' + secondsString;
	return secondsString;
  }

//===================================timer end =========================================

}
