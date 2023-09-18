import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController,ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-missinfo',
  templateUrl: 'missinfo.html',
})
export class MissinfoPage {

  userid:any;
  chk_email:any;
  chk_pin:any;
  label1:any;
  label2:any;
  label3:any;
  msg:any;
  action:any;

  save_flag:any;



  constructor(public user: User,public general: General,public translateService: TranslateService, public api: Api,public navParams: NavParams, public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) {

    this.userid=this.navParams.get('userid');
    this.chk_email=this.navParams.get('chk_email');
    this.chk_pin=this.navParams.get('chk_pin');
    this.label1=this.navParams.get('label1');
    this.label2=this.navParams.get('label2');
    this.label3=this.navParams.get('label3');
    this.msg=this.navParams.get('msg');
    this.action=this.navParams.get('action');
    this.save_flag=1;

/*
  this.api.post('getreviewrating',{ order_num:this.order_num}).subscribe((resp : any) => {
  		this.ratingdata=resp.ratingdata;
  		this.ratingdata1=resp.ratingdata1;
  		this.ratingdata2=resp.ratingdata2;
  		this.ratingdata3=resp.ratingdata3;
      this.sp_name=resp.sp_name;
      this.order_display_note=resp.order_display_note;
  });
  */
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }


  save(userid,email,pin)
	{
    this.save_flag=1;

    if(this.chk_pin==1)
    {
      if (pin=='' || pin ==undefined)
      {
        this.save_flag=0;
        let toast = this.toastCtrl.create({
        message: 'Enter Pin Code',
        duration: 3000,
        position: 'bottom'
        });
        toast.present();
      }
      else if (pin.length != 6)
      {
        this.save_flag=0;
        let toast = this.toastCtrl.create({
        message: 'Enter Valid Pin Code',
        duration: 3000,
        position: 'bottom'
        });
        toast.present();
      }

    }

    /*
    else if((!this.EMAIL_REGEXP.test(email) && email!='') && (this.chk_email==1))
    {
      let toast = this.toastCtrl.create({
      message: 'Invalid email',
      duration: 3000,
      position: 'bottom'
      });
      toast.present();
    }
    */

		if (this.save_flag==1)
		{

			this.api.post('savemissinfo',{ userid:userid,pin:pin,email:email}).subscribe((resp : any) => {
				if(resp.status=='success')
				{
					let toast = this.toastCtrl.create({
			            message: 'Record saved successfully',
			            duration: 3000,
			            position: 'bottom'
		          	});
		          	toast.present();
                this.viewCtrl.dismiss();
		          //this.navCtrl.push('JobhistoryPage');
				}

        	});

		}
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissinfoPage');
  }

}
