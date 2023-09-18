import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-reg-details',
  templateUrl: 'reg-details.html',
})
export class RegDetailsPage {
countries:any;
	states:any;
	cities:any;
    cid:any;
    sid:any;

//details: { country: string, state: string, uid: string, city: string, pincode: string, whatsappnumber: string, bankname: string, bankactname: string, accountnumber: string, ifsccode: string, pan_id: string, lat:string, lng:string } = {
  details: { country: string, state: string, uid: string, city: string, pincode: string, whatsappnumber: string, bankname: string, bankactname: string, accountnumber: string, ifsccode: string, pan_id: string } = { 
 country: '',
    state: '',
    uid: '',
    city: '',
    pincode: '',
    whatsappnumber: '',
    bankname: '',
    bankactname: '',
    accountnumber: '',
    ifsccode: '',
    pan_id: ''
//	lat:'',
//	lng:''
  }; 
  //constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, private geolocation: Geolocation) {
	constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams) 
   {
  	this.details.uid=this.navParams.get('uid');
  }

  ionViewDidLoad() {
      this.api.get('getCountries').subscribe((res:any) => {
           if(res.status=='success')
           {  
              this.countries=res.countries; 
              //alert(JSON.stringify(this.countries));
           } 
           else
           { 
                 this.general.showToast(res.message);
           }
       });
  }

  
getStates(cid)
{
	this.cid={cid:cid};
	 
 	this.api.post('getCountryStates',this.cid).subscribe((res:any) => {
           if(res.status=='success')
           {  
              this.states=res.states;
           } 
           else
           { 
                 this.general.showToast(res.message);
           }
       });
}
getCities(sid)
{
	this.sid={sid:sid};
 	this.api.post('getStateCities',this.sid).subscribe((res:any) => {
           if(res.status=='success')
           {  
              this.cities=res.cities;
           } 
           else
           { 
                 this.general.showToast(res.message);
           }
       });
}
updateDetails()
	{
		 if(this.details.country=='')
	    {
	       this.general.showToast('Select country');
	     } 
	    else if(this.details.state=='')
	    {
	       this.general.showToast('Select State');
	    } 
	    else if(this.details.city=='')
	    {
	       this.general.showToast('Enter City');
	    } 
	    else if(this.details.pincode=='')
	    {
	       this.general.showToast('Enter pincode');
	    } 
	    /*else if(this.details.whatsappnumber=='')
	    {
	       this.general.showToast('Enter State');
	    } 
	    else if(this.details.bankname=='')
	    {
	       this.general.showToast('Enter Bank Name');
	    } 
	    else if(this.details.bankactname=='')
	    {
	       this.general.showToast('Enter Bank Account Name');
	    } 
	    else if(this.details.accountnumber=='')
	    {
	       this.general.showToast('Enter Account Number');
	    } 
	    else if(this.details.ifsccode=='')
	    {
	       this.general.showToast('Enter ifsccode');
	    } 
	    else if(this.details.pan_id=='')
	    {
	       this.general.showToast('Enter panid');
	    } */
	    else
	    {
	    	 
           this.general.showLoading();

       // this.geolocation.getCurrentPosition().then((resp) => {
        //      this.details.lat=resp.coords.latitude;
        //      this.details.lng=resp.coords.longitude;
			 // this.general.showToast('Lat '+resp.coords.latitude+ '  Long '+resp.coords.longitude);  
			 
			  
           // biplab phase2 0810 ... record not getting updated into user_address as resp.coords.latitude and resp.coords.longitude - not returning any value.
		   //this.api.post('upateCustomerDetails&lat=resp.coords.latitude&lng=resp.coords.longitude', this.details).subscribe((res:any) => {
			this.api.post('upateCustomerDetails', this.details).subscribe((res:any) => {
           if(res.status=='success')
           {  
              
              this.general.hideLoading();
              this.general.showToast(res.message);  
              this.navCtrl.setRoot('RefferalPage');            
              //this.navCtrl.setRoot('JobPage');
           }
           else
           { 
              this.general.hideLoading();
              this.general.showToast(res.message);               
           }
       });
      //});

	    }
	}

  
}
