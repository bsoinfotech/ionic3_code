import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User,Api,General } from '../../providers';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-chooseserviceenddate',
  templateUrl: 'chooseserviceenddate.html',
})
export class ChooseserviceenddatePage {
enddate: string = new Date().toISOString();
//endtime: string = new Date().toISOString();
//myDate: string = new Date().toISOString();
//myTime: String = new Date().toISOString();

//enddate:any;
endtime:any;
showsummarysreen:any;
showpaysreen:any;
bidscreen:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public toastCtrl: ToastController,public user: User,public general: General,public api: Api) {
    var now = moment();
this.endtime = moment(now.format(), moment.ISO_8601).format();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseservicedatePage');
  }
gotoNetScreen()
{
		if(this.enddate=='' || this.enddate==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select End Date',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else if(this.endtime=='' || this.endtime==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select End Time',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
	    else
	    {
				localStorage.setItem("enddate",this.enddate);
				localStorage.setItem("endtime",this.endtime);
				    	

				  this.storage.get('catid').then(catid=>{
				    this.api.post('getcustomerstatus', { catid:catid }).subscribe((res:any) => {

				    this.showsummarysreen=res.showsummarysreen;
				    this.showpaysreen=res.showpaysreen;
				    this.bidscreen=res.bidscreen;
				    if(this.showsummarysreen=='y' || this.showsummarysreen=='Y')
				    {
				        
						this.navCtrl.push('SummaryPage');
				    }
				    else if(this.showpaysreen=='y' || this.showpaysreen=='Y')
				    {
				        this.navCtrl.push('PaymentpagePage');
				    }
				    else if(this.bidscreen=='1')
			        {
			            this.navCtrl.push('BiddingPage');
			        }
				    });
				  });
		}
}
}
