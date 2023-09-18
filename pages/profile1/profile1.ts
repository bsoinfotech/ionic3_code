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
  selector: 'page-profile1',
  templateUrl: 'profile1.html',
})
export class Profile1Page {
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
lat:any;
lng:any;
location:any;
busi_logo:any;
busi_phone:any;
busi_email:any;
busi_whatsapp:any;
base_link:any;
businessname:any;

image_quality:any;
site_link:any;
verifystatus:any;

url_profileImage:any;
url_busiImage:any;




//url4  : string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=profileImage';
//url5  : string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=busiImage';
  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,
  public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage,
  public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, public modalCtrl: ModalController,
  private imagePicker: ImagePicker, private file: File, public loadingCtrl: LoadingController, private menu : MenuController,private alertCtrl: AlertController) 
  {

          this.user_id=this.navParams.get('userid');

          this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => 
          {

            this.url_profileImage=res.url_profileImage;
            this.url_busiImage=res.url_busiImage;
          });

          let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();


            this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.busi_logo=resp.userdata.busi_logo;
			     //   this.user_id=userid;              
              this.busi_phone=resp.userdata.busi_phone;
              this.busi_email=resp.userdata.busi_email;
              this.businessname=resp.userdata.businessname;
              this.busi_whatsapp = resp.userdata.busi_whatsapp;

              this.site_link=resp.userdata.site_link;
              this.verifystatus=resp.userdata.verifystatus;
              

              this.base_link=resp.base_link;
              this.image_quality=resp.image_quality;
            
            });
         // });

          /*
          this.storage.get('userid').then((userid) => {
            this.api.post("getprofiledata", { userid:userid}).subscribe((resp:any) => {
              this.profiledata=resp.profiledata;
              this.category =resp.category;
            });
          });

          this.storage.get('userid').then((userid) => {
            this.api.post("getstatus", { userid:userid}).subscribe((resp:any) => {
                  this.status_code=resp.status_code;
                  this.status_desc=resp.status_desc;
                  this.ref1 =resp.ref1;
                  this.ref2=resp.ref2;
                  this.ref3=resp.ref3;
                  this.ref4=resp.ref4;
                  this.ref5=resp.ref5;
            });
          });
          */

  }

  /*
  goHome(showdash)
  {
    if(showdash=='1')
    {
      this.navCtrl.setRoot('DashboardPage');
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
  */
  ionViewDidEnter() {
      // the root left menu should be disabled on this page
      this.menu.enable(true);
    }

 

  presentActionSheet_logo() {
    let actionSheet = this.actionSheetCtrl.create({
        cssClass: 'signupbtn',
        buttons: [
          {
                icon: 'ios-image-outline',
                text: 'Upload Photo',
                handler: () => {
                    this.takePicture_logo(0);
                },
                cssClass: 'test'
            },
            {
                icon: 'ios-camera-outline',
                text: 'Camera',
                handler: () => {
                  this.takePicture_logo(1);
                }
            }
        ]
      });
      actionSheet.present();
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
          quality: this.image_quality,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
      if(sourceType=='1')
      {
        //  this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
            }, (err) => {
          });
     // });
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
  
  takePicture_logo(sourceType)
  {
      let options: CameraOptions = {
          quality: this.image_quality,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
      if(sourceType=='1')
      {
        //  this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {

//alert('imageData_1='+imageData);
                this.filepath_logo(imageData);
            }, (err) => {
          });
     // });
    }
    else
    {
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
  //alert('imageData_0='+imageData);  

        this.filepath_logo(imageData);
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
          //  content: "Uploading...",
            duration: 8000
          });
          loading.present();
  
    fileTransfer.upload(imgurl, this.url_profileImage+'&userid='+this.user_id, options1, true).then((data) => {
             this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.busi_logo=resp.userdata.busi_logo;
            });
      

                  this.profile_image=data.response;
               }, (err) => {});
        // });

  }

  filepath_logo(imgurl)
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
  //  this.storage.get('userid').then((userid) => {
    fileTransfer.upload(imgurl, this.url_busiImage+'&userid='+this.user_id, options1, true).then((data) => {



        //  this.storage.get('userid').then((userid) => {
            this.api.post("prov_userdetails", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.userdata=resp.userdata;
              this.userimage=resp.userdata.image;
              this.busi_logo=resp.userdata.busi_logo;
            });
         // });

                  this.profile_image=data.response;
               }, (err) => {});
       //  });

  }
  back()
  {
    this.navCtrl.push('DetailAddressPage',{userid:this.user_id});
  }
  saveProfile()
  {
   
    var regExp1 = /^(\+91-|\+91|1[0-9])?\d{10}$/;

    if(this.busi_phone=='' || this.busi_phone==undefined)
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
    else if(!regExp1.test(this.busi_whatsapp))
    {

    let toast = this.toastCtrl.create({
        message: 'Whatsapp number must be 10 digits without special characters',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();      }
    else if(this.busi_email=='' || this.busi_email==undefined)
    {
    let toast = this.toastCtrl.create({
        message: 'Enter your business email',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();

    }
    else if(this.businessname=='' || this.businessname==undefined)
    {
        let toast = this.toastCtrl.create({
            message: 'Enter your business name',
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
        
        
       // this.storage.get('userid').then((userid) => {

        //  alert ('user1='+userid);
        this.api.post("save_busi_pwe", {userid:this.user_id, busi_phone:this.busi_phone,busi_email:this.busi_email,busi_whatsapp:this.busi_whatsapp,busi_name:this.businessname}).subscribe((resp:any) => 
        {
          loading.dismiss();
          if(resp.status=='success')
          {
            /*
          let toast = this.toastCtrl.create({
              message: 'Updated successfully ',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
          */
          //this.navCtrl.setRoot('DashboardPage');
          this.navCtrl.push('PrimaryBusinessPage',{userid:this.user_id});
          }
        });
        
       // });
    }



}

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileStatusPage');
  }

}

