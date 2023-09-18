import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the SelectdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectdate',
  templateUrl: 'selectdate.html',
})
export class SelectdatePage {
	 time = new Date();
    fixedTimezone = this.time;
today: number = Date.now();
date: Date;
date1: Date;
date2: Date;
date3: Date;
changeclass : any;
changeclass1 : any;
changeclass2 : any;
changeclass3 : any;
changeclass4 : any;

changetimeclass1:any;
changetimeclass2:any;
changetimeclass3:any;
changetimeclass4:any;
changetimeclass5:any;
changetimeclass6:any;
changetimeclass7:any;
changetimeclass8:any;
changetimeclass9:any;
changetimeclass10:any;
changetimeclass11:any;
changetimeclass12:any;
changetimeclass13:any;
changetimeclass14:any;
changetimeclass15:any;
changetimeclass16:any;



currentdate: any;
 
   constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe: DatePipe) {
   	    this.currentdate=this.datePipe.transform(this.time, 'HHmm'); 
   	    this.changeclass = false;
   	    this.changeclass1 = true;
   	    this.changeclass2 = true;
   	    this.changeclass3 = true;
   	    this.changeclass4 = true;
   	    this.changetimeclass1 = false;
   	    this.changetimeclass2 = true;
   	    this.changetimeclass3 = true;
   	    this.changetimeclass4 = true;
   	    this.changetimeclass5 = true;
   	    this.changetimeclass6 = true;
   	    this.changetimeclass7 = true;
   	    this.changetimeclass8 = true;
   	    this.changetimeclass9 = true;
   	    this.changetimeclass10 = true;
   	    this.changetimeclass11 = true;
   	    this.changetimeclass12 = true;
   	    this.changetimeclass13 = true;
   	    this.changetimeclass14 = true;
   	    this.changetimeclass15 = true;
   	    this.changetimeclass16 = true;

   }

  ionViewDidLoad() {
  	 this.date = new Date();
     this.date.setDate( this.date.getDate() + 1 );
     this.date1 = new Date();
     this.date1.setDate( this.date1.getDate() + 2 );
     this.date2 = new Date();
     this.date2.setDate( this.date2.getDate() + 3 );
     this.date3 = new Date();
     this.date3.setDate( this.date3.getDate() + 4 );
     console.log('ionViewDidLoad SelectdatePage');
  }
  changeTimeClass(tval)
  {
    if(tval==1)
  	{
      if(this.changetimeclass1==true)
	  	{
	       this.changetimeclass1 = false;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass1==false)
	  	{ 
           this.changetimeclass1 = false;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
  	}
  	else if(tval==2)
  	{
      if(this.changetimeclass2==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = false;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass2==false)
	  	{  

	  	}
  	}
  	else if(tval==3)
  	{
      if(this.changetimeclass3==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = false;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass3==false)
	  	{  

	  	}
  	}
  	else if(tval==4)
  	{
      if(this.changetimeclass4==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = false;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass4==false)
	  	{  

	  	}
  	}
  	else if(tval==5)
  	{
      if(this.changetimeclass5==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = false;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass5==false)
	  	{  

	  	}
  	}
  	else if(tval==6)
  	{
      if(this.changetimeclass6==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = false;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass6==false)
	  	{  

	  	}
  	}
  	else if(tval==7)
  	{
      if(this.changetimeclass7==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = false;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass7==false)
	  	{  

	  	}
  	}
  	else if(tval==8)
  	{
      if(this.changetimeclass8==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = false;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass8==false)
	  	{  

	  	}
  	}
  	else if(tval==9)
  	{
      if(this.changetimeclass9==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = false;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass9==false)
	  	{  

	  	}
  	}
  	else if(tval==10)
  	{
      if(this.changetimeclass10==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = false;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass10==false)
	  	{  

	  	}
  	}
  	else if(tval==11)
  	{
      if(this.changetimeclass11==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = false;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass11==false)
	  	{  

	  	}
  	}
  	else if(tval==12)
  	{
      if(this.changetimeclass12==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = false;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass12==false)
	  	{  

	  	}
  	}
  	else if(tval==13)
  	{
      if(this.changetimeclass13==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = false;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass13==false)
	  	{  

	  	}
  	}
  	else if(tval==14)
  	{
      if(this.changetimeclass14==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = false;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass14==false)
	  	{  

	  	}
  	}
  	else if(tval==15)
  	{
      if(this.changetimeclass15==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = false;
		   this.changetimeclass16 = true;
	  	}
	  	else if(this.changetimeclass15==false)
	  	{  

	  	}
  	}
  	else if(tval==16)
  	{
      if(this.changetimeclass16==true)
	  	{
	       this.changetimeclass1 = true;
	       this.changetimeclass2 = true;
   	       this.changetimeclass3 = true;
		   this.changetimeclass4 = true;
		   this.changetimeclass5 = true;
		   this.changetimeclass6 = true;
		   this.changetimeclass7 = true;
		   this.changetimeclass8 = true;
		   this.changetimeclass9 = true;
		   this.changetimeclass10 = true;
		   this.changetimeclass11 = true;
		   this.changetimeclass12 = true;
		   this.changetimeclass13 = true;
		   this.changetimeclass14 = true;
		   this.changetimeclass15 = true;
		   this.changetimeclass16 = false;
	  	}
	  	else if(this.changetimeclass16==false)
	  	{  

	  	}
  	}
  }

  changeDateClass(val)
  {
  	if(val==1)
  	{
  		if(this.changeclass==true)
	  	{
	       this.changeclass = false;
	       this.changeclass1 = true;
	       this.changeclass2 = true;
	       this.changeclass3 = true;
	       this.changeclass4 = true;
	  	}
	  	else if(this.changeclass==false)
	  	{ 
           this.changeclass = false;
	       this.changeclass1 = true;
	       this.changeclass2 = true;
	       this.changeclass3 = true;
	       this.changeclass4 = true;
	  	}
  	}
  	else if(val==2)
  	{
  		if(this.changeclass1==true)
	  	{
	       this.changeclass = true;
	       this.changeclass1 = false;
	       this.changeclass2 = true;
	       this.changeclass3 = true;
	       this.changeclass4 = true;
	  	}
	  	else if(this.changeclass1==false)
	  	{ 
	  		
	  	}
  	}
  	else if(val==3)
  	{
  		if(this.changeclass2==true)
	  	{
	       this.changeclass = true;
	       this.changeclass1 = true;
	       this.changeclass2 = false;
	       this.changeclass3 = true;
	       this.changeclass4 = true;
	  	}
	  	else if(this.changeclass2==false)
	  	{ 
	  		
	  	}
  	}
  	else if(val==4)
  	{
  		if(this.changeclass3==true)
	  	{
	       this.changeclass = true;
	       this.changeclass1 = true;
	       this.changeclass2 = true;
	       this.changeclass3 = false;
	       this.changeclass4 = true;
	  	}
	  	else if(this.changeclass3==false)
	  	{ 
	  		
	  	}
  	}
  	else if(val==5)
  	{
  		if(this.changeclass4==true)
	  	{
	       this.changeclass = true;
	       this.changeclass1 = true;
	       this.changeclass2 = true;
	       this.changeclass3 = true;
	       this.changeclass4 = false;
	  	}
	  	else if(this.changeclass4==false)
	  	{ 
	  		
	  	}
  	}
  	
   	
  }
gotoNetScreen()
{
	this.navCtrl.push('SummaryPage');
}
}
