import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController,LoadingController, ViewController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-editcat',
  templateUrl: 'editcat.html',
})
export class EditcatPage {
catphoto:any;
agentproof:any;

agencyid:any;
agentname:any;
specialization:any;
category:any;
subcat1:any;
subcat2:any;
uom:any;
experience:any;
exp_level:any;
status:any;
description:any;
subcategorylist2:any;
subcategorylist1:any;
getuom:any;
agentdetails:any;
getspecial:any;
cat_id:any;
phone:any;
getexp_level:any;
exp_attb_id:any;
agencyname:any;
aphoto:any;
aproof:any;
selectedArray:any=[];

ref1:boolean;

cat_name:any;
catpicture:any;
custnote:any;
checkminordprice:boolean;
sp_check:boolean;
subcat_level:any;
ref3:any;
ref6:any;
ref7:any;
companyid:any;
flowcountno:any;
nextscreendesc:any;
minorderprice:any;
country_id:any;


currency_id:any;
busitype_id:any;
image_quality:any;
image_wt:any;
image_ht:any;
user_id:any;
flowcountno_1:any;
url_catPhotoEdit:any;


  //url4: string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=catPhotoEdit';

  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {


    this.companyid=this.navParams.get('companyid');
    this.cat_id=this.navParams.get('cat_id');
    this.user_id=this.navParams.get('userid');

        this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {        
          this.country_id=res.country_id;
          this.companyid=res.company_id;
          this.currency_id=res.currency_id;
          this.busitype_id=res.busitype_id;  
          this.image_quality=res.image_quality;
          this.image_wt=res.image_wt;
          this.image_ht=res.image_ht;
          this.url_catPhotoEdit=res.url_catPhotoEdit;
  
        });

        this.api.post('getcatedit',{userid:this.user_id,cat_id:this.cat_id}).subscribe((res1:any) => {
          
        this.cat_name =res1.cat_name;   
        this.catpicture=res1.catpicture;
        this.custnote=res1.custnote;
        this.checkminordprice=res1.checkminordprice;
        this.sp_check=res1.sp_check;
        this.subcat_level=res1.subcat_level;
        this.ref6=res1.ref6;
        this.ref7=res1.ref7;
        this.ref1=res1.ref1;
        this.ref3=res1.ref3;
        this.minorderprice=res1.minorderprice;
        this.flowcountno=res1.flowcountno;
        this.nextscreendesc=res1.nextscreendesc;
         
        });

        
    //});
    this.aphoto='';
    
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
        //  destinationType: this.camera.DestinationType.DATA_URL,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          targetWidth: this.image_wt,
          targetHeight: this.image_ht
  
        //  saveToPhotoAlbum: false
       //   allowEdit: true
         // sourceType: 1   // 1- camera, 0 - galary
  
  
  
      }
      if(sourceType=='1')  //camera
      {
  
       // alert ('cam1');
         // this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
  
            //  alert('Image Path'+imageData); 
  
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
                    alert('Image size should be < 1024 KB');
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
     // });
    }
    else  // from galeory
    {
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
          
        //  alert('Image Path'+imageData); 
  
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
                alert('Image size should be < 1024 KB');
              }
              else
              {
                this.filepath1(imageData);
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
    /*
      let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
    */
          let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          //  content: "Uploading...",
            duration: 4000
          });
          loading.present();
    
      fileTransfer.upload(imgurl, this.url_catPhotoEdit+'&id='+this.cat_id+'&companyid='+this.companyid, options1, true).then((data) => { 
          var oldString = data.response;
  
          this.api.post("get_catimage1", { id:this.cat_id,companyid:this.companyid}).subscribe((resp:any) => {
  
              this.catpicture=resp.catpicture;
            });

                  let toast = this.toastCtrl.create({
                      message: 'Image selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {
  
                alert('Error Number='+err.code);
               });
    // });	   
         
  }
  
  


savecat()
{

 // alert('custnote='+this.ref1+'--'+this.custnote);
    if (this.flowcountno=='0'||this.flowcountno=='2')
    {
      this.flowcountno_1=3;
    }
    if (this.flowcountno=='4')
    {
      this.flowcountno_1=2;
    }

    if(this.cat_name=='' || this.cat_name==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Enter Category Name',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
      else if(this.ref1 == true && this.custnote==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Enter Customer Note',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
      else if(this.checkminordprice==true && this.minorderprice <=0)
      {
        let toast = this.toastCtrl.create({
            message: 'Min Order Price should be >0',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
      else if(this.flowcountno =='' || this.flowcountno==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Select category/product hierarchy',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      } 
      
      else if(this.subcat_level =='' || this.subcat_level==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Select Category/product screen flow',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      } 
      else if (this.subcat_level>this.flowcountno_1)
      {
        let toast = this.toastCtrl.create({
          message: 'Category/product screen flow can not be greater than category/product hierarchy level ',
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
      }
      /*
      else if(this.flowcountno =='' || this.flowcountno==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Setup Admin screen flow for item setup',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      } 
    
      else if(this.subcat_level =='' || this.subcat_level==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Select Catalog flow ',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      } 
     
      else if(this.nextscreendesc =='' || this.nextscreendesc==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Enter Next Screen Title:',
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
       // this.storage.get('userid').then(userid=>{

      this.api.post('editcat',{userid:this.user_id,
        catid:this.cat_id,
        companyid:this.companyid,
        cat_name:this.cat_name,
        countryid:this.country_id,
        catpicture:this.catpicture,
        custnote:this.custnote,
        flowcountno:this.flowcountno,
        nextscreendesc:this.nextscreendesc,
        ref1:this.ref1,
        ref3:this.ref3,
        ref7:this.ref7,
        checkminordprice:this.checkminordprice,
        minorderprice:this.minorderprice,
        sp_check:this.sp_check,
        subcat_level:this.subcat_level
      
      }).subscribe((res:any) => {
          loading.dismiss();

          if(res.status=='success')
          {
            // this.banners=res.banners;
            this.general.showToast(res.message);
            this.navCtrl.push('ListMaster1Page',{userid:this.user_id});
          }
          else
          {
               this.general.showToast(res.message);

          }	                  
                    
                   
          });
        //}); 
      }
}



  dismiss() 
   {

              this.viewCtrl.dismiss(0);
      
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcatPage');
  }

}
