import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-idproofs-address',
  templateUrl: 'idproofs-address.html',
})
export class IdproofsAddressPage {
profile_image:any;
images:any;
imagecount:any;
attb_id:any;
//url4:any;
user_id:any;
url_proofs_address:any;

//url4: string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=proofs_address&userid=';

  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, public loadingCtrl: LoadingController, private photoViewer:PhotoViewer, private alertCtrl: AlertController) 
  {

  
  this.user_id=this.navParams.get('userid');
  this.attb_id=this.navParams.get('attb_id');

 // alert('attb_id='+this.attb_id); 
      this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => 
      {

        this.url_proofs_address=res.url_proofs_address;
      });

      let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
  	//	this.storage.get('userid').then((userid) => {
            this.api.post("getproofswithaddress", { userid:this.user_id}).subscribe((resp:any) => {
            loading.dismiss();
              this.images=resp.images;
            });
          //});

          //this.storage.get('userid').then((userid) => {
            this.api.post("getproofs_address", { userid:this.user_id}).subscribe((resp:any) => {
              this.imagecount=resp.imagecount;
            });
         // });

  }

  showFullview(ImgUrl)
{

  this.photoViewer.show(ImgUrl, '', {share: false});
}

deleteImage(ind)
  {

      let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to delete this image?',
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

this.storage.get('userid').then((userid) => {
          this.api.post("deleteCertificate", { userid:userid, ind: ind}).subscribe((resp:any) => {
          loading.dismiss();
            if(resp.status=='success')
            {
                let toast = this.toastCtrl.create({
                    message: 'Photo deleted',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                
              this.storage.get('userid').then((userid) => {
                    this.api.post("getproofswithaddress", { userid:userid}).subscribe((resp:any) => {
                      this.images=resp.images;
                    });
                  });
              this.storage.get('userid').then((userid) => {
		            this.api.post("getproofs_address", { userid:userid}).subscribe((resp:any) => {
		              this.imagecount=resp.imagecount;
		            });
		          });
            }
            });
          })
        }
      }
    ]
  });
  alert.present();
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
          quality: 50,
          targetWidth: 400,
          targetHeight: 400,
          //quality: this.image_quality,
          //targetWidth: this.image_wt,
          //targetHeight: this.image_ht,

          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
     
      if(sourceType=='1')  //camera
      {
		  
        /*
          this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
            }, (err) => {
          });
      });
      */
      this.storage.get('userid').then((userid) => {
        this.camera.getPicture(options).then((imageData) => {
          this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => {
            fileEntry.getMetadata((metadata) => {
              let fileSize = metadata.size/1024 ;
  
              let toast = this.toastCtrl.create({
                message: 'Image Size='+fileSize+' KB',
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
              
              if (fileSize>1024)
              {
                alert('Image size should be <1024 KB');
              }
              else
              {
                this.filepath1(imageData);
              }
          
              //console.log("metadata size in MB: ", metadata.size/1024);		        
            });
          });

        }, (err) => {
      });
  });
    }
    else  //from galeory
    {
 
			/*		
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
		
        this.camera.getPicture(optionss).then((imageData) => {
        this.filepath1(imageData);

		
        }, (err) => {
          // Handle error
        });

        */
        var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
  
          this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => {
            fileEntry.getMetadata((metadata) => {
              let fileSize = metadata.size/1024 ;
             
              let toast = this.toastCtrl.create({
              message: 'Image Size='+fileSize+' KB',
              duration: 3000,
              position: 'bottom'
              });
              toast.present();
              
              if (fileSize>1024)
              {
                alert('Image size should be <1024 KB');
              }
              else
              {
                this.filepath1(imageData);
                //alert('filepath='+imageData); 
              }
          
              //console.log("metadata size in MB: ", metadata.size/1024);		        
            });
          });
  
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
    this.storage.get('userid').then((userid) => {

   //   alert('imgurl='+imgurl);
    //  alert(' fullpath='+this.url4+'&userid='+userid+'&attb_id='+this.attb_id);

    fileTransfer.upload(imgurl, this.url_proofs_address+'&userid='+userid+'&attb_id='+this.attb_id, options1, true).then((data) => { 
            loading.dismiss();
            this.storage.get('userid').then((userid) => {
            this.api.post("getproofswithaddress", { userid:userid}).subscribe((resp:any) => {
              this.images=resp.images;

            });
          });

          this.storage.get('userid').then((userid) => {
            this.api.post("getproofs_address", { userid:userid}).subscribe((resp:any) => {
              this.imagecount=resp.imagecount;
            });
          });
              this.profile_image=data.response;
                 
               }, (err) => {});
         });
  
  }

  
  goProfile()
  {
    this.navCtrl.setRoot('ProfileStatusPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdproofsAddressPage');
  }

}
