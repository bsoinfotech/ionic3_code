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
  selector: 'page-addagent',
  templateUrl: 'addagent.html',
})
export class AddagentPage {
agentphoto:any;
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

url4:any;
url5:any;

//added on 3rd Aug 2021 -start
// url4: string = 'https://bsoinfotech.com/servicefinder/api/api_p0029.php?action=profileImage1';
// url5: string = 'https://bsoinfotech.com/servicefinder/api/api_p0029.php?action=profileImage2';
//added on 3rd Aug 2021 - end

// biplab test 1214
//url4: string = 'http://bsoinfotech.com/servicefinder/api/api_p0028.php?action=agentPhoto';
//url5: string = 'http://bsoinfotech.com/servicefinder/api/api_p0028.php?action=agentIDproof';
  constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {

        //added on 3rd Aug 2021 -start
        //this.storage.get('api_url').then(url=>{     
          this.url4 = localStorage.getItem('api_url')+'=profileImage1';  
          this.url5 = localStorage.getItem('api_url')+'=profileImage2';  
          //});
       //added on 3rd Aug 2021 -end

    //this.storage.get('userid').then(userid=>{
        this.api.post('getsubcategory1',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
                  this.subcategorylist1=res.subcategorylist1;
                  this.subcategorylist2=res.subcategorylist2;
                  this.getuom=res.getuom;
                  this.getexp_level=res.getexp_level;

                  this.agentdetails=res.agentdetails;
                  this.agencyid=res.agentdetails.agency_id;
                  this.agencyname=res.agentdetails.agency_name;
                  this.category=res.agentdetails.cat_name;
                  this.cat_id=res.agentdetails.cat_id;
        });
    //});
    this.aphoto='';
    this.aproof='';
  }




getCat(subcat2)
{
    let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
	//this.storage.get('userid').then(userid=>{
        this.api.post('getspeciality',{subcat1:this.subcat1, subcat2:subcat2, userid:localStorage.getItem('userid')}).subscribe((res:any) => {
          loading.dismiss();
        		this.getspecial=res.getspecial;

         });
    //});
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
          //this.storage.get('userid').then((userid) => {
            this.camera.getPicture(options).then((imageData) => {
                this.filepath1(imageData);
//alert('haha0'+imageData);
            }, (err) => {
          });
      //});
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
		  

  //this.storage.get('userid').then((userid) => {
    fileTransfer.upload(imgurl, this.url4+'&userid='+localStorage.getItem('userid'), options1, true).then((data) => { 
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
		 //});	   
			   
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

                  var oldString1 = data.response;

                  var newstr1 = oldString1.replace("[]","");

                  this.aproof='https://bsoinfotech.com/servicefinder/uploads/agentproof/'+newstr1;

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

		//this.storage.get('userid').then((userid) => {
		fileTransfer.upload(imgurl, this.url5+'&userid='+localStorage.getItem('userid'), options1, true).then((data) => { 
		
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
		 //});	   
			   
  }

getSpecial(id,desc)
{
  this.exp_attb_id=id;
  this.specialization=desc;
}
  saveAgentDetails()
  {
  		if(this.agentname=='' || this.agentname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter agent name',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.phone=='' || this.phone==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter agent phone',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.agentphoto=='' || this.agentphoto==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Agent Photo',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.agentproof=='' || this.agentproof==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Agent ID Proof',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
		/*
        else if(this.uom=='' || this.uom==undefined)
        {
      		let toast = this.toastCtrl.create({
	            message: 'Select UOM',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
        }
        else if(this.experience=='' || this.experience==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Experience',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
        else if(this.exp_level=='' || this.exp_level==undefined)
        {
      		let toast = this.toastCtrl.create({
	            message: 'Select Experience Level',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
        }
        else if(this.selectedArray=='' || this.selectedArray==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Specialization',
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
        	//this.storage.get('userid').then(userid=>{
				// biplab test 1214 
				//this.api.post('createnewAgent',{userid:userid,agentphoto:this.agentphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,specialization:this.specialization,subcat1:this.subcat1,subcat2:this.subcat2,uom:this.uom,experience:this.experience,exp_level:this.exp_level,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone,exp_attb_id:this.exp_attb_id,selectedArray:this.selectedArray}).subscribe((res:any) => {
				this.api.post('createnewAgent',{userid:localStorage.getItem('userid'),agentphoto:this.agentphoto,agentproof:this.agentproof,agencyid:this.agencyid,agentname:this.agentname,status:this.status,description:this.description,cat_id:this.cat_id,phone:this.phone}).subscribe((res:any) => {
            loading.dismiss();
		                  
		                  		let toast = this.toastCtrl.create({
      						            message: 'Agent created successfully',
      						            duration: 3000,
      						            position: 'bottom'
      						        });
						              toast.present();
                              //this.storage.get('userid').then((userid) => {
                                this.api.post('getagentalldetails',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
                                    this.agentdetails=res.agentdetails;
                                    this.viewCtrl.dismiss(this.agentdetails);
                                });
                              //});
		                 
		        });
			    //}); 
        }
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

  dismiss() 
   {
        //this.storage.get('userid').then((userid) => {
          this.api.post('getagentalldetails',{userid:localStorage.getItem('userid')}).subscribe((res:any) => {
          
              this.agentdetails=res.agentdetails;
              this.viewCtrl.dismiss(this.agentdetails);
                  
          });
        //});
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddagentPage');
  }

}
