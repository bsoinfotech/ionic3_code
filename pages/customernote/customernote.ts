import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Network } from '@ionic-native/network';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

@IonicPage()
@Component({
  selector: 'page-customernote',
  templateUrl: 'customernote.html',
})
export class CustomernotePage {
	customernote:any;
	catinfo:any;
	subcatinfo:any;
  id:any;
scids:any;
image:any;
userid:any;
subcat_level:any;
catid:any;
//biplab test 1214
catinfo1:any;
endpoint:any;
scatname:any;
scatnextscreendesc:any;
subradios:any;
video:any;



  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
  public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,
  private ConnectivityServiceProvider:ConnectivityServiceProvider) {

		this.scids=this.navParams.get('scatid');
		this.userid=this.navParams.get('userid');

		this.customernote=this.navParams.get('customernote');
		this.catinfo=this.navParams.get('catinfo');
		this.id=this.navParams.get('id');
		this.image=this.navParams.get('image');


   }

  ionViewDidLoad() {


                //this.general.showLoading();

				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//content: 'Loading Please Wait...'
				//dismissOnPageChange: true
				});
				loading.present();


					this.api.post('getcustomernote',{userid:this.userid, scid: this.scids }).subscribe((res:any) => {
					loading.dismiss();

					   if(res.status=='success')
					   {
						   this.customernote=res.subcatinfo;
						   this.catinfo=res.catinfo;
						   this.id=res.id;
						   this.image=res.image;
						   this.subcat_level = res.subcat_level;
						   this.catid=res.id;
               this.video=res.video;

						//   this.general.hideLoading();
	//this.general.showToast('note_subcat_level='+this.subcat_level);

					   }
					   else
					   {
						   // this.general.hideLoading();
							this.general.showToast(res.message);

					   }
				   });


loading.dismiss();
  }

  checkpartscost(userid,catid)
  {



  				let loading = this.loadingCtrl.create({
  				spinner:'hide',
  				content: '<img src="assets/img/busy.gif">',
  				//dismissOnPageChange: true
  				//content: 'Loading Please Wait...'
  				});
  				loading.present();

  				this.navCtrl.push('PartsdtlPage',{userid:userid,catid:catid});
  				loading.dismiss();




  }
gotService()
  {
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//content: 'Loading Please Wait...'
				//dismissOnPageChange: true
				});
				loading.present();
//this.general.showToast('subcat_level='+this.subcat_level);

		if(this.subcat_level==0)  // listmaster-->servicerepair1-->servicerepair2
		{
			this.navCtrl.push('ListMasterPage',{userid:this.userid, scatid: this.id });
			loading.dismiss();
		}
		else
		{
			//
			//			if(this.subradios!=undefined)
			// {
				//this.scids.scid=this.subradios;
				this.api.get('getSubcatinfo_1',{cat_id:this.id,subcat_level:this.subcat_level}).subscribe((res1:any) => {

//this.general.showToast('cat_id='+this.catid+'--'+this.id);

					   if(res1.status=='success')
					   {
							this.catinfo1=res1.catinfo;
							this.endpoint=this.catinfo1[0].scatendpoint;
							this.scatname=res1.scatname;
							this.scatnextscreendesc=res1.scatnextscreendesc;
//this.general.hideLoading();
							if(this.endpoint=='Y' || this.endpoint=='y')
							{
							  this.navCtrl.push('Serviceandrepair2Page',{userid:this.userid,scatid:this.subradios,catid:this.catid,subcat_level:this.subcat_level});
							 // this.navCtrl.push('Serviceandrepair2Page',{scatid : this.subradios,catid:this.catid});
							 // loading.dismiss();
							}
							else
							 {
							   //this.navCtrl.push('Serviceandrepair1Page',{ scatid : this.subradios,catid:this.catid});
							   this.navCtrl.push('Serviceandrepair1Page',{userid:this.userid, scatid : this.subradios,catid:this.catid,subcat_level:this.subcat_level});
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

			// }


			//*/
			loading.dismiss();
		}


   }
}
