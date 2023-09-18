import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ViewController ,LoadingController} from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';


declare var google: any;
@IonicPage()
@Component({
  selector: 'page-homemap',
  templateUrl: 'homemap.html',
})
export class HomemapPage {
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
radiuss:any;
loc1:any;
status:any;
status1:any;
id:any;
autocompleteItems;
autocompleteItems1;
autocomplete;
value='1';
service:any;
thoroughfare:any;
subThoroughfare:any;
subadminarea:any;

lat1:any;
lng1:any;
user_id:any;

//add:any;
//subAdministrativeArea:any;


			
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geofence: Geofence, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private storage: Storage,public api: Api, public toastCtrl: ToastController, public viewCtrl: ViewController,public loadingCtrl: LoadingController) {
      this.service = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocompleteItems1 = [];
        this.autocomplete = {
            query: '',
            query1: ''
        };

let loading = this.loadingCtrl.create({
spinner:'hide',
content: '<img src="assets/img/busy.gif">',
//content: 'Loading Please Wait...'
});
loading.present();
				

      this.lng=this.navParams.get('lng');
      this.lat=this.navParams.get('lat');
	  
		this.location=this.navParams.get('location');		  
		this.id=this.navParams.get('id');
	  this.user_id=this.navParams.get('userid');
	  
//alert('latlng='+this.lng+'--'+this.lat);


//this.storage.get('userid').then((userid) => {
  if(this.lng=='' || this.lng==undefined)
  {
    this.api.post("checkproviderlocation", { userid:this.user_id}).subscribe((resp:any) => {
      this.lat= resp.lat;
      this.lng= resp.lng;
      this.location= resp.address2+' '+resp.address1;
      this.radius = resp.radius;

      });   
  }
    

//});
				
let toast = this.toastCtrl.create({
message: "Loading Map.. Please wait....",
duration: 3000,
position: 'bottom'
});
toast.present();

//alert('calling constructor');


	  
          if(this.lng!='' || this.lng!=undefined) 
          {
                this.autocomplete.query=this.location;
//alert ('homemap='+this.location)
				loading.dismiss();
          }
          if(this.lng=='' || this.lng==undefined) 
          {
            let option = {
              timeout:10000,
              enableHighAccuracy:true
              };
                  this.geolocation.getCurrentPosition(option).then((resp) => {

                      let options: NativeGeocoderOptions = {
                          useLocale: true,
                          maxResults: 5
                      };

				  //biplab phase2 0822 - default device lat/lng value capture
				  this.lat=resp.coords.latitude;
				  this.lng=resp.coords.longitude;
				  
                    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: NativeGeocoderReverseResult[]) =>{ 

                    if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }
					//--------------------------------------------------------------------------------
				    if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }
                  
                   // placemark.put("subThoroughfare", address.getSubThoroughfare() != null ? address.getSubThoroughfare() : "");
                  //  placemark.put("areasOfInterest", address.getFeatureName() != null ? new JSONArray(new String[]{ address.


                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }
                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }
				
					
					
                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }
							//subThoroughfare
                          let add = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
                          this.autocomplete.query=add;

                        });
						
						loading.dismiss();
                    });
					
					
            }
			//this.loadMap();
  }

dismiss() 
 {
    this.viewCtrl.dismiss();
 }

 ngAfterViewInit() {
	 
	// alert('calling ngAfterViewInit');
 this.loadMap();
 //this.choosePosition();
 //alert('finished ngAfterViewInit');
 
 }

