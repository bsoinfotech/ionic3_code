import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage {
bidding:any;
orderid:any;
showpaysreen:any;
price:any;
order:any;
ref3:any;
biddingstatus:any;
  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController,private storage: Storage, public toastCtrl: ToastController) {
      this.orderid=this.navParams.get('orderid');

        this.price=this.navParams.get('price');
        this.order=this.navParams.get('order');
        this.ref3=this.navParams.get('ref3');

                            //this.storage.get('catid').then(catid=>{
                              this.api.post('getbiddingdata', { catid:localStorage.getItem('catid') }).subscribe((res:any) => {
                                  this.biddingstatus=res.biddingstatus;
                              });
                            //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiddingPage');
  }

  gosuccesspage(price)
  {
      if(this.bidding=='' || this.bidding==undefined)
      {
      let toast = this.toastCtrl.create({
                message: 'Select one option',
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
  		
      }
      else
      {

						/* biplab phase2
                          let toast = this.toastCtrl.create({
                            message: 'Bidding successfully added',
                            duration: 3000,
                            position: 'bottom'
                          });
                          toast.present();
						  */
                          localStorage.setItem("bidding",this.bidding);
                          
                          //this.storage.get('catid').then(catid=>{
                              this.api.post('getcustomerstatus', { catid:localStorage.getItem('catid') }).subscribe((res:any) => {

                              this.showpaysreen=res.showpaysreen;
                                  if(this.showpaysreen=='y' || this.showpaysreen=='Y')
                                  {
                                        this.navCtrl.push('PaymentpagePage', {price:price,order:this.order,ref3:this.ref3});
                                  }
                                  else
                                  {
                                      this.navCtrl.setRoot('SuccesspagePage', {cashafterservice:'1',order:this.order,ref3:this.ref3,price:this.price});
                                  }
                              });
                           // });
                        
      }
  }

  

}
