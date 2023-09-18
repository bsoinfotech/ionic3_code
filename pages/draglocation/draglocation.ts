import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';


declare var google: any;
@IonicPage()
@Component({
  selector: 'page-draglocation',
  templateUrl: 'draglocation.html',
})
export class DraglocationPage {

 @ViewChild('mapele') mapElement: ElementRef;

    location:any;
    sublocation:any;

    postalcode:any;

    area:any;
    adminarea:any;
    country:any;
    lat:any;
    lng:any;
	loc:any;
radius:any;
lat1:any;
lng1:any;
radiuss:any;
loc1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geofence: Geofence, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private storage: Storage,public api: Api, public toastCtrl: ToastController) {
   		this.loc=this.navParams.get('location');
   		this.radiuss=this.navParams.get('radiuss');
   		this.lng1=this.navParams.get('lng1');
   		this.lat1=this.navParams.get('lat1');


  }


 ngAfterViewInit() {
 this.loadMap();
 }

   loadMap() {
  //this.geolocation.getCurrentPosition().then((resp) => {
		this.lat=this.lat1;
		this.lng=this.lng1;
		        
		    let latLng = new google.maps.LatLng(this.lat,this.lng);
		    
		 
		    let mapOptions = {
		      center: latLng,
		      zoom: 15,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

		    let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

		    let marker = new google.maps.Marker({
		        position: latLng,
		        map: map,
		        draggable:true,
		        title: '',
		      });  

		         let options: NativeGeocoderOptions = {
		                        useLocale: true,
		                        maxResults: 5
		                    };



		             google.maps.event.addListener(marker, 'dragend', (event)=> {

		             //placeMarker(event.latLng);
		             marker.setPosition(event.latLng);

		              this.lat=event.latLng.lat();
		              this.lng=event.latLng.lng();  

		this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options).then((result: NativeGeocoderReverseResult[]) =>{
		 	if(result[0].locality!=undefined)
			{
					this.location=result[0].locality;
			}
			if(result[0].subLocality!=undefined)
			{
					this.sublocation=result[0].subLocality;
			}
			if(result[0].subAdministrativeArea!=undefined)
			{
					this.area=result[0].subAdministrativeArea;
			}
			if(result[0].postalCode!=undefined)
			{
					this.postalcode=result[0].postalCode;
			}
			if(result[0].administrativeArea!=undefined)
			{
				this.adminarea=result[0].administrativeArea;
			}
			if(result[0].countryName!=undefined)
			{
				this.country=result[0].countryName;
			}

this.loc = this.location+','+this.sublocation+','+this.area+','+this.postalcode+','+this.adminarea+','+this.country;
		  })
		  .catch((error: any) => alert(error)); 
			 });
 
  }


  useLocation(loc,rad,lat,lng)
  {
  	if(this.loc=='' || this.loc==undefined)
     {
        let toast = this.toastCtrl.create({
            message: 'Enter Location',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
      else
      {
                  this.storage.get('userid').then((userid) => {
                      this.api.post("saveRadiuss1", { userid:userid, location:this.loc}).subscribe((resp:any) => {
                        if(resp.status=='success')
                        {
                          this.navCtrl.setRoot('ViewmapdetailsPage', {location:loc, radiuss:rad,lat1:lat,lng1:lng});
                        }

                      });
                  });
      }
  }

}
