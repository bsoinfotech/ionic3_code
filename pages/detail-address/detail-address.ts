import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-detail-address',
  templateUrl: 'detail-address.html',
})
export class DetailAddressPage {


counties:any;
states:any;
cities:any;
country:any;
state:any;
whatsappnumber:any;
pincode:any;
city:any;
attb_id:any;
page:any;

busitype:any;
busitypes:any;
currency:any;
currencys:any;
imagequality:any;
imagequalitys:any;

busi_whatsapp:any;
busi_phone:any;
busi_email:any;
businessname:any;
check_service_area:any;
photo_quality:any;
about:any;
address1:any;
address2:any;
landmark:any;
radius:any;
lat:any;
lng:any;
loc_id:any;
location:any;
user_id:any;
provider_status:any;





  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController)
  {
      this.user_id=this.navParams.get('userid');
    //  this.attb_id=this.navParams.get('attb_id');


if (this.user_id=='0' || this.user_id=='' ||this.user_id=='undefined' )
{
 this.user_id= this.navParams.get('userid');

}


this.api.post('getbusiinfo',{}).subscribe((res:any) => {
  this.counties=res.counties;
  this.busitypes=res.busitypes;
  //this.imagequalitys = res.imagequalitys;
  //this.currencys = res.currencys;
});



     //  this.storage.get('userid').then((userid) => {

       // alert('userid='+this.user_id);
  			this.api.post("getproviderdetails", { userid:this.user_id}).subscribe((resp:any) => {
                //this.busi_dtl = resp.userdetails;

  				//	this.busi_whatsapp= resp.userdetails.busi_whatsapp;
  				//	this.busi_phone =resp.userdetails.busi_phone;
  				//	this.busi_email=resp.userdetails.busi_email;
                      this.busitype=resp.userdetails.busi_type;
                      this.provider_status=resp.userdetails.provider_status;
  				//	this.businessname=resp.userdetails.businessname;
  				//	this.about=resp.userdetails.about;
                //      this.photo_quality = resp.userdetails.photo_quality;
                      this.country = resp.userdetails.country;
                 //     this.currency = resp.userdetails.currency;
                 //     this.check_service_area=resp.userdetails.check_service_area;
                      this.address1=resp.userdetails.address1;
                      this.address2=resp.userdetails.address2;
                      this.landmark=resp.userdetails.landmark;
                      this.city = resp.userdetails.city;
                      this.state = resp.userdetails.state;
                      this.pincode=resp.userdetails.pincode;

            //this.busitype = res.busitype;
            //this.currency = res.currency;


  			});
  		//});

            this.getStates(this.counties);
  }


