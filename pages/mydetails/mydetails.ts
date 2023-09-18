import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-mydetails',
  templateUrl: 'mydetails.html',
})
export class MydetailsPage {
age:any;
gender:any;
experience:any;
whatsappnumber:any;
shopname:any;
registrationnum:any;
aadharnumber:any;
aboutme:any;
gstnum:any;
attb_id:any;
page:any;
  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {
  this.page=this.navParams.get('page');
this.attb_id=this.navParams.get('attb_id');
       this.storage.get('userid').then((userid) => {
        this.api.post("getuserdetails", { userid:userid}).subscribe((resp:any) => {
            this.gender=resp.myaddress.gender;
            this.age=resp.myaddress.age;
            this.experience=resp.myaddress.experience;
            this.whatsappnumber=resp.myaddress.whatsappnumber;
            this.shopname=resp.myaddress.shopname;
            this.gstnum=resp.myaddress.gstnum;
            this.registrationnum=resp.myaddress.registrationnum;
            this.aadharnumber=resp.myaddress.aadharnumber;
            this.aboutme=resp.myaddress.aboutme;
        });
      });
  }

  updateDetails(attb_id)
  {
  var regExp1 = /^(\+91-|\+91|1[0-9])?\d{10}$/;
    if(this.gender=='' || this.gender==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Choose Gender',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else if(this.age=='' || this.age==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Age',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
     else if(this.experience=='' || this.experience==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Your Experience',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }

/*
    else if(this.whatsappnumber==undefined || this.whatsappnumber==''){
        let toast = this.toastCtrl.create({
            message: 'Enter Contact number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
    else if(!regExp1.test(this.whatsappnumber)){
 
        let toast = this.toastCtrl.create({
            message: 'Contact number must be 10 digits without special characters',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
     else if(this.shopname=='' || this.shopname==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Shop name / business name',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else if(this.registrationnum=='' || this.registrationnum==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter Registration Number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
    else if(this.gstnum=='' || this.gstnum==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter GST registration number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }
     else if(this.aadharnumber=='' || this.aadharnumber==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter AAdhar number',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();

    }*/
     else if(this.aboutme=='' || this.aboutme==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'About me',
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
          });
          loading.present();
        this.storage.get('userid').then((userid) => {
          this.api.post("saveproviderDetails", {userid:userid, aboutme:this.aboutme, aadharnumber:this.aadharnumber, gstnum:this.gstnum, registrationnum:this.registrationnum, shopname:this.shopname, whatsappnumber:this.whatsappnumber,experience:this.experience,age:this.age,gender:this.gender, attb_id:attb_id}).subscribe((resp:any) => {
          loading.dismiss();
             if(resp.status=='success')
             {
              let toast = this.toastCtrl.create({
                  message: 'My details Updated successfully ',
                  duration: 3000,
                  position: 'bottom'
              });
              toast.present();
              //if(this.page=='registration')
			  //biplab phase3 0908
			  if(resp.primary_cat=='0')
              {
                this.navCtrl.push('PrimaryBusinessPage');
              }
              else
              {
                    this.navCtrl.push('DetailsPage', {attb_id:attb_id});
              }
            
             }
           });
         });
    }
  
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydetailsPage');
  }

}
