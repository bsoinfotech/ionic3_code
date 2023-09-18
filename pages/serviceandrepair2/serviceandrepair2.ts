import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController,AlertController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-serviceandrepair2',
  templateUrl: 'serviceandrepair2.html',
})
export class Serviceandrepair2Page {
 qty:any;
scid: any;
  scats: any;
  cats: any;
  catinfo: any;
  stat:any;
  category: any;
  scids: { scid: any} =
  {
    scid: ''
  };
catid:any;

catqty:any=[];
catidarr:any=[];

totaldata:any;
subcatid:any;
scatnextscreendesc:any;
scatname:any;
totalorderprice:any;
orderprice:any;
price:any;
checkminordprice:any;
minorderprice:any;

userid:any;
useraddress:any;
categoryname:any;
location:any;
lat:any;
lng:any;
id:any;
chkbox_status:any;
subcat_level:any;
scatid:any;
newqty:any;
added:any;
company_id:any;




  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
  private storage: Storage, public loadingCtrl: LoadingController,private network: Network,private alertCtrl: AlertController,
  public toastCtrl: ToastController,private ConnectivityServiceProvider:ConnectivityServiceProvider) {
  	this.qty=0;
  	this.scids.scid=this.navParams.get('scatid');
    this.scatid=this.navParams.get('scid');
    this.catid=this.navParams.get('catid');
	this.subcat_level='1';
  //this.navParams.get('subcat_level');

  this.company_id=this.navParams.get('company_id');

	this.storage.get('userid').then(userid=>{
    		   this.userid=userid;
         });

   }

  ionViewDidLoad() {
                ////this.general.showLoading();

				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true
				//content: 'Loading Please Wait...'
				});
				loading.present();
/*
        this.subcat_level=1;
//this.general.showToast('cat_id='+this.catid);

				if (this.subcat_level==0 || this.subcat_level=='undefined')
				{

//	this.general.showToast('scids='+this.scids);

                this.api.get('getSubcatinfo',{scid:this.scids,company_id:this.company_id}).subscribe((res:any) => {
				loading.dismiss();
                   if(res.status=='success')
                   {
                       this.catinfo=res.catinfo;
                       this.scatnextscreendesc=res.scatnextscreendesc;
                       this.scatname=res.scatname;
					   this.minorderprice=res.minorderprice;
					   this.checkminordprice=res.checkminordprice;
                       //this.general.hideLoading();
                   }
                   else
                   {
                       // this.general.hideLoading();
                        this.general.showToast(res.message);
                   }
               });
				}
			   else
			   {
*/
				 //  alert('cat_id='+this.catid+'--'+this.scatid+'--'+ this.company_id);
				   this.api.post('getSubcatinfo_1',{scid:this.scatid,cat_id:this.catid,subcat_level:this.subcat_level,company_id:this.company_id}).subscribe((res:any) => {

				  loading.dismiss();
                   if(res.status=='success')
                   {
                       this.catinfo=res.catinfo;
                       this.scatnextscreendesc=res.scatnextscreendesc;
                       this.scatname=res.scatname;
					   this.minorderprice=res.minorderprice;
					   this.checkminordprice=res.checkminordprice;
                       //this.general.hideLoading();
                   }
                   else
                   {
                       // this.general.hideLoading();
                        this.general.showToast(res.message);
                   }
               });
	//		   }


  }

  scopedtl(cat_id,id,company_id)
  {
    let loading = this.loadingCtrl.create({
    spinner:'hide',
    content: '<img src="assets/img/busy.gif">',
    //dismissOnPageChange: true
    //content: 'Loading Please Wait...'
    });
    loading.present();

    this.navCtrl.push('ScopedtlPage',{cat_id:cat_id,scat_id:id,company_id:company_id});
    loading.dismiss();

  }

  decreaseCount(qty,id,i)
  {
  	if(this.catinfo[i].qty <= 0)
  	{
      //this.general.showToast('Quantity Should Be Greater Than 0');
  	}

  	else
  	{
  	this.catinfo[i].qty=this.catinfo[i].qty-1;
  	this.catinfo[i].id=this.catinfo[i].id;

  	this.totaldata = [this.catinfo[i].id,this.catinfo[i].qty];

    if(this.catqty.length)
{
     var ind=this.catidarr.indexOf(id);
     if(ind!=-1)
      {
        this.catqty.splice(ind, 1);
        this.catidarr.splice(ind, 1);

        this.catqty.push(this.catinfo[i].qty);
        this.catidarr.push(this.catinfo[i].id);

      }

        else
        {
          this.catqty.push(this.catinfo[i].qty);
          this.catidarr.push(this.catinfo[i].id);
        }

}
else
{
    this.catqty.push(this.catinfo[i].qty);
    this.catidarr.push(this.catinfo[i].id);
}


  	}

  }
  updateCount(qty,id,i)
  {

  this.catinfo[i].qty=this.catinfo[i].qty+1;
  this.catinfo[i].id=this.catinfo[i].id;
  this.totaldata = [this.catinfo[i].id,this.catinfo[i].qty];

if(this.catqty.length)
{
     var ind=this.catidarr.indexOf(id);
     if(ind!=-1)
      {
        this.catqty.splice(ind, 1);
        this.catidarr.splice(ind, 1);

        this.catqty.push(this.catinfo[i].qty);
	      this.catidarr.push(this.catinfo[i].id);

//alert('xx='+this.catinfo[i].id);

      }

        else
	      {
	        this.catqty.push(this.catinfo[i].qty);
	        this.catidarr.push(this.catinfo[i].id);
//alert('xxx='+this.catinfo[i].id);
	      }


}
else
{
	  this.catqty.push(this.catinfo[i].qty);
	  this.catidarr.push(this.catinfo[i].id);
}

  }

