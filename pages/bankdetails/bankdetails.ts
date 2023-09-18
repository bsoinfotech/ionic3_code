import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { User,Api,General } from '../../providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bankdetails',
  templateUrl: 'bankdetails.html',
})
export class BankdetailsPage {
bankname:any;
bankactname:any;
ifsccode:any;
pan_id:any;
accountnumber:any;
attb_id:any;
amt:any;
googlepay:any;
note:any;
total_comm_net:any;
pending_trans:any;
pending_amt:any;
min_trans_amt:any;
userid:any;


  constructor(public navCtrl: NavController,public user: User,public translateService: TranslateService,public general: General,public api: Api,public navParams: NavParams, public toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {
    this.total_comm_net=this.navParams.get('total_comm_net');
    this.pending_amt=this.navParams.get('pending_amt');
    this.userid=localStorage.getItem('userid');
//alert('pending amt---'+this.pending_amt);
      //this.storage.get('userid').then((userid) => {
            this.api.post("gettransferdata", { userid:this.userid}).subscribe((resp:any) => {
                this.bankname=resp.userbankdetails.bankname;
                this.bankactname=resp.userbankdetails.bankactname;
                this.ifsccode=resp.userbankdetails.ifsccode;
                this.pan_id=resp.userbankdetails.pan_id;
                this.accountnumber=resp.userbankdetails.accountnumber;
                this.googlepay=resp.userbankdetails.googlepay;
                this.note=resp.userbankdetails.note;
            });
          //});

          //this.storage.get('userid').then((userid) => {
              this.api.post('checktransamt',{userid:this.userid}).subscribe((res:any) => {
              this.total_comm_net=res.total_comm_net;
              this.pending_trans=res.pending_trans;
              this.min_trans_amt=res.min_trans_amt;
              });
            //});




  }

  savetransferdata()
  {

      if (this.pan_id==''||this.pan_id==undefined)
      {
        let toast = this.toastCtrl.create({
            message: 'Enter PAN Number',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          return;
      }

    if (this.googlepay==''||this.googlepay==undefined)
    {

        if (this.bankname==''||this.bankname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Bank Name',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return;
        }
        if(this.bankactname==''||this.bankactname==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Bank Account Name',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return;
        }

        if(this.accountnumber==''||this.accountnumber==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter Bank Account number',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return;

        }
        if (this.ifsccode==''||this.ifsccode==undefined)
        {
          let toast = this.toastCtrl.create({
              message: 'Enter IFSC Code',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return;
        }

    }

    if(this.amt==''||this.amt==undefined ||this.amt==0)
    {
      let toast = this.toastCtrl.create({
          message: 'Enter Amount that you want to transfer to your bank',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        return;

    }
    else
    {


     
         //----------------------------------------------
         //this.storage.get('userid').then((userid) => {
           let loading =  this.loadingCtrl.create({
           spinner:'hide',
           content: '<img src="assets/img/busy.gif">',
           //dismissOnPageChange: true
           duration: 3000
           });
           loading.present();
         this.api.post("saveBankdetailsamt", {
           amt:this.amt,total_comm_net:this.total_comm_net,pending_amt:this.pending_amt,min_trans_amt:this.min_trans_amt,
           userid:this.userid, pan_id:this.pan_id,googlepay:this.googlepay,
           ifsccode:this.ifsccode, accountnumber:this.accountnumber, bankactname:this.bankactname, bankname:this.bankname}).subscribe((resp:any) => {
            loading.dismiss();
            if(resp.status=='success')
            {
             let toast = this.toastCtrl.create({
                 message: resp.message,
                 duration: 5000,
                 position: 'bottom'
             });
             toast.present();
             this.navCtrl.setRoot('TeamPage');
            }
            else
            {
              let toast = this.toastCtrl.create({
                  message: resp.message,
                  duration: 5000,
                  position: 'bottom'
              });
              toast.present();
            }
          });
          //-----------------------------------------------

        //});
    }
  }

  skip()
  {
    this.navCtrl.setRoot('TeamPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankdetailsPage');
  }

}
