import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController,AlertController,ModalController, LoadingController,ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
declare var cordova: any;

const target = '_blank';
const options = 'location=yes,zoom=no,hideurlbar=yes,hidenavigationbuttons=yes,clearcache=yes,clearsessioncache=yes,hardwareback=no,closebuttoncolor=#f04141';
//const iabRef2 = cordova.InAppBrowser.open(this.link, target, options);

/**
 * Generated class for the WrongversionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valinvoice',
  templateUrl: 'valinvoice.html',
})
export class ValinvoicePage {
  private iabRef2;
  
  link:any;
  body:any;
  title:any;
  userid:any;
  pp_plan_name:any;
  pp_plan_status:any;
  valid_pp:any;


  //constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,private socialSharing: SocialSharing, public modalCtrl: ModalController)

  constructor(private iab: InAppBrowser,private platform: Platform,public navCtrl: NavController, public api: Api,public navParams: NavParams,public modalCtrl: ModalController,public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,private storage: Storage,private alertCtrl: AlertController)
  {

  this.userid=this.navParams.get('userid');
  this.body=this.navParams.get('body');
  this.title=this.navParams.get('title');
  this.link=this.navParams.get('link');
  }


  

dismiss()
{
   //let data = { 'foo': 'bar' };
  // this.viewCtrl.dismiss(0);
   this.platform.exitApp();
 }



  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ValinvoicePage');
  }

  gotoplan()
  {
    this.api.post('getmysubs',{userid:this.userid}).subscribe((res1:any) => {
      // this.service.getmysubs(this.loggedInUserId).subscribe(async res1 => {    
         this.pp_plan_name=res1.pp_plan_name;
         this.pp_plan_status=res1.pp_plan_status;
         this.valid_pp=res1.valid_pp;   
         });
         if(this.valid_pp==1)
         {
          this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
         }
         else
         {
          if(this.platform.is("cordova"))
          {
            alert('starting at cordova platform');
            const browser = this.iab.create(this.link,'_self',{location:'no', zoom:'no'}); 
            //const browser: InAppBrowserObject = this.iab.create(yourUrl, "_blank", "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"); //no spaces allowed in Options!


    browser.on('loadstart').subscribe((e) => { 
      console.log(e.url);
      alert('closing url='+e.url);
    // alert('last url='+ e.url.substr(e.url.lastIndexOf('/') );
    //  if (e.url == theOtherUrl) {
     //   browser.close();
     // }
    });
              /*
               // const target = '_blank';
                const target = '_self';
                const options = 'location=yes,zoom=no,hideurlbar=yes,hidenavigationbuttons=yes,clearcache=yes,clearsessioncache=yes,hardwareback=no,closebuttoncolor=#f04141';
                //this.iabRef2 = cordova.InAppBrowser.open(this.link, target, options);
                const iabRef2 = cordova.InAppBrowser.open(this.link, target, options);
                iabRef2.addEventListener('loadstart', function(params, callback) 
                {
                  alert('params.url='+params.url);
                  if(params.url.match("closepage"))
                  {
                    alert('matching found..closing apps');
                    iabRef2.close();
                  }               
                });

                */
                
                //------------------------
               // this.iabRef2.addEventListener('message', this.messageCallBack);
                

                //------------------------
          }
          else
          {

            alert('starting at windows platform');
           // const browser = this.iab.create(this.link,'_blank',{location:'yes', zoom:'no'}); 
            //const browser: InAppBrowserObject = this.iab.create(yourUrl, "_blank", "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"); //no spaces allowed in Options!
            this.iabRef2 = this.iab.create(this.link,'_blank',{location:'yes', zoom:'no'}); 

            this.iabRef2.on("loadstart")
              .subscribe(
                (event_data) => {
                  alert('starting loadstart');
                  console.log(event_data);
                  if (event_data.url.indexOf("this.link") > -1) 
                  {
                     this.iabRef2.close();
                  }
                },
                err => {
                  console.log("InAppBrowser loadstart Event Error: " + err);
                });


          }
         }  
  }

  messageCallBack(params) {
    /* Close the InAppBrowser if we received the proper message */
    if (params.data.action == 'close') 
    {
      this.iabRef2.close();
    }
  }

  postCordovaMessage() {
    /* Send an action = 'close' JSON object to Cordova via postMessage API */
    var message = {action: 'close'};
    if (!(window as any).webkit.messageHandlers.cordova_iab) {
      console.warn('Cordova IAB postMessage API not found!');
      throw 'Cordova IAB postMessage API not found!';
    } else {
      console.log('Message sent!');
     // webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(message));
      (window as any).webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(message));
    }
  }

}
