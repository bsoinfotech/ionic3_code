import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController,AlertController,MenuController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile-status',
  templateUrl: 'profile-status.html',
})
export class ProfileStatusPage {

profile_image:any;
userimage:any;
username:any;
userdata:any;
profiledata:any;
conditioncheck:any;

first_status:any;
first_cond:any;

second_status:any;
second_cond:any;

third_status:any;
third_cond:any;

fourth_status:any;
fourth_cond:any;
stats:any;
user_id:any;
ref1:any;
ref5:any;
ref2:any;
ref3:any;
ref4:any;
status_desc:any;
status_code:any;
category:any;
auto_approve:any;
url_profileImage:any;
busitype_id:any;
country_id:any;
company_id:any;
currency_id:any;



//url4  : string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=getlatestversion&data=test';


  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,
  public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage,
  public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, public modalCtrl: ModalController,
  private imagePicker: ImagePicker, private file: File, public loadingCtrl: LoadingController, private menu : MenuController,private alertCtrl: AlertController) 
  {

    //added on 3rd Aug 2021 -start
    this.user_id=this.navParams.get('userid'); 
    if (this.user_id=='0' || this.user_id=='' ||this.user_id=='undefined' )
    {
    this.user_id= navParams.get('userid');

    }
    this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {        
      this.country_id=res.country_id;
      this.company_id=res.company_id;
      this.currency_id=res.currency_id;
      this.busitype_id=res.busitype_id;  
      this.url_profileImage=res.url_profileImage;

    });
   // this.storage.get('api_url').then(url=>{     
      //this.url_profileImage = this.url_profileImage+'=profileImage';  
    //  });
   //added on 3rd Aug 2021 -end
          let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
        //  this.storage.get('userid').then((userid) => {
            this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.auto_approve=resp.auto_approve;
			 // this.user_id=userid;
            });
         // });

        //  this.storage.get('userid').then((userid) => {
            this.api.post("getprofiledata", { userid:this.user_id}).subscribe((resp:any) => {
              this.profiledata=resp.profiledata;
              this.category =resp.category;
            });
        //  });

        //  this.storage.get('userid').then((userid) => {
            this.api.post("getstatus", { userid:this.user_id}).subscribe((resp:any) => {
                  this.status_code=resp.status_code;
                  this.status_desc=resp.status_desc;
                  this.ref1 =resp.ref1;
                  this.ref2=resp.ref2;
                  this.ref3=resp.ref3;
                  this.ref4=resp.ref4;
                  this.ref5=resp.ref5;
            });
         // });


  }

  goHome(showdash)
  {
    //this.storage.get('userid').then((userid) => {
      this.api.post("getstatus", { userid:this.user_id}).subscribe((resp:any) => {
            this.status_code=resp.status_code;
            this.status_desc=resp.status_desc;
            this.ref1 =resp.ref1;
            this.ref2=resp.ref2;
            this.ref3=resp.ref3;
            this.ref4=resp.ref4;
            this.ref5=resp.ref5;
      });
  //  });

    if(this.status_code=='1')
    {
      //this.navCtrl.setRoot('DashboardPage');
      this.navCtrl.setRoot('DashboardPage',{userid:this.user_id});
    }
    else
    {
        let toast = this.toastCtrl.create({
            message: 'Your profile is not activated yet',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

  }

  ionViewDidEnter() {
      // the root left menu should be disabled on this page
      this.menu.enable(true);
    }

  detailAddressPage(id,cat_id,attb_name,user)
  {
      if(id=='41')  //|| attb_name=='My detail (Optional)'
      {

      //  alert('detailAddressPage-userid='+this.user_id);
      //  this.storage.get('userid').then((userid) => {
          this.navCtrl.push('DetailAddressPage', {userid:this.user_id,attb_id:id});
       // });
        
      }
      else if(id=='42') // || attb_name=='Add your service location (Optional)')
      {
         // this.storage.get('userid').then((userid) => {
            this.api.post("checkproviderlocation", { userid:this.user_id}).subscribe((resp:any) => {

                if(resp.status=='success')
                {
                  //this.navCtrl.setRoot('NextviewmapdetailsPage', {location:resp.loc.location, radiuss:resp.loc.radius, lat1:resp.loc.lattitude, lng1:resp.loc.longitude});
               //   alert('latitude='+resp.lat+'--'+resp.lng+'--'+resp.location+'--'+resp.radius);

                  //.'--'+lng:resp.loc.longitude.'--'.location:resp.loc.location);
                             
                  this.navCtrl.push('HomemapPage', {lat:resp.lat,lng:resp.lng,location:resp.location,radius:resp.radius,userid:this.user_id});
                  let toast = this.toastCtrl.create({
                  message: 'Loading Google Map...Please wait..',
                  duration: 4000,
                  position: 'bottom'
                  });
                  toast.present();
                }
                else
                {
                  //this.navCtrl.push('HomemapPage',{userid:this.user_id})
                  this.navCtrl.push('HomemapPage', {lat:resp.lat,lng:resp.lng,location:resp.location,radius:resp.radius,userid:this.user_id});
                  let toast = this.toastCtrl.create({
                    message: 'Loading Google Map...Please wait..',
                    duration: 4000,
                    position: 'bottom'
                    });
                    toast.present();
                }
            });
         // });


      }
      // commented on 20221228 - start - will try later to capture id and address proof later on
    //  else if(id=='43') //ID proof photos with address (Mandatory)' || attb_name=='ID proof photos with address (Optional))')
     // {
     //   this.navCtrl.setRoot('IdproofsAddressPage', {attb_id:id,userid:this.user_id});
     // }
     // commented on 20221228 - end
      /*
      else if(attb_name=='Award and certificate photos (Mandatory)' || attb_name=='Award and certificate photos (Optional)')
      {
        this.navCtrl.setRoot('AwardCertificatePage', {attb_id:id});
      }
      else if(attb_name=='Upload photo of your work (Mandatory)' || attb_name=='Upload photo of your work (Optional)')
      {
        this.navCtrl.push('PhotosWorkPage',{attb_id:id,cat_id:cat_id});
      }
      */



  }



  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        cssClass: 'signupbtn',
        buttons: [
          {
                icon: 'ios-image-outline',
                text: 'Upload Photo',
                handler: () => {
                    this.takePicture1(0);
                },
                cssClass: 'test'
            },
            {
                icon: 'ios-camera-outline',
                text: 'Camera',
                handler: () => {
                  this.takePicture1(1);
                }
            }
        ]
      });
      actionSheet.present();
  }

   takePicture1(sourceType)
  {
      let options: CameraOptions = {
          quality: 75,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
      if(sourceType=='1')
      {
         // this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
            }, (err) => {
          });
    //  });
    }
    else
    {
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
        this.filepath1(imageData);
        }, (err) => {
          // Handle error
        });


    }
  }

  filepath1(imgurl)
  {
    let options1: FileUploadOptions = {
         fileKey: 'image',
         fileName: 'name.jpg',
         headers: {},
         chunkedMode: false,
         mimeType: 'image/jpg'
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
   // this.storage.get('userid').then((userid) => {
   // alert('image='+this.url_profileImage+'&userid='+this.user_id);
    fileTransfer.upload(imgurl, this.url_profileImage+'&userid='+this.user_id, options1, true).then((data) => {


        //  this.storage.get('userid').then((userid) => {
            this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.auto_approve=resp.auto_approve;
            });
        //  });

                  this.profile_image=data.response;

				 // alert('profile_image='+this.profile_image);

               }, (err) => {});
        // });

  }

  async saveProfile()
  {
    await this.delay(500);
   // this.storage.get('userid').then((userid) => {
   // alert('saveprofile='+this.user_id);
            this.api.post("checkproviderconditions", { userid:this.user_id}).subscribe((resp:any) => {
              this.conditioncheck=resp.conditioncheck;

            this.first_status=resp.conditioncheck.first_status;
            this.first_cond=resp.conditioncheck.first_cond;
            this.second_status=resp.conditioncheck.second_status;
            this.second_cond=resp.conditioncheck.second_cond;

            this.third_status=resp.conditioncheck.third_status;
            this.third_cond=resp.conditioncheck.third_cond;

            this.fourth_status=resp.conditioncheck.fourth_status;
            this.fourth_cond=resp.conditioncheck.fourth_cond;


            if(this.first_status==1 && this.first_cond==0)
            {
                let toast = this.toastCtrl.create({
                          message: 'My detail-Incomplete:'+resp.msg,
                          duration: 3000,
                          position: 'bottom'
                      });
                      toast.present();
            }
            else if(this.second_status==1 && this.second_cond==0)
            {
                let toast = this.toastCtrl.create({
                          message: 'Select your service location',
                          duration: 3000,
                          position: 'bottom'
                      });
                      toast.present();
            }
            /*
            else if(this.third_status==false && this.third_cond==3)
            {
                let toast = this.toastCtrl.create({
                          message: 'Upload ID proof photos with address',
                          duration: 3000,
                          position: 'bottom'
                      });
                      toast.present();
            }
            else if(this.fourth_status==false && this.fourth_cond==4)
            {
                let toast = this.toastCtrl.create({
                          message: 'Upload License/Certificate/Award photos',
                          duration: 3000,
                          position: 'bottom'
                      });
                      toast.present();
            }
            */
            else
            {


        let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
       // this.storage.get('userid').then((userid) => {
            this.api.post("changeprofileStatus", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
                  if(resp.status=='success')
                  {
                      let toast = this.toastCtrl.create({
                          message: 'Verification in progress',
                          duration: 3000,
                          position: 'bottom'
                      });
                      toast.present();



                     // this.storage.get('userid').then((userid) => {
                        this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
                          this.userdata=resp.userdata;
                          this.userimage=resp.userdata.image;
                          this.auto_approve=resp.auto_approve;
                        });
/*
auto_approve=1 - auto profile approved. Just need to turn off this flag for on/off
*/
  if(this.auto_approve==1)
  {

    /*
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content: '<img src="assets/img/busy.gif">',
        duration: 2000
      });
      loading.present();
      */

        let toast = this.toastCtrl.create({
        message: 'Importing Category data...Please wait..',
        duration: 2000,
        position: 'bottom'
        });
        toast.present();
        this.delay(10000);
       
        //create cat_hdr and cat_dtl record ... and unpdate status to 1 (ACTIVE)
      this.api.post("approve_profile", { userid:this.user_id}).subscribe((resp:any) => 
      {
        if(resp.status=='success')
        {
          let toast = this.toastCtrl.create({
            message: 'Category data successfully imported.',
            duration: 2000,
            position: 'bottom'
            });
            toast.present();
            this.delay(10000);

             //site_master record create
            this.api.post("sitelink_setup", { userid:this.user_id}).subscribe((resp:any) => 
            {
              //console.log('sitelink_setup executed');
              if(resp.status=='success')
              {
                let toast = this.toastCtrl.create({
                  message: 'Your Website successfully created.',
                  duration: 2000,
                  position: 'bottom'
                  });
                  toast.present();
                  this.delay(10000);

                  //----------------------------
                  this.api.post("section_setup", { userid:this.user_id}).subscribe((resp:any) => 
                  {
                    if(resp.status=='success')
                    {                    
                    console.log('section_setup executed');
                    let toast = this.toastCtrl.create({
                      message: resp.msg,
                      duration: 2000,
                      position: 'bottom'
                      });
                      toast.present();
                      this.delay(10000);
                      this.api.post("calendar_setup", { userid:this.user_id}).subscribe((resp:any) => 
                      {
                        if(resp.status=='success')
                        {  
                        console.log('calendar_setup executed');
                        let toast = this.toastCtrl.create({
                          message: resp.msg,
                          duration: 2000,
                          position: 'bottom'
                          });
                          toast.present();
                          this.delay(10000);
                          this.api.post("setup_freeplan", { userid:this.user_id}).subscribe((resp:any) => 
                          {
                            console.log('setup_freeplan executed');
                            let toast = this.toastCtrl.create({
                              message: resp.msg,
                              duration: 2000,
                              position: 'bottom'
                              });
                              toast.present();
                              this.delay(5000);
                          });

                        }
                      });

                    }
                  });

                  //----------------------------
              }
              else
              {
                let toast = this.toastCtrl.create({
                  message: 'ERROR in your website creation..Contact Admin.',
                  duration: 2000,
                  position: 'bottom'
                  });
                  toast.present();
                  //return;
              }
            });
            //---------------------------
        }
        else
        {
          let toast = this.toastCtrl.create({
            message: 'ERROR in Category data import.Contact Admin.',
            duration: 2000,
            position: 'bottom'
            });
            toast.present();
            return;
        }
        //console.log('approve_profile executed');
      });


  }
//-----------------------------------------------------

                    //  });
                     // this.storage.get('userid').then((userid) => {
                        this.api.post("getstatus", { userid:this.user_id}).subscribe((resp:any) => {
                              this.stats=resp.prd_status;
                             // alert('Profile Submitted Successfully..');
                             let toast = this.toastCtrl.create({
                              message: 'Profile Submitted Successfully..Please wait for 5 minutes to generate your customer website..',
                              duration: 4000,
                              position: 'bottom'
                              });
                              toast.present();
                             
                        });
                     // });

                     // this.navCtrl.setRoot('ProfileStatusPage');
                      this.navCtrl.setRoot('ProfileStatusPage',{userid:this.user_id});
                  }
            });
          //});
        }
  });
