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
  selector: 'page-servicearea',
  templateUrl: 'servicearea.html',
})
export class ServiceareaPage {
@ViewChild('mapview') mapElement: ElementRef;
map: any;

     lat:any;
     lng:any;
location:any;
radius:any;
lng1:any;
lat1:any;
mapdetails:any;
kms:any;
autocompleteItems;
    autocomplete;
    value='1';
radiuss:any;
rad1:any;
service:any;
attb_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geofence: Geofence, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private storage: Storage,public api: Api, public toastCtrl: ToastController) {
   this.location=this.navParams.get('location');
  this.radius=this.navParams.get('radius');
  this.lat1=this.navParams.get('lat1');
  this.lng1=this.navParams.get('lng1');

this.attb_id=this.navParams.get('attb_id');

  this.storage.get('userid').then((userid) => {
          this.api.post("getRadiusdetails", { userid:userid}).subscribe((resp:any) => {
                this.mapdetails=resp.mapdetails;
                this.autocomplete.query=resp.mapdetails.location;
                this.radiuss=resp.mapdetails.radius;
          });
  });

  this.service = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: '',
        }; 
	
  }


ngAfterViewInit() {
 this.getPlaces(this.radiuss);
 }


getPlaces(a) {


      let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        let location = this.location;

   this.nativeGeocoder.forwardGeocode(location, options).then((coordinates: NativeGeocoderForwardResult[]) => {
          this.lat= coordinates[0].latitude;
          this.lng= coordinates[0].longitude;
          this.rad1 = parseInt(a);

              let map = new google.maps.Map(document.getElementById('mapview'), {
                    zoom: 13,
                    center: new google.maps.LatLng(this.lat,this.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            let latLng = new google.maps.LatLng(this.lat,this.lng);
            let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            let marker = new google.maps.Marker({
                position: latLng,
                map: map
              }); 
              this.kms=this.radius*1000; 
let rad1 = parseInt(this.kms);
            // Add circle overlay and bind to marker
let circle = new google.maps.Circle({
  map: map,
  radius: this.rad1,    // 10 miles in metres
  fillColor: '#AA0000'
});
circle.bindTo('center', marker, 'position');



    });
}


updateSearch() 
    {
        this.value='';
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            this.value='1';
            return;
        }
        let me = this;
      
        this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions:{  }  }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction.description);
                });
            });
        });
    }

     chooseItem(item: any) {

    let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        let location = item;
   this.nativeGeocoder.forwardGeocode(location, options).then((coordinates: NativeGeocoderForwardResult[]) => {
          this.lat= coordinates[0].latitude;
          this.lng= coordinates[0].longitude;
              let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 17,
                    center: new google.maps.LatLng(this.lat,this.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            let latLng = new google.maps.LatLng(this.lat,this.lng);
            let mapOptions = {
              center: latLng,
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            let marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
              this.kms=this.radiuss*1000;  
let rad1 = parseInt(this.kms);
            // Add circle overlay and bind to marker
let circle = new google.maps.Circle({
  map: map,
  radius: rad1,    // 10 miles in metres
  fillColor: '#AA0000'
});
circle.bindTo('center', marker, 'position');



    });





        this.autocomplete.query=item;
        this.value='1';
    }
    getRadius()
{
let km =this.radiuss*1000;
this.getPlaces(km);
this.radiuss=this.radiuss;

}
useLocation(attb_id)
{
     if(this.radiuss=='' || this.radiuss==undefined)
     {
        let toast = this.toastCtrl.create({
            message: 'Enter Radius',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
     else if(this.autocomplete.query=='' || this.autocomplete.query==undefined)
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
                      this.api.post("saveRadiuss", { userid:userid, clat:this.lat,clng:this.lng, radius:this.radiuss, location:this.autocomplete.query, attb_id:attb_id}).subscribe((resp:any) => {
                        if(resp.status=='success')
                        {
                          this.navCtrl.setRoot('ViewmapdetailsPage', {location:this.autocomplete.query, radius:this.radiuss, lat1:this.lat, lng1:this.lng,attb_id:attb_id});
                        }

                      });
                  });
                  });
      }
}

changeAdree(loc,rad,lat1,lng1)
{
  this.navCtrl.push('DraglocationPage', {location:loc, radius:rad, lat1:lat1, lng1:lng1});

}

goProfile()
{
  this.navCtrl.setRoot('ProfileStatusPage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceareaPage');
  }

}
