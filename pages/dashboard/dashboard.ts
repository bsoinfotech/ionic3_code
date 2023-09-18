import { Component } from '@angular/core';
import { IonicPage, App,Platform,NavController, NavParams, ToastController,ModalController,AlertController,LoadingController } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var cordova: any;

//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';




@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private iabRef;
not_count:any;
allleadcount:any;
todaycount:any;
currentpackage:any;
text:any;
text2:any;
provider_type:any;
overall_rating:any;
rating_count:any;
categories:any;
minbal:any;
minbal_msg:any;
image:any;
status_desc:any;
ref3:any;
ref5:any;
out_data:any;
reopened:any;
menu_hdr:any;
catinfo : any;
linecount:any;
message:any;
access_no:any;
user_id:any;
input1:any;
input2:any;
input3:any;
input4:any;
input5:any;
input6:any;
ref1:any;
ref2:any;
company_id:any;

company_name:any;
busi_phone:any;
busi_whatsapp:any;
busi_logo:any;
currency_id:any;
country_id:any;
sitelink:any;
share_msg:any;
share_msg1:any;
busitype_id:any;
banners:any;
userid:any;
link:any;
businessname:any;
package_name:any;
plan_valid:any;
valid_till:any;
pp_plan_name:any;
pp_plan_status:any;
valid_pp:any;
payment_link:any;

body:any;
title:any;
token:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User,
  private storage: Storage, public modalCtrl: ModalController,private alertCtrl: AlertController,
private appMinimize: AppMinimize,public  app: App,private platform: Platform,public toastCtrl: ToastController,
public loadingCtrl: LoadingController,private socialSharing: SocialSharing
,private iab: InAppBrowser
) {

 // this.storage.get('userid').then(userid=>{
    

  //  alert('hahahahaha='+userid);
 // alert('try luck'+ navParams.get('userid'));
  this.userid=this.navParams.get('userid');
   if (this.userid=='0' || this.userid=='' ||this.userid=='undefined' )
   {
   // alert('calling storage.get(userid)');
    //this.userid=this.storage.get('userid');
    this.userid= navParams.get('userid');
   // alert('extracting from navParams='+this.userid);
   }

   if (this.userid>0)
   {
    this.api.post('getcompanydtl',{userid:this.userid}).subscribe((res:any) => 
    {
      this.company_name=res.company_name;
      this.busi_phone=res.busi_phone;
      this.busi_whatsapp=res.busi_whatsapp;
      this.busi_logo=res.busi_logo;
      this.currency_id=res.currency_id;
      this.country_id=res.country_id;
      this.busitype_id=res.busitype_id;
      this.company_id=res.company_id;
      this.sitelink=res.sitelink;
      this.token=res.token;
     
   

      this.api.post('getmysubs',{userid:this.userid}).subscribe((res1:any) => {
     // this.service.getmysubs(this.loggedInUserId).subscribe(async res1 => {    
        this.pp_plan_name=res1.pp_plan_name;
        this.pp_plan_status=res1.pp_plan_status;
        this.valid_pp=res1.valid_pp;  
        this.payment_link=res1.payment_link;  
        this.check_plan(this.valid_pp);

        });

       // alert('bsobanner='+this.country_id+'--'+this.busitype_id);
        this.api.post('getbsobanner',{userid:this.userid,country_id:this.country_id,busitype_id:this.busitype_id}).subscribe((res:any) => 
        {
          this.banners=res.banners;
        });

    });
      this.api.post('getnotificationscount',{userid:this.userid}).subscribe((res:any) => {
      this.not_count=res.not_count;

      });
      this.api.post('dashboardcounts',{userid:this.userid}).subscribe((res:any) => {
        this.allleadcount=res.allleadcount;
        this.todaycount=res.todaycount;
        this.provider_type=res.provider_type;
        this.reopened=res.reopened;
      });
      this.api.post('currentbalance',{userid:this.userid}).subscribe((res:any) => {
      this.currentpackage=res.currentpackage;
      this.minbal=res.minbal;
      this.minbal_msg=res.minbal_msg;
      });
      this.api.post('dashboardtext',{userid:this.userid}).subscribe((res:any) => {
      this.text=res.text;
      this.text2=res.text2;
      this.image=res.image;
      this.overall_rating=res.overall_rating;
      this.rating_count=res.rating_count;
      });


      this.api.post('summaryscreen2',{userid:this.userid}).subscribe((res:any) => {
      this.out_data=res.out_data;
      //  this.out_data=res.cust_total;
      this.company_id=res.company_id;
      this.share_msg=res.share_msg;
      this.busi_logo=res.busi_logo;
      this.businessname=res.businessname;

   

      });
      this.api.post('getstatus',{userid:this.userid}).subscribe((res:any) => {
        this.status_desc=res.status_desc;
        this.ref3=res.ref3;
        this.ref5=res.ref5;

        if(res.status_code=='2'||res.status_code=='3')
        {
          //this.storage.set("userid",this.userid);
          this.navCtrl.setRoot('ProfileStatusPage',{userid:this.userid});
        }
        else
        {
          if (this.ref3==2||this.ref3==3)
          {
          let profileModal = this.modalCtrl.create('ProviderpopupPage',{status:this.ref3,sms2:this.ref5,sms3:this.ref5,link:this.ref5});
          profileModal.present();
          }
        }


        });
   }
   else
   {

    this.navCtrl.setRoot('LoginPage');
    /*
    this.storage.get('userid').then(userid=>{
      this.userid=userid;
      if (this.userid>0)
      {
        this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
       // this.navCtrl.push('DashboardPage',{userid:userid});
      }
      else
      {
        alert('Data Fetching issue..Please re-loging please ');
      //  this.storage.set('userid','');
       // this.navCtrl.setRoot('MainPage');
      }

    });
    */
   }

  }



