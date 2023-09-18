import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
//import { AgentmanagementPage } from '../agentmanagement/agentmanagement';
import { HttpClient } from '@angular/common/http';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { initServicesIfNeeded } from '@angular/core/src/view';

@IonicPage()
@Component({
  selector: 'page-pushsummary',
  templateUrl: 'pushsummary.html',
})
export class PushsummaryPage {

  user_id:any;
  pushTmsg:any;
  pushCmsg:any;
  pushAmsg:any;
  userdtl:any;
  

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
  busi_email:any;
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
 credit_count:any;
 segment_title:any;

 unitcost:any;

 d_body: any;
 e_body:any;

 msg_body:any;
 real_image:any;

 phone:any;
 whatsapp:any;
msg_area:any;
temp_desc:any;
sample_msg:any;
sound:any;
channel_id:any;
app_id:any;
status:any;
ref1:any;
ref2:any;
ref3:any;
ref4:any;
ref5:any;
subs_type:any;
allow_edit:any;
temp_name:any;
broadcast_name:any;
df1:any;
df2:any;
df3:any;
df4:any;
df5:any;
df6:any;
df7:any;

dl1:any;
dl2:any;
dl3:any;
dl4:any;
dl5:any;
dl6:any;
dl7:any;


dv1:any;
dv2:any;
dv3:any;
dv4:any;
dv5:any;
dv6:any;
dv7:any;







  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,private storage: Storage,
	private ConnectivityServiceProvider:ConnectivityServiceProvider,public http: HttpClient,private alertCtrl: AlertController
	) {


    this.url = 'https://bsoinfotech.com/servicefinder/api/ss/api_mwbp1.php?action='; 

    this.userstr=this.navParams.get('userstr');
    //this.credit_bal=this.navParams.get('credit_bal');
    this.country_id=this.navParams.get('country_id');
    this.unitcost=this.navParams.get('unitcost');
    this.total_cost=this.navParams.get('total_cost');
    this.segment_title=this.navParams.get('segment_title');
    this.country_id=this.navParams.get('country_id');
    //this.push_type=this.navParams.get('input2');
    this.company_id=this.navParams.get('company_id');

  //  alert('company-country='+this.company_id+'--'+this.total_cost);

    this.temp_id=this.navParams.get('temp_id');
    this.title=this.navParams.get('title');
    this.body=this.navParams.get('body');
    this.image=this.navParams.get('image');
    this.user_id=this.navParams.get('userid');
    this.credit_count=this.navParams.get('credit_count');

    this.busi_phone=this.navParams.get('busi_phone');
    this.busi_whatsapp=this.navParams.get('busi_whatsapp');

   this.comm_type=this.navParams.get('comm_type');
   this.push_type=this.navParams.get('push_type');
   this.msg_type=this.navParams.get('msg_type');

  //  this.comm_type=this.navParams.get('input1');
  //  this.push_type=this.navParams.get('input2');
  //  this.msg_type=this.navParams.get('input3');

  alert('pushsummary='+this.user_id+'--'+ this.company_id);

   // this.storage.get('userid').then((userid) => {
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
         // this.credit_bal =100;

//  alert('country='+this.country_id);

        }
     
      });

      this.api.post('partner_bal',{userid:this.user_id}).subscribe((res:any) => {
        if(res.status=='success')
        {

          this.credit_bal =res.partner_bal;
          this.partner_msg =res.partner_msg;



        }
     
      });



  
   // });
  
  


  
  
  
  
      }
  
      getdata()
      {
  
       //   this.storage.get('userid').then((userid) => {
        //  this.user_id=userid;
         // this.url = 'https://bsoinfotech.com/servicefinder/api/ss/api_mwbp1.php?action='; 

         this.api.post('getuserdtl',{userid:this.user_id,userstr:this.userstr,
          country_id:this.country_id,comm_type:this.comm_type}).subscribe((res1:any) => {
          if(res1.status=='success')
          {
            this.userdtl=res1.userdtl;
          }
       
        });

        
          this.http.post<any>(this.url+'getPushP2',{userid:this.user_id,company_id:this.company_id,country_id:this.country_id,
            phone:this.busi_phone,whatsapp:this.busi_whatsapp,
            comm_type:this.comm_type,push_type:this.push_type          
          }).subscribe((res: any) =>{

            this.d_body=res.d_body;
            this.e_body=res.e_body;
            this.title=res.title;
            this.msg_body=res.msg_body;
            this.real_image=res.real_image;
            this.company_name=res.company_name;
            this.phone=res.phone;
            this.whatsapp=res.whatsapp;
            this.temp_id=res.temp_id;
            this.country_id=res.country_id;
            this.company_id=res.company_id;
            this.comm_type=res.comm_type;
            this.push_type=res.push_type;
            this.msg_type=res.msg_type;
            this.msg_area=res.msg_area;
            this.temp_desc=res.temp_desc;
            this.sample_msg=res.sample_msg;
            this.sound=res.sound;
            this.image=res.image;
            this.channel_id=res.channel_id;
            this.app_id=res.app_id;
            this.ref1=res.ref1;
            this.ref2=res.ref2;
            this.ref3=res.ref3;
            this.ref4=res.ref4;
            this.ref5=res.ref5;
            this.subs_type=res.subs_type;
            this.allow_edit=res.allow_edit;
            this.temp_name=res.temp_name;
            this.broadcast_name=res.broadcast_name;
            this.df1=res.df1;
            this.df2=res.df2;
            this.df3=res.df3;
            this.df4=res.df4;
            this.df5=res.df5;
            this.df6=res.df6;
            this.df7=res.df7;
            
            this.dl1=res.dl1;
            this.dl2=res.dl2;
            this.dl3=res.dl3;
            this.dl4=res.dl4;
            this.dl5=res.dl5;
            this.dl6=res.dl6;
            this.dl7=res.dl7;

            this.dv1=res.dv1;
            this.dv2=res.dv2;
            this.dv3=res.dv3;
            this.dv4=res.dv4;
            this.dv5=res.dv5;
            this.dv6=res.dv6;
            this.dv7=res.dv7;
  
           });
  
           
  
       //  });
  
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

 
  submit_whatsapp(userstr,d_body,df1,df2,df3,df4,df5,df6,df7,dv1,dv2,dv3,dv4,dv5,dv6,dv7,
    phone,whatsapp,company_name,real_image,temp_name,broadcast_name,credit_bal,unitcost,credit_count,    
    temp_id,segment_id,country_id,comm_type,company_id,busi_phone,busi_whatsapp,busi_email,title)             
	{
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present(); 

     // alert('haha='+dv1+'--'+dv2);

      if (credit_bal>= (credit_count* unitcost))
      {

        this.api.post('sendwhatsapp',{userstr:userstr,d_body:d_body,df1:df1,
          df2:df2,
          df3:df3,
          df4:df4,
          df5:df5,
          df6:df6,
          df7:df7,
          dv1:dv1,
          dv2:dv2,
          dv3:dv3,
          dv4:dv4,
          dv5:dv5,
          dv6:dv6,
          dv7:dv7,
          phone:phone,whatsapp:whatsapp,company_name:company_name,real_image:real_image,temp_name:temp_name,
          broadcast_name:broadcast_name,credit_bal:credit_bal,unitcost:unitcost,credit_count:credit_count,    
          temp_id:temp_id,segment_id:segment_id,country_id:country_id,comm_type:comm_type,company_id:company_id,
          busi_phone:busi_phone,busi_whatsapp:busi_whatsapp,busi_email:busi_email,title:title}).subscribe((res1:any) => {
          
          loading.dismiss(); 
          this.general.showToast(res1.msg);
       
        });


        //call next pushsummary page
      //  this.navCtrl.push('',{userstr:userstr,temp_id:temp_id,credit_bal:credit_bal,segment_id:segment_id,country_id:country_id,
      //    comm_type:comm_type,msg_type:msg_type,push_type:push_type,segment_title:segment_title,unitcost:this.unit_cost,
      //    credit_count:credit_count,segment_trigger_type:segment_trigger_type});
     
      }
      else
      {// call credit purchase page
        this.general.showToast('Insufficient credits. Please buy credit to send the broadcast');
        loading.dismiss(); 
      }
      


	
	}	 

  submit_sms(userstr,d_body,df1,df2,df3,df4,df5,df6,df7,dv1,dv2,dv3,dv4,dv5,dv6,dv7,
    phone,whatsapp,company_name,real_image,temp_name,broadcast_name,credit_bal,unitcost,credit_count,    
    temp_id,segment_id,country_id,comm_type,company_id,busi_phone,busi_whatsapp,busi_email,title)             
	{
    
      if (credit_bal>= (credit_count* unitcost))
      {

          let alert = this.alertCtrl.create({
            title: '',
            message: credit_count+' credit(s) will be consumed. Do you want to continue?',
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

                //  this.storage.get('userid').then((userid) => {
                          this.api.post('sendsms',{userstr:userstr,d_body:d_body,df1:df1,
                          df2:df2,
                          df3:df3,
                          df4:df4,
                          df5:df5,
                          df6:df6,
                          df7:df7,
                          dv1:dv1,
                          dv2:dv2,
                          dv3:dv3,
                          dv4:dv4,
                          dv5:dv5,
                          dv6:dv6,
                          dv7:dv7,
                          phone:phone,whatsapp:whatsapp,company_name:company_name,real_image:real_image,temp_name:temp_name,
                          broadcast_name:broadcast_name,credit_bal:credit_bal,unitcost:unitcost,credit_count:credit_count,    
                          temp_id:temp_id,segment_id:segment_id,country_id:country_id,comm_type:comm_type,company_id:company_id,
                          busi_phone:busi_phone,busi_whatsapp:busi_whatsapp,busi_email:busi_email,title:title,userid:this.user_id}).subscribe((res1:any) => {
          
                          loading.dismiss(); 
                          this.general.showToast(res1.msg);       
                            });
                 // });
               
                }
              }
            ]
          });
          alert.present();

          //---------------------------------------------------------

//alert('userstr_2='+userstr);

        //call next pushsummary page
      //  this.navCtrl.push('',{userstr:userstr,temp_id:temp_id,credit_bal:credit_bal,segment_id:segment_id,country_id:country_id,
      //    comm_type:comm_type,msg_type:msg_type,push_type:push_type,segment_title:segment_title,unitcost:this.unit_cost,
      //    credit_count:credit_count,segment_trigger_type:segment_trigger_type});
       
      }
      else
      {// call credit purchase page
        this.general.showToast('Insufficient credits. Please buy credit to send the broadcast');
       // loading.dismiss(); 
      }
      


	
	}	

}

