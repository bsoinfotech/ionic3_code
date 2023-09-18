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
  selector: 'page-addsubcatlast',
  templateUrl: 'addsubcatlast.html',
})
export class AddsubcatlastPage {

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

image: string;
base64Str: any;
kbytes: number;

scatprice:any;
scattotalprice:any;         
subcatorderdispnote:any;
scatdisunitname:any;
service_type:any;
scatselecttype:any;
image_quality:any;
image_wt:any;
image_ht:any;
flowcountno:any;
busitype_id:any;
currency_id:any;
country_id:any;
subcatid1:any;
subcatid2:any;
subcatid3:any;
subcatid4:any;

user_id:any;
uom:any;
layout:any;
url_subcatPhoto:any;
video1:any;
text1:any;
text2:any;
text3:any;
text4:any;
text5:any;
text6:any;




  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {


    this.companyid=this.navParams.get('companyid');
    this.cat_id=this.navParams.get('catid');
    this.scid=this.navParams.get('scid');
    this.user_id=this.navParams.get('userid');
    if(!this.user_id)
    {
        this.user_id=localStorage.getItem('userid');
    }
//alert('scid='+this.scid);

     // this.storage.get('userid').then(userid=> {
            this.api.post('getcompanydtl',{userid:this.user_id}).subscribe((res:any) => {     
              
              this.country_id=res.country_id;
              this.companyid=res.company_id;
              this.currency_id=res.currency_id;
              this.busitype_id=res.busitype_id;

              this.image_quality=res.image_quality;
              this.image_wt=res.image_wt;
              this.image_ht=res.image_ht;
              this.url_subcatPhoto=res.url_subcatPhoto;
              });
//alert('addsubcat3='+this.scid+'--'+this.cat_id+'--'+this.companyid);
              this.api.post('addsubcat3',{userid:this.user_id,scid:this.scid,cat_id:this.cat_id,companyid:this.companyid}).subscribe((res:any) => 
              {
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
              this.api.post('get_uom',{userid:this.user_id,cat_id:this.cat_id,id:this.scid}).subscribe((res:any) => {          
                this.uom=res.uom;  
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
        //this.storage.get('userid').then((userid) => {
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
    //});
  }
  else  // from galeory
  {
        var optionss = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI
      };
      this.camera.getPicture(optionss).then((imageData) => {
        
    //    alert('Image Path'+imageData); 

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
    //this.photoLibrary.requestAuthorization({read:true,write:true})
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
		  

 // this.storage.get('userid').then((userid) => {

    fileTransfer.upload(imgurl, this.url_subcatPhoto+'&userid='+this.user_id+'&id='+this.scid, options1, true).then((data) => { 
  	 loading.dismiss();

                  var oldString = data.response;
         // this.scatpicture=data.image_path;

          this.api.post("get_subcatimage2", { userid:this.user_id}).subscribe((resp:any) => {

              this.scatpicture=resp.scatpicture;
            });
                  
                  let toast = this.toastCtrl.create({
                      message: 'Image Updated..',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {

                alert('Error Number='+err.code);

               });
		// });	   
			   
  }






  savesubcat()
  {
  		if(this.scatname=='' || this.scatname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter product/Service Name',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.layout=='' ||this.layout=='0'|| this.layout==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select image layout',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
        else if(this.scatprice=='' || this.scatprice==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Original Price',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
	
        else if(this.scattotalprice=='' || this.scattotalprice==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Current Price',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
        else if(this.scatdisunitname=='' || this.scatdisunitname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Unit Of Measure',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
        else if(this.service_type=='' || this.service_type==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Product Type',
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
        //	this.storage.get('userid').then(userid=>{
				// biplab test 1214 
				//this.api.post('createnewAgent',{userid:userid,catphoto:this.catphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,specialization:this.specialization,subcat1:this.subcat1,subcat2:this.subcat2,uom:this.uom,experience:this.experience,exp_level:this.exp_level,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone,exp_attb_id:this.exp_attb_id,selectedArray:this.selectedArray}).subscribe((res:any) => {
				this.api.post('addtsubcat',{userid:this.user_id,
        scatprice:this.scatprice,
        scattotalprice:this.scattotalprice,
        scatpicture:this.scatpicture,
        scatname:this.scatname,
        ref1:this.ref1,
        ref3:this.ref3,
        scatdisunitname:this.scatdisunitname,
        service_type:this.service_type,
        scatselecttype:this.scatselecttype,
        scatnextscreendesc:this.scatnextscreendesc,
        subcatorderdispnote:this.subcatorderdispnote,
        status:this.status,
        scid:this.scid,
        cat_id:this.cat_id ,
        itemno: this.itemno,   
        subcatid1:this.subcatid1,
        subcatid2:this.subcatid2,
        subcatid3:this.subcatid3,
        subcatid4:this.subcatid4,

        video1:this.video1 ,
        layout: this.layout,   
        text1:this.text1,
        text2:this.text2,
        text3:this.text3,
        text4:this.text4,
        text5:this.text5,
        text6:this.text6,
        companyid:this.companyid}).subscribe((res:any) => {            
          loading.dismiss();
		                  
		                  		let toast = this.toastCtrl.create({
      						            message: 'Saved Successfully',
      						            duration: 3000,
      						            position: 'bottom'
      						        });
						              toast.present();
                       //  this.navCtrl.push('ListMasterPage',{ scatid: this.cat_id,companyid:this.companyid,subcat_level:'2' });
                         this.navCtrl.push('Serviceandrepair20Page',{userid:this.user_id, scid:this.scid,catid:this.cat_id,company_id:this.companyid,subcat_level:'2',flowcountno:this.flowcountno });
                          /*
                              //this.storage.get('userid').then((userid) => {
                                this.api.post('getagentalldetails',{userid:userid}).subscribe((res:any) => {
                                    this.agentdetails=res.agentdetails;
                                    this.viewCtrl.dismiss(this.agentdetails);
                                });
                              });
                          */
		                 
		        });
			  //  }); 
        }
  }

  dismiss() 
   {

              this.viewCtrl.dismiss(0);
      
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsubcatlastPage');
  }

}

