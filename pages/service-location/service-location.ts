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
  selector: 'page-service-location',
  templateUrl: 'service-location.html',
})

export class ServiceLocationPage {
map: any;
autocompleteItems;
    autocomplete;
    value='1';
     service: any;
     lat:any;
     lng:any;
     radiuss:any;
rad1:any;
mapdetails:any;
kms:any;
status:any;
status1:any;
attb_id:any;
@ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geofence: Geofence, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private storage: Storage,public api: Api, public toastCtrl: ToastController) {
this.attb_id=this.navParams.get('attb_id');
      this.service = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: '',
        }; 

          this.storage.get('userid').then((userid) => {
                this.api.post("checklatlng", { userid:userid}).subscribe((resp:any) => {
                    
                         
                          this.status1=resp.latlong.status1;
          if(this.status1==true)
          {
                this.autocomplete.query=resp.location;
          }
          else
          {
                  this.geolocation.getCurrentPosition().then((resp) => {

                      let options: NativeGeocoderOptions = {
                          useLocale: true,
                          maxResults: 5
                      };
                    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: NativeGeocoderReverseResult[]) =>{ 
                          let add = result[0].locality+','+result[0].subLocality+','+result[0].subAdministrativeArea+','+result[0].postalCode+','+result[0].administrativeArea+','+result[0].countryName;
                          this.autocomplete.query=add;
                        });
                    });
            }
          });
      });

  }



ngAfterViewInit() {
 this.getPlaces(this.radiuss);
 }


getPlaces(a) 
{ 

  this.storage.get('userid').then((userid) => {
      this.api.post("checklatlng", { userid:userid}).subscribe((resp:any) => {
          
                this.lat=resp.lat;
                this.lng=resp.long;
                this.status=resp.latlong.status1;
               
if(this.status==true)
{

              let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: new google.maps.LatLng(resp.lat,resp.long),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            let latLng = new google.maps.LatLng(resp.lat,resp.long);
            let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            let marker = new google.maps.Marker({
                                 position: latLng,
                                 map: map
                             });
                             
}
if(this.status==false)
{
      this.geolocation.getCurrentPosition().then((resp) => {
                  let lat1=resp.coords.latitude;
                  let lng1=resp.coords.longitude;
                  this.rad1 = parseInt(a);


                   let map = new google.maps.Map(document.getElementById('map'), {
                      center: {lat: lat1, lng: lng1},
                      zoom: 13
                    });
                    let service = new google.maps.places.PlacesService(map);

                  let latLng = new google.maps.LatLng(lat1,lng1);
                  let marker = new google.maps.Marker({
                                 position: latLng,
                                 map: map
                             });
                  // Add circle overlay and bind to marker

                          this.rad1 = parseInt(a);

                          let circle = new google.maps.Circle({
                              map: map,
                              radius: this.rad1,    // 10 miles in metres
                              fillColor: '#AA0000'
                            });
                            circle.bindTo('center', marker, 'position');
                               
                  });
}

                  


});
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
    /* if(this.radiuss=='' || this.radiuss==undefined)
     {
        let toast = this.toastCtrl.create({
            message: 'Enter Radius',
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }*/
     if(this.autocomplete.query=='' || this.autocomplete.query==undefined)
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
                          this.navCtrl.push('ServiceareaPage', {location:this.autocomplete.query, radius:this.radiuss, lat1:this.lat, lng1:this.lng, attb_id:attb_id});
                        }

                      });
                  });
                  });
      }
}
    


  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceLocationPage');
  }

}
