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
  selector: 'page-addsubcat1',
  templateUrl: 'addsubcat1.html',
})
export class Addsubcat1Page {
//catphoto:any;
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

aproof:any;
selectedArray:any=[];
ref1:any;
ref3:any;
cat_name:any;
catpicture:any;
custnote:any;
checkminordprice:boolean;
sp_check:boolean;
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

image_quality:any;
image_wt:any;
image_ht:any;

country_id:any;
company_id:any;
currency_id:any;
busitype_id:any;
flowcountno:any;
scid:any;
subcatid1:any;
subcatid2:any;
subcatid3:any;
subcatid4:any;
user_id:any;

url_subcatPhoto:any;


//url5: string = 'https://bsoinfotech.com/servicefinder/api/ss/api_wbp1.php?action=subcatPhoto';
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {

    this.subcat_level=this.navParams.get('subcat_level');
    this.companyid=this.navParams.get('company_id');
    this.cat_id=this.navParams.get('catid');
    this.scid=this.navParams.get('scid');
    this.user_id=this.navParams.get('userid');

   // this.storage.get('userid').then(userid=>{

      this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {

        
        this.country_id=res.country_id;
        this.companyid=res.company_id;
        this.currency_id=res.currency_id;
        this.busitype_id=res.busitype_id;

        this.image_quality=res.image_quality;
        this.image_wt=res.image_wt;
        this.image_ht=res.image_ht;
        this.url_subcatPhoto=res.url_subcatPhoto;

      //  alert ('L2-SCID='+this.scid+'--'+this.cat_id+'--'+this.companyid);

        this.api.post('addsubcat2',{userid:this.user_id,scid:this.scid,cat_id:this.cat_id,companyid:this.companyid}).subscribe((res:any) => {
          this.addsubcatid=res.addsubcatid;    
          this.itemno=res.itemno;     
          this.ref1='120';
          this.status=true; 
          this.scatpicture=res.scatpicture; 
          this.flowcountno=res.flowcountno;
          this.subcatid1=res.subcatid1;
          this.subcatid2=res.subcatid2;
          this.subcatid3=res.subcatid3;
          this.subcatid4=res.subcatid4;
          });

          });
     //   });


       // this.storage.get('userid').then(userid=>{

          //-------------------------------------------

          //---------------------------------------------
          /*
            this.api.post('addsubcat',{userid:userid,cat_id:this.cat_id,companyid:this.companyid}).subscribe((res:any) => {
            this.addsubcatid=res.addsubcatid;    
            this.itemno=res.itemno;     
            this.ref1='120';
            this.status=true; 
            this.scatpicture=res.scatpicture; 
            this.flowcountno=res.flowcountno;
        });
        */
        
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
        //  quality: 50,
        quality: this.image_quality,
        targetWidth: this.image_wt,
        targetHeight: this.image_ht,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true


      }
      if(sourceType=='1')
      {
          this.storage.get('userid').then((userid) => {
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
  /////////////////////
  */


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
  
           //   alert('Image Path'+imageData); 
  
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
    //  });
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
		  

//  this.storage.get('userid').then((userid) => {

    fileTransfer.upload(imgurl, this.url_subcatPhoto+'&userid='+this.user_id, options1, true).then((data) => { 
   	// loading.dismiss();
//alert('hahaha='+data.response);
                  var oldString = data.response;

                 // var newstr = oldString.replace("[]","");
				  
				//	this.aphoto=newstr;
				//	this.catphoto=newstr;

          this.api.post("get_subcatimage", { userid:this.user_id}).subscribe((resp:any) => {

              this.scatpicture=resp.scatpicture;
            });
         

				
 //alert('newstr='+newstr);

                  let toast = this.toastCtrl.create({
                      message: 'Sub Cat Image selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {});
	//	 });	   
			   
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
        else if(this.ref1=='' || this.ref1==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Image Hight',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.catphoto=='' || this.catphoto==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Agent Photo',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
     
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
        //	this.storage.get('userid').then(userid=>{
				// biplab test 1214 
				//this.api.post('createnewAgent',{userid:userid,catphoto:this.catphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,specialization:this.specialization,subcat1:this.subcat1,subcat2:this.subcat2,uom:this.uom,experience:this.experience,exp_level:this.exp_level,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone,exp_attb_id:this.exp_attb_id,selectedArray:this.selectedArray}).subscribe((res:any) => {
				this.api.post('createsubcat1',{userid:this.user_id,
        itemno:this.itemno,
        scatpicture:this.scatpicture,
        scatname:this.scatname,
        ref1:this.ref1,
        ref3:this.ref3,
        scatnextscreendesc:this.scatnextscreendesc,
        status:this.status,
        cat_id:this.cat_id,
        subcatid1:this.subcatid1,
        subcatid2:this.subcatid2,
        subcatid3:this.subcatid3,
        subcatid4:this.subcatid4,
        companyid:this.companyid}).subscribe((res:any) => {            
          loading.dismiss();
		                  
		                  		let toast = this.toastCtrl.create({
      						            message: 'Record added successfully',
      						            duration: 3000,
      						            position: 'bottom'
      						        });
						              toast.present();

                          this.navCtrl.push('Serviceandrepair10Page',{userid:this.user_id, scid: this.scid,catid:this.cat_id,companyid:this.companyid,subcat_level:this.subcat_level,flowcountno:this.flowcountno });
                        //  this.navCtrl.push('ListMasterPage',{ flowcountno:this.flowcountno,catid: this.cat_id,companyid:this.companyid,subcat_level:'2' });
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
    console.log('ionViewDidLoad Addsubcat1Page');
  }

}

