import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User,Api,General } from '../../providers';
 import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-editcustomerprofile',
  templateUrl: 'editcustomerprofile.html',
})
export class EditcustomerprofilePage {
uinfo:any;
whatsappnumber:any;
bankname:any;
bankactname:any;
accountnumber:any;
ifsccode:any;
country:any;
state:any;
city:any;
pincode:any;

counties:any;
states:any;
cities:any;
pan_id:any;
sid:any;
cid:any;
email:any;
  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,private storage: Storage) {
  this.storage.get('userid').then(userid=>{
        this.api.post('getusereditprofile1',{userid:userid}).subscribe((res:any) => {                  
                      this.uinfo=res.uinfo;
                      this.whatsappnumber=res.uinfo.whatsappnumber;
                     // this.country=res.uinfo.country;
  					 // this.state=res.uinfo.state;
  					 // this.city=res.uinfo.city;
  					 // this.pincode=res.uinfo.pincode;
					  this.email=res.uinfo.email;

                     // this.bankname=res.uinfo.bankname;
                     // this.bankactname=res.uinfo.bankactname;
                     // this.accountnumber=res.uinfo.accountnumber;
                     // this.ifsccode=res.uinfo.ifsccode;
                     // this.pan_id=res.uinfo.pan_id;
               });
          });
		/*  biplab phase3 0927
          this.api.post('getCountry1',{}).subscribe((res:any) => {
              this.counties=res.counties;
       });

        this.api.post("getstate", {}).subscribe((resp:any) => {
          this.states=resp.states;
       });

       this.api.post("getcity", {}).subscribe((resp:any) => {
          this.cities=resp.cities;
       });
	   */

  }


updateDetails()
{
	    	this.storage.get('userid').then(userid=>{ 
           this.general.showLoading();
		   //this.general.showToast(this.email); ///
            this.api.post('upatecustprofile', {email:this.email,state:this.state,city:this.city,pincode:this.pincode,whatsappnumber:this.whatsappnumber,bankname:this.bankname,
					bankactname:this.bankactname,accountnumber:this.accountnumber,ifsccode:this.ifsccode,pan_id:this.pan_id,uid:userid}).subscribe((res:any) => {
              this.general.hideLoading();
              this.general.showToast(res.message);   
              this.navCtrl.setRoot('ProfilePage');
	this.storage.get('userid').then(userid=>{ 
              this.api.post('getusereditprofile1',{userid:userid}).subscribe((res:any) => {                  
                      this.uinfo=res.uinfo;
                      this.whatsappnumber=res.uinfo.whatsappnumber;
                      //this.country=res.uinfo.country;
  					  //this.state=res.uinfo.state;
  					 // this.city=res.uinfo.city;
  					  //this.pincode=res.uinfo.pincode;

                     // this.bankname=res.uinfo.bankname;
                     // this.bankactname=res.uinfo.bankactname;
                     // this.accountnumber=res.uinfo.accountnumber;
                     // this.ifsccode=res.uinfo.ifsccode;
                     // this.pan_id=res.uinfo.pan_id;
               });
          });

      
             
           
       });
   });

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcustomerprofilePage');
  }

}
