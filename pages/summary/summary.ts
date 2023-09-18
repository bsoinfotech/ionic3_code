import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { User,Api,General } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
summaryinfo: any;
scid: any;
userid: any;
sinfo: {scid : any} =
  {
     scid: ''
  };
  showpaysreen:any;
  bidscreen:any;
  totalprice:any;
  scatname:any;
  ref3:any;
  order:any;
  minorder:any;

  promoinfo:any;
  title:any;
//  scatname:any;
  cat_id:any;
  showtitle:any;

  promoidarr:any=[];
  promoamtarr:any=[];
  stat:any;
  promoitems:any;
  plist:any;
  alltotal:any;
  total_save:any;





 constructor(private alertCtrl: AlertController,public navCtrl: NavController,public user: User,public general: General,public api: Api,public navParams: NavParams,private storage: Storage,public httpClient: HttpClient, public toastCtrl: ToastController,public loadingCtrl: LoadingController)
 {

this.storage.get('userid').then(userid=>{
           this.userid=userid;
           });


           this.plist='';

/*
this.storage.get('userid').then(userid=>{
           this.userid=userid;
           });
*/
  }

  ionViewDidLoad() {
  	this.general.showLoading();
					let loading = this.loadingCtrl.create({
					spinner:'hide',
					content: '<img src="assets/img/busy.gif">',
					//content: 'Loading Please Wait...'
					});
					loading.present();

                   console.log('ionViewDidLoad SummaryPage');
				   //--------------------------------------------------
					this.storage.get('catqty').then(catqty=>{
					this.storage.get('catidarr').then(catidarr=>{
					this.storage.get('catid').then(catid=>{
            this.cat_id=catid;
					this.api.post('getSummaryInfo',{ scid:catid,catidarr:catidarr,catqty:catqty }).subscribe((res:any) => {

					loading.dismiss();
					if(res.status=='success')
					{
					   this.summaryinfo=res.summaryinfo;

					   this.scatname=res.scatname;
					   this.ref3=res.ref3;

					   this.totalprice=res.totalprice;
             this.alltotal=res.alltotal;
             this.total_save=res.total_save;

					  // this.navCtrl.push('SummaryPage'); //test
					  this.general.hideLoading();

					}
					else
					{
						  this.general.showToast(res.message);
						   this.general.hideLoading();

					}

					});
          /*
            this.api.get('getpromotion_list',{userid:this.userid,catid:this.cat_id}).subscribe((res:any) => {

               if(res.status=='success')
               {
                   this.promoinfo=res.promoinfo;
                   this.title=res.title;
                   this.showtitle=res.showtitle;
                  // this.scatname=res.scatname;

               }
               else
               {
                   // this.general.hideLoading();
                    this.general.showToast(res.message);
               }
            });
            */



					});
					});
					});


}
applypromo(promo_id,i,promo_amt,header)
{
  this.stat=0;

//  alert ('Arr Length='+this.promoidarr.length);
  for(var n=0;n<this.promoidarr.length;n++)
  {
    if(this.promoidarr[n]== promo_id)
    {
      this.stat=1;
    }

  }
  if (this.stat==1)
  {
    alert('already applied')
  }
  else
  {
          this.promoidarr.push(promo_id);
          this.totalprice= this.totalprice - promo_amt;

          //this.storage.set("promoidarr",this.promoidarr);
            if (this.plist=='')
            {
              this.plist= promo_id;
            }
            else
            {
              this.plist= this.plist+','+promo_id;
            }

            alert (this.plist);
            //---------------------------------------------------------------------
                this.plist='99991';
                this.userid=1000;
                this.api.get('showpromoitems',{userid:this.userid,promoidarr:this.promoidarr,plist:this.plist}).subscribe((res12:any) => {

                   if(res12.status=='success')
                   {
                       this.promoitems=res12.promoitems;
                   }
                   else
                   {
                       // this.general.hideLoading();
                      //  this.general.showToast(res.message);
                   }
                });
            //---------------------------
  }

}

//---------------------------

      gotoNetScreen(price,ref3)
      {
let loading = this.loadingCtrl.create({
spinner:'hide',
content: '<img src="assets/img/busy.gif">',
//content: 'Loading Please Wait...'
});
loading.present();

				this.storage.get('catid').then(catid=>{
					this.api.post('getcustomerstatus', { catid:catid }).subscribe((res:any) => {

					this.showpaysreen=res.showpaysreen;
					this.bidscreen=res.bidscreen;
						if(this.bidscreen=='1')
						{
							this.navCtrl.push('BiddingPage', {price:price,order:this.order,ref3:ref3});
loading.dismiss();
						}
						else if(this.showpaysreen=='y' || this.showpaysreen=='Y')
						{
							  this.navCtrl.push('PaymentpagePage', {price:price,order:this.order,ref3:ref3});
loading.dismiss();
						}
						else
						{

							this.navCtrl.setRoot('SuccesspagePage', {cashafterservice:'1',order:this.order,ref3:ref3,price:price});
loading.dismiss();
						}
					});
				  });


    }
}