loadMap() {
	   
let loading = this.loadingCtrl.create({
spinner:'hide',
content: '<img src="assets/img/busy.gif">',
//content: 'Loading Please Wait...'
duration: 3000
});
loading.present();	
//alert('lat-long1='+this.lng+'  '+this.lng);

              if(this.lng!='' || this.lng!=undefined) 
              {
                          let latLng = new google.maps.LatLng(this.lat,this.lng);
            
                          let mapOptions = {
                            center: latLng,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                          }
                        let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                        let marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            draggable:true,
                            title: 'Move Pin to Adjust your location ',
                          });  
                         let options: NativeGeocoderOptions = {
                                        useLocale: true,
                                        maxResults: 5
                                    };
                     google.maps.event.addListener(marker, 'dragend', (event)=> {
                     marker.setPosition(event.latLng);

                      this.lat=event.latLng.lat();
                      this.lng=event.latLng.lng();  
                  this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options).then((result: NativeGeocoderReverseResult[]) =>{

                   // alert (JSON.stringify(result[0]));

                    if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }
					///added newly
					          if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }

                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }

                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                      this.subadminarea=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                      this.subadminarea='';
                    }

                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }

					this.autocomplete.query = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.subadminarea+""+this.adminarea+""+this.country+""+this.postalcode;
                    })
                    .catch((error: any) => alert(error)); 
                     });  
            }  //else if(this.lng!='' || this.lng!=undefined) 
            if(this.lng=='' || this.lng==undefined) 
            {
//alert('Map Loading in progress ..Please allow sometimes');			
				
              this.geolocation.getCurrentPosition().then((resp) => {
//	loading.dismiss(); 
                let lat1=resp.coords.latitude;
                  let lng1=resp.coords.longitude;
                let latLng = new google.maps.LatLng(lat1,lng1);
            
                          let mapOptions = {
                            center: latLng,
                            zoom: 16,
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
//alert('lat-long2.5='+this.lng+'  '+this.lng);	
//alert('Map Loading First Time..Please allow sometimes');
//loading.dismiss(); 								
                     google.maps.event.addListener(marker, 'dragend', (event)=> {
						 
let loading = this.loadingCtrl.create({
spinner:'hide',
content: '<img src="assets/img/busy.gif">',
//content: 'Loading Please Wait...'
duration: 1000
});
loading.present();	
                     marker.setPosition(event.latLng);

                      this.lat=event.latLng.lat();
                      this.lng=event.latLng.lng();  
					  
//alert('lat-long2.6='+this.lng+'  '+this.lng);	
					  
                  this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options).then((result: NativeGeocoderReverseResult[]) =>{
loading.dismiss(); 
//alert('lat-long3='+this.lng+'  '+this.lng);					  
                   if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }
					
					if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }
					

                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }
                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }
                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }

						this.autocomplete.query = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
                    })
                    .catch((error: any) => alert(error)); 
                     });
//alert('lat-long4='+this.lng+'  '+this.lng);
               });
            }  
 
  }
 chooseItem(item: any) {
        this.autocomplete.query=item;
        this.value='1';
//alert('lat-long5='+this.lng+'  '+this.lng);
		this.geoCode(this.autocomplete.query);//convert Address to lat and long

    }

     geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.lat = results[0].geometry.location.lat();
    this.lng = results[0].geometry.location.lng();
    this.autocomplete.query=address;
    this.loadMap();
//alert('lat-long6='+this.lng+'  '+this.lng);
   });
 }
     updateSearch() 
    {
        this.value='';
        if (this.autocomplete.query == '') {
          this.autocompleteItems = [];
          return;
        }
        let me = this;
        
        this.service.getPlacePredictions({ input: me.autocomplete.query, componentRestrictions:{ country: 'IN' }  }, function (predictions, status) {
            me.autocompleteItems = []; 
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                  me.autocompleteItems.push(prediction.description);
                });
            });
        });
    }

