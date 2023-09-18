import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController, Alert} from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-whatsappsetup',
  templateUrl: 'whatsappsetup.html',
})
export class WhatsappsetupPage {
image:any;

video:any;
url:any;
wa_number:any;
token:any;
email:any;
instance_id:any;
message:any;
button_label:any;
company_id:any;
user_id:any;
connect_status:any;
connect_status_msg:any;
isd_code:any;



  constructor(public http: HttpClient,private storage: Storage,public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
  public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController) 
  {


    this.url = 'https://bsoinfotech.com/servicefinder/api/ss/api_wa01.php?action='; 
	
		this.user_id=this.navParams.get('userid');
    this.company_id=this.navParams.get('company_id');
//alert('userid='+this.user_id);


   }

  ionViewDidLoad() 
  {
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//content: 'Loading Please Wait...'
				//dismissOnPageChange: true
				});
				loading.present();

       // this.storage.get('userid').then(userid=>{
         // this.user_id=1;
         // this.company_id=1;
          this.video='';

          //---------------------------------
          this.api.post('getwhatsapp',{userid:this.user_id}).subscribe((res1:any) => {
            if(res1.status=='success')
            {
               // this.image=res1.image;
               // this.video=res1.video; 
                this.wa_number=res1.wa_number;
                //this.token=res1.token;
                this.email=res1.email;
                this.isd_code=res1.isd_code;
  
                this.http.post<any>(this.url+'chk_bso_user_status',{isd_code:this.isd_code,wa_number:this.wa_number}).subscribe((res:any) => {
                  loading.dismiss();
            
                  if(res.status=='1')
                  {      
                        this.instance_id=res.instance_id;   
                        this.message=res.message;  
                        this.button_label=res.button_label;   
                        this.image=res.image;
                        this.video=res.video;
                        this.connect_status=res.status;
                        this.connect_status_msg=res.connect_status_msg;
                  }
                  else if (res.status=='2')
                  {
                    this.instance_id=res.instance_id;   
                    this.message=res.message;  
                    this.button_label=res.button_label;   
                    this.image=res.image;
                    this.video=res.video;  
                    this.connect_status=res.status;  
                    this.connect_status_msg=res.connect_status_msg;       
                  }
                  else if (res.status=='3')
                  {
                    this.instance_id=res.instance_id;   
                    this.message=res.message;  
                    this.button_label=res.button_label;   
                    this.image=res.image;
                    this.video=res.video;  
                    this.connect_status=res.status;  
                    this.connect_status_msg=res.connect_status_msg;       
                  }
                  else if (res.status=='0')
                  {
                    this.instance_id='';   
                    this.message=res.message;  
                    this.button_label=res.button_label;  
                    this.image=res.image;
                    this.video=res.video;   
                    this.connect_status=res.status;    
                    this.connect_status_msg=res.connect_status_msg;     
                  }
                  });
            }
            else
            {
              loading.dismiss();
            }
          });


          //------------------------------------------------

          
     // });


  }

sendQRCode(user_id,email,wa_number)
{
  let loading = this.loadingCtrl.create({
    spinner:'hide',
    content: '<img src="assets/img/busy.gif">',
    //content: 'Loading Please Wait...'
    //dismissOnPageChange: true
    });
    loading.present();
    
  this.http.post<any>(this.url+'send_wa_link',{userid:user_id,email:email,wa_number:wa_number}).subscribe((res:any) => {
    loading.dismiss();
  
    if(res.status==1)
    {
      alert(res.msg);
    }
    else
    {
      alert(res.msg);
    }
  });
}

}
