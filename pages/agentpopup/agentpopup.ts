import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ModalController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-agentpopup',
  templateUrl: 'agentpopup.html',
})
export class AgentpopupPage {
order_num:any;
yourprice:any;
agentList:any;
nval:any;
agentid:any;
orderdetails:any;
providerstatus:any;
astatus:any;
special:any;
userid:any;

  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, 
  private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, 
  public modalCtrl: ModalController, public viewCtrl: ViewController) {


  this.order_num=this.navParams.get('order_num');
  this.yourprice=this.navParams.get('yourprice');
  this.userid=localStorage.getItem('userid');
  //this.agentid=this.navParams.get('agentid');
  
  
  				//this.storage.get('userid').then((userid) => {
					
//alert('getAgentList='+userid+'  order='+this.order_num);
                    this.api.post('getAgentList',{userid:this.userid,order_num:this.order_num}).subscribe((res:any) => {
                    	if(res.status=='success')
                    	{
                    	  this.nval=true;
                          this.agentList=res.agentList;
                    	}
                    	else
                    	{
                    	  this.nval=false;
                    	}
                    });
                //});


                //this.storage.get('userid').then((userid) => {
                    this.api.post('getproviderforassignedlater',{userid:this.userid}).subscribe((res:any) => {
                          this.providerstatus=res.providerstatus;
                      });
                //});
                this.agentid='true';
  }

  getAgentid(agent_id,status)
  {
    this.agentid=agent_id;
    this.astatus=status;
  }

  doLater(order_num,yourprice,providerstatus)
  {
        if(providerstatus=="1")
        {
              let toast = this.toastCtrl.create({
                                    message: 'Dont have permissions for Assign Later',
                                    duration: 3000,
                                    position: 'bottom'
                                });
                                toast.present();
        }
        else
        {
             let alert = this.alertCtrl.create({
                title: '',
                message: 'Do you want to Assign Later this job?',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Ok',
                    handler: () => {
                        let loading = this.loadingCtrl.create({
                        spinner:'hide',
                        content: '<img src="assets/img/busy.gif">',
                      });
                      loading.present();
                          //this.storage.get('userid').then((userid) => {
                          this.api.post("doassignedlater", { order_num:order_num,userid:this.userid,yourprice:yourprice,agentid:this.agentid}).subscribe((resp:any) => {
                          loading.dismiss();

                            if(resp.status=='success')
                            {
                                let toast = this.toastCtrl.create({
                                    message: 'Job Assigned Later',
                                    duration: 3000,
                                    position: 'bottom'
                                });
                                toast.present();

                                 //this.storage.get('userid').then((userid) => {
                                    this.api.post('getnewleadmanagement',{userid:this.userid}).subscribe((res:any) => {
                                          this.orderdetails=res.orderdetails;
                                          this.viewCtrl.dismiss(this.orderdetails);
                                    });
                               // });

                            }
                            this.navCtrl.setRoot('NewleadsPage');
                            });
                          //});
                        }
                      }
                    ]
                  });
                  alert.present();

        }
  }

dismiss() 
{
  this.viewCtrl.dismiss();
}


doAccept(order_num,yourprice,agentid)
  {

	
				
      if(this.astatus=='Inactive')
      {
              let toast = this.toastCtrl.create({
                    message: 'Agent status is inactive',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
      }
	  else if(this.agentid==0||this.agentid=='true')
	  {
		             let toast = this.toastCtrl.create({
                    message: 'Please select your agent',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present(); 
	  }
		  
      else{
                let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to accept this job?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
            let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
          //this.storage.get('userid').then((userid) => {
//alert('doacceptagent= '+order_num+' userid='+userid+' yourprice='+yourprice+' agentid='+this.agentid);

          this.api.post("doacceptagent", { order_num:order_num,userid:this.userid,yourprice:yourprice,agentid:this.agentid}).subscribe((resp:any) => {
          loading.dismiss();

            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Job Accepted',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();

                // this.storage.get('userid').then((userid) => {
                    this.api.post('getnewleadmanagement',{userid:this.userid}).subscribe((res:any) => {
                          this.orderdetails=res.orderdetails;
                          this.viewCtrl.dismiss(this.orderdetails);
                    });
                //});

            }
			else
			{
				//alert ("Failed: Job Status Changed..pl try again");
				//alert('Looks like job already accepted by other...');
				                let toast = this.toastCtrl.create({
                    message: 'Failed: Job Status Changed..pl try again',
                    duration: 5000,
                    position: 'bottom'
                });
                toast.present();

			}
            this.navCtrl.setRoot('NewleadsPage');
            });
          //});
        }
      }
    ]
  });
  alert.present();
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentpopupPage');
  }

}
