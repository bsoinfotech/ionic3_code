import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, App,Platform, ModalController, AlertController ,ToastController} from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { Network } from '@ionic-native/network';

import { AppMinimize } from '@ionic-native/app-minimize';
import { Storage } from '@ionic/storage';
import { User,Api,General } from '../providers';
import {SidebarService} from '../services/sidebar.service';

 //import { AppUpdate } from '@ionic-native/app-update/ngx';
//import { AppUpdate } from '@ionic-native/app-update';


import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'menu.html'
})
export class MyApp {
  rootPage = FirstRunPage;
  rootPageParams:any;

  @ViewChild(Nav) nav: Nav;
  i:any;

  vers:any;
  onesignal_key:any;
  sender_id:any;
  userid:any;
  //pvers:any;


  menutype: any;
  menuPage: any=[];
  pages: any[] = [
  { title: 'Home', component: 'JobPage' },
	{ title: 'How it works for Customer', component: 'Termsinfoc1Page' },
	{ title: 'Terms of service', component: 'TermsinfocPage' },
//  { title: 'Register As Partner', component: 'TermsinfocPage' },
	//	{ title: 'Register your Complain', component: '' },
//    { title: 'Invite others', component: 'SocialsharePage' },
    //{ title: 'Execute P3', component: 'OngoingjobsPage' },
    { title: 'Logout', component: 'MainPage' }
  ]
   pages1: any[] = [
		{ title: 'Home', component: 'DashboardPage' },
		{ title: 'How it works for Partner', component: 'Termsinfo1Page' },

		{ title: 'Terms & Conditions', component: 'TermsinfoPage' },
    { title: 'Extra charge', component: 'ExtrachargePage' },
    { title: 'Add sub cat', component: 'AddsubcatPage' },
    
    
		//{ title: 'Service Rate & Admin Commission', component: 'Job1Page' },

		{ title: 'Invite others', component: 'SocialsharePage' },
		{ title: 'Logout', component: 'MainPage' }

  ]

  url_new  : string = 'https://bsoapp.in/servicefinder/api/ss/api_wbp1.php?action=getlatestversion&data=test';
  
  constructor(private translate: TranslateService,private platform: Platform, settings: Settings, private config: Config,
  private statusBar: StatusBar, private splashScreen: SplashScreen, private network: Network, public modalCtrl: ModalController,
  private appMinimize: AppMinimize, private alertCtrl: AlertController,private storage: Storage,public general: General,
  public api: Api,public user: User, private sidebarService: SidebarService, public http: HttpClient,public  app: App,
  public toastCtrl: ToastController,private ConnectivityServiceProvider:ConnectivityServiceProvider,
  private oneSignal: OneSignal )
  //, private appUpdate: AppUpdate
  
  {
    //------------platform readyness --------------------start
    this.userid=localStorage.getItem('userid');
   // alert ('before platform ready');
    platform.ready().then(() => {

    // alert ('after platform readyabc'+this.userid);

      this.userid=localStorage.getItem('userid');
      //alert ('after platform readyxyz'+this.userid);

  //    alert ("url="+this.url_new);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    //this.splashScreen.show();
      // this.initializeApp();   called later to get onesignal detail from database
 // alert ("Sender_id1234");

//alert('url_new='+this.url_new);

        this.http.get(this.url_new).subscribe((sd: any) =>
        {
//alert ("after Sender_id="+sd.sender_id+'---'+sd.api_url);
          this.initializeApp();

            if(sd.version!='' && sd.version!=null && sd.version!=undefined)
            {
				localStorage.setItem('version',sd.version);
        localStorage.setItem('api_url',sd.api_url);

//alert('api_url_1='+localStorage.getItem('api_url'));

        this.sender_id=sd.sender_id;
        this.onesignal_key=sd.onesignal_key;

				if(sd.status=='3')  // force update
				{

					let profileModal = this.modalCtrl.create('WrongversionPage',{status:sd.status,sms2:sd.sms2,sms3:sd.sms3,link:sd.link});
					profileModal.present();
				}
				else if (sd.status=='2')  // update optional -ask for update
				{
					//this.storage.set('version',this.vers);
						//alert (sd.sms2);
						//("This version is out dated..Install latest version from the link sent to your mobile as sms");
					let profileModal = this.modalCtrl.create('WrongversionPage',{status:sd.status,sms2:sd.sms2,sms3:sd.sms3,link:sd.link});
					profileModal.present();

				}
				else (sd.status=='1')  // active - do nothing
				{
				  // active - do nothing
				}


            }
        });

       // this.initializeApp();

    });

    //------------platform readyness ---------------------end

    //-------------back button action-------------
    this.i=0;
    this.platform.registerBackButtonAction(() => {
    let nav = app.getActiveNavs()[0];
    let activeView = nav.getActive();
		if (nav.canGoBack())
		{ //Can we go back?
				//this.general.hideLoading();
                nav.pop();
    }
		else
		{

    }
    });
    //-------------back button action-------------

    this.initTranslate();
    this.statusBar.hide();

    //-----CALL PAGE --
      this.call_page();
    //------------------


        this.menuPage = sidebarService.menuPage;
        this.sidebarService.sidebarVisibilityChange.subscribe(value => {
        this.menuPage = value;

        });


     setInterval(()=>
    {
      //this.storage.get('utype').then((utype) => {
      //this.storage.get('userid').then((userid)=> {
        if(this.userid!=undefined && this.userid!=null && this.userid!='')
        {

            this.menutype='p';
        

        }
        else
        {
        }

    });

//this.vers = '4';
this.vers = '0.0.1';  // refering to 0.0.25 ,ID=2


  }


  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
 
