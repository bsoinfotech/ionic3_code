import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User,Api,General } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
searchkey : any;
 searchcats:any;
  constructor(public user: User,public general: General,public api: Api,public navParams: NavParams, public navCtrl: NavController) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(isk) {

           this.api.get('searchProducts',{searchkey:isk}).subscribe((res:any) => {
         if(res.status=='success')
        {
            this.searchcats=res.searchcats;

            if(this.searchcats.length > 0)
            {
               //this.searchcats=res.searchcats;
             }
            else
            {
               this.general.showToast('Matching results not found');
            }
          }        
      });
}
gotService(scid) 
  {
      this.navCtrl.push('CustomernotePage',{scatid:scid});
   }

  /**
   * Navigate to the detail page for this item.
   */
 
}
