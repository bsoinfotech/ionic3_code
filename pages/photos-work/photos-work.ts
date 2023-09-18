import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-photos-work',
  templateUrl: 'photos-work.html',
})
export class PhotosWorkPage {
jsj:any;
jjcount:any;
profile_image:any;
attb_id:any;
cat_id:any;
cnt:any;
allphotos:any;
albumcnt:any;
url4:any;

//	url4: string = 'https://bsoinfotech.com/servicefinder/api/api_p0029.php?action=uploadmultipleImages';

  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public actionSheetCtrl: ActionSheetController, public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, public loadingCtrl: LoadingController) 
  {

    //added on 3rd Aug 2021 -start
    this.storage.get('api_url').then(url=>{     
    this.url4 = url+'=uploadmultipleImages';  
    
    });
    //added on 3rd Aug 2021 -end

    this.attb_id=this.navParams.get('attb_id');
    this.cat_id=this.navParams.get('cat_id');
    let loading = this.loadingCtrl.create({
            spinner:'hide',
            content: '<img src="assets/img/busy.gif">',
          });
          loading.present();
          this.storage.get('userid').then((userid) => {
            this.api.post("getphotos", { userid:userid}).subscribe((resp:any) => {
            loading.dismiss();
              this.allphotos=resp.allphotos;
              this.albumcnt=resp.allphotos.albumcnt;
            });
          });
           this.storage.get('userid').then((userid) => {
            this.api.post("getalbumcount", { userid:userid}).subscribe((resp:any) => {
              this.albumcnt=resp.albumcnt;
            });
          });

  }


  uploadmultipleImages() 
  {
    let options1: FileUploadOptions = {
         fileKey: 'image',
         fileName: 'name.jpg',
         headers: {},
         chunkedMode: false,
         mimeType: 'image/jpg',
      }

    let options3 = {
        maximumImagesCount: 20,
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
                  fileTransfer.upload(results[jj], this.url4+'&userid='+userid+'&attb_id='+this.attb_id+'&cat_id='+this.cat_id+'&counts='+jj+'&length='+results.length, options1, true).then((resp:any) => {

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
                          this.storage.get('userid').then((userid) => {
                            this.api.post("getphotos", { userid:userid}).subscribe((resp:any) => {
                            
                              this.allphotos=resp.allphotos;
                              this.albumcnt=resp.allphotos.albumcnt;
                            });
                          });

                  }
                   

                       
                   }, (err) => { });    

                   }); 
              }

               


            	
                
         }     
      }, (err) => { });
  }

getPhotos(albumid,cnt,attb_id,cat_id)
{
  this.navCtrl.push('ViewimagesPage', {albumid:albumid,cnt:cnt,attb_id:attb_id,cat_id:cat_id});
}

ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosWorkPage');
  }

}
