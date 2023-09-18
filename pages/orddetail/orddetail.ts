import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ModalController,ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-orddetail',
  templateUrl: 'orddetail.html',
})
export class OrddetailPage {

out5details:any;
out3details:any;
nval:any;
ord_status:any;
var1:any;
var2:any;
user_type:any;
//order_num:any;
note:any;
userid:any;
total_record:any;
opennote:any;
ordernote:any;
ordertotal_note:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController,
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,public modalCtrl: ModalController, public viewCtrl: ViewController) {
 // this.pag=this.navParams.get('pag');
   this.ord_status=this.navParams.get('ord_status');
	this.var1=this.navParams.get('var1');
	this.var2=this.navParams.get('var2');
	this.userid=this.navParams.get('userid');
	//alert('var1='+this.var1+'---'+ this.var2);
	this.total_record=0;
	this.ordertotal_note=0;
	this.opennote=0;
	this.api.post("getout7data", { userid:this.userid,var1:this.var1}).subscribe((resp:any) => {
		this.out5details=resp.out5details;
		this.total_record=resp.total_record;
		
	  });


	/*
		//	this.storage.get('userid').then((userid) => {
	  		this.api.post('getout7data',{userid:this.userid,var1:this.var1,
				var2:this.var2}).subscribe((res1:any) => {
		          if(res1.status=='success')
		          {
			  		//this.out5details=res1.out5details;
					alert('hhaha');
		          }
		          else
		          {
		            this.nval=false;
					alert('pppphhaha');
		          }
	  		});

       // });

	   */

  }

  goScreen4(value,spid,ongoingjob,user_type)
  {
	               /*   let toast = this.toastCtrl.create({
                      message: 'spid='+spid,
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
				  */
  	this.navCtrl.push('Teamscreen4Page',{value:value,spid:spid,ongoingjob:ongoingjob,user_type:user_type});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrddetailPage');
  }
  	goNextpage(page,status,order_num)
	{

	//alert('Status='+status+order_num);
			//this.navCtrl.push(page);
			if(status=='Job Accepted')
			{
				this.navCtrl.push('OngoingjobsPage',{status:status,order_num:order_num});
				//this.navCtrl.push('PendingleadsPage',{status:status,order_num:order_num});
			}
			else
			{
			this.navCtrl.push('OngoingjobsPage',{status:status,order_num:order_num});
			}


		//}

	}

	  	goNextpage1(page,status,order_num)
	{

			if(status=='Job Accepted')
			{
				//this.navCtrl.push('OngoingjobsPage',{status:status,order_num:order_num});
				this.navCtrl.push('PendingleadsPage',{status:status,order_num:order_num});
			}



		//}

	}

	  //workinprogress
   opennotebook(ordernum)
   {
		if (this.opennote==1)
		{
			this.opennote=0;
		}
		else
		{
			this.opennote=1;
			this.api.post("get_order_note", { order_num:ordernum}).subscribe((resp:any) => {
				this.ordernote=resp.ordernote;
				this.ordertotal_note=resp.total_record;
		
				});
		}

		//alert('flag='+this.opennote);
		

	}

	changepartner(ordernum)
	{

		this.navCtrl.push('SelectpartnerPage',{order_num:ordernum});

	//	let contactModal = this.modalCtrl.create('SelectpartnerPage', {order_num:ordernum});
		//	contactModal.present();
		/*
			let contactModal = this.modalCtrl.create('SelectpartnerPage', {order_num:ordernum});
			contactModal.onDidDismiss(data =>{
				this.viewproject=data[0];
				this.viewprojectstatus=data[1];
			});
			contactModal.present();
		*/

	}

	//============================================================================
savenote(order_num,note)
{

   if(this.note=='' || this.note==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Please enter your note',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
else
{

              //  this.storage.get('userid').then((userid) =>
				//{

	//alert('note='+this.note+ '  Order='+order_num+' userid='+userid);

                   this.api.post('savenote', {userid:this.userid,order_num:order_num,note:this.note}).subscribe((res4:any) => {

						 if(res4.status=='success')
                         {

                            //this.navCtrl.push('CustomeraddressPage');
							//this.navCtrl.push('OrdDetailPage',{var1:this.var1});

							this.navCtrl.push('OrddetailPage',{var1:this.var1,userid:this.userid});

                         }


                   });
			//	});
}
}

}