choosePosition()
{
		
	let loading =  this.loadingCtrl.create({
	spinner:'hide',
	content: '<img src="assets/img/busy.gif">',
	dismissOnPageChange: true 
	//content: 'Loading Please Wait...'
	});
	 loading.present();
		 
		 
	this.geolocation.getCurrentPosition().then((resp) => {
                let lat1=resp.coords.latitude;
                  let lng1=resp.coords.longitude;
              let options1: NativeGeocoderOptions = {
                                        useLocale: true,
                                        maxResults: 5
                                    };
                  this.nativeGeocoder.reverseGeocode(lat1, lng1, options1).then((result: NativeGeocoderReverseResult[]) =>{
//this.general.showToast('location:'+result[0].locality);

loading.dismiss();		

				  
                    if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }
					
					
					if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }
					

                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }
                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }
                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }

              this.autocomplete.query = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
                  });
                let latLng = new google.maps.LatLng(lat1,lng1);
            
                          let mapOptions = {
                            center: latLng,
                            zoom: 16,
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
                     marker.setPosition(event.latLng);

                      this.lat=event.latLng.lat();
                      this.lng=event.latLng.lng();  
                  this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options).then((result: NativeGeocoderReverseResult[]) =>{
                    if(result[0].thoroughfare!=undefined)
                    {
                        this.thoroughfare=result[0].thoroughfare+", ";
                    }
                    else
                    {
                        this.thoroughfare='';
                    }

					if(result[0].subThoroughfare!=undefined)
                    {
                        this.subThoroughfare=result[0].subThoroughfare+", ";
                    }
                    else
                    {
                        this.subThoroughfare='';
                    }
					
                    if(result[0].locality!=undefined)
                    {
                        this.location=result[0].locality+", ";
                    }
                    else
                    {
                        this.location='';
                    }
                    if(result[0].subLocality!=undefined)
                    {
                        this.sublocation=result[0].subLocality+", ";
                    }
                    else
                    {
                      this.sublocation='';
                    }

                    if(result[0].subAdministrativeArea!=undefined)
                    {
                        this.area=result[0].subAdministrativeArea+", ";
                    }
                    else
                    {
                        this.area='';
                    }

                    if(result[0].postalCode!=undefined)
                    {
                        this.postalcode=result[0].postalCode+", ";
                    }
                    else
                    {
                        this.postalcode='';
                    }
                    if(result[0].administrativeArea!=undefined)
                    {
                      this.adminarea=result[0].administrativeArea+", ";
                    }
                    else
                    {
                      this.adminarea='';
                    }
                    if(result[0].countryName!=undefined)
                    {
                      this.country=result[0].countryName+", ";
                    }
                    else
                    {
                      this.country='';
                    }

              this.autocomplete.query = this.subThoroughfare+""+this.thoroughfare+""+this.sublocation+""+this.location+""+this.area+""+this.adminarea+""+this.country+""+this.postalcode;
                    })
                    .catch((error: any) => alert(error)); 
                     });
               });
	 loading.dismiss();	//added newly
			   
}
  useLocation(id)
  {
/*
let toast = this.toastCtrl.create({
message: "lat/long="+this.lat + this.lng,
duration: 6000,
position: 'bottom'
});
toast.present();
*/
//alert('this.autocomplete.query='+this.autocomplete.query)

	if (this.autocomplete.query==''||this.autocomplete.query==undefined)
	{		
		let toast = this.toastCtrl.create({
		message: "Location can not be null...",
		duration: 2000,
		position: 'bottom'
		});
		toast.present();
			
	}
	else
	{
     //save partner address
     
    // this.storage.get('userid').then((userid) => {    
      this.api.post("savesp_location", { userid:this.user_id, lat:this.lat,lng:this.lng, location:this.autocomplete.query}).subscribe((resp:any) => {
        if(resp.status=='success')
        {
          this.navCtrl.push('EditlocationPage', {location:this.autocomplete.query, radiuss:resp.radius, lat1:this.lat, lng1:this.lng,nextpage:'DetailAddressPage',userid:this.user_id});
        }

        //alert('EditlocationPage='+this.autocomplete.query+'--'+resp.radius+'--'+this.lat+'--'+this.lng+'--'+this.user_id);

      });
  //});
     // this.navCtrl.push('GetuseraddressPage', {address1:this.autocomplete.query,id:id,lat:this.lat,lng:this.lng});
    
	}
  }

 /* useLocation(loc,rad,lat,lng,id)
  {

     if(this.autocomplete.query=='' || this.loc==undefined)
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


                let options: NativeGeocoderOptions = {
                    useLocale: true,
                    maxResults: 5
                };
            let location = this.autocomplete.query;
            this.nativeGeocoder.forwardGeocode(location, options).then((coordinates: NativeGeocoderForwardResult[]) => {
                  this.lat= coordinates[0].latitude;
                  this.lng= coordinates[0].longitude;
                  this.storage.get('userid').then((userid) => {    
                      this.api.post("customersaveRadiuss", { userid:userid, clat:this.lat,clng:this.lng, location:this.autocomplete.query,id:id}).subscribe((resp:any) => {
                        if(resp.status=='success')
                        {
                          this.navCtrl.push('CustomeraddressPage');
                        }

                      });
                  });
            });
      }

  } */


}
