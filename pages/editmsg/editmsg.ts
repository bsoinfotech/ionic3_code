import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Confirmcode1Page } from '../confirmcode1/confirmcode1';

@IonicPage()
@Component({
  selector: 'page-editmsg',
  templateUrl: 'editmsg.html',
})
export class EditmsgPage {
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
  comm_type:any;
  push_type:any;
  company_id:any;
  url:any;
  push_url:any;
  company_name:any;
  busi_phone:any;
  busi_whatsapp:any;
  busi_logo:any;
  country_id:any;
  currency_id:any;
  msg_type:any;
  input4:any;
  input5:any;
  header_msg:any;
  


 
  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
	public loadingCtrl: LoadingController,private network: Network,public toastCtrl: ToastController,private storage: Storage,
	private ConnectivityServiceProvider:ConnectivityServiceProvider,public http: HttpClient
	) {


    this.comm_type=this.navParams.get('input1');  //push/whatsapp/sms
    this.push_type=this.navParams.get('input2');  //cutomer/admin/partner
    this.msg_type=this.navParams.get('input3');   //promotional/transactional
    this.input4=this.navParams.get('input4');
    this.input5=this.navParams.get('input5');
    this.company_id=this.navParams.get('company_id');
    this.user_id=this.navParams.get('userid');
   // this.country_id=this.navParams.get('country_id');

    //this.busi_phone=this.navParams.get('busi_phone');
    //this.busi_whatsapp=this.navParams.get('busi_whatsapp');

  //  alert('ref4 and 5='+this.comm_type+'---'+ this.push_type);
  this.url = 'https://bsoinfotech.com/servicefinder/api/ss/api_mwbp1.php?action='; 
  


 // this.getdata();


    }


/*
    getdata()
    {

        this.storage.get('userid').then((userid) => {
        this.user_id=userid;
   
      
        this.http.post<any>(this.url+'getPushP1',{userid:this.user_id,company_id:this.company_id,company_name:this.company_name,
          phone:this.busi_phone,whatsapp:this.busi_whatsapp,busi_logo:this.busi_logo,country_id:this.country_id,
          comm_type:this.comm_type,push_type:this.push_type
        
        }).subscribe((res: any) =>{
             this.pushCmsg=res.pushCmsg;
            this.customer_temp_count=res.customer_temp_count;
            this.customer_msg=res.customer_msg;

         });

         

       });

    }
*/
   
save_record(temp_id,company_id,comm_type,image,dl1,dl2,dl3,dl4,dl5,dl6,dl7,
  dv1,dv2,dv3,dv4,dv5,dv6,dv7)
{

if(dl1>0 && dv1=='' )
{
    let toast = this.toastCtrl.create({
        message: 'Enter Variable1 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl2>0 && dv2=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable2 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl3>0 && dv3=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable2 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl4>0 && dv4=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable4 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl5>0 && dv5=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable5 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl6>0 && dv6=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable6 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else if(dl7>0 && dv7=='' )
{
    let toast = this.toastCtrl.create({
      message: 'Enter Variable7 value',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}
else 
{

      let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
      //content: 'Loading Please Wait...'
      //dismissOnPageChange: true 
      });
      loading.present();

    //  this.storage.get('userid').then((userid) => {   
          this.http.post<any>(this.url+'modi_campain',{userid:this.user_id,
            temp_id:temp_id,comm_type:comm_type,company_id:company_id,image:image,          
            dv1:dv1,dv2:dv2,dv3:dv3,dv4:dv4,dv5:dv5,dv6:dv6,dv7:dv7   
        
        }).subscribe((res:any) => {
          loading.dismiss();
    
          if(res.status=='success')
          {      

            this.navCtrl.push('PushpsetupPage',{company_id:company_id,userid:this.user_id, 
              input1:this.comm_type,
              input2:this.push_type,
              input3:this.msg_type});
   
           // this.navCtrl.push('PusersegPage',{input4:this.input4,input5:this.input5,msg_type:this.msg_type,push_type:this.push_type,company_id:this.company_id,userid:userid,comm_type:comm_type,temp_id:temp_id,title:title,body:body,image:image});        
          }
          else
          {
              // this.general.hideLoading();
               this.general.showToast(res.message);
               
          }
    
    
          });

    //  });


    }

      
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
				
				
    //    this.storage.get('userid').then(userid=>{
        //  this.user_id=userid;
    
    
      
                  this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {
                  if(res.status=='success')
                  {
                  this.company_name=res.company_name;
                  this.busi_phone=res.busi_phone;
                  this.busi_whatsapp=res.busi_whatsapp;
                  this.busi_logo=res.busi_logo;
                  this.currency_id=res.currency_id;
                  this.company_id=res.company_id;
                  this.country_id=res.country_id;
      
                 // alert ('country32111='+this.country_id);
    
                 
                
                  this.http.post<any>(this.url+'getPushP1',{userid:this.user_id,
                    company_id:this.company_id,
                    company_name:this.company_name,
                    phone:this.busi_phone,
                    whatsapp:this.busi_whatsapp,
                    busi_logo:this.busi_logo,
                    country_id:this.country_id,
                    comm_type:this.comm_type,
                    push_type:this.push_type
                  
                  }).subscribe((res: any) =>{
                       this.pushCmsg=res.pushCmsg;
                      this.customer_temp_count=res.customer_temp_count;
                      this.customer_msg=res.customer_msg;
                      this.header_msg=res.header_msg;
          
                   });
                  }
      
                  });
    
              //   });
    

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
                            this.navCtrl.push(screen_name,{company_id:company_id,userid:userid,ref1:ref1,ref2:ref2,ref3:ref3,ref4:ref4,ref5:ref5,ref6:ref6,input1:res123.input1,input2:res123.input2,input3:res123.input3});
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