//biplab phase2 08/24 -start
  goPopuppage(){

  let contactModal = this.modalCtrl.create('CustomercarePage');
        contactModal.onDidDismiss(data =>{
        });
        contactModal.present();
  }
 //biplab phase2 08/24 -end

 refer()
 {
   this.navCtrl.push('SocialsharePage',{userid:this.userid});
 }

  gotoWallet()
  {
    this.navCtrl.push('WalletPage',{userid:this.userid});
  }

gotoTeam()
{
  this.navCtrl.push('TeamPage',{userid:this.userid});
}

gotoAgent()
{
  this.navCtrl.push('AgentmanagementPage',{userid:this.userid});
}


  ionViewDidLoad() 
{
    console.log('ionViewDidLoad DashboardPage');
    this.userid=this.navParams.get('userid');

    if(this.userid>0)
    {
      this.api.get('getmenu_hdr',{userid:this.userid,company_id:''}).subscribe((res:any) => {         
             if(res.status=='success')
             {      
                 this.menu_hdr=res.menu_hdr;                 
             }
             else
             {
                 // this.general.hideLoading();
                  this.general.showToast(res.message);
                  
             }
         });
        }
        else
        {
         // this.storage.set('userid','');
         this.navCtrl.setRoot('LoginPage');
        } 
  }



  gotoPage(page,userid)
  {
  	this.navCtrl.push(page,{userid:userid});
  }

  gotoPage1()
  {
	  if(this.currentpackage<this.minbal)
	  {
		  //alert (this.minbal_msg);
	  }

    this.navCtrl.setRoot('TodayongoingjobsPage',{userid:this.userid});
  }
  gotoPage2()
  {
	  // add here....
	 // alert ('curren bal='+this.currentpackage+'  '+this.minbal+' '+this.minbal_msg);
	  if(this.currentpackage<this.minbal)
	  {
		  //alert (this.minbal_msg);
	  }
	  this.navCtrl.setRoot('NewleadsPage',{userid:this.userid});
  }

  gotoPage3()
  {
    this.navCtrl.setRoot('ProfileStatusPage',{userid:this.userid});
  }

 refresh_screen()
{
    this.navCtrl.setRoot('DashboardPage',{userid:this.userid});
}

  gotoProviderPage()
  {

              let contactModal = this.modalCtrl.create('ProvidernotificationPage',{userid:this.userid});
                contactModal.onDidDismiss(data =>{
                    this.not_count=data;
                });
                contactModal.present();
  }
/*
  check_plan(valid_plan) {
    //----------------------------
  if(valid_plan==0)
  {
    let alert = this.alertCtrl.create({
      title: 'Buy Subscription/Credits',
      message: 'Your Subscription expired. Please buy a Subscription plan to proceed ..?  Click Ok to Proceed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert =null;
            this.platform.exitApp();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            //this.platform.exitApp();
            this.gotoplan();
          }
        }
      ]
    });
    alert.present();
  }


    }
  */
  check_plan(valid_plan) 
  {
      //----------------------------
    if(valid_plan==0)
    {
        this.link=this.payment_link+'='+this.userid;
        this.title='Buy Subscription/Credits';
        this.body= 'Your Subscription expired. Please buy a Subscription plan to proceed.';
        let profileModal = this.modalCtrl.create('ValinvoicePage',{userid:this.userid,title:this.title,body:this.body,link:this.link});
        profileModal.present();
    }
  }  
  logOut()
  {
  	 this.storage.set('userid','');
  	 this.navCtrl.setRoot('MainPage');
  }

    rate_commision(userid)
  {
  	//this.storage.get('userid').then(userid=>{
  	// this.navCtrl.setRoot('Job1Page',{userid:userid});
	 this.navCtrl.push('Job1Page',{userid:this.userid});
	//});
  }
