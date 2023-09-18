import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-addnewbusiness',
  templateUrl: 'addnewbusiness.html',
})
export class AddnewbusinessPage {

user_id:any;

country_id:any;
type_desc:any;
type_name:any;


  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) 
  {
		//this.order_num=this.navParams.get('order_num');
		this.user_id=this.navParams.get('userid');
		this.country_id=this.navParams.get('country_id');

  }

    dismiss() 
   {
     this.viewCtrl.dismiss();
   }
   addNewOrder()
   {

			if(this.type_name=='' || this.type_name==undefined)
			{
                let toast = this.toastCtrl.create({
                message: 'Enter New Business Name',
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
			}		
      else if (this.type_desc=='' || this.type_desc==undefined)		
      {
                let toast = this.toastCtrl.create({
                message: 'Enter New Business Description',
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
      }
			else			
			{
   		
	  		this.api.post('savebusitype',{userid:this.user_id,type_name:this.type_name,type_desc:this.type_desc }).subscribe((res:any) => {
	  				if(res.status=='success')
	  				{
	  						let toast = this.toastCtrl.create({
					            message: res.msg,
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();

                  alert (res.msg);
                  this.dismiss();
							//this.navCtrl.setRoot('TodayongoingjobsPage');



	  				}
	  				else
	  				{
	  						let toast = this.toastCtrl.create({
					            message: res.msg,
					            duration: 3000,
					            position: 'bottom'
					        });
					        toast.present();
                  alert (res.msg);
							

	  				}
	  				
	  		});
	  	
	  	}
   }
  ionViewDidLoad() {
   console.log('ionViewDidLoad AddnewbusinessPage');
  }

}




