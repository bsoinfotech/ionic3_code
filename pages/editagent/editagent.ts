import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, ViewController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-editagent',
  templateUrl: 'editagent.html',
})
export class EditagentPage {
	agentphoto:any;
agentproof:any;

aproof:any;
aphoto:any;
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
agent_photo:any;
agent_id_proof:any;
aid:any;
agencyname:any;
selectedArray:any=[];
agency_name:any;
url4: any;
url5: any;

// url4: string = 'https://bsoinfotech.com/servicefinder/api/api_p0029.php?action=profileImage1';
// url5: string = 'https://bsoinfotech.com/servicefinder/api/api_p0029.php?action=profileImage2';

  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public viewCtrl: ViewController) 
  {

        //added on 3rd Aug 2021 -start
        this.storage.get('api_url').then(url=>{     
          this.url4 = url+'=profileImage1';  
          this.url5 = url+'=profileImage2';  
          });
       //added on 3rd Aug 2021 -end

  this.aid=this.navParams.get('aid');
	   this.storage.get('userid').then(userid=>{
	        this.api.post('getagentdetailsforedit',{userid:userid,aid:this.aid}).subscribe((res:any) => {
	        	this.agentdetails=res.agentdetails;
         
              this.category=res.agentdetails.cat_name;
                  this.cat_id=res.agentdetails.cat_id;

	        	this.agentname=res.agentdetails.agent_name;
	        	this.phone=res.agentdetails.agent_phone;
	        	this.agencyid=res.agentdetails.agency_id;

	        	this.experience=res.agentdetails.exp_yrs;
	        	this.status=res.agentdetails.status;
	        	this.subcat1=res.agentdetails.sub_cat1;
				this.agencyname=res.agentdetails.agency_name;
	        	this.subcat2=res.agentdetails.sub_cat2;
            //this.specialization=res.agentdetails.exp_attb_desc;
            this.specialization=res.specialization;
                            this.storage.get('userid').then(userid=>{
                                this.api.post('getspeciality',{subcat1:this.subcat1, subcat2:this.subcat2, userid:userid}).subscribe((res:any) => {
                                    this.getspecial=res.getspecial;
                                 });
                            });

	        	this.exp_level=res.agentdetails.exp_level;
	        	this.uom=res.agentdetails.uom;

	        	this.agent_photo=res.agentdetails.agent_photo;
	        	this.agent_id_proof=res.agentdetails.agent_id_proof;
            this.description=res.agentdetails.exp_attb_desc;

	        });
       });

this.storage.get('userid').then(userid=>{
        this.api.post('getsubcategory1',{userid:userid}).subscribe((res:any) => {
                  this.subcategorylist1=res.subcategorylist1;
                  this.subcategorylist2=res.subcategorylist2;
                  this.getuom=res.getuom;
                  this.getexp_level=res.getexp_level;

                  this.agentdetails=res.agentdetails;
                  this.agencyid=res.agentdetails.agency_id;
                  this.agency_name=res.agentdetails.agency_name;
                  this.category=res.agentdetails.cat_name;
                  this.cat_id=res.agentdetails.cat_id;
        });
    });



  }
dismiss() 
   {
      this.storage.get('userid').then((userid) => {
        this.api.post('getagentalldetails',{userid:userid}).subscribe((res:any) => {
        
            this.agentdetails=res.agentdetails;
            this.viewCtrl.dismiss(this.agentdetails);
                
        });
      });
     
   }
getCat(subcat2)
{
    let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
	this.storage.get('userid').then(userid=>{
        this.api.post('getspeciality',{subcat1:this.subcat1, subcat2:subcat2, userid:userid}).subscribe((res:any) => {
          loading.dismiss();
        		this.getspecial=res.getspecial;
            //this.exp_attb_id=res.getspecial.exp_attb_id;
            //this.specialization=res.getspecial.exp_attb_desc;


         });
    });
}

