import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
//import { AgentmanagementPage } from '../agentmanagement/agentmanagement';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-puserseg',
  templateUrl: 'puserseg.html',
})
export class PusersegPage {
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
  temp_id: any ;
  comm_type:any;
  push_type:any;
  company_id:any;
  title:any;
  body:any;
  image:any;

  url:any;
  push_url:any;
  company_name:any;
  busi_phone:any;
  busi_whatsapp:any;
  busi_logo:any;
  country_id:any;
  currency_id:any;
  total_cost:any;
  msg1:any;
  msg2:any;
  msg_type:any;
  input4:any;
  input5:any;
 // userlist:any;
 unit_cost:any;
 userstr:any;
 credit_bal:any;
 




  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,private storage: Storage,
	private ConnectivityServiceProvider:ConnectivityServiceProvider,public http: HttpClient
	) {


    this.comm_type=this.navParams.get('comm_type');
    //this.push_type=this.navParams.get('input2');
   this.company_id=this.navParams.get('company_id');
    this.temp_id=this.navParams.get('temp_id');
    this.title=this.navParams.get('title');
    this.body=this.navParams.get('body');
    this.image=this.navParams.get('image');
    this.user_id=this.navParams.get('userid');

    this.push_type=this.navParams.get('push_type');
    this.msg_type=this.navParams.get('msg_type');
    this.input4=this.navParams.get('input4');
    this.input5=this.navParams.get('input5');

   // this.storage.get('userid').then((userid) => {

    //  this.user_id=userid;
  alert('puserseg='+this.user_id+'--'+this.company_id);
      this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {
        if(res.status=='success')
        {
          this.company_name=res.company_name;
          this.busi_phone=res.busi_phone;
          this.busi_whatsapp=res.busi_whatsapp;
          this.busi_logo=res.busi_logo;
          this.currency_id=res.currency_id;
          this.country_id=res.country_id;
          this.company_id=res.company_id;
       //   this.credit_bal =100;

//  alert('country='+this.country_id);
        }
     
      });
  
  //  });
  
   // this.url = 'https://bsoinfotech.com/servicefinder/api/ss/api_mwbp1.php?action='; 

  
  
  
  
      }
  
      getdata()
      {
       // this.storage.get('userid').then((userid) => {
        //  this.user_id=userid;
     //  alert('company id123='+this.company_id+'--'+this.comm_type)  ;

           this.api.post('getuserlist',{userid:this.user_id,company_id:this.company_id,company_name:this.company_name,
            phone:this.busi_phone,whatsapp:this.busi_whatsapp,busi_logo:this.busi_logo,country_id:this.country_id,
            comm_type:this.comm_type,push_type:this.push_type
          
          }).subscribe((res: any) =>{
              this.pushCmsg=res.pushCmsg;
             // this.userlist=res.userlist;
              this.customer_temp_count=res.customer_temp_count;
              this.customer_msg=res.customer_msg;
              //this.admin_msg=res.admin_msg;
              this.total_cost=res.total_cost;
              this.msg1=res.msg1;
              this.msg2=res.msg2;
              this.userstr=res.userstr;


     
     
           });
           
  
       //  });
  
      }
   
savesetup(tempo_id,userid,company_id,comm_type,title,body,image)
{
      let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();
      

      this.http.post<any>(this.url+'save_campain',{userid:userid,temp_id:tempo_id,comm_type:comm_type,company_id:company_id,title:title,body:body,image:image}).subscribe((res:any) => {
      loading.dismiss();

      if(res.status=='success')
      {      
        this.getdata();  
        this.general.showToast('done');            
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
				
        this.getdata(); 

        loading.dismiss();
  
  }

  
nextpage(user_id,userstr,temp_id,credit_bal,segment_id,country_id,comm_type,msg_type,push_type,segment_title,p_unitcost,
    wa_unitcost,sms_unitcost,email_unitcost,credit_count,segment_trigger_type,busi_phone,busi_whatsapp,company_id)
	{


  //  alert('chk value='+temp_id+'--'+credit_bal+'--'+credit_count+'--'+segment_id+'--'+company_id+'--'+country_id);
    

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();

      if (comm_type=='W')
      {
          this.unit_cost=wa_unitcost;
      }
      if (comm_type=='S')
      {
          this.unit_cost=sms_unitcost;
      }
      if (comm_type=='P')
      {
          this.unit_cost=p_unitcost;
      }
      if (comm_type=='E')
      {
          this.unit_cost=email_unitcost;
      }

     // if (credit_bal>= (credit_count*this.unit_cost))
     // {
        //call next pushsummary page
       // this.total_cost=credit_count*this.unit_cost;

    //   alert('Total Cost='+this.total_cost);
       
        this.navCtrl.push('PushsummaryPage',{userid:user_id,userstr:userstr,temp_id:temp_id,credit_bal:credit_bal,segment_id:segment_id,country_id:country_id,
          comm_type:comm_type,msg_type:msg_type,push_type:push_type,segment_title:segment_title,unitcost:this.unit_cost,
          credit_count:credit_count,segment_trigger_type:segment_trigger_type,company_id:company_id,total_cost:this.total_cost});
        loading.dismiss(); 
     // }
     // else
     // {// call credit purchase page
     //   this.general.showToast('Insufficient credits. Please buy credit to send the broadcast');
      //  loading.dismiss(); 
    //  }
      


	
	}	

}
