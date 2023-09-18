import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { User,Api,General } from '../../providers';

/**
 * Generated class for the CustsetaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custsetaddress',
  templateUrl: 'custsetaddress.html',
})
export class CustsetaddressPage {

email: any;
useraddress:any;
showaddress:any;
address: {userid : any} = 
  { 
     userid: ''
  };
  delete: {addid : any, userid : any} = 
  { 
     addid: '',
     userid: ''
  };

  lng:any;
  lat:any;
  //biplab phase2
  id:any;
  customeraddress:any;
  catstatus:any;
  startscreen:any;
  endscreen:any;
  showpaysreen:any;
  showsummarysreen:any;
  location:any;
  bidscreen:any;
  location_type:any;
  categoryname:any;
  //biplab phase2 0828
	sp_check:any;
	cat_id:any;
	msg:any;
	address1:any;
	address2:any;
	userid:any;
	sp_availality:any;
  //--------
			
  constructor(public navCtrl: NavController,public user: User,public general: General,public api: Api,public navParams: NavParams,private storage: Storage,public httpClient: HttpClient,public toastCtrl: ToastController) {
this.storage.get('userid').then(userid=>{
           this.address.userid=userid;
           this.delete.userid=userid;
		   this.userid=userid;
         }); 

            this.storage.get('userid').then(userid=>{
                  this.api.post('getcustomerlatlng', {userid:userid}).subscribe((res:any) => {
                        this.lat=res.lat;
                        this.lng=res.lng;
						//biplab phase2
						this.id =res.id;
                   });
            });
this.storage.get('userid').then(userid=>{
    this.api.post('getservicetype', {userid:userid}).subscribe((resp:any) => {
    this.location=resp.servicetype;
    });
});


this.storage.get('catid').then(catid=>{
    this.api.post('getcategoryname', {catid:catid}).subscribe((resp:any) => {
    this.categoryname=resp.getcategoryname;
    });
});

  }

  ionViewDidLoad() { 
    this.general.showLoading();
this.storage.get('userid').then(userid=>{
    this.api.post('getUserAddress', {userid:userid}).subscribe((res:any) => {
                   if(res.status=='success')
                   {    
                       this.general.showToast(res.message);  
                       this.useraddress=res.useradresses;
                      
                       this.general.hideLoading();
                       
                   }
                   else
                   {
                          this.general.showToast(res.message);
                          this.useraddress='';
                          this.general.hideLoading();
                        
                   }
                   
                   if(this.useraddress.length >= 5)
                   {
                     this.showaddress=false;
                   }
                   else
                   {
                     this.showaddress=true;
                   }
               });
  	});
    console.log('ionViewDidLoad CustomeraddressPage');
  }


gotoNewAddress(id)
{
//biplab phase2 0821
///id =add here ----------------------remove later

  this.navCtrl.push('HomemapPage', {id:id});
}

gotoAddAddress(id,lat,lng,location)
{
  this.navCtrl.push('HomemapPage', {lat:lat,lng:lng,location:location,id:id});
}
deleteAddAddress(aid,i)
{
     this.delete.addid=aid;
      this.api.post('deleteUserAddress', this.delete).subscribe((res:any) => {
                   if(res.status=='success')
                   {   
                     //this.navCtrl.push('CustomeraddressPage');
                        this.useraddress=res.useradresses;
                        this.useraddress.splice(i, 1);

                        this.general.showToast(res.message);

	                        this.storage.get('userid').then(userid=>{
				    			this.api.post('getUserAddress', {userid:userid}).subscribe((res:any) => {
				                   if(res.status=='success')
				                   {    
				                       this.general.showToast(res.message);  
				                       this.useraddress=res.useradresses;
				                   }
				               });
	  						});

                   }
                   else
                   {
                          this.general.showToast(res.message);
                          this.useraddress=res.useraddress;
                         
                   }
                    
               });
}

updateCucumber(location_type,address1,address2,lattitude,longitude)
{
  //this.location=location_type+'-'+address1+'-'+address2+'-'+lattitude+'-'+longitude;

}


gotoNetScreen()
{

var str = this.location;
var res = str.split("@");
 if(res[3]=='' || res[4]=='' || res[3]==undefined || res[4]==undefined || res[3]=='null' || res[4]=='null')
 {
      this.general.showToast('Location Lat/Long not available');
	  
 }
 else
 {

    localStorage.setItem("customeraddress",this.location);
        if(this.location=='-----')
        {
          this.general.showToast('Select Address');
        }
        else
        {

          this.storage.get('catid').then(catid=>{
			//biplab phase2 0828
			this.address1=res[1];
			this.address2=res[2];
			this.lat=res[3];
			this.lng=res[4];
			
			////
            this.api.post('getcustomerstatus', { catid:catid,lat:this.lat,lng:this.lng }).subscribe((res:any) => {
            this.catstatus=res.catstatus;
            this.startscreen=res.startscreen;
            this.endscreen=res.endscreen;
            this.showsummarysreen=res.showsummarysreen;
            this.showpaysreen=res.showpaysreen;
            this.bidscreen=res.bidscreen;
			// biplab phase2 0828
			this.sp_check=res.sp_check;
			this.cat_id=res.cat_id;
			this.sp_availality=res.sp_availality;
			this.msg=res.msg;
			//

            if(this.sp_availality==0 && this.sp_check==1)
            {
				let toast = this.toastCtrl.create({
				message: this.msg,    //Service Provider not available at this point,Please try after some times
				duration: 3000,
				position: 'bottom'
				});
				toast.present();
				/////////////////////////////////////////
								
				     this.api.post('savefailed_order', { userid:this.userid,address1:this.address1,address2:this.address2,catid:catid,lat:this.lat,lng:this.lng }).subscribe((res:any) => 
					 {
								if(res.status=='success')
				                   {    
										//msg not required
									  
				                   } 
						 
					 });
				
				///////////////////////////////////////////////////

            }
            else if(this.startscreen=='y' || this.startscreen=='Y')
            {
                this.navCtrl.push('ChooseservicedatePage');
            }
            else if(this.endscreen=='y' || this.endscreen=='Y')
            {
                this.navCtrl.push('ChooseserviceenddatePage');
            }
            else if(this.showsummarysreen=='y' || this.showsummarysreen=='Y')
            {
                this.navCtrl.push('SummaryPage');
            }
            else if(this.showpaysreen=='y' || this.showpaysreen=='Y')
            {
                this.navCtrl.push('PaymentpagePage');
            }
            else if(this.bidscreen=='1')
            {
                this.navCtrl.push('BiddingPage');
            }
            });
          });

      }
 }
    
}

}
