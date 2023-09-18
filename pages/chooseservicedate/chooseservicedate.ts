import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User,Api,General } from '../../providers';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-chooseservicedate',
  templateUrl: 'chooseservicedate.html',
})
export class ChooseservicedatePage {
startdate1: string = new Date().toISOString();
//starttime: string = new Date().toISOString();
startdate: string = new Date().toISOString();

//startdate:any;
starttime:any;
catstatus:any;
startscreen:any;
endscreen:any;
showsummarysreen:any;
showpaysreen:any;
bidscreen:any;
fdate:any;
dattt:any;
date1:any;
monthh:any;
calenderdays:any;
calenderslots:any;
slots:any;
checked:any;
checkedtime:any;
nval:any;
startingdate:any;
senddate:any;
clickflag:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public toastCtrl: ToastController,public user: User,public general: General,public api: Api) {
  this.storage.get('customeraddress').then(customeraddress=>{

  var now = moment();
this.starttime = moment(now.format(), moment.ISO_8601).format();

  			//alert(customeraddress);
  });
  	this.storage.get('catid').then(catid=>{
	  this.api.post('getCalenderDays', {catid:catid}).subscribe((res:any) => {
	  			this.calenderdays=res.calenderdays;
	  			this.startingdate=res.startingdate;
	  			this.checked=res.weekday;
	  			this.senddate=res.calenderdays.senddate;
				//alert(this.checked);
	  			
	  			this.storage.get('catid').then(catid=>{
				  this.api.post('getCalenderslots', {catid:catid,sdate:this.checked,curdate:this.startingdate}).subscribe((res:any) => {
				  			if(res.status=='success')
				  			{
				  				this.calenderslots=res.calenderslots;
				  				this.nval=true;
				  			}
				  			else
				  			{
				  				this.nval=false;
				  			}
				  			
				  });
				});

	  });
	});


	

  }



  ngOnInit() {
  this.date1 = new Date();
  this.date1.setDate( this.date1.getDate() + 30 );
  let m= this.date1.getMonth()+1
    if(m==9 || m==10 || m==11)
    {
        this.monthh=m;
    }
    else
    {
        
        this.monthh='0'+m;
    }
    let dd=this.date1.getDate();

  if(dd==1 || dd==2 || dd==3 || dd==4 || dd==5 || dd==6 || dd==7 || dd==8 || dd==9)
  {
     
     this.dattt = '0'+this.date1.getDate();
  }
  else
  {
    this.dattt = this.date1.getDate();
  }
  this.fdate=this.date1.getFullYear()+'-'+this.monthh+'-'+this.dattt;
}

selectedDate(sdate,selecteddate)
{
    this.checked=sdate;
	this.startdate = selecteddate;
	
	//alert(this.checked+'---'+this.startdate );

	this.storage.get('catid').then(catid=>{
	  this.api.post('getCalenderslots', {catid:catid,sdate:sdate,curdate:selecteddate}).subscribe((res:any) => {
	  			if(res.status=='success')
	  			{
	  				this.calenderslots=res.calenderslots;
	  				this.nval=true;
	  			}
	  			else
	  			{
	  				this.nval=false;
	  			}
	  			
	  });
	});

}

saveDate(slots)
{
		this.checkedtime=slots;
	this.starttime=slots;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseservicedatePage');
  }
gotoNetScreen()
{
		if(this.checked=='' || this.checked==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Start Date',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();

	    }
	    else if(this.checkedtime=='' || this.checkedtime==undefined)
	    {
	        let toast = this.toastCtrl.create({
	            message: 'Select Start Time',
	            duration: 3000,
	            position: 'bottom'
	        });
	        toast.present();
	    }
	    else
	    {
				//biplab phase3 0913... issue with date when automatically selected and user not click on date
				var str = new String(this.startdate) 
				var len = str.length
				if (len==10)
				{
				localStorage.setItem("startdate",this.startdate);
//alert('Selected date1='+this.startdate );
				}
				else
				{
					localStorage.setItem("startdate",this.startingdate);	
//alert('Selected date2='+this.startingdate );
				}
				
				//alert(this.startdate+'----'+this.starttime+'---'+this.checked+' Length='+len );


				localStorage.setItem("starttime",this.starttime);
			    	
				this.storage.get('catid').then(catid=>{
				    this.api.post('getcustomerstatus', { catid:catid }).subscribe((res:any) => {
				    this.catstatus=res.catstatus;

				    this.endscreen=res.endscreen;
				    this.showsummarysreen=res.showsummarysreen;
				    this.showpaysreen=res.showpaysreen;
				    this.bidscreen=res.bidscreen;
					
					if(this.endscreen=='y' || this.endscreen=='Y')
				    {
						this.navCtrl.push('ChooseserviceenddatePage');
				    }
				    else if(this.showsummarysreen=='y' || this.showsummarysreen=='Y')
				    {
				        this.navCtrl.push('SummaryPage');
				    }
				    else if(this.showpaysreen=='y' || this.showpaysreen=='Y')
				    {
				        this.navCtrl.push('PaymentpagePage');
				    }
				    else if(this.bidscreen=='1')
			        {
			            this.navCtrl.push('BiddingPage');
			        }
					
					
				    });
				  });
	    }
	
	
}

}