//});
}
save_section()
{
  this.api.post("section_setup", { userid:this.user_id}).subscribe((resp:any) => 
  {
    alert(resp.msg);
    console.log('section_setup executed');
  });
}

calendar_setup()
{
  this.api.post("calendar_setup", { userid:this.user_id}).subscribe((resp:any) => 
  {
    alert(resp.msg);
    console.log('calendar_setup executed');
  });
}
savecat_gohome()
{
      let loading = this.loadingCtrl.create({
          spinner:'hide',
          content: '<img src="assets/img/busy.gif">',
        });
        loading.present();
        // this.storage.get('userid').then((userid) => {
        this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
        this.userdata=resp.userdata;
        this.userimage=resp.userdata.image;
        this.auto_approve=resp.auto_approve;
        });
      /*
      auto_approve=1 - auto profile approved. Just need to turn off this flag for on/off
      */
      if(this.auto_approve==1)
      {
          this.api.post("approve_profile", { userid:this.user_id}).subscribe((resp:any) => 
          {
            console.log('approve_profile executed');
          });

      }
      loading.dismiss();
      if(this.status_code=='1')
      {
        //this.navCtrl.setRoot('DashboardPage');
        this.navCtrl.setRoot('DashboardPage',{userid:this.user_id});
      }
      else
      {
          let toast = this.toastCtrl.create({
              message: 'Your profile is not activated yet',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
      }

}

logOut()
  {
    localStorage.setItem('userid','');
     this.navCtrl.setRoot('MainPage');
  }

  goPopuppage(){

  let contactModal = this.modalCtrl.create('HowitworkspPage');
        contactModal.onDidDismiss(data =>{
        });
        contactModal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      refresher.complete();
      //this.storage.get('userid').then((userid) => {
            this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.auto_approve=resp.auto_approve;
            });
        //  });

    }, 2000);
  }


  approve_profile(userid)
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
    });
    loading.present();

    this.api.post("approve_profile", { userid:userid}).subscribe((res:any) => {
      loading.dismiss();
      if(res.status=='success')
      {
          let toast = this.toastCtrl.create({
              message: 'Record Verified',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();


      }

    });

  }

  sitelink_setup(userid)
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
    });
    loading.present();

    this.api.post("sitelink_setup", { userid:userid}).subscribe((res:any) => {
      loading.dismiss();
      if(res.status=='success')
      {
          let toast = this.toastCtrl.create({
              message: 'WebSite Created',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();


      }

    });

  }

  site_misc_setup(userid)
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
    });
    loading.present();

    this.api.post("site_misc_setup", { userid:userid}).subscribe((res:any) => {
      loading.dismiss();
      if(res.status=='success')
      {
          let toast = this.toastCtrl.create({
              message: 'Misc Record Created',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();


      }

    });

  }

  create_server_dir(userid)
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content: '<img src="assets/img/busy.gif">',
    });
    loading.present();

    this.api.post("create_server_dir", { userid:userid}).subscribe((res:any) => {
      loading.dismiss();
      if(res.status=='success')
      {
          let toast = this.toastCtrl.create({
              message: 'Server files Created',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();


      }

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile1Page');
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
