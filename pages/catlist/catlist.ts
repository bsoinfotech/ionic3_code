import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController,ViewController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-catlist',
  templateUrl: 'catlist.html',
})
export class CatlistPage {
categories:any;
category:any;
popular:any;
cat:any;
catee:any;
catinfo: any;

catinfo1:any;
catqty1:any=[];
catidarr1:any=[];
selectmin:any;
f_cat:any;
cat_id:any;
user_id:any;


insert_1:any;
insert_2:any;

max_cat_allowed:any;
msg:any;

lat:any;
lng:any;
location:any;
catid:any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public user: User,
    public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, 
    public toastCtrl: ToastController, private storage: Storage, public viewCtrl: ViewController,public loadingCtrl: LoadingController) {
  	//this.storage.get('userid').then((userid) => {
		this.selectmin=0;
		this.user_id=this.navParams.get('userid'); 
		
        this.api.post("getallcategories", { userid:this.user_id}).subscribe((resp:any) => {
        this.categories=resp.categories;
        this.max_cat_allowed=resp.max_cat_allowed;
        this.msg= resp.msg;
		
        });
    //});
	
		
  }

  checkinventory()
  {
	this.navCtrl.push('PrimaryBusinessPage',{userid:this.user_id});	
  }

  saveCategory()
  {
	this.f_cat=0;
	 
  	 if(this.catid =='' || this.catid ==undefined)
      {
          let toast = this.toastCtrl.create({
              message: 'Select category',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
      }
      else if (this.selectmin> this.max_cat_allowed)
      {
			let toast = this.toastCtrl.create({
			message: this.msg, 
			duration: 3000,
			position: 'bottom'
			});
			toast.present();
	  }
	  else
	  {
		  
		//  	for(var n1=0;n1<this.categories.length;n1++)
		//	{
				if(this.catid>0)
				{
					this.catidarr1.push(this.catid);
				}
		//	}

			
			//this.storage.get('userid').then((userid) => {
					
				this.api.post("savecategory2", { userid:this.user_id, categories:this.catidarr1}).subscribe((resp1:any) => 
				{
					
					if(resp1.status=='success')
					{
						
						//this.storage.get('userid').then((userid) => {

							this.api.post("load_catsubcat", { userid:this.user_id}).subscribe((resp:any) => 
							{

								if(resp.status=='success')
								{
										let toast = this.toastCtrl.create({
										message: 'Category loaded Successfully',
										duration: 3000,
										position: 'bottom'
										});
										toast.present();
										this.navCtrl.push('ListMaster1Page',{userid:this.user_id});	
                    //list-master1						
								}
								else
								{			
										let toast = this.toastCtrl.create({
										message: 'Category loading failed.. Try later on',
										duration: 3000,
										position: 'bottom'
										});
										toast.present();					
										this.navCtrl.push('ListMaster1Page',{userid:this.user_id});
								}
							});

						//});

						//-------------------------------------------------------------
					}							

				});
			//});
		//loading.dismiss();
			
      }
	  
  }

  AddCategory()
  {
    this.navCtrl.push('AddcatPage',{userid:this.user_id});
  }

  dismiss() 
   {

              this.viewCtrl.dismiss(0);
      
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatlistPage');
  }


//--------------------------------------------------------------------
}
