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
  selector: 'page-addextracharge',
  templateUrl: 'addextracharge.html',
})
export class AddextrachargePage {


status:any;
cat_id:any;

cat_name:any;
catlist:any;
companyid:any;

currency_id:any;
country_id:any;
crg_name:any;
crg_desc:any;
crg_type:any;
crg_value:any;
dont_apply_amt:any;
must_apply_amt:any;
apply_for_all:any;
userid:any;

constructor(public navCtrl: NavController, public navParams: NavParams, public general: General,public api: Api,public user: User, 
  private storage: Storage, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, 
  public camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker, private file: File, 
  public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController,public viewCtrl: ViewController) 
  {

   // alert('userid='+this.navParams.get('userid'));
        this.userid=this.navParams.get('userid');
      //this.storage.get('userid').then(userid=>{
            this.api.post('getcompanydtl',{userid:this.userid}).subscribe((res:any) => {     
              
              this.country_id=res.country_id;
              this.companyid=res.company_id;
              this.currency_id=res.currency_id;
            //  alert('extracharge_cat='+this.companyid);
              this.api.post('extracharge_cat',{userid:this.userid,company_id:this.companyid}).subscribe((res:any) => {
                this.catlist=res.catlist;  
                });

              });


     // });
    
    
  }




  saveextracharge()
  {
  		if(this.crg_name=='' || this.crg_name==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Extra Charge Name',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        }
       
        else if(this.crg_desc=='' || this.crg_desc==undefined)
        {
          let toast = this.toastCtrl.create({
            message: 'Enter Extra Charge Desc',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
	
        else if(this.crg_type=='' || this.crg_type==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Extra Charge Type',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 

        else if(this.crg_value=='' || this.crg_value==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Charge Value',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
        else if(this.dont_apply_amt=='' || this.dont_apply_amt==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Charge Value',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
        } 
        else if(this.cat_id=='' || this.cat_id==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Select Category',
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
        	//this.storage.get('userid').then(userid=>{
	  			this.api.post('addextracharge',{userid:this.userid,
          crg_name:this.crg_name,
          crg_desc:this.crg_desc,
          crg_type:this.crg_type,
          crg_value:this.crg_value,
          dont_apply_amt:this.dont_apply_amt,
          must_apply_amt:this.must_apply_amt,
          cat_id:this.cat_id,
          company_id:this.companyid}).subscribe((res:any) => {            
          loading.dismiss();
		                  
		                  		let toast = this.toastCtrl.create({
      						            message: 'Saved Successfully',
      						            duration: 3000,
      						            position: 'bottom'
      						        });
						              toast.present();
                         this.navCtrl.push('ExtrachargePage',{userid:this.userid});
                     //    this.navCtrl.push('Serviceandrepair20Page',{ scid:this.scid,catid:this.cat_id,company_id:this.companyid,subcat_level:'2',flowcountno:this.flowcountno });
	                 
		        });
			   // }); 
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

