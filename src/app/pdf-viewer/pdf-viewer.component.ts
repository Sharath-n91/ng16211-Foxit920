import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import license from './license-key';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
import * as PDFViewCtrl from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/PDFViewCtrl.full.js';

// import * as UIExtension from '../../foxit-lib/UIExtension.full.js';
// import * as Addons from '../../foxit-lib/uix-addons/allInOne.js';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-foxitpdfviewer',
  template: '',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdfViewerComponent implements OnInit {
  // private subscription: Subscription;

  pdfui: any;
  initialAnnots = new Array();

  constructor(
    private element: ElementRef    
  ) {
    // const source = interval(5000);    
    // this.subscription = source.subscribe(async val => {

    //   // This example shows how to prevent annotations from being in the top 100pt of the page
    //   // and also the bottom 50 pt of the page
    //   const topMargin = 100
    //   const bottomMargin = 50

    //   const pdfViewer = await this.pdfui.getPDFViewer();
    //   const pdfDoc = pdfViewer.getCurrentPDFDoc();
    //   const annots = await pdfDoc.getAnnots();
    //   let changed = false;

    //   const moveAnnot = false;     // Set this to true to move annotations if they are in the exclusion zone
    //   const deleteAnnot = true;   // Or, set this to true to delete annotations if they are in the exclusion zone

    //   if (moveAnnot)
    //   {
    //     for (const pageAnnots of annots)
    //     {
    //       for (const annot of pageAnnots)
    //       {
    //         if (!this.initialAnnots.includes(annot.getUniqueID()))
    //         {
    //           try
    //           {
    //             let annotRect = annot.getRect();
    //             let pageHeight = annot.getPage().getHeight();
    //             if (annotRect.top > (pageHeight - topMargin))
    //             {
    //               let move = annotRect.top - (pageHeight - topMargin);
    //               annotRect.top -= move;
    //               annotRect.bottom -= move;
    //               annot.setRect(annotRect);
    //               changed = true
    //             }
    //             if (annotRect.bottom < bottomMargin)
    //             {
    //               let move = bottomMargin - annotRect.bottom;
    //               annotRect.top += move;
    //               annotRect.bottom += move;
    //               annot.setRect(annotRect);
    //               changed = true
    //             }
    //           }
    //           catch
    //           {
    //             // Ignore errors
    //           }
    //         }
    //       }
    //     }
    //     if (changed)
    //     {
    //       // If the annotation was selected when it moves, then the selection box will be in the
    //       // wrong place. We need to change the tool to reset this.
    //       const stateHandlerManager = pdfViewer.getStateHandlerManager();
    //       console.log("stateHandlerManager", stateHandlerManager)
    //       const currentStates = stateHandlerManager.getCurrentStates();
    //       console.log("currentStates", currentStates);
    //       stateHandlerManager.switchTo(PDFViewCtrl.constants.STATE_HANDLER_NAMES.STATE_HANDLER_SELECT_ANNOTATION);
    //       stateHandlerManager.switchTo(PDFViewCtrl.constants.STATE_HANDLER_NAMES.STATE_HANDLER_HAND);
    //     }
    //   }

    //   if (deleteAnnot)
    //   {
    //     var deleteList = new Array();
    //     for (const pageAnnots of annots)
    //     {
    //       for (const annot of pageAnnots)
    //       {
    //         if (!this.initialAnnots.includes(annot.getUniqueID()))
    //         {
    //           try
    //           {
    //             let annotRect = annot.getRect();
    //             let pageHeight = annot.getPage().getHeight();
    //             if (annotRect.top > (pageHeight - topMargin))
    //             {
    //               changed = true
    //             }
    //             if (annotRect.bottom < bottomMargin)
    //             {
    //               changed = true
    //             }
    //             if (changed)
    //             {
    //               deleteList.push(annot)
    //             }
    //           }
    //           catch
    //           {
    //             // Ignore errors
    //           }
    //         }
    //       }
    //     }
    //     deleteList.forEach(function (annot) {
    //       console.log("Deleting annot " + annot.getUniqueID());
    //       annot.getPage().removeAnnotById(annot.getUniqueID());
    //     });
    //   }

    // });    
  }

  // pdfLoad(file) {
  //   this.pdfui.close();
  //   this.pdfui.openPDFByFile(file);
  // }

  // pdfImageAdd(id) {
    
  // }

  // pdfuiHelper(addonName: string, eventType: string) {
  //   if (addonName == 'undo-redo')
  //   {
  //     this.pdfui.getAddonInstance('UndoRedoAddon').then(undoRedoAddon => {
  //       if (undoRedoAddon) {
  //         if (eventType == 'undo')
  //         {
  //           undoRedoAddon.undo();
  //         }
  //         else if (eventType == 'redo')
  //         {
  //           undoRedoAddon.redo();
  //         }
  //         else if (eventType == 'undoAll')
  //         {
  //           undoRedoAddon.undoAll();
  //         }
  //       }
  //     });
  //   }
  //   else if (addonName == 'doc-attachment')
  //   {
  //     if (eventType == 'showDialog')
  //     {
  //       this.pdfui.callAddonAPI('DocAttachmentUIXAddon', 'showDialog');
  //     }
  //   }
  // }

  // thryvToolbarOption1() {
  //   return ['<webpdf>',
  //   '  <div class="thryv-toolbar-panel">',
  //   '    <group-list>',
  //   '     <group name="thryv-toolbar-group-info" retain-count="1">',
  //   '       <xbutton name="thryv-toolbar-button-info" icon-class="thryv-toolbar-icon-info"></xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-pencileraser" retain-count="2">',
  //   '       <xbutton icon-class="thryv-toolbar-icon-pencil" @controller="states:CreatePencilController">Pencil</xbutton>',
  //   '       <xbutton icon-class="thryv-toolbar-icon-eraser" @controller="states:EraserController">Eraser</xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-areahighlight" retain-count="1">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-areahighlight" @controller="states:CreateAreaHighlightController">Area Highlight</xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-textboxcallout" retain-count="2">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-textbox" @controller="states:CreateTextboxController">Textbox</xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-callout" @controller="states:CreateCalloutController">Callout</xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-highlightstrikeout" retain-count="2">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-highlight" @controller="states:CreateHighlightController">Highlight</xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-strikeout" @controller="states:CreateStrikeoutController">Strikeout</xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-addimage" retain-count="2">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-addimage" @controller="states:CreateImageController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-folder"></xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-hand" retain-count="1">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-hand" @controller="states:HandController"></xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-loupe" retain-count="1">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-loupe" @controller="loupe:LoupeController">Loupe</xbutton>',
  //   '     </group>',
  //   '     <group name="thryv-toolbar-group-zoom" retain-count="3">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-zoomout" @controller="zoom:ZoomInAndOutController" action="zoomout">Zoom out</xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-zoomin" @controller="zoom:ZoomInAndOutController" action="zoomin">Zoom in</xbutton>',
  //   '        <editable-zoom-dropdown style="color: purple;"></editable-zoom-dropdown>',
  //   '     </group>',
  //   '    </group-list>',
  //   '  </div>',
  //   '  <div class="thryv-toolbar-panel">',
  //   '    <group-list>',
  //   '     <group name="thryv-toolbar-group-shapes" retain-count="5">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-rectangle" @controller="states:CreateSquareController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-ellipse" @controller="states:CreateCircleController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-line" @controller="states:CreateLineController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-arrow" @controller="states:CreateArrowController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-polygon" @controller="states:CreatePolygonController"></xbutton>',
  //   '      </group>',
  //   '      <group name="thryv-toolbar-group-attachdocinfo" retain-count="2">',
  //   '        <xbutton name="thryv-toolbar-button-attach" icon-class="thryv-toolbar-icon-attach"></xbutton>',                                                                                
  //   '        <xbutton icon-class="thryv-toolbar-icon-docinfo" @controller="fpmodule:FileInfoCallbackController"></xbutton>',
  //   '      </group>',
  //   '      <group name="thryv-toolbar-group-downloadprint" required-addons="print" retain-count="2">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-download" @controller="file:DownloadFileController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-print" @controller="print:ShowPrintDialogController"></xbutton>',
  //   '      </group>',
  //   '      <group name="thryv-toolbar-group-undoredo" retain-count="3">',
  //   '        <xbutton name="thryv-toolbar-button-undo" icon-class="thryv-toolbar-icon-undo">Undo</xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-redo" icon-class="thryv-toolbar-icon-redo">Redo</xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-undoall" icon-class="thryv-toolbar-icon-undoall">Undo All</xbutton>',
  //   '      </group>',
  //   '      <group name="thryv-toolbar-group-basedonad" retain-count="1">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-basedonad">Based On Ad</xbutton>',
  //   '      </group>',
  //   '    </group-list>',
  //   '  </div>',
  //   '  <viewer></viewer>',
  //   '  <template>',
  //   '    <print:print-dialog @lazy></print:print-dialog>',
  //   '    <fpmodule:file-property-dialog @lazy></fpmodule:file-property-dialog>',
  //   '    <doc-attachment-dialog @lazy></doc-attachment-dialog>',
  //   '  </template>',
  //   '</webpdf>'].join('');
  // }

  // thryvToolbarOption2() {
  //   let tabs = '';
  //   let basedOnAdSelection = '<div>Please select an ad</div>' +
  //     '<div class="thryv-ad-parent">' +
  //     '  <div class="thryv-ad-button" onclick="alert(\'ad1clicked\')"><img src="/assets/ad1.png"></div>' +
  //     '  <div class="thryv-ad-button" onclick="alert(\'ad2clicked\')"><img src="/assets/ad2.png"></div>' +
  //     '  <div class="thryv-ad-button" onclick="alert(\'ad3clicked\')"><img src="/assets/ad3.png"></div>' +
  //     '</div>';
    
  //   let showTabs = false;
  //   if (showTabs)
  //     tabs = '<div class="tabs">' +
  //       '<gtab group="top-toolbar-tab" body="thryv-top-toolbar" active>Top</gtab>' +
  //       '<gtab group="top-toolbar-tab" body="thryv-bottom-toolbar">Bottom</gtab>' +
  //       '</div>';

  //   return ['<webpdf>',
  //   '  <div class="thryv-toolbar-leftright-parent">',
  //   '    <div class="thryv-toolbar-leftright-toolbar">',

  //   tabs,

  //   '      <div name="thryv-top-toolbar" class="thryv-toolbar-wrap-panel">',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-info" retain-count="1">',
  //   '          <xbutton name="thryv-toolbar-button-info" icon-class="thryv-toolbar-icon-info"></xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-pencileraser" retain-count="2">',
  //   '          <xbutton icon-class="thryv-toolbar-icon-pencil" @controller="states:CreatePencilController">Pencil</xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-eraser" @controller="states:EraserController">Eraser</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-areahighlight" retain-count="1">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-areahighlight" @controller="states:CreateAreaHighlightController">Area Highlight</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-textboxcallout" retain-count="2">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-textbox" @controller="states:CreateTextboxController">Textbox</xbutton>',
  //   '           <xbutton icon-class="thryv-toolbar-icon-callout" @controller="states:CreateCalloutController">Callout</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-highlightstrikeout" retain-count="2">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-highlight" @controller="states:CreateHighlightController">Highlight</xbutton>',
  //   '           <xbutton icon-class="thryv-toolbar-icon-strikeout" @controller="states:CreateStrikeoutController">Strikeout</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-addimage" retain-count="2">',
  //   '           <xbutton name="thryv-add-image-from-list" icon-class="thryv-toolbar-icon-addimage"></xbutton>',
  //   '           <file-selector icon-class="thryv-toolbar-icon-folder" accept=".pdf" @controller="custom:SelectSingleFileController"></file-selector>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-hand" retain-count="1">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-hand" @controller="states:HandController"></xbutton>',
  //   '           <xbutton icon-class="thryv-toolbar-icon-annot" @controller="states:SelectAnnotationController"></xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-loupe" retain-count="1">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-loupe" @controller="loupe:LoupeController">Loupe</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-zoom" retain-count="3">',
  //   '           <xbutton icon-class="thryv-toolbar-icon-zoomout" @controller="zoom:ZoomInAndOutController" action="zoomout">Zoom out</xbutton>',
  //   '           <xbutton icon-class="thryv-toolbar-icon-zoomin" @controller="zoom:ZoomInAndOutController" action="zoomin">Zoom in</xbutton>',
  //   '           <editable-zoom-dropdown style="color: purple;"></editable-zoom-dropdown>',
  //   '        </div>',
  //   '      </div>',
  //   '      <div name="thryv-bottom-toolbar" class="thryv-toolbar-wrap-panel">',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-shapes" retain-count="5">',
  //   '          <xbutton icon-class="thryv-toolbar-icon-rectangle" @controller="states:CreateSquareController"></xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-ellipse" @controller="states:CreateCircleController"></xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-line" @controller="states:CreateLineController"></xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-arrow" @controller="states:CreateArrowController"></xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-polygon" @controller="states:CreatePolygonController"></xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-attachdocinfo" retain-count="2">',
  //   '          <xbutton name="thryv-toolbar-button-attach" icon-class="thryv-toolbar-icon-attach"></xbutton>',                                                                                
  //   '          <xbutton icon-class="thryv-toolbar-icon-docinfo" @controller="fpmodule:FileInfoCallbackController"></xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-downloadprint" required-addons="print" retain-count="2">',
  //   '          <xbutton icon-class="thryv-toolbar-icon-download" @controller="file:DownloadFileController"></xbutton>',
  //   '          <xbutton icon-class="thryv-toolbar-icon-print" @controller="print:ShowPrintDialogController"></xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-undoredo" retain-count="3">',
  //   '          <xbutton name="thryv-toolbar-button-undo" icon-class="thryv-toolbar-icon-undo">Undo</xbutton>',
  //   '          <xbutton name="thryv-toolbar-button-redo" icon-class="thryv-toolbar-icon-redo">Redo</xbutton>',
  //   '          <xbutton name="thryv-toolbar-button-undoall" icon-class="thryv-toolbar-icon-undoall">Undo All</xbutton>',
  //   '        </div>',
  //   '        <div class="thryv-toolbar-group" name="thryv-toolbar-group-basedonad" retain-count="1">',
  //   '          <xbutton name="thryv-toolbar-button-basedonad" icon-class="thryv-toolbar-icon-basedonad">Based On Ad</xbutton>',
  //   '        </div>',
  //   '      </div>',
  //   '    </div>',
  //   '    <div class="thryv-toolbar-leftright-buttons">',
  //   '      <button class="thryv-toolbar-leftright-bluebutton">Apply</button>',
  //   '      <button class="thryv-toolbar-leftright-bluebutton">Save & Close</button>',
  //   '      <button class="thryv-toolbar-leftright-whitebutton">Cancel</button>',
  //   '    </div>',
  //   '  </div>',
  //   '  <div class="fv__ui-body">',
  //   '    <sidebar name="thryv-sidebar" @controller="sidebar:SidebarController">',
  //   '      <bookmark-sidebar-panel></bookmark-sidebar-panel>',    
  //   '      <thumbnail-sidebar-panel @require-modules="thumbnail"></thumbnail-sidebar-panel>',
  //   '      <attachment-sidebar-panel></attachment-sidebar-panel>',
  //   '      <commentlist-sidebar-panel></commentlist-sidebar-panel>',
  //   '    </sidebar>',
  //   '    <viewer></viewer>',
  //   '  </div',
  //   '  <template>',
  //   '    <print:print-dialog @lazy></print:print-dialog>',
  //   '    <fpmodule:file-property-dialog @lazy></fpmodule:file-property-dialog>',
  //   '    <doc-attachment-dialog @lazy></doc-attachment-dialog>',
  //   '    <div id="thryv-modal-basedonad" class="thryv-modal">',
  //   '      <div class="thryv-modal-content">',
  //   '        <span class="thryv-modal-close">&times;</span>',
  //   basedOnAdSelection,
  //   '      </div>',
  //   '    </div>',
  //   '  </template>',
  //   '</webpdf>'].join('');
  // }

  // thryvToolbarOption3() {
  //   return ['<webpdf>',
  //   '  <div class="thryv-toolbar-wrap-panel">',
  //   '    <xbutton class="sep-right" name="thryv-toolbar-button-info" icon-class="thryv-toolbar-icon-info"></xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-pencil" @controller="states:CreatePencilController">Pencil</xbutton>',
  //   '    <xbutton class="sep-right"icon-class="thryv-toolbar-icon-eraser" @controller="states:EraserController">Eraser</xbutton>',
  //   '    <xbutton class="sep-right" icon-class="thryv-toolbar-icon-areahighlight" @controller="states:CreateAreaHighlightController">Area Highlight</xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-textbox" @controller="states:CreateTextboxController">Textbox</xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-callout" @controller="states:CreateCalloutController">Callout</xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-highlight" @controller="states:CreateHighlightController">Highlight</xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-strikeout" @controller="states:CreateStrikeoutController">Strikeout</xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-addimage" @controller="states:CreateImageController"></xbutton>',
  //   '    <xbutton icon-class="thryv-toolbar-icon-folder"></xbutton>',
  //   '         <xbutton icon-class="thryv-toolbar-icon-hand" @controller="states:HandController"></xbutton>',
  //   '         <xbutton icon-class="thryv-toolbar-icon-loupe" @controller="loupe:LoupeController">Loupe</xbutton>',
  //   '         <xbutton icon-class="thryv-toolbar-icon-zoomout" @controller="zoom:ZoomInAndOutController" action="zoomout">Zoom out</xbutton>',
  //   '         <xbutton icon-class="thryv-toolbar-icon-zoomin" @controller="zoom:ZoomInAndOutController" action="zoomin">Zoom in</xbutton>',
  //   '         <editable-zoom-dropdown style="color: purple;"></editable-zoom-dropdown>',
  //   '  </div>',
  //   '  <div class="thryv-toolbar-wrap-panel">',
  //   '        <xbutton icon-class="thryv-toolbar-icon-rectangle" @controller="states:CreateSquareController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-ellipse" @controller="states:CreateCircleController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-line" @controller="states:CreateLineController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-arrow" @controller="states:CreateArrowController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-polygon" @controller="states:CreatePolygonController"></xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-attach" icon-class="thryv-toolbar-icon-attach"></xbutton>',                                                                                
  //   '        <xbutton icon-class="thryv-toolbar-icon-docinfo" @controller="fpmodule:FileInfoCallbackController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-download" @controller="file:DownloadFileController"></xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-print" @controller="print:ShowPrintDialogController"></xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-undo" icon-class="thryv-toolbar-icon-undo">Undo</xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-redo" icon-class="thryv-toolbar-icon-redo">Redo</xbutton>',
  //   '        <xbutton name="thryv-toolbar-button-undoall" icon-class="thryv-toolbar-icon-undoall">Undo All</xbutton>',
  //   '        <xbutton icon-class="thryv-toolbar-icon-basedonad">Based On Ad</xbutton>',
  //   '  </div>',
  //   '  <viewer></viewer>',
  //   '  <template>',
  //   '    <print:print-dialog @lazy></print:print-dialog>',
  //   '    <fpmodule:file-property-dialog @lazy></fpmodule:file-property-dialog>',
  //   '    <doc-attachment-dialog @lazy></doc-attachment-dialog>',
  //   '  </template>',
  //   '</webpdf>'].join('');
  // }

  ngOnInit() {

    var localThis = this;

    var CustomAppearance = UIExtension.appearances.RibbonAppearance
    // var CustomAppearance = UIExtension.appearances.RibbonAppearance.extend({
    //   getLayoutTemplate: function () {
    //     return localThis.thryvToolbarOption2();
    //   },
    //   getDefaultFragments: function() {
    //     return [
    //       {
    //         target: 'thryv-toolbar-button-info',
    //         config: {
    //           callback: function() {
    //             alert('Info button clicked');
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-toolbar-button-undo',
    //         config: {
    //           callback: function() {
    //             localThis.pdfuiHelper('undo-redo', 'undo');
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-toolbar-button-redo',
    //         config: {
    //           callback: function() {
    //             localThis.pdfuiHelper('undo-redo', 'redo');
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-toolbar-button-undoall',
    //         config: {
    //           callback: function() {
    //             localThis.pdfuiHelper('undo-redo', 'undoAll');
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-toolbar-button-attach',
    //         config: {
    //           callback: function() {
    //             localThis.pdfuiHelper('doc-attachment', 'showDialog');
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-toolbar-button-basedonad',
    //         config: {
    //           callback: function() {
    //             var thryvModal = document.getElementById('thryv-modal-basedonad');
    //             if (thryvModal) {
    //               thryvModal.style.display = 'block';
    //             }
    //             var span = document.getElementsByClassName('thryv-modal-close')[0];
    //             span.addEventListener('click', function() {
    //               var thryvModal = document.getElementById('thryv-modal-basedonad');
    //               if (thryvModal) {
    //                 thryvModal.style.display = 'none';
    //               }
    //             });
    //           }
    //         }
    //       },
    //       {
    //         target: 'thryv-add-image-from-list',
    //         config: {
    //           callback: async function() {

    //             const pdfViewer = await localThis.pdfui.getPDFViewer();
    //             const pdfDoc = pdfViewer.getCurrentPDFDoc();
    //             const pdfPage = await pdfDoc.getPageByIndex(0);

    //             let rect = {
    //               left: pdfPage.getWidth() - 85,
    //               right: pdfPage.getWidth() - 5,
    //               top: pdfPage.getHeight() - 50,
    //               bottom: pdfPage.getHeight() - 65
    //             }
    //             let annotJson = {
    //               type: 'freetext',
    //               rect: rect,
    //               subject: 'Textbox',
    //               defaultAppearance: {
    //                 textColor: 0x000000,
    //                 textSize: 8                    
    //               },
    //               contents: 'S 9783033142620',
    //               borderInfo: {
    //                 width: 0
    //               },
    //               color: 0xffffff,
    //               rotate: 0,
    //               flags: 4
    //             };

    //             let newAnnotList = await pdfPage.addAnnot(annotJson);
    //             if (newAnnotList.length > 0)
    //             {
    //               const newAnnot = newAnnotList[0];
    //               const newAnnotId = newAnnot.getUniqueID();

    //               console.log("New text annot ID: ", newAnnotId);

    //               // Add to the list of initial annotations so it won't be deleted for being in the top margin
    //               localThis.initialAnnots.push(newAnnotId);
    //             }

    //             // Add image onto page as a graphics object
    //             var imageResp = await fetch("/assets/ad1.png");
    //             var imageFile = await imageResp.arrayBuffer();

    //             let imgRect = {
    //               left: 100,
    //               bottom: 500,
    //               right: 100 + 99,
    //               top: 500 + 107
    //             }

    //             let info = {
    //               type: PDFViewCtrl.PDF.constant.Graphics_ObjectType.Image,
    //               buffer: imageFile,
    //               rect: imgRect
    //             }
    //             pdfPage.addGraphicsObject(info);

    //             // Add image onto page as a Screen annotation
    //             var imageResp = await fetch("/assets/ad2.png");
    //             var imageFile = await imageResp.arrayBuffer();

    //             let imgAnnotRect = {
    //               left: 300,
    //               bottom: 500,
    //               right: 300 + 99,
    //               top: 500 + 107
    //             }

    //             let screenAnnotJson = {
    //               type: 'screen',
    //               rect: imgAnnotRect,
    //               subject: 'Ad',
    //               borderInfo: {
    //                 width: 0
    //               },
    //               color: 0xffffff,
    //               rotate: 0,
    //               flags: 4
    //             };

    //             newAnnotList = await pdfPage.addAnnot(screenAnnotJson);
    //             if (newAnnotList.length > 0)
    //             {
    //               const newImgAnnot = newAnnotList[0];
                  
    //               const imageAnnotResp = await fetch('/assets/ad3.png');
    //               const imageAnnotFile = await imageAnnotResp.arrayBuffer();
    //               let screenAnnot = (newImgAnnot as PDFViewCtrl.PDF.annots.Screen)
    //               console.log("screenAnnot", screenAnnot)
    //               await screenAnnot.setImage(imageAnnotFile);

    //               const newAnnotId = newImgAnnot.getUniqueID();

    //               console.log("New image annot ID: ", newAnnotId);

    //               // Add to the list of initial annotations so it won't be deleted for being in the top margin
    //               localThis.initialAnnots.push(newAnnotId);
    //             }
                

    //           }
    //         }
    //       }
    //     ];
    //   },
    //   disableAll: function(){}
    // });

    // UIExtension.PDFUI.module('custom', []).controller('SelectSingleFileController', {
    //   handle: function(file) {
    //     localThis.pdfLoad(file);
    //   }
    // });

    this.pdfui = new UIExtension.PDFUI({
      viewerOptions: {
        libPath: '/foxit-lib',
        jr: {
          ...license,
        },

        // defaultAnnotConfig: function(type, intent) {
        //   let config = {};

        //   // There appears to be a bug in Foxit Web SDK 9.2, setting the ink color to pure black results
        //   // in the annotation disappearing after it is drawn. Instead, a value that is very close to
        //   // black is used
        //   let thryvBlack = 0x000000;
        //   let thryvBlackSpecial = 0x010101;
        //   let thryvRed = 0xaa0000;
        //   let thryvGreen = 0x00aa00;
        //   let thryvBlue = 0x0000aa;
        //   let thryvGray = 0x808080;

        //   console.log('Annot config: ', type);
        //   console.log('Annot intent: ', intent);

        //   switch (type) {
        //     case 'ink':
        //     case 'square':
        //     case 'circle':
        //     case 'line':
        //     case 'arrow':
        //     case 'polygon':
        //     case 'strikeout':
        //       config = {
        //         'color': thryvBlackSpecial,
        //         'opacity': 1,
        //         'borderInfo': {
        //           'style': 0,
        //           'width': 1
        //         }
        //       }
        //       break;

        //     case 'freetext':
        //       if (intent == 'FreeTextCallout') {
        //         config = {
        //           'color': thryvBlackSpecial,
        //           'opacity': 1,
        //           'defaultAppearance': {
        //             'textColor': thryvBlack,
        //             'textSize': 10
        //           },
        //           'borderInfo': {
        //             'style': 0,
        //             'width': 1
        //           }
        //         }
        //         break;
        //       }
        //       else if (intent == 'FreeTextTextbox') {
        //         config = {
        //           'color': thryvBlackSpecial,
        //           'opacity': 1,
        //           'defaultAppearance': {
        //             'textColor': thryvBlack,
        //             'textSize': 10
        //           },
        //           'borderInfo': {
        //             'style': 0,
        //             'width': 1
        //           }
        //         }
        //       }
        //       break;
        //     default:
        //       break;
        //   }
        //   console.log(config);
        //   return config;
        // }
      },
      
      appearance: CustomAppearance,

      // renderTo: this.element.nativeElement,
      renderTo: '#pdf-ui',
      addons: [
         '/foxit-lib/uix-addons/doc-attachment/',
         '/foxit-lib/uix-addons/file-property/',
         '/foxit-lib/uix-addons/print/',         
         '/foxit-lib/uix-addons/undo-redo/',
         '/foxit-lib/uix-addons/thumbnail/',
      ]
    });

    // this.pdfui.setEraserSize(20);

    // this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.annotationPermissionChanged, async function(event) {
    //   console.log(event);
    // });

    // this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.updateActiveAnnotation, async function(event) {
    //   console.log(event);
    // });

    // this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.openFileSuccess, async function(event) {
    //   localThis.initialAnnots.length = 0;
    //   const pdfViewer = await localThis.pdfui.getPDFViewer();
    //   const pdfDoc = pdfViewer.getCurrentPDFDoc();
    //   const annots = await pdfDoc.getAnnots();
    //   for (const pageAnnots of annots)
    //   {
    //     for (const annot of pageAnnots)
    //     {
    //       localThis.initialAnnots.push(annot.getUniqueID());
    //     }
    //   }
    // });

    this.pdfui.openPDFByHttpRangeRequest({
      range: {
        url: '/assets/Test-files-and-images/TestPDF.pdf',
      }
    })
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