selectMember(data,iid,ii)
	{

	 if (data.checked == true)
		{
		//this.selectedArray.push(data);
 // this.catinfo[i].qty=1;
//  this.catinfo[i].id=this.catinfo[i].id;
		//this.updateCount(0,iid,i);
	this.catinfo[ii].qty=1;
  	this.catinfo[ii].id=this.catinfo[ii].id;
  	this.totaldata = [this.catinfo[ii].id,this.catinfo[ii].qty];
	    if(this.catqty.length)
{
     var ind=this.catidarr.indexOf(iid);
     if(ind!=-1)
      {
        this.catqty.splice(ind, 1);
        this.catidarr.splice(ind, 1);

        this.catqty.push(this.catinfo[ii].qty);
        this.catidarr.push(this.catinfo[ii].id);

      }

        else
        {
          this.catqty.push(this.catinfo[ii].qty);
          this.catidarr.push(this.catinfo[ii].id);
        }

}
else
{
    this.catqty.push(this.catinfo[ii].qty);
    this.catidarr.push(this.catinfo[ii].id);
}

		}
	  else
		{
	   //let newArray = this.selectedArray.filter(function(el) {
		// return el.testID !== data.testID;
	  //});
	  // this.selectedArray = newArray;
	  //this.general.showToast('Quantity =0');
 // this.catinfo[i].qty=0;
 // this.catinfo[i].id=this.catinfo[i].id;
		//this.decreaseCount(1,iid,i);
	this.catinfo[ii].qty=0;
  	this.catinfo[ii].id=this.catinfo[ii].id;
  	this.totaldata = [this.catinfo[ii].id,this.catinfo[ii].qty];
	    if(this.catqty.length)
{
     var ind=this.catidarr.indexOf(iid);
     if(ind!=-1)
      {
        this.catqty.splice(ind, 1);
        this.catidarr.splice(ind, 1);

        this.catqty.push(this.catinfo[ii].qty);
        this.catidarr.push(this.catinfo[ii].id);

      }

        else
        {
          this.catqty.push(this.catinfo[ii].qty);
          this.catidarr.push(this.catinfo[ii].id);
        }

}
else
{
    this.catqty.push(this.catinfo[ii].qty);
    this.catidarr.push(this.catinfo[ii].id);
}
		}

	}

/*
updateqtycount(chkboxstatus,iqty,iid,i)
{
if (chkboxstatus==true)
{
	 this.updateCount(iqty,iid,i);
}
else
{
	this.decreaseCount(iqty,iid,i);
}

}
*/

checkpartscost(userid,catid)
{



				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true
				//content: 'Loading Please Wait...'
				});
				loading.present();

				this.navCtrl.push('PartsdtlPage',{userid:userid,catid:catid});
				loading.dismiss();




}

gotoNetScreen(catid)
{



      for(var n=0;n<this.catqty.length;n++)
      {
        if(this.catqty[n]>0)
        {
          this.stat=1;break;
        }
        else{
        this.stat=0;
        }

      }
    //var ind1=this.catqty.indexOf(1);
    if(this.stat==0 || this.catqty.length==0)
    {
            let toast = this.toastCtrl.create({
                message: 'Please select minimum quantity one',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
    }
    else
    {



      localStorage.setItem("subcatid",this.subcatid);
      localStorage.setItem("catid",catid);
      localStorage.setItem("catidarr",this.catidarr);
      localStorage.setItem("catqty",this.catqty);
	//alert('xxxxx1');
		//-------------------------------------------
			// biplab phase2 added on 0807

		this.totalorderprice=0;

		for(var n1=0;n1<this.catinfo.length;n1++)
		{
			if(this.catinfo[n1].qty>0)
			{
			  this.orderprice= (this.catinfo[n1].qty * this.catinfo[n1].currentprice) ;
			  this.totalorderprice = this.totalorderprice + this.orderprice ;

			  //	alert('xxxxx2');

			}
		}

		if(this.checkminordprice=='y')
		{
			if (this.minorderprice > this.totalorderprice)
			{
				this.general.showToast('Your Order Value Rs '+this.totalorderprice+' is less than Minimum Order value Rs '+this.minorderprice);
				return true;

			}
		}

				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true
				//content: 'Loading Please Wait...'
				});
				loading.present();


				//this.navCtrl.push('CustomeraddressPage');
				this.navCtrl.push('CustomeraddressPage',{useraddress:this.useraddress,location:this.location,categoryname:this.categoryname,lat:this.lat,lng:this.lng });
				loading.dismiss();



    }
}


}