Trainning_KB(userid)
{

 //this.navCtrl.push('Job1Page');

}

gotoplan()
{
                 //https://bsoinfotech.com/bsoitsample/home?userid=18738
                 
                 alert('Opening WebSite->'+this.payment_link);
                 this.link=this.payment_link+'?userid='+this.userid;
                 window.open(this.link, '_system','location=yes');

                  
 /*
                 if(this.platform.is("cordova"))
                 {

                       const target = '_blank';
                       const options = 'location=yes,zoom=no,hideurlbar=yes,hidenavigationbuttons=yes,closebuttoncolor=#f04141';
                       // const refLink = this.iab.create(link, target, options);

                       const iabRef2 = cordova.InAppBrowser.open(this.link, target, options);

                       iabRef2.addEventListener('loadstop', function(params, callback) {
                       //alert('params.url='+params.url+'>>>>>'+params.url.substr(params.url.lastIndexOf('/')));
                      // if (params.url.substr(params.url.lastIndexOf('/') + 1) === 'formResponse') 
                     // if (params.url.substr(params.url.lastIndexOf('/')) === '/') 
                     // {
                      // iabRef2.close();
                      // }
                      
                       if(params.url.match("closepage"))
                       {
                         alert('matching found..closing apps');
                         iabRef2.close();
                       }
                      
                       });

                       //------------------------
                 }
                 else
                 {
                 window.open(encodeURI(this.link));
                 }
    */

}

  reopened_ord(var1)
  {

     //alert ('Value='+var1);
      this.navCtrl.push('OrddetailPage',{var1:var1,userid:this.userid});
  }
  backlog_ord(var1)
  {
    this.navCtrl.push('OrddetailPage',{var1:var1,userid:this.userid});
  }
    today_ord(var1)
  {
    this.navCtrl.push('OrddetailPage',{var1:var1,userid:this.userid});
  }
    tomorrow_ord(var1)
  {
    this.navCtrl.push('OrddetailPage',{var1:var1,userid:this.userid});
  }

  loadpage(id,screen_name,company_id,userid,ref1,ref2,ref3,input1,input2,input3,input4,input5,input6,input7,input8)
	{

   // (c.id,c.pagename,'',userid,c.id,c.ref2,c.ref3,input1,input2,input3,'','','','','')">

   //alert ('loadpage='+userid+'--'+this.userid+'--'+company_id+'--'+screen_name);

    this.linecount=0;

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();
      

      //this.api.get('getSubmenu',{id:id,userid:this.user_id,company_id:company_id,ref1:ref1,ref2:ref2,ref3:ref3,input1:input1,input2:input2,input3:input3,input4:input4}).subscribe((res123:any) => 
      this.api.get('getSubmenu',{id:id,userid:userid,company_id:company_id}).subscribe((res123:any) => 
    {
     
      
      loading.dismiss();   
                 if(res123.status=='success')
                 {    
                      this.catinfo=res123.catinfo;
                      this.linecount=res123.linecount;                       
                      this.message=res123.message;
                      this.access_no= res123.access_no;
                      this.input1 =res123.input1;
                      this.input2 =res123.input2;
                      this.input3 =res123.input3;
                      this.input4 =res123.input4;
                      this.input5 =res123.input5;
                      this.input6 =res123.input6;
                      this.ref1=res123.ref1;
                      this.ref2=res123.ref2;
                      this.ref3=res123.ref3;

                      if(this.linecount>1)
                      {
                        
                        this.navCtrl.push('MenulistPage',{scatarr:this.catinfo,company_id:this.company_id,userid:userid});
                      } 
                      else if (this.linecount==1)
                      {
                          if (this.access_no==1)
                          {
    //alert ('haha='+screen_name+'--'+company_id+'--'+this.catinfo[0].app_web);
                           

                            if(this.catinfo[0].app_web=='A')
                            {
             
                              this.navCtrl.push(screen_name,{company_id:company_id,userid:userid,ref1:this.ref1,ref2:this.ref2,ref3:this.ref3,input1:this.input1,input2:this.input2,input3:this.input3,input4:this.input4,input5:this.input5,input6:this.input6});
                            }
                            else if(this.catinfo[0].app_web=='E')
                            {
                              this.link=this.catinfo[0].base_link;
                              alert('Opening WebSite->'+this.link);
                              window.open(this.link, '_system','location=yes');
                            }
                            else
                            {  //call web link
                              //https://bsoinfotech.com/bsoitsample/home?userid=18738
                              if (this.catinfo[0].p1!='')
                              {
                                if (this.catinfo[0].p1=='userid')
                                {
                                  this.link=this.catinfo[0].base_link+this.catinfo[0].p1+'='+userid;
                                }
                                if (this.catinfo[0].p1=='company_id')
                                {
                                  this.link=this.catinfo[0].base_link+this.catinfo[0].p1+'='+company_id;
                                }
                                if (this.catinfo[0].p1=='token')
                                {
                                  this.link=this.catinfo[0].base_link+this.catinfo[0].p1+'='+this.token;
                                }
                              //  alert('link='+this.link);
                              }

                              if (this.catinfo[0].p2!='')
                              {

                                if (this.catinfo[0].p2=='company_id')
                                {
                                  this.link=this.link+'&'+this.catinfo[0].p2+'='+company_id;
                                }
                                if (this.catinfo[0].p2=='token')
                                {
                                  this.link=this.link+'&'+this.catinfo[0].p2+'='+this.token;
                                }
                              //  alert('link='+this.link);
                              }
 
                             // const browser = this.iab.create(this.link,'_self',{location:'no', zoom:'no'}); 
                             // browser.show();
                             // browser.close();
                              if(this.platform.is("cordova"))
                              {
                              // Run the in app browser code
                                    //---testinng---
                                   // alert('params.ur22l1111');
                                    const target = '_blank';
                                    const options = 'location=yes,zoom=no,hideurlbar=yes,hidenavigationbuttons=yes,closebuttoncaption=Back to Dashboard ,closebuttoncolor=#f04141';
                                    // const refLink = this.iab.create(link, target, options);

                                    const iabRef2 = cordova.InAppBrowser.open(this.link, target, options);

                                    iabRef2.addEventListener('loadstop', function(params, callback) {
                                    //alert('params.url='+params.url+'>>>>>'+params.url.substr(params.url.lastIndexOf('/')));
                                   // if (params.url.substr(params.url.lastIndexOf('/') + 1) === 'formResponse') 
                                  // if (params.url.substr(params.url.lastIndexOf('/')) === '/') 
                                  // {
                                   // iabRef2.close();
                                   // }
                                   
                                    if(params.url.match("closepage"))
                                    {
                                      //alert('matching found..closing apps');
                                      iabRef2.close();
                                    }
                                   
                                    });

                                    //------------------------
                              }
                              else
                              {
                              window.open(encodeURI(this.link));
                              }



                            }
                          }
                          else
                          {
                  
                            // call function for that access_no <>1
                            let toast = this.toastCtrl.create({
                              message: this.message,
                              duration: 3000,
                              position: 'bottom'
                            });
                            toast.present();
                          }
                      }
                 }
                 else
                 {

                      this.general.showToast(res123.message);
                 }
	
    }); 

	}	

