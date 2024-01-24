import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  logoText = 'ng16211-Foxit920 - POC';
  userProfileLogo = 'N';
  userName = 'Sharath Nagesh';

  sideNavcollapse: boolean = false;
  lnMouseEnter: boolean = false;
  lnMenuMouseEnter: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  lnToggleOnClick() {
    this.sideNavcollapse = !this.sideNavcollapse;
    if (this.sideNavcollapse) {
      this.lnMenuMouseEnter = false
      this.lnMouseEnter = true
    } else {
      this.lnMenuMouseEnter = true
      this.lnMouseEnter = true
    }
  }
  mouseEnter() {
    if (this.sideNavcollapse) {
      this.lnMouseEnter = true
      this.lnMenuMouseEnter = true
    }
  }

  mouseLeave() {
    if (this.sideNavcollapse) {
      this.lnMenuMouseEnter = false
      // this.lnMouseEnter = false
      this.lnMouseEnter = true
    }
    // if(this.sideNavcollapse){
    //   accordion.closeAll();
    // }
  }

}
