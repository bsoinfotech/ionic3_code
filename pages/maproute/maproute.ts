import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ViewController ,LoadingController} from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-maproute',
  templateUrl: 'maproute.html',
})
export class MaproutePage {

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;

    constructor(public navCtrl: NavController,public navParams: NavParams) {

    }

    ionViewDidLoad(){

      //  this.loadMap();
      //  this.startNavigating();
		console.log('ionViewDidLoad MaproutePage');

    }
/*
    loadMap(){

        let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }

    startNavigating(){

        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: 'adelaide',
            destination: 'adelaide oval',
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });

    }
*/
}