agentPhoto() {
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
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
            }, (err) => { });
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
/*
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
    fileTransfer.upload(imgurl, this.url4, options1, true).then((data) => { 

                  this.agentphoto=data.response;
                  let toast = this.toastCtrl.create({
                      message: 'Agent Photo selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {});
  }

*/

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
    fileTransfer.upload(imgurl, this.url4+'&userid='+userid, options1, true).then((data) => { 
	 loading.dismiss();

                  var oldString = data.response;

                  var newstr = oldString.replace("[]","");
				  
					this.aphoto=newstr;
					this.agentphoto=newstr;
				
// alert('newstr='+newstr);

                  let toast = this.toastCtrl.create({
                      message: 'Agent Photo selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {});
		 });	   
			   
  }
  agentIDproof() {
    let actionSheet = this.actionSheetCtrl.create({
        cssClass: 'signupbtn',
        buttons: [
          {          
                icon: 'ios-image-outline',
                text: 'Upload Photo',
                handler: () => { 
                    this.takePicture(0);
                },
                cssClass: 'test'
            },
            {          
                icon: 'ios-camera-outline',
                text: 'Camera',
                handler: () => {
                  this.takePicture(1);
                }
            }
        ]
      });
      actionSheet.present();
  }

   takePicture(sourceType) 
  {
      let options: CameraOptions = {
          quality: 75,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true
      }
      if(sourceType=='1')
      {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath(imageData);
            }, (err) => {
      });
    }
    else
    {
          var optionss = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(optionss).then((imageData) => {
        this.filepath(imageData);
        }, (err) => {
          // Handle error
        });


    }
  }
/*
  filepath(imgurl)
  {
    let options1: FileUploadOptions = {
         fileKey: 'image',
         fileName: 'name.jpg',
         headers: {},
         chunkedMode: false,
         mimeType: 'image/jpg'
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(imgurl, this.url5, options1, true).then((data) => { 
                  this.agentproof=data.response;
                  let toast = this.toastCtrl.create({
                      message: 'Agent IDProof selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
               }, (err) => {});
  
  }
*/
filepath(imgurl)
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
		fileTransfer.upload(imgurl, this.url5+'&userid='+userid, options1, true).then((data) => { 
		
		loading.dismiss();

                  var oldString = data.response;
                  var newstr = oldString.replace("[]","");
				  
					
					this.agentproof=newstr;
					this.aproof=newstr;

                  let toast = this.toastCtrl.create({
                      message: 'Agent ID Proof selected',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                 
               }, (err) => {});
		 });	   
			   
  }

getSpecial(id,des)
{
  this.exp_attb_id=id;
  this.specialization=des;
}
  updateAgentDetails()
  {
  		
          let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
        	this.storage.get('userid').then(userid=>{
		        this.api.post('updateoldAgent',{userid:userid,agentphoto:this.agentphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,specialization:this.specialization,subcat1:this.subcat1,subcat2:this.subcat2,uom:this.uom,experience:this.experience,exp_level:this.exp_level,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone,exp_attb_id:this.exp_attb_id,aid:this.aid,selectedArray:this.selectedArray}).subscribe((res:any) => {
            loading.dismiss();
		                  if(res.status=='success')
		                  {
		                  		let toast = this.toastCtrl.create({
						            message: 'Agent created success',
						            duration: 3000,
						            position: 'bottom'
						        });
						        toast.present();
                              this.storage.get('userid').then((userid) => {
                                    this.api.post('getagentalldetails',{userid:userid}).subscribe((res:any) => {
                                    
                                        this.agentdetails=res.agentdetails;
                                        this.viewCtrl.dismiss(this.agentdetails);
                                            
                                    });
                                  });
		                  }
		        });
			}); 
  }

   selectMember(data)
{

 if (data.checked == true) {
    this.selectedArray.push(data);
  } else {
   let newArray = this.selectedArray.filter(function(el) {
     return el.testID !== data.testID;
  });
   this.selectedArray = newArray;
 }

}

removeSpec(exp_attb_id)
{
      this.api.post('removeStatus',{exp_attb_id:exp_attb_id}).subscribe((res:any) => {
      });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditagentPage');
  }

}
