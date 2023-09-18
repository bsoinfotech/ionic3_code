import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController,ViewController,LoadingController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-editlocation',
  templateUrl: 'editlocation.html',
})
export class EditlocationPage {
map: any;
     lat:any;
     lng:any;
     radiuss:any;
rad1:any;
mapdetails:any;
km:any;
location:any;
radius:any;
lat1:any;
lng1:any;
radiuss1:any;

status_code:any;
status_desc:any;
ref1:any;
ref2:any;
ref3:any;
ref4:any;
ref5:any;
nextpage:any;
user_id:any;


@ViewChild('radmap') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public platform: Platform, private storage: Storage,
    public api: Api, public toastCtrl: ToastController,
    public viewCtrl: ViewController,public loadingCtrl: LoadingController) {

    this.location=this.navParams.get('location');
    this.radiuss=this.navParams.get('radiuss');
    this.lat1=this.navParams.get('lat1');
    this.lng1=this.navParams.get('lng1');
    this.nextpage=this.navParams.get('nextpage');
    this.user_id=this.navParams.get('userid');

    //alert('editlocation-userid='+this.user_id);

      //this.kms=this.radiuss*1000;
      //this.getPlaces(this.kms);

     // alert('papa01='+this.lat1+'--'+this.lng1+'--'+this.radiuss);

    //  this.storage.get('userid').then((userid) => {
        if(this.lat1==''||this.lat1==undefined)
        {
       //   alert('papa04='+this.lat1+'--'+this.lng1+'--'+this.radiuss+'--'+userid);
         
                this.api.post("getRadiusdetails1", { userid:this.user_id}).subscribe((resp:any) => {
                  this.location=resp.location;
                  this.radiuss=resp.radiuss;
                  this.lat1=resp.lattitude;
                  this.lng1=resp.longitude;
                 // this.getPlaces(this.radiuss);
              //   alert('papa02='+this.lat1+'--'+this.lng1+'--'+this.radiuss+'--'+userid);
                 this.getPlaces(this.radiuss);
                });
        }
        else
        {
         // alert('latlng found='+this.radiuss);


                
         // this.getPlaces(this.radiuss);
        }
    //}); 
    
   // alert('construct- papa03='+this.lat1+'--'+this.lng1+'--'+this.radiuss);
  //   this.getPlaces(this.radiuss);


  }



ngAfterViewInit() {

//alert('ngAfterViewInit='+this.lat1+'--'+this.lng1+'--'+this.radiuss);
 }

 dismiss()
 {
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(0);
  }
 
getPlaces(a) 
{
  let lat = this.lat1;
  let lng = this.lng1;

//alert('hahaha='+lat+'--'+lng+'--'+ a);

var latlng = new google.maps.LatLng(lat, lng);
let map = new google.maps.Map(document.getElementById('radmap'), {
  center: latlng,
  zoom: 11
});

//alert('hahaha1='+latlng);
  let marker = new google.maps.Marker({
                 position: latlng,
                 map: map
             });

  this.km = a*1000;

let rad = parseInt(this.km);

//alert('hahaha2='+rad);
  let circle = new google.maps.Circle({
    map: map,
    radius: rad,    // 10 miles in metres
    fillColor: '#AA0000'
  });
  circle.bindTo('center', marker, 'position');


}





getRadius()
{
//  alert('calling getRadius='+this.radiuss+'--'+this.lat1+'--'+this.lng1);

this.getPlaces(this.radiuss);
this.radiuss=this.radiuss;

}


useLocation(loc,rad,lat,lng)
{      
     // this.storage.get('userid').then((userid) => {
          this.api.post("saveRadiuss2", { userid:this.user_id, radius:this.radiuss}).subscribe((resp:any) => {
            if(resp.status=='success')
            {
             // this.navCtrl.setRoot('ViewmapdetailsPage', {location:loc,radiuss:rad,lat1:lat,lng1:lng});

                  //this.storage.get('userid').then((userid) => {
                  this.api.post("getstatus", { userid:this.user_id}).subscribe((resp:any) => {
                  this.status_code=resp.status_code;
                  this.status_desc=resp.status_desc;
                  this.ref1 =resp.ref1;
                  this.ref2=resp.ref2;
                  this.ref3=resp.ref3;
                  this.ref4=resp.ref4;
                  this.ref5=resp.ref5;
                  });
                 // });

            //DetailAddressPage
            //this.navCtrl.setRoot(nextpage);
            //this.navCtrl.push(this.nextpage);

           
            /*
            if(this.ref2=='1')
            {
              //DetailAddressPage
              this.navCtrl.setRoot(nextpage);
            }
            else
            {
                let toast = this.toastCtrl.create({
                    message: 'Your profile is not activated yet',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
            */
                let toast = this.toastCtrl.create({
                message: 'Record Saved successfully',
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
               // this.viewCtrl.dismiss(0); 
               this.api.post('checkloginstatus', {userid:this.user_id}).subscribe((res:any) => {
                if(res.status=='success')
                {
                  //alert('calling page='+res.callpage+'--'+this.user_id);
                  
                  //this.navCtrl.push(res.callpage,{userid:this.user_id});
                  //DashboardPage
                  this.navCtrl.setRoot(res.callpage,{userid:this.user_id});	
                }
              });
            }
            else
            {
              let toast = this.toastCtrl.create({
                message: 'Record not saved',
                duration: 3000,
                position: 'bottom'
                });
                toast.present();
               
            }

          });
     // });
}
    

  ionViewDidLoad() {


   // this.getPlaces(this.radiuss);
//alert('ionViewDidLoad='+this.lat1+'--'+this.lng1+'--'+this.radiuss);

let loading = this.loadingCtrl.create({
  spinner:'hide',
  content: '<img src="assets/img/busy.gif">',
  //content: 'Loading Please Wait...'
  duration: 3000
  });
  loading.present();	

 this.getRadius();
   
  }

}
