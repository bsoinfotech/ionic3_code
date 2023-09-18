import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
//var InAppBrowserReference;
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-menulist',
  templateUrl: 'menulist.html',
})
export class MenulistPage {

  private iabRef;

  iabRef2:any;
  scats: any; 


  menu_hdr:any;
  catinfo : any;
  linecount:any;
  message:any;
  access_no:any;
  user_id:any;
  company_id:any;
  link:any;
  userid:any;
  token:any;

  

  constructor(private platform: Platform,public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,private storage: Storage,
	private ConnectivityServiceProvider:ConnectivityServiceProvider,private iab: InAppBrowser
	) {


//alert('menulist='+this.userid+'--'+this.company_id);

    }


  ionViewDidLoad() {

               // this.general.showLoading();

				 
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//content: 'Loading Please Wait...'
				//dismissOnPageChange: true 
				});
				loading.present();

        this.scats=this.navParams.get('scatarr');
        this.company_id=this.navParams.get('company_id');
        this.userid=this.navParams.get('userid');
				
  // xxx	this.storage.get('userid').then(userid=>{
      if( this.userid>0)
      {
       // if(this.company_id>0)
      //  {
            //do nothing
       // }
       // else
       // {
          this.api.post('getcompanydtl',{userid:this.userid}).subscribe((res:any) => {
            if(res.status=='success')
            {
            //  this.company_name=res.company_name;
            // this.busi_phone=res.busi_phone;
            // this.busi_whatsapp=res.busi_whatsapp;
            // this.busi_logo=res.busi_logo;
            // this.currency_id=res.currency_id;
            this.company_id=res.company_id;
            this.token=res.token;
            }
            
            });
        //}

    }
    else
    {
      alert('Data feaching issue');
    }
   
    // });  xxx

        loading.dismiss();
  
  }

//---------------------testing ----------------------start
 loadStartCallBack(event) {
  /* Close InAppBrowser if loading the predefined close URL */
  alert('Close InAppBrowser if loading the predefined close URL');
 // if (event.url.match ("closepage")) {
    if (event.url=='https://bsoinfotech.com/campaignmgmt/closepage')
    {
    this.iabRef2.close();
  }
}
/*
  loadStop(params, callback) {
    this.loadStopCounter++;

      if (params.url.substr(params.url.lastIndexOf('/') + 1) === 'formResponse') {
        // This does not work
        this.InAppBrowserReference.close();
      }
  }
*/
 //---------------------testing ----------------------end
  loadpage(id,screen_name,company_id,userid,ref1,ref2,ref3,ref4,ref5,ref6,ref7,ref8,ref9,ref10,message)
	{


    this.linecount=0;

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();
      
   // this.api.get('getSubmenu',{id:id,userid:this.user_id,company_id:company_id,ref1:ref1,ref2:ref2}).subscribe((res123:any) => 
    this.api.get('getSubmenu',{id:id,userid:userid,company_id:company_id,ref1:ref1,ref2:ref2}).subscribe((res123:any) => 
    {

     // alert('company_id123='+company_id+'--'+userid);
           loading.dismiss();   
                 if(res123.status=='success')
                 {    
                      this.catinfo=res123.catinfo;
                      this.linecount=res123.linecount;                       
                      this.message=res123.message;
                      this.access_no= res123.access_no;

           //  alert(this.catinfo[0].app_web+this.catinfo[0].base_link)   ;      

                      if(this.linecount>1)
                      {
                        
                        this.navCtrl.push('MenulistPage',{scatarr:this.catinfo,company_id:company_id,userid:userid});
                      } 
                      else if (this.linecount==1)
                      {
                          if (this.access_no==1)
                          {
                            if(this.catinfo[0].app_web=='A')
                            {
                       // alert('company_id='+company_id+'--'+userid);
                            this.navCtrl.push(screen_name,{company_id:company_id,userid:userid,ref1:ref1,ref2:ref2,ref3:ref3,ref4:ref4,ref5:ref5,ref6:ref6,
                              input1:res123.input1,
                              input2:res123.input2,
                              input3:res123.input3});
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
                                
                              }
                              //alert('link='+this.link);
                             // const browser = this.iab.create(this.link,'_self',{location:'no', zoom:'no'}); 
                             // browser.show();                             
                             // browser.close();
                             if(this.platform.is("cordova"))
                             {

                                   const target = '_blank';
                                   const options = 'location=yes,zoom=no,hideurlbar=yes,hidenavigationbuttons=yes,closebuttoncaption=Back to Dashboard ,closebuttoncolor=#f04141';
                                   const iabRef2 = cordova.InAppBrowser.open(this.link, target, options);
                                   iabRef2.addEventListener('loadstop', function(params, callback) {
                                   if(params.url.match("closepage"))
                                   {
                                     //alert('matching found..closing apps');
                                     iabRef2.close();
                                   }                                  
                                   });
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
                              message: message,
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


}