getStates(cid)
{
	//this.cid={cid:cid};
	 
 	this.api.post('getCountryStates',{cid:cid}).subscribe((res:any) => {
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
/*
get_loc_rad()
{

    //this.storage.get('userid').then((userid) => {
        this.api.post("checkproviderlocation", { userid:this.user_id}).subscribe((resp:any) => {
            this.lat= resp.lat;
            this.lng= resp.lng;
            this.location= resp.address2+' '+resp.address1;
            if(resp.status=='success')
            {
            this.navCtrl.push('HomemapPage', {lat:this.lat,lng:this.lng,location:this.location,id:resp.id,radius:resp.radius});
            //this.navCtrl.setRoot('NextviewmapdetailsPage', {location:resp.loc.location, radiuss:resp.loc.radius, lat1:resp.loc.lattitude, lng1:resp.loc.longitude});
            }
            else
            {
            // this.navCtrl.push('ServiceLocationPage', {attb_id:id});
            this.navCtrl.push('HomemapPage', {lat:this.lat,lng:this.lng,location:this.location,id:resp.id,radius:resp.radius});
            }
            });       

    });


}
*/
back()
{
  this.navCtrl.push('');
}

logOut()
{
     localStorage.setItem('userid','');
     this.navCtrl.setRoot('MainPage');
}

  updateAddress(attb_id)
  {

  var regExp1 = /^(\+91-|\+91|1[0-9])?\d{10}$/;

  if(this.busitype=='' || this.busitype==undefined)
  {
      let toast = this.toastCtrl.create({
          message: 'Select your business type',
          duration: 3000,
          position: 'bottom'
      });
      toast.present();

  }
  /*
  else if(this.businessname=='' || this.businessname==undefined)
  {
      let toast = this.toastCtrl.create({
          message: 'Enter your business name',
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
  }
  
  else if(this.country=='' || this.country==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Select Country',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    */
    else if(this.state=='' || this.state==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Select your State/Province',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }

    else if(this.city=='' || this.city==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Select your city',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else if(this.pincode=='' || this.pincode==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter your Pin Code',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    /*
     else if(this.busi_phone=='' || this.busi_phone==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Business Phone Number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
     else if(this.busi_whatsapp=='' || this.busi_whatsapp==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Business Whatsapp Number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else if(!regExp1.test(this.busi_whatsapp)){

        let toast = this.toastCtrl.create({
            message: 'Whatsapp number must be 10 digits without special characters',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    else if(this.busi_email=='' || this.busi_email==undefined)
   {
       let toast = this.toastCtrl.create({
           message: 'Enter your business email',
           duration: 3000,
           position: 'bottom'
       });
       toast.present();

   }

else if(this.check_service_area=='' || this.check_service_area==undefined)
{
   let toast = this.toastCtrl.create({
       message: 'Do you want to setup your delivey area?',
       duration: 3000,
       position: 'bottom'
   });
   toast.present();

}
else if(this.photo_quality=='' || this.photo_quality==undefined)
{
   let toast = this.toastCtrl.create({
       message: 'Setup your Image Quality',
       duration: 3000,
       position: 'bottom'
   });
   toast.present();

}
*/
else if(this.address1=='' || this.address1==undefined)
{
   let toast = this.toastCtrl.create({
       message: 'Enter business address1',
       duration: 3000,
       position: 'bottom'
   });
   toast.present();

}
/*
else if(this.landmark=='' || this.landmark==undefined)
{
   let toast = this.toastCtrl.create({
       message: 'Enter Land mark',
       duration: 3000,
       position: 'bottom'
   });
   toast.present();

}
*/

    else
    {
      
      //  let loading = this.loadingCtrl.create({
      //      spinner:'hide',
      //      content: '<img src="assets/img/busy.gif">',
      //    });
      //    loading.present();
    		//this.storage.get('userid').then((userid) => {
	    		this.api.post("updateCustomerDetails1", {userid:this.user_id, busi_whatsapp:this.busi_whatsapp,
            busi_phone:this.busi_phone, busi_email:this.busi_email, about:this.about,
            country:this.country, 
            state:this.state,
            city:this.city,
            pincode:this.pincode,
            //currency:this.currency,
           // businessname:this.businessname,
            busitype:this.busitype,
            address1:this.address1,
            address2:this.address2,
            landmark:this.landmark,
       //     check_service_area:this.check_service_area,
        //    photo_quality:this.photo_quality,

            attb_id:attb_id}).subscribe((resp:any) => {
        //  loading.dismiss();
		         if(resp.status=='success')
		         {
		         	//let toast = this.toastCtrl.create({
			        //    message: 'Address Updated successfully ',
			        //    duration: 3000,
			         //   position: 'bottom'
			       // });
			       // toast.present();
			      //  this.navCtrl.push('MydetailsPage', {attb_id:attb_id,page:this.page});
                  //this.get_loc_rad();
                  this.navCtrl.push('Profile1Page',{userid:this.user_id});

                  //  this.navCtrl.push('ProfileStatusPage',{userid:this.user_id});
                    
		         }
		       });
	     //  });
    }
  }


  callbusiadd()
  {
    this.navCtrl.push('AddnewbusinessPage',{userid:this.user_id,country_id:this.country});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAddressPage');
  }

}