      if (this.platform.is('cordova')) {
        this.setupPush();
      }

      this.call_page();
    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    
    
   // this.oneSignal.startInit('da587044-b9a4-434d-8480-f9f8cbca019d', '957629372423');
    this.oneSignal.startInit(this.onesignal_key,this.sender_id);
// alert('setupPush='+this.onesignal_key+'--'+this.sender_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert1(title, msg, additionalData.task);
    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
 
     this.showAlert1('Notification opened', 'You already read this before', additionalData.task);
    });
 
    this.oneSignal.endInit();

         // Then You Can Get Devices ID

         this.oneSignal.getIds().then(identity => {
      // alert(identity.pushToken + '-->Push Token');
       //alert(identity.userId + '-->Devices ID');
          localStorage.setItem('device_id',identity.userId);
          localStorage.setItem('pushToken',identity.pushToken);
        });
               
  }

  
  showAlert1(title, msg, task) {
    let alert1 = this.alertCtrl.create({
      //header: title,vice
      message:title+'::'+ msg,
      buttons: [
        {
         // text: `Action: ${task}`,
          text: 'Ok',
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert1.present();
  }
  


  toggleSidebar(data)
  {
    //alert(JSON.stringify(data));
    this.sidebarService.toggleSidebarVisibilty(data)
  }

  showAlert() {
      if (this.nav.getActive().name=='ProfileStatusPage') {
        let confirm = this.alertCtrl.create({
          message: 'Are you sure you want to exit?',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {

                  console.log('Cancel clicked');
                  this.i=0;
              }
            },
            {
              text: 'Ok',
              handler: () => {
              this.i=0;

                  }
            }
          ]
        });
        confirm.present()
      }
      else if (this.nav.getActive().name=='JobhistoryPage')
	  {

		 // this.navCtrl.setRoot('JobPage');
		  //this.navCtrl.push('JobPage');

	  }
	  else

	  {
        let alert = this.alertCtrl.create({
          title: 'Exit?',
          message: 'Do you want to exit?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                alert =null;
              }
            },
            {
              text: 'Exit',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
        });
        alert.present();
      }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
   presentContactModal()
  {
     let contactModal = this.modalCtrl.create('NointernetpagePage');
     contactModal.present();
  }

  openPage(page) {
  if(page.title=='Logout')
    {
        localStorage.setItem('userid','');
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
	//alert ('Page Component='+page.component)
  }

  call_page()
  {
    if(this.userid >0)
    {
     //added on Nov 2021
     this.api.post('checkloginstatus', {userid:this.userid}).subscribe((res1:any) => 
     {

     //  alert('checking app comm userid='+userid);

      // this.rootPageParams = { id: "123", name: "Carl" };
     // <ion-nav [root]="rootPage" [rootParams]="rootPageParams"></ion-nav>

         if(res1.verifystatus=='address')
         {  
          
           localStorage.setItem('userid',this.userid);
           //this.rootPage ='DetailAddressPage';
           this.rootPage ='LoginPage';
           this.rootPageParams = { userid: this.userid };
            //this.navCtrl.push('DetailAddressPage',{userid:userid});
         }
         else if(res1.verifystatus=='contact')
         {

          // this.navCtrl.setRoot('ProfileStatusPage');
           this.rootPage ='ProfileStatusPage';
           this.rootPageParams = { userid: this.userid };
         }
         else if(res1.verifystatus=='cat')
         {
          // this.navCtrl.push('PrimaryBusinessPage');
           this.rootPage ='PrimaryBusinessPage';
           this.rootPageParams = { userid: this.userid };
         }
         else if(res1.verifystatus=='dash')
         {
         //  this.navCtrl.setRoot('DashboardPage');
           this.rootPage ='DashboardPage';
           this.rootPageParams = { userid: this.userid };
          //this.navCtrl.push('DetailAddressPage',{userid:userid});
         }

     });


    }
    else{
//alert('calling---'+FirstRunPage);
      this.rootPage = FirstRunPage;
    }
  }
}
