import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pushtsetup',
  templateUrl: 'pushtsetup.html',
})
export class PushtsetupPage {
  scats: any; 


  menu_hdr:any;
  catinfo : any;
  linecount:any;
  message:any;
  access_no:any;
  user_id:any;
  pushTmsg:any;
  pushCmsg:any;
  pushAmsg:any;

  partner_temp_count:any;
  customer_temp_count:any;
  admin_temp_count:any;
  partner_msg:any;
  customer_msg:any;
  admin_msg:any;
  isToggled: boolean ;


  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,private storage: Storage,
	private ConnectivityServiceProvider:ConnectivityServiceProvider
	) {
     //this.scats=this.navParams.get('scatarr');


    this.getdata();



    }

    getdata()
    {
      this.storage.get('userid').then((userid) => {
        this.user_id=userid;
   
         this.api.post('getPushT',{userid:userid}).subscribe((res:any) => {
             this.pushTmsg=res.pushTmsg;
             this.pushCmsg=res.pushCmsg;
             this.pushAmsg=res.pushAmsg;
            // this.pushPmsg=res.pushPmsg;
            this.partner_temp_count=res.partner_temp_count;
            this.customer_temp_count=res.customer_temp_count;
            this.admin_temp_count=res.admin_temp_count;
            this.partner_msg=res.partner_msg;
            this.customer_msg=res.customer_msg;
            this.admin_msg=res.admin_msg;
   
   
         });
//------------------------------
this.api.post('testcomm',{userid:userid,order_num:'210816002001340'}).subscribe((res:any) => {

  alert('hello:'+res.outcome1);

});

//----------------------------------

       });

    }

   
savesetup(tempo_id,userid,company_id,comm_type,status)
{
      let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();

      this.api.post('savecommsetup',{userid:userid,temp_id:tempo_id,comm_type:comm_type,company_id:company_id,status:status}).subscribe((res:any) => {
      loading.dismiss();

      if(res.status=='success')
      {      
        this.getdata();              
      }
      else
      {
          // this.general.hideLoading();
           this.general.showToast(res.message);
           
      }


      });

      
}

/*
notify(event: any) 
{ 
  console.log("toggled: "+event.target.checked); 
  alert("toggled: "+event.target.checked);
}
*/
  ionViewDidLoad() {

               // this.general.showLoading();

				 
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//content: 'Loading Please Wait...'
				//dismissOnPageChange: true 
				});
				loading.present();
				
  	this.storage.get('userid').then(userid=>{
      this.user_id=userid;
             });

        loading.dismiss();
  
  }

  
  loadpage(id,screen_name,company_id,userid,ref1,ref2,ref3,ref4,ref5,ref6,ref7,ref8,ref9,ref10,message)
	{


    this.linecount=0;

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();
      

    this.api.get('getSubmenu',{id:id,userid:this.user_id,company_id:company_id,ref1:ref1,ref2:ref2}).subscribe((res123:any) => 
    {
     
      
      loading.dismiss();   
                 if(res123.status=='success')
                 {    
                      this.catinfo=res123.catinfo;
                      this.linecount=res123.linecount;                       
                      this.message=res123.message;
                      this.access_no= res123.access_no;

                      if(this.linecount>1)
                      {
                        
                        this.navCtrl.push('MenulistPage',{scatarr:this.catinfo,company_id:company_id,userid:userid});
                      } 
                      else if (this.linecount==1)
                      {
                          if (this.access_no==1)
                          {
                            this.navCtrl.push(screen_name,{company_id:company_id,userid:userid,ref1:ref1,ref2:ref2,ref3:ref3,ref4:ref4,ref5:ref5,ref6:ref6,ref7:ref7,ref8:ref8,ref9:ref9});
                          }
                          else
                          {
                  
                            // call function for that access_no <>1
                            let toast = this.toastCtrl.create({
                              message: message,
                              duration: 3000,
                              position: 'bottom'
                            });
                            toast.present();
                          }
                      }
         
         
                 }
                 else
                 {

                      this.general.showToast(res123.message);
                 }
	
    }); 

	
	}	


}
