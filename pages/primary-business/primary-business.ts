import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-primary-business',
  templateUrl: 'primary-business.html',
})
export class PrimaryBusinessPage {
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
total_selected:any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {
  //	this.storage.get('userid').then((userid) => {
		
		this.user_id=this.navParams.get('userid'); 
		if (this.user_id=='0' || this.user_id=='' ||this.user_id=='undefined' )
		{
		this.user_id= navParams.get('userid');

		}
		//alert('user_id='+this.user_id);
		this.selectmin =0;
		
        this.api.post("getallcategories", { userid:this.user_id}).subscribe((resp:any) => {
        this.categories=resp.categories;
		this.max_cat_allowed=resp.max_cat_allowed;
		this.msg= resp.msg;
		this.selectmin = resp.total_selected;

	//alert ('categories.length='+this.categories.length);
/*
	for (let categorie of this.categories) {
		//this.items.push(new Item(item));
		this.catidarr1.push(categorie.cat_id);
	  }
*/
		
        });
  //  });
       // this.storage.get('userid').then((userid) => {
       //     this.api.post("getpopularcategories", { userid:userid}).subscribe((resp:any) => {
        //        this.popular=resp.popular;
       //     });
       // });
		
		
  }
/*
updateCucumber(category)
{
  this.category='';

  this.catee=category;
}
allcat(category)
{
  this.cat='';
  this.catee=category;
}
*/

AddCategory()
{

	//this.storage.get('userid').then((userid) => {
/*
	let loading = this.loadingCtrl.create({
	spinner:'hide',
	content: '<img src="assets/img/busy.gif">',
	});
	loading.present();		
*/		
this.api.post("check_total_cat_limit", { userid:this.user_id,
	current_cat_count:this.selectmin,
	max_cat_allowed:this.max_cat_allowed,}).subscribe((res:any) => 
{

	let loading = this.loadingCtrl.create({
		spinner:'hide',
		content: '<img src="assets/img/busy.gif">',
		duration:2000
		});
		loading.present();

	if(res.status=='success')
	{
		//this.navCtrl.push('AddcatPage');	
		this.navCtrl.push('AddcatPage',{userid:this.user_id});
	}
	else
	{
		let toast = this.toastCtrl.create({
			message: this.msg, 
			duration: 3000,
			position: 'bottom'
			});
			toast.present();
	}
	});

	//alert ('select-max='+this.selectmin+'--'+this.max_cat_allowed);
}
  saveCategory()
  {
	this.api.post("getallcategories", { userid:this.user_id}).subscribe((resp:any) => {
        this.categories=resp.categories;
		this.max_cat_allowed=resp.max_cat_allowed;
		this.msg= resp.msg;
		this.selectmin = resp.total_selected;
        });
		
	this.f_cat=0;
	 
  	 if(this.selectmin <=0)
      {
          let toast = this.toastCtrl.create({
              message: 'Select minimum one category',
              duration: 3000,
              position: 'bottom'
          });
          toast.present();
      }
      else if (+this.selectmin> +this.max_cat_allowed)
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

		/*
		  alert ('this.categories.length two'+this.categories.length);

		  	for(var n1=0;n1<this.categories.length;n1++)
			{

				alert ('this.categories[n1].checked='+ n1+'--'+this.categories[n1].cat_id+'--'+this.categories[n1].checked);

				this.catidarr1.push(this.categories[n1].cat_id);

				if(this.categories[n1].checked>0)
				{
					alert('>>>>0:='+n1+'--'+this.categories[n1].cat_id);
					//this.catidarr1.push(this.categories[n1].cat_id);
				}
			
				if(this.categories[n1].checked==true)
				{
					alert('True:='+n1+'--'+this.categories[n1].cat_id);
					//this.catidarr1.push(this.categories[n1].cat_id);
				}

				if(this.categories[n1].checked==false)
				{
					alert('false:='+n1+'--'+this.categories[n1].cat_id);
					//this.catidarr1.push(this.categories[n1].cat_id);
				}
			}
			
			if(this.catidarr1.length > this.max_cat_allowed)				
			{
				let toast = this.toastCtrl.create({
				message: 'Maximum '+this.max_cat_allowed +' Categories are allowed',
				duration: 3000,
				position: 'bottom'
				});
				toast.present();
			}
			else
			{
			*/

//			let loading = this.loadingCtrl.create({
//			spinner:'hide',
//			content: '<img src="assets/img/busy.gif">',
//			});
//			loading.present();


			//insert into provider_sub_cat			
		//	this.storage.get('userid').then((userid) => 			{
					//alert('this.catidarr1.count='+this.catidarr1.length);
					
		
				this.api.post("cat_validate", { userid:this.user_id}).subscribe((resp1:any) => 
				{
	
//					loading.dismiss();
					
					if(resp1.status=='success')
					{
						

						//this.navCtrl.push('VideoPage');
						this.navCtrl.push('ProfileStatusPage',{userid:this.user_id});

						//--------------------------------------------------------------
						/*  --- call this during profile approval --------  20220317
						this.storage.get('userid').then((userid) => 
						{

							this.api.post("load_catsubcat", { userid:userid}).subscribe((resp:any) => 
							{

							});

							//this.navCtrl.setRoot('DashboardPage');


						});

						*/

						//-------------------------------------------------------------
					}							

				});
			//});
		//loading.dismiss();
			
      }
	  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryBusinessPage');
  }
//--------------------------------------------------------------------
selectMember(data,iid,ii)
{

	 if (data.checked == true) 
	{
		
		
			//this.catinfo1[ii].qty=1;
		//	this.categories[ii].id=this.categories[ii].id;
			this.categories[ii].cat_id=iid;
			this.categories[ii].checked=true;
			
			this.selectmin=+this.selectmin+1;
			//alert("cat_id="+iid+'  index='+ii+'--'+'True'+'--'+this.selectmin);
			
		//insert into provider_sub_cat			
	//	this.storage.get('userid').then((userid) => 
	//	{
	
			this.api.post("add_category", { userid:this.user_id, cat_id:iid}).subscribe((resp1:any) => 
			{				
				if(resp1.status!='success')
				{
					alert("cat_id="+iid+' Failed');
				}
	
			});
	//	});
	} 
	else 
	{
		
		//this.categories[ii].id=this.categories[ii].id;
		this.categories[ii].cat_id=iid;
		this.categories[ii].checked=false;
		
		this.selectmin=+this.selectmin-1;
		
		//alert("cat_id="+iid+'  index='+ii+'--'+'False'+'--'+this.selectmin);
		//this.catqty1.push('0');
        //this.catidarr1.push(iid);

		//this.storage.get('userid').then((userid) => 
		//{
	
			this.api.post("remove_category", { userid:this.user_id, cat_id:iid}).subscribe((resp1:any) => 
			{				
				if(resp1.status!='success')
				{
					alert("cat_id="+iid+' Failed');
				}
	
			});
		//});
			
	}

}

//--------------------------------------------------------------------
}
