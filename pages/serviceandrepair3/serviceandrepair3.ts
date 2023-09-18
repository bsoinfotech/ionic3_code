import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network'; 


@IonicPage()
@Component({
  selector: 'page-serviceandrepair3',
  templateUrl: 'serviceandrepair3.html',
})
export class Serviceandrepair3Page {
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

service_comm:any;
parts_comm:any;
lead_comm:any;



  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,
  private storage: Storage, public loadingCtrl: LoadingController,private network: Network,
  public toastCtrl: ToastController,private ConnectivityServiceProvider:ConnectivityServiceProvider) {
  	this.qty=0;
  	this.scids.scid=this.navParams.get('scatid'); 
    this.subcatid=this.navParams.get('scatid');
    this.catid=this.navParams.get('catid'); 
	this.subcat_level=this.navParams.get('subcat_level'); 
	
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
					
//this.general.showToast('cat_id='+this.catid);					
					
				if (this.subcat_level==0 || this.subcat_level=='undefined')
				{
					
//	this.general.showToast('scids='+this.scids);				
					
                this.api.get('getSubcatinfo',this.scids).subscribe((res:any) => {
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
				   
				   //	this.general.showToast('cat_id='+this.catid+'--'+this.subcat_level);
				   this.api.get('getSubcatinfo_1',{cat_id:this.catid,subcat_level:this.subcat_level}).subscribe((res:any) => {
				   

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
			   
			   //---------------------------------------- moved from next page to here ----
				this.storage.get('userid').then(userid=>{
				/*
				this.api.post('getcustomerlatlng', {userid:userid}).subscribe((res:any) => {
					this.lat=res.lat;
					this.lng=res.lng;
					this.id =res.id;
				});	
				
				this.api.post('getservicetype', {userid:userid}).subscribe((resp:any) => {
				this.location=resp.servicetype;
				});
				*/
				this.api.post('getComm', {userid:userid,cat_id:this.catid}).subscribe((res:any) => {

                   if(res.status=='success')
                   {    
                       this.service_comm=res.service_comm;
					   this.parts_comm=res.parts_comm;
					   this.lead_comm=res.lead_comm;
                      
                   }
                });					
				
				});	
				
				this.storage.get('catid').then(catid=>{
				this.api.post('getcategoryname', {catid:catid}).subscribe((resp:any) => {
				this.categoryname=resp.getcategoryname;
				});
				});
			
						   
			   //--------------------------------------------------------------------			   
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

gotoNetScreen(catid)
{


		
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true 
				//content: 'Loading Please Wait...'
				});
				loading.present();
		
				this.navCtrl.setRoot('DashboardPage');
				//this.navCtrl.push('DashboardPage');
				//this.navCtrl.push('DashboardPage',{useraddress:this.useraddress,location:this.location,categoryname:this.categoryname,lat:this.lat,lng:this.lng });
				loading.dismiss();
				


    
}
checkpartscost(userid,catid)
{


		
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				//dismissOnPageChange: true 
				//content: 'Loading Please Wait...'
				});
				loading.present();
		
				//this.navCtrl.setRoot('DashboardPage');
				//this.navCtrl.push('DashboardPage');
				this.navCtrl.push('PartsdtlPage',{userid:userid,catid:catid});
				loading.dismiss();
				


    
}

}
