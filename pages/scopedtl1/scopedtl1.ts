//import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController, ViewController } from 'ionic-angular';
import { User,Api,General } from '../../providers'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-scopedtl1',
  templateUrl: 'scopedtl1.html',
})
export class Scopedtl1Page {

  header_flag:any;
  detail_flag:any;
  header:any;
  detail:any;

  userid:any;
  cat_id:any;
  scat_id:any;
  company_id:any;
  
  note:any;
  image_path:any;
  video_path:any;
  sectionfound:any;
  ref1:any;
  ref2:any;
  cat_dtl_id:any;
  scope_dtl:any;
  import_default_data:any;
  services:any = [];
  sec_header:any;
  subcatid1:any;
  sec_hdr:any;
  scope_id:any;

  
  constructor(public user: User,public general: General, public api: Api,public navParams: NavParams, public navCtrl: NavController, 
    private storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public viewCtrl: ViewController) 
    {
    //	this.order_num=this.navParams.get('order_num');
      this.userid=this.navParams.get('userid');
      this.cat_id=this.navParams.get('cat_id');
      this.company_id=this.navParams.get('company_id');
      this.scope_id=this.navParams.get('scope_id');
      this.scat_id=this.navParams.get('cat_dtl_id');

      //alert('scope_id='+this.scope_id);

      this.import_default_data=0;
      this.header_flag=0;  
      this.detail_flag=0;
      this.get_scope();
    }
  
    get_scope()
  {
    this.api.post('getscopedtl',{userid:this.userid,cat_id:this.cat_id,
      scope_id:this.scope_id,
      company_id:this.company_id,scat_id:this.scat_id}).subscribe((res:any) => 
    {

      //alert('res.status='+res.status);
      if(res.status=='success')
      {
        this.note = res.note;
        this.image_path = res.image_path;
        this.video_path = res.video_path;
        this.sectionfound=res.sectionfound;
        this.import_default_data=res.import_default_data;
        this.ref1 = res.ref1;
        this.ref2=res.ref2;
        this.scope_id=res.scope_id;
        this.scope_dtl=res.scope_dtl;
      }
      else
      {
        this.note = '';
        this.image_path = '';
        this.video_path = '';
        this.sectionfound=0;
        this.import_default_data=0;
        this.ref1 = 0;
        this.ref2=0;
      
        this.scope_dtl='';
      }
      });
  }

 add_header()
 {
 

    if(this.header_flag==1)
    {
      this.header_flag=0;
    }
    else
    {
      this.header_flag=1;
      this.get_scope();
    }
   
 }
 save_header()
 {
 
  if (this.header==''||this.header==undefined)
  {
    alert('Enter Section Header');
  }
  else
  {

    this.api.post('save_scope_header',{userid:this.userid,cat_id:this.cat_id,
    scope_id:this.scope_id,company_id:this.company_id,
    scat_id:this.scat_id,note:this.header}).subscribe((res:any) => 
    {
        if(res.status=='success')
        {
          alert(res.msg);
          this.header='';
          this.header_flag=0;
          this.get_scope();
        }
        else
        {
          alert(res.msg);
          
        }
    });

  }
   
 }
 save_detail()
 {
 
  if (this.sec_hdr==''||this.sec_hdr==undefined)
  {
    alert('Select Section Header');
  }
  else if (this.detail==''||this.detail==undefined)
  {
    alert('Enter Section detail');
  }
  else
  {

    this.api.post('save_scope_detail',{userid:this.userid,cat_id:this.cat_id,
    subcatid1:this.subcatid1,company_id:this.company_id,scope_id:this.scope_id,
    note:this.detail}).subscribe((res:any) => 
    {
        if(res.status=='success')
        {
          alert(res.msg);
          this.detail_flag=0;
          this.get_scope();
          this.detail='';
        }
        else
        {
          alert(res.msg);
          
        }
    });

  }
   
 }
 add_detail()
 {
    if(this.detail_flag==1)
    {
      this.detail_flag=0;
    }
    else
    {
      this.detail_flag=1;

      this.api.post('get_sec_header',{userid:this.userid,cat_id:this.cat_id,
        scat_id:this.scat_id,company_id:this.company_id}).subscribe((res:any) => 
      {
        if (res.status=='success')
        {
            //alert(res.msg);
            this.sec_header=res.sec_header;
        }
        else
        {
          this.sec_header='';
          alert(res.msg);
        }
        
        });
    }
 }

 getheaderdtl(id)
 {
  this.api.post('getheaderdtl',{id:id}).subscribe((res:any) => 
  {
    if (res.status=='success')
    {
        //alert(res.msg);
        this.subcatid1=res.subcatid1;
        this.cat_dtl_id=res.cat_dtl_id;
    }
   
    });
 }
  dismiss() 
  {
      this.viewCtrl.dismiss(0);     
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Scopedtl1Page');
  }
  save_data()
  {
    this.services.length=0;
  // <div class="col-sm-6 col-lg-10 py-3" *ngFor="let service of services; let i = index" >
    for( let service of this.scope_dtl) 
    {
      //if(service.note != ''){
        this.services.push(service);
      //}
    }

    this.api.post('upd_scopedtl',{userid:this.userid,cat_id:this.cat_id,
      scope_id:this.scope_id,company_id:this.company_id,scope_dtl:this.services,note:this.note}).subscribe((res:any) => 
    {
      if (res.status=='1')
      {
          alert(res.msg);
      }
      else
      {
        alert(res.msg);
      }
      
      });


  }
}
