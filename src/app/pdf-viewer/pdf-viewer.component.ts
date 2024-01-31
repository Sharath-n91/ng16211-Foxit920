import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import license from './license-key';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
// import * as UIExtension from '../../foxit-lib/UIExtension.full.js';
// import * as Addons from '../../foxit-lib/uix-addons/allInOne.js';

@Component({
  selector: 'app-foxitpdfviewer',
  template: '',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdfViewerComponent implements OnInit {
  pdfui: any;
  constructor(
    private element: ElementRef
  ) { }

  ngOnInit() {

    var CustomAppearance = UIExtension.appearances.RibbonAppearance
    // var CustomAppearance = UIExtension.appearances.RibbonAppearance.extend({
    //   getDefaultFragments: function () {
    //     return [{
    //       // Add a component
    //       action: UIExtension.UIConsts.FRAGMENT_ACTION.APPEND,
    //       // Specify the name of the target component that the new components defined in the above template will be appended to. All the target names of fragments are defined in the layout template. 
    //       target: 'home-tab-group-hand',
    //       // Define the properties of the added component, such as icon, text, and css style. 
    //       template: [
    //         '<xbutton name="save-close-button" icon-class="fv__icon-toolbar-download" text="Save & Close"></xbutton>'
    //       ].join(''),
    //       // Define the interaction logic of the added component. 
    //       config: [
    //         {
    //           // specify the component in the above template that the configuration will be applied to. // For example, the configuration will be applied to the component with the name of "show-hello-button". 
    //           target: 'save-close-button',
    //           callback: function () {
    //             // dialogRef.close(false);
    //           }
    //         }
    //       ]
    //     }]
    //   }
    // })
    this.pdfui = new UIExtension.PDFUI({
      viewerOptions: {
        libPath: '/foxit-lib',
        jr: {
          ...license,
        }
      },
      
      appearance: CustomAppearance,
      renderTo: '#pdf-ui',
      addons: Addons,
      // appearance: UIExtension.appearances.adaptive,
      // renderTo: this.element.nativeElement,
    });

    this.pdfui.openPDFByHttpRangeRequest({
      range: {
        url: '../../../assets/Test-files-and-images/TestPDF.pdf',
      }
    })
  }
}
