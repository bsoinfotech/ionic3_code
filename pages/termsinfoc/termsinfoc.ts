import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController,AlertController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';  

@IonicPage()
@Component({
  selector: 'page-termsinfoc',
  templateUrl: 'termsinfoc.html',
})
export class TermsinfocPage {
 qty:any;
scid: any; 
subradios: any;
epoint: any;
endpoint:any;
subcheckbox: any;
cucumber: any;
  scats: any;
  cats: any;
  catinfo : any;
  category: any;
  scatname: any;
  scatnextscreendesc: any;
  scids: { scid: any} = 
  {
    scid: '' 
  };
 catid:any;
 terms_hdr:any;
 terms_dtl:any;
 
  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, 
  public navCtrl: NavController, public loadingCtrl: LoadingController,private network: Network,private alertCtrl: AlertController,
  public toastCtrl: ToastController,private ConnectivityServiceProvider:ConnectivityServiceProvider) {
    this.scids.scid=this.navParams.get('scatid');
    this.catid=this.navParams.get('catid');
	

  }
  
ionViewDidLoad() { 
              //  this.general.showLoading();
				

				
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true 
				//content: 'Loading Please Wait...'
				});
				loading.present();

				
                this.api.get('gettermsinfocust').subscribe((res123:any) => {
				loading.dismiss();
				
				
                   if(res123.status=='success')
                   {    
                       
						this.terms_hdr=res123.terms_hdr;
          
                   }
                   else
                   {

                        this.general.showToast(res123.message);
                   }
	
               }); 
	   
  }
gotoNetScreen(epoint,catid)
{

	this.navCtrl.push('JobPage');
   
    
}

 refresh_screen()
{
    this.navCtrl.setRoot('JobPage');
}

}
