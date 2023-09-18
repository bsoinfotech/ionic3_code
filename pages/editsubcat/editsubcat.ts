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
  selector: 'page-editsubcat',
  templateUrl: 'editsubcat.html',
})
export class EditsubcatPage {

category:any;
status:any;
cat_id:any;
ref1:any;
ref3:any;
cat_name:any;
subcat_level:any;
ref6:any;
ref7:any;
companyid:any;
itemno:any;
addsubcatid:any;
scatname:any;
scatnextscreendesc:any;
subcatstatus:any;
scatpicture:any;
scid:any;
flowcountno:any;
image_quality:any;
image_wt:any;
image_ht:any;
userid:any;
url_subcatPhotoEdit:any;
busitype_id:any;
currency_id:any;
country_id:any;

//url4: string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=subcatPhotoEdit';
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {


    this.companyid=this.navParams.get('companyid');
    this.cat_id=this.navParams.get('catid');
    this.scid=this.navParams.get('scid');
    this.userid=this.navParams.get('userid');
    
    if(!this.userid)
    {
      this.userid=localStorage.getItem('userid');
    }


    this.api.post('getcompanydtl',{userid:this.userid}).subscribe((res:any) => {        
      this.country_id=res.country_id;
      this.companyid=res.company_id;
      this.currency_id=res.currency_id;
      this.busitype_id=res.busitype_id;  
      this.image_quality=res.image_quality;
      this.image_wt=res.image_wt;
      this.image_ht=res.image_ht;
      this.url_subcatPhotoEdit=res.url_subcatPhotoEdit;

    });

        this.api.post('getsubcat1',{userid:this.userid,cat_id:this.cat_id,id:this.scid}).subscribe((res1:any) => {          

          this.itemno=res1.itemno;
          this.ref1=res1.ref1;
          this.ref3=res1.ref3;
          this.scatpicture=res1.scatpicture;
          this.status=res1.status;
          this.scatnextscreendesc=res1.scatnextscreendesc;
          this.scatname=res1.scatname;
          this.flowcountno=res1.flowcountno;
          this.image_quality=res1.image_quality;
          this.image_wt=res1.image_wt;
          this.image_ht=res1.image_ht;
          
        });
        

        
   // });
    
    
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


 /* 
     takePicture1(sourceType) 
  {
      let options: CameraOptions = {
          quality: 50,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
      if(sourceType=='1')
      {
          //this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
//alert('haha0'+imageData);
            }, (err) => {
          });
      });
    }
    else
    {
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
        this.filepath1(imageData);
//alert('haha1'+imageData);
        }, (err) => {
          // Handle error
        });


    }
  }
  */
  /////////////////////
  
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

           // alert('Image Path'+imageData); 

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
        
       // alert('Image Path'+imageData); 

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
		  


    fileTransfer.upload(imgurl, this.url_subcatPhotoEdit+'&id='+this.scid+'&companyid='+this.companyid, options1, true).then((data) => { 
   	loading.dismiss();

                  var oldString = data.response;
          
          this.api.post("get_subcatimage1", { id:this.scid}).subscribe((resp:any) => {

              this.scatpicture=resp.scatpicture;
            });
          
         
                  let toast = this.toastCtrl.create({
                      message: 'Image selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {});
		// });	   
			   
  }






  savesubcat()
  {
  		if(this.scatname=='' || this.scatname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Sub Category Name',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
/*
        else if(this.scatnextscreendesc=='' || this.scatnextscreendesc==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter page header',
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
       // 	this.storage.get('userid').then(userid=>{
				// biplab test 1214 
				//this.api.post('createnewAgent',{userid:userid,catphoto:this.catphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,specialization:this.specialization,subcat1:this.subcat1,subcat2:this.subcat2,uom:this.uom,experience:this.experience,exp_level:this.exp_level,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone,exp_attb_id:this.exp_attb_id,selectedArray:this.selectedArray}).subscribe((res:any) => {
				this.api.post('editsubcat1',{userid:this.userid,
        itemno:this.itemno,
        scatpicture:this.scatpicture,
        scatname:this.scatname,
        ref1:this.ref1,
        ref3:this.ref3,
        scatnextscreendesc:this.scatnextscreendesc,
        status:this.status,
        scid:this.scid,        
        companyid:this.companyid}).subscribe((res:any) => {            
          loading.dismiss();
		                  
		                  		let toast = this.toastCtrl.create({
      						            message: 'Saved Successfully',
      						            duration: 3000,
      						            position: 'bottom'
      						        });
						              toast.present();
                        // this.navCtrl.push('ListMasterPage',{ catid: this.cat_id,companyid:this.companyid,subcat_level:'2' });
                         this.navCtrl.push('ListMasterPage',{userid:this.userid, flowcountno:this.flowcountno,catid: this.cat_id,companyid:this.companyid,subcat_level:'2' });
                          /*
                              //this.storage.get('userid').then((userid) => {
                                this.api.post('getagentalldetails',{userid:userid}).subscribe((res:any) => {
                                    this.agentdetails=res.agentdetails;
                                    this.viewCtrl.dismiss(this.agentdetails);
                                });
                              });
                          */
		                 
		        });
			   // }); 
        }
  }

  dismiss() 
   {

              this.viewCtrl.dismiss(0);
      
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsubcatPage');
  }

}

