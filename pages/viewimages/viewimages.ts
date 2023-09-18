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
  selector: 'page-viewimages',
  templateUrl: 'viewimages.html',
})
export class ViewimagesPage {
albumid:any;
photos:any;
jsj:any;
jjcount:any;
profile_image:any;
photoscnt:any;
cnt:any;
attb_id:any;
cat_id:any;
url4:any;

	// url4: string = 'http://bsoinfotech.com/servicefinder/api/api_p0029.php?action=uploadmultiplephotos';
  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, private photoViewer:PhotoViewer) {
		this.albumid=this.navParams.get('albumid');
		this.cnt=this.navParams.get('cnt');
		this.attb_id=this.navParams.get('attb_id');
    this.cat_id=this.navParams.get('cat_id');

        //added on 3rd Aug 2021 -start
        this.storage.get('api_url').then(url=>{     
          this.url4 = url+'=uploadmultiplephotos';  
          });
       //added on 3rd Aug 2021 -end

		let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
            this.api.post("getalbumphotos", { albumid:this.albumid}).subscribe((resp:any) => {
            loading.dismiss();
                this.photos=resp.allphotos;	
            });
  }

showFullview(ImgUrl)
{

	this.photoViewer.show(ImgUrl, '', {share: false});
}


  uploadmultipleImages() 
  {
  			this.api.post("getphotoscount", { albumid:this.albumid}).subscribe((resp:any) => {
                this.photoscnt=resp.photoscnt;	
            });

            let maxphotos = 20-this.photoscnt;

    let options1: FileUploadOptions = {
         fileKey: 'image',
         fileName: 'name.jpg',
         headers: {},
         chunkedMode: false,
         mimeType: 'image/jpg',
      }

    let options3 = {
        maximumImagesCount: maxphotos,
        quality: 100
      }
      this.jsj=0;

        const fileTransfer: FileTransferObject = this.transfer.create();
         this.imagePicker.getPictures(options3).then((results) => {
         if(results!='OK')
         {
              this.jjcount=results.length;
                let loading = this.loadingCtrl.create({ spinner: 'hide',
	          content: '<img src="assets/img/busy.gif"> Processing Images',
	          });
          
             for(let jj=0;jj<results.length;jj++)
              {              
                loading.present();
                this.storage.get('userid').then((userid) => {
                  fileTransfer.upload(results[jj], this.url4+'&albumid='+this.albumid+'&attb_id='+this.attb_id
                  +'&userid='+userid+'&cat_id='+this.cat_id, options1, true).then((resp:any) => {
                
                  this.jsj++;
                 if(this.jsj==this.jjcount)
                {
                  loading.dismiss();
                      let toast = this.toastCtrl.create({
                                  message: 'Album uploaded successfully',
                                  duration: 3000,
                                  position: 'bottom'
                          });
                          toast.present();
                          this.api.post("getalbumphotos", { albumid:this.albumid}).subscribe((resp:any) => {

				                this.photos=resp.allphotos;	
				            });

                  }
                   

                       
                   }, (err) => {
                    loading.dismiss();
                    });   
                  });  
              }      
         }     
      }, (err) => { });
  }



  deleteImage(photoid)
  {

  		let alert = this.alertCtrl.create({
    title: '',
    message: 'Do you want to delete this photo?',
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
          this.api.post("deletePhoto", { photoid:photoid}).subscribe((resp:any) => {
          loading.dismiss();
          	if(resp.status=='success')
          	{
                let toast = this.toastCtrl.create({
	                  message: 'Photo deleted',
	                  duration: 3000,
	                  position: 'bottom'
	              });
	              toast.present();
	              this.api.post("getalbumphotos", { albumid:this.albumid}).subscribe((resp:any) => {
		                this.photos=resp.allphotos;	
		          });
          	}
            });
        }
      }
    ]
  });
  alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewimagesPage');
  }

}
