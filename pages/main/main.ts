import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController,LoadingController } from 'ionic-angular';
import { User,Api,General } from '../../providers';
// import {User,General,Api} from '../../providers/';  //biplab not in use

import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';  //biplab ma
import { Subscription } from 'rxjs/Subscription';

import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
	
  connected: Subscription;
  disconnected: Subscription;
  
	cvers:any;
	pvers:any;
	version:any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private network: Network,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public general: General,
  private alertCtrl: AlertController,private ConnectivityServiceProvider:ConnectivityServiceProvider,private storage: Storage) {  


	    //added on 3rd Aug 2021 -start


			if(localStorage.getItem('version'))
			{
				this.version = localStorage.getItem('version');  
			}
		  //added on 3rd Aug 2021 -end
//,private connectivityService:ConnectivityService
  
  }
  
  
  displayNetworkUpdate(connectionState: string){
	 // let networkType = this.network.type
	  
	    		let toast = this.toastCtrl.create({
				message: 'You are now ' +connectionState, 
				//message: 'You are now ' +connectionState+ ' via '+networkType,  				
				duration: 3000,
				position: 'bottom'
				});
				toast.present();
	  
	  
  }

ionViewWillLeave(){
	//this.connected.unsubscribe();
	//this.disconnected.unsubscribe();
	
	
}


  ionViewDidEnter() {
	  
	  /*
	  this.connected = this.network.onConnect().subscribe(data =>{
		  console.log(data)
		  
		  this.displayNetworkUpdate(data.type);
	  },error =>console.error(error));
	  
	  this.disconnected = this.network.onDisconnect().subscribe(data =>{
		  console.log(data)
		  this.displayNetworkUpdate(data.type);
		             let alert = this.alertCtrl.create({
               title: 'Network was disconnected :-(',
               subTitle: 'Please check your connection. And try again',
               buttons: ['OK']
           });
           alert.present();
	  },error =>console.error(error));
	  
	  */
	  
  }  


  ionViewDidLoad() {
	  
						
    console.log('ionViewDidLoad MainPage');
  }
gotoLogintype(type)
{
	
	//this.cvers = '22';
	//this.pvers = '22';



          /*
		  this.api.post('getlatestversion').subscribe((sd:any) => {
            if(sd.version!='' && sd.version!=null && sd.version!=undefined)
            {
			
				if (type=='c') //for customer
				{
				    if(sd.ref1!=this.cvers)
					{
					let profileModal = this.modalCtrl.create('WrongversionPage');
					profileModal.present();
					}			  
				}
				else  //for partner
				{
					if(sd.ref2!=this.pvers)
					{
					let profileModal = this.modalCtrl.create('WrongversionPage');
					profileModal.present();
					}
				
				}
				

            }			  

          });
		  */
		  


	
	
				let loading = this.loadingCtrl.create({
				spinner:'hide',
				content: '<img src="assets/img/busy.gif">',
				dismissOnPageChange: true ,
				//content: 'Loading Please Wait...'
				//showBackdrop: true,
				
				});
				loading.present();
				
				this.navCtrl.push('LoginPage',{ utype:type }); 
				loading.dismiss();
  	
 }
}

