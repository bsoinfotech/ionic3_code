import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController ,ToastController,ViewController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-extracharge',
  templateUrl: 'extracharge.html',
})
export class ExtrachargePage {

  company_id:any;
  cat_id:any;
  currency_id:any;
  country_id:any;
  extracrg:any;
  msg:any;
  userid:any;




  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,public toastCtrl: ToastController,public viewCtrl: ViewController,
	private storage: Storage,private alertCtrl: AlertController
	) 
  {


      //this.storage.get('userid').then(userid=>{
        this.userid=this.navParams.get('userid');
        if (!this.userid)
        {
          this.userid=localStorage.getItem('userid');
        }
        

        this.api.post('getcompanydtl',{userid:this.userid}).subscribe((res:any) => {           
          this.country_id=res.country_id;
          this.company_id=res.company_id;
          this.currency_id=res.currency_id;  

         // alert ('xxx='+this.company_id+'--'+userid);

                         // this.general.showLoading();				 
				let loading = this.loadingCtrl.create({
          spinner:'hide',
          content: '<img src="assets/img/busy.gif">',
          //content: 'Loading Please Wait...'
          //dismissOnPageChange: true 
          });
          loading.present();

          this.api.post('get_extracharge',{userid:this.userid,company_id:this.company_id}).subscribe((res:any) => {
            loading.dismiss();

             if(res.status=='success')
             {      
                 this.extracrg=res.extracrg;

                 //   this.general.hideLoading();
                 
             }
             else
             {
                 // this.general.hideLoading();
                  this.general.showToast(res.message);
                  
             }
         });
        });

       
      //});

    }


  ionViewDidLoad() {
  
  }

  dismiss() 
  {

             this.viewCtrl.dismiss(0);
     
  }

  notify(id,status) 
  {


    if(status==true)
    {
        this.msg='Are you sure you want to turn off extra charge?';
    }
    else
    {
        this.msg='Are you sure you want to turn on extra charge?';
    }

    let confirm = this.alertCtrl.create({
      message: this.msg ,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

              console.log('Cancel clicked');
           //   alert('user_id='+this.user_id);
              this.api.post('get_extracharge',{userid:this.userid,company_id:this.company_id}).subscribe((res:any) => {
               // loading.dismiss();
    
                 if(res.status=='success')
                 {      
                     this.extracrg=res.extracrg;
    
                     //   this.general.hideLoading();
                     
                 }
                 else
                 {
                     // this.general.hideLoading();
                      this.general.showToast(res.message);
                      
                 }
             });
            
          }
        },
        {
          text: 'Ok',
          handler: () => {
          
            	this.api.post('upd_extracharge_status',{id:id,status:status}).subscribe((res:any) => {
            		this.general.showToast(res.message);	
            		});

              }
        }
      ]
    });
    confirm.present()
//alert('Haha='+scid+'--'+companyid+'--'+status);

	  
  }


  opennextpage(scid,catid,companyid,subcat_level)
  {
   //alert ('opennext='+catid+'--'+companyid+'--'+this.userid);
    this.navCtrl.push('AddextrachargePage',{userid:this.userid});
  }


}