shareInfo(company_id,msg_type)
{
  let loading =  this.loadingCtrl.create({
  spinner:'hide',
  content: '<img src="assets/img/busy.gif">',
  //dismissOnPageChange: true
  duration: 3000
  });
  loading.present();

  this.api.post('get_company_info',{company_id:company_id,msg_type:msg_type}).subscribe((res:any) => 
  {
    if(res.status=='success')
    {   
      this.socialSharing.share(res.base_msg,res.title,res.image1,res.sitelink).then(() => 
        {
        //alert("Sharing success");
        // Success!
        }).catch((e) => {
        // Error!

        alert("Share failed..");
        });
        loading.dismiss();
    }
    else
    {
        this.general.showToast(res.msg);
    }    
  });  
}

  shareInfo1(referalcode,price)
  {
    let loading =  this.loadingCtrl.create({
    spinner:'hide',
    content: '<img src="assets/img/busy.gif">',
    //dismissOnPageChange: true
    duration: 3000
    });
    loading.present();

    //this.storage.get('userid').then((userid) => {
      
    this.share_msg1=this.company_name+' '+this.share_msg;
   
   
   this.socialSharing.share(this.share_msg1, "BsoApp for your doorstep service. Please refer & earn forever",this.busi_logo,
   // "https://bsoinfotech.com/servicefinder/uploads/ss_share.jpg",
    this.sitelink).then(() => {
    //alert("Sharing success");
    // Success!
    }).catch(() => {
    // Error!
    alert("Share failed");
    });
  //});
  loading.dismiss();

  }
/*
  openWebpage(url:string)
{
    const options:InAppBrowserOptions={
    zoom: 'no'
    }
const browser=this.iab.create(url,'_self',options);
browser.on('loadstop').subscribe(res => { });
browser.on('loadstart').subscribe(res => { 
   if(res.url=='http://outsideurl.com'){
        // ***** If Url Is Out Side App Open In System Browser 
         var _browser = this.iab.create('www.servicesarkar.com', '_system', options);
         _browser.show();
   }
});

}
*/

openAnyPage(url)
{

alert('Opening website->'+url);


		window.open(url, '_system','location=yes');
}


  exitapp()
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
