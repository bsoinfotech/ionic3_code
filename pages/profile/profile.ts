import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 userid : any;
 uinfo: any;
 first_name:any;
 whatsappnumber:any;
 email:any;
 country:any;
 state:any;
 city:any;
 pincode:any;
 bankname:any;
 bankactname:any;
 accountnumber:any;
 ifsccode:any;
 pan_id:any;

 custappslink:any;
 partnerappslink:any;
 msg:any;

  constructor(public user: User,private socialSharing: SocialSharing,public general: General,public api: Api,public loadingCtrl: LoadingController,
    public navParams: NavParams, public navCtrl: NavController,private storage: Storage) {
  	 this.storage.get('userid').then(userid=>{
           this.userid=userid;
        });
this.storage.get('userid').then(userid=>{
        this.api.post('getusereditprofile2',{ userid:userid }).subscribe((res:any) => {
                      this.uinfo=res.uinfo;
               });
//-------------------------
        this.api.post('getappslink',{ userid:userid }).subscribe((res:any) => {
             if(res.status=='success')
             {
                this.custappslink= res.custappslink;
                this.partnerappslink=res.partnerappslink;
                this.msg =res.msg;
             }
             else
             {
                //  this.general.hideLoading();
                //  this.general.showToast(res.message);

             }
            });

//--------------------------

          });


  }

  ionViewDidLoad() {
  //  this.general.showLoading();


  }
  goNextpage(page)
{
    this.navCtrl.setRoot(page);
}

  goNextpage1(page)
  {
      this.navCtrl.push(page);
  }

  editProfile()
  {
      this.navCtrl.push('EditcustomerprofilePage');
  }

  donothing()
  {

  }

  shareInfo1()
  {


    this.storage.get('userid').then((userid) => {
    this.socialSharing.share(this.msg, "BsoApp for doorstep service. Please refer & earn forever",
    "https://bsoinfotech.com/servicefinder/uploads/ss_share.jpg",
    this.custappslink).then(() => {
        }).catch(() => {

                    });
    });
  //  loading.dismiss();

  }

}
