import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController,AlertController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';  

@IonicPage()
@Component({
  selector: 'page-serviceandrepair11',
  templateUrl: 'serviceandrepair11.html',
})
export class Serviceandrepair11Page {
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
 catinfo1:any;
 subcat_level:any;
 
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

				
                this.api.get('getSubcatinfo',this.scids).subscribe((res123:any) => {
				loading.dismiss();
				
				
                   if(res123.status=='success')
                   {    
                        this.catinfo=res123.catinfo;
                        this.endpoint=this.catinfo[0].scatendpoint; 
                        this.scatname=res123.scatname;
                        this.scatnextscreendesc=res123.scatnextscreendesc;
						this.subcat_level=res123.subcat_level;
//this.general.hideLoading(); 
                       /* if(this.endpoint=='Y' || this.endpoint=='y')
                        {
                          this.navCtrl.push('Serviceandrepair2Page',{scatid : this.scids.scid,catid:this.catid});
                        }  */            
                   }
                   else
                   {
//this.general.hideLoading();
                        this.general.showToast(res123.message);
                   }
//loading.dismiss();	
               }); 
	   
  }
gotoNetScreen(epoint,catid)
{
	
				/*
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true 
				//content: 'Loading Please Wait...'
				});
				loading.present();
				*/
				
		
			// Network Connection available
			if(this.subradios!=undefined)
			 {
				//this.scids.scid=this.subradios;
				this.api.get('getSubcatinfo',{scid:this.subradios}).subscribe((res1:any) => {
					

					   if(res1.status=='success')
					   {    
							this.catinfo1=res1.catinfo;
							this.endpoint=this.catinfo1[0].scatendpoint; 
							this.scatname=res1.scatname;
							this.scatnextscreendesc=res1.scatnextscreendesc;
//this.general.hideLoading(); 
							if(this.endpoint=='Y' || this.endpoint=='y')
							{
							 // this.navCtrl.push('Serviceandrepair2Page',{scatid : this.subradios,catid:this.catid});
	
	//alert('repair1='+this.subradios+'--'+this.catid+'--'+this.subcat_level);
							 
							  this.navCtrl.push('Serviceandrepair3Page',{scatid : this.subradios,catid:this.catid,subcat_level:this.subcat_level});
							 // loading.dismiss();
							} 
							else
							 {
							   this.navCtrl.push('Serviceandrepair11Page',{ scatid : this.subradios,catid:this.catid});
							 // loading.dismiss();
							 }             
					   }
					   else
					   {
//this.general.hideLoading();
							this.general.showToast(res1.message);
					   }
//loading.dismiss();
				   }); 

			 }
			 else
			 {
				this.scids.scid=this.subcheckbox;
			 } 
			
	


       /*  if(this.endpoint=='Y' || this.endpoint=='y')
         {
           this.navCtrl.push('Serviceandrepair2Page',{scatid : this.scids.scid,catid:this.catid});
         }
         else
         {
           this.navCtrl.push('Serviceandrepair1Page',{ scatid : this.scids.scid,catid:this.catid});
         } */
   
    
}
updateCucumber(cbx) {

     this.subcheckbox=cbx;
     this.scids.scid=this.subcheckbox;
      this.api.get('getSubcatepoint',this.scids).subscribe((res:any) => {
                   if(res.status=='success')
                   {      
                        this.epoint=res.epoint;

                   }
                   else
                   {
                         this.epoint='N';
                        
                   }
               });

  }
}

