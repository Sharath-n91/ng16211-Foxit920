import { Component, ElementRef, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import license from './license-key';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.full.js';
import * as PDFViewCtrl from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/PDFViewCtrl.full.js';
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
import { interval, Subscription } from 'rxjs';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
import { SetbasedAdDialogComponent } from '../setbased-ad-dialog/setbased-ad-dialog.component';


@Component({
  selector: 'app-pdf-viewer-fd-default',
  template: '',
  templateUrl: './pdf-viewer-fd-default.component.html',
  styleUrls: ['./pdf-viewer-fd-default-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdfViewerFdDefaultComponent {
  
  // private subscription: Subscription;
  pdfui: any;
  initialAnnots = new Array();

  constructor(
    private element: ElementRef,
    public dialog: MatDialog,
    public stBasedAdDialogRef: MatDialogRef<PdfViewerDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,

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

  pdfImageAdd(id) {

  }

  pdfuiHelper(addonName: string, eventType: string) {
    if (addonName == 'undo-redo') {
      this.pdfui.getAddonInstance('UndoRedoAddon').then(undoRedoAddon => {
        if (undoRedoAddon) {
          if (eventType == 'undo') {
            undoRedoAddon.undo();
          }
          else if (eventType == 'redo') {
            undoRedoAddon.redo();
          }
          else if (eventType == 'undoAll') {
            undoRedoAddon.undoAll();
          }
        }
      });
    }
    else if (addonName == 'doc-attachment') {
      if (eventType == 'showDialog') {
        this.pdfui.callAddonAPI('DocAttachmentUIXAddon', 'showDialog');
      }
    }
  }
  thryvToolbarOption0() {
    return [
      `<webpdf>
        <div class="tab-container"> 
          <div class="tab save-close-tab"> 
            <gtab group="top-toolbar-tab" body="home-tab" active>Home</gtab> 
            <gtab group="top-toolbar-tab" body="edit-tab">Edit</gtab>
            <gtab group="top-toolbar-tab" body="comment-tab">Comment</gtab> 
            <gtab group="top-toolbar-tab" body="view-tab">View</gtab> 
            <div name="thryv-toolbar-group-saveclose" class="thryv-grouplist-item thryv-tb-btn-grouplist-item">
              <button name="apply-cs" class="thryv-saveClose-tb-btn thryv-tb-btn-primary">Apply</button>
              <button name="saveandclose-cs" class="thryv-saveClose-tb-btn thryv-tb-btn-primary">Save & Close</button>
              <button name="cancel-cs" class="thryv-saveClose-tb-btn thryv-tb-btn-danger">Cancel</button>
            </div>
          </div> 
          <div class="tab-bodies thryv-el-inline"> 
            <div name="home-tab" class="thryv-tab-body">
              <div class="thryv-grouplist">
                <xbutton name="Thryv-toolbar-hand" @controller="states:HandController" icon-class="thryv-toolbar-icon-hand" class="thryv-tb-component">Hand</xbutton>
                <ribbon-button name="thryv-toolbar-selection-dropdown" @controller="selection:SelectionDropdownController" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-select-ribbon">
                  <dropdown name="thryv-toolabar-selection-ribbon-dropdown" @on.selected="self.select($args[0])" class="thryv-ribbon-dropdown" @aria:label.list="aria:labels.toolbar.selection">
                    <dropdown-button name="thryv-toolbar-selection-text" @controller="states:SelectTextAnnotationController" ribbon-text ="Select Text" ribbon-icon="fv__icon-toolbar-select-text-image" icon-class="fv__icon-toolbar-select-text-image" class="thryv-tb-component select-ribbon-item" tooltip-title="Text" tabindex="0">Select Text</dropdown-button>
                    <dropdown-button name="thryv-toolbar-selection-annotation" @controller="states:SelectAnnotationController" ribbon-text="Select Annotation" ribbon-icon="thryv-toolbar-icon-annot" icon-class="thryv-toolbar-icon-annot" class="thryv-tb-component select-ribbon-item" tooltip-title="Annotation" tabindex="0">Select Annotation</dropdown-button>
                  </dropdown>
                </ribbon-button>

                <div name="thryv-toolbar-divider" class="thryv-tb-component tb-divider"></div>

                <xbutton name="thryv-toolbar-zoomout" action="zoomout" @controller="zoom:ZoomInAndOutController" icon-class="thryv-toolbar-icon-zoomout" class="thryv-tb-component">Zoom out</xbutton>
                <xbutton name="thryv-toolbar-zoomin" action="zoomin" @controller="zoom:ZoomInAndOutController" icon-class="thryv-toolbar-icon-zoomin" class="thryv-tb-component">Zoom in</xbutton>
                <editable-zoom-dropdown name="thryv-toolbar-ezd" class="thryv-tb-component thryv-ezd" style="color: purple;">Editable Zoom</editable-zoom-dropdown>
              
                <ribbon-button name="change-color-dropdown" @controller="change-color:ChangeColorController as ctrl" @tooltip tooltip-title="toolbar.tooltip.changeColor.title" text="toolbar.tooltip.changeColor.title" @var.self="$component" not-immediately="true" icon-class="fv__icon-toolbar-change-color" class="thryv-tb-component thryv-ribbon-button thryv-change-color-ribbon">
                  <dropdown popup-class="fv__ui-change-color-dropdown-popup" class="fv__ui-change-color-dropdown" separate="false" @init="ctrl.dropdown = $component">
                    <xbutton @foreach="color in colors track by background" @class="{\'fv__ui-change-color-dropdown-color-round\': true, \'moon\': !!color.type, \'selected\': selectedIndex === $index}" @sync.attr.style="color.type === \'moon\' ? \'\' : (\'background-color:\' + color.background)" @sync.attr.aria-label="color.background" tabindex=\'0\' @on.click="ctrl.changeColor(color, $index)"></xbutton>
                  </dropdown>
                </ribbon-button>
              
                <xbutton name="thryv-toolbar-download" @controller="file:DownloadFileController" icon-class="thryv-toolbar-icon-download" class="thryv-tb-component">Download</xbutton>
                <xbutton name="thryv-toolbar-print" @controller="print:ShowPrintDialogController" icon-class="thryv-toolbar-icon-print" class="thryv-tb-component">Print</xbutton>

                <xbutton name="thryv-toolbar-fileproperties" @controller="fpmodule:FileInfoCallbackController" icon-class="thryv-toolbar-icon-docinfo" class="thryv-tb-component">File Properties</xbutton>
                <xbutton name="thryv-toolbar-copyright" @controller="thryvCustomControler:CopyrightDialog" target-layer="thryv-modal-copyright-layer" icon-class="thryv-toolbar-icon-info" class="thryv-tb-component">Copyright</xbutton>
              </div>
            </div>
            <div name="edit-tab" class="thryv-tab-body">
              <div class="thryv-grouplist">
                <xbutton name="Thryv-toolbar-hand" @controller="states:HandController" icon-class="thryv-toolbar-icon-hand" class="thryv-tb-component">Hand</xbutton>
                <ribbon-button name="thryv-toolbar-selection-dropdown" @controller="selection:SelectionDropdownController" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-select-ribbon">
                  <dropdown name="thryv-toolabar-selection-ribbon-dropdown" @on.selected="self.select($args[0])" class="thryv-ribbon-dropdown" @aria:label.list="aria:labels.toolbar.selection">
                    <dropdown-button name="thryv-toolbar-selection-text" @controller="states:SelectTextAnnotationController" ribbon-text ="Select Text" ribbon-icon="fv__icon-toolbar-select-text-image" icon-class="fv__icon-toolbar-select-text-image" class="thryv-tb-component select-ribbon-item" tooltip-title="Text" tabindex="0">Select Text</dropdown-button>
                    <dropdown-button name="thryv-toolbar-selection-annotation" @controller="states:SelectAnnotationController" ribbon-text="Select Annotation" ribbon-icon="thryv-toolbar-icon-annot" icon-class="thryv-toolbar-icon-annot" class="thryv-tb-component select-ribbon-item" tooltip-title="Annotation" tabindex="0">Select Annotation</dropdown-button>
                  </dropdown>
                </ribbon-button>
                <ribbon-button name="thryv-toolbar-dropdown-zoom" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-zoomin-ribbon">
                  <dropdown name="fv--inner-zoom-ribbon-dropdown" selected="0" @on.selected="self.select($args[0])" icon-class="fv__icon-toolbar-zoom-in" class="fv__ui-dropdown-hide-text thryv-ribbon-zoomin-dropdown" @aria:label.list="aria:labels.setzoom">
                    <dropdown-button name="dropdown-zoom-in" action="zoomin" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom In" ribbon-icon="fx-icon-ribbon_home_zoomin-32" icon-class="fv__icon-toolbar-zoom-in" tooltip-title="toolbar.buttons.zoomin" tabindex="0">toolbar.buttons.zoomin</dropdown-button>
                    <dropdown-button name="dropdown-zoom-out" action="zoomout" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom Out" ribbon-icon="fx-icon-ribbon_home_zoomout-32" icon-class="fv__icon-toolbar-zoom-out" tooltip-title="toolbar.buttons.zoomout" tabindex="0">toolbar.buttons.zoomout</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitpage" action="fitHeight" @controller="zoom:ZoomActionController" ribbon-text ="Fit Page" ribbon-icon="fx-icon-ribbon_home_fitpage-32" icon-class="fv__icon-toolbar-fit-page" tooltip-title="toolbar.buttons.fitHeight" tabindex="0">toolbar.buttons.fitHeight</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitwidth" action="fitWidth" @controller="zoom:ZoomActionController" ribbon-text ="Fit Width" ribbon-icon="fx-icon-ribbon_home_fitwidth-32" icon-class="fv__icon-toolbar-fit-width" tooltip-title="toolbar.buttons.fitWidth" tabindex="0">toolbar.buttons.fitWidth</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitvisible" action="fitVisible" @controller="zoom:ZoomActionController" ribbon-text ="Fit Vissible" ribbon-icon="fx-icon-ribbon_home_visible-32" icon-class="fv__icon-toolbar-fit-visible" tooltip-title="toolbar.buttons.fitVisible" tabindex="0">toolbar.buttons.fitVisible</dropdown-button>
                    <li class="fv__ui-dropdown-separator"></li>
                    <dropdown-button @foreach="scale in $pdfui.customScalingValues" @sync.text="scale * 100 + \'%\'" @controller="zoom:ZoomToScaleValueController" tabindex="0"></dropdown-button>
                  </dropdown>
                </ribbon-button>
                
                <div name="thryv-toolbar-divider" class="thryv-tb-component tb-divider"></div>

                <xbutton name="create-link" @controller="states:CreateLinkController" icon-class="fv__icon-toolbar-links" class="thryv-tb-component">Create Link</xbutton>
                <xbutton name="thryv-toolbar-doc-attachment" icon-class="thryv-toolbar-icon-attach" class="thryv-tb-component">File Attachment</xbutton>                                                                               
                
                <file-selector name="thryv-toolbar-open-local-file" accept=".pdf" @controller="file:OpenLocalFileController" icon-class="thryv-toolbar-icon-folder" class="thryv-tb-component">Open Local File</file-selector>
                
                <xbutton name="thryv-add-image-from-list" icon-class="thryv-toolbar-icon-addimage"></xbutton>
                <file-selector name="thryv-add-image-from-list" accept=".png;.jpg;.bmp" name="addFile" @tooltip tooltip-title="Add Image" tooltip-description="Upload an image that will be inserted to the Copysheet and can be resized" tooltip-placement="bottom"></file-selector>
                <add-image-button class="thryv-tb-component" @controller="edit:AddImageController"></add-image-button>
                <ribbon-button name="create-image" @tooltip tooltip-title="toolbar.tooltip.imageAnnot.title" icon-class="fv__icon-toolbar-image" @controller="states:CreateImageController" class="thryv-tb-component thryv-ribbon-button thryv-imageAnnotation-ribbon"></ribbon-button>
                <xbutton name="thryv-toolbar-button-basedonad" icon-class="thryv-toolbar-icon-basedonad" class="thryv-tb-component">Based On Ad</xbutton>
              </div>
            </div> 
            <div name="comment-tab" class="thryv-tab-body">
              <div class="thryv-grouplist">
                <xbutton name="Thryv-toolbar-hand" @controller="states:HandController" icon-class="thryv-toolbar-icon-hand" class="thryv-tb-component">Hand</xbutton>
                <ribbon-button name="thryv-toolbar-selection-dropdown" @controller="selection:SelectionDropdownController" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-select-ribbon">
                  <dropdown name="thryv-toolabar-selection-ribbon-dropdown" @on.selected="self.select($args[0])" class="thryv-ribbon-dropdown" @aria:label.list="aria:labels.toolbar.selection">
                    <dropdown-button name="thryv-toolbar-selection-text" @controller="states:SelectTextAnnotationController" ribbon-text ="Select Text" ribbon-icon="fv__icon-toolbar-select-text-image" icon-class="fv__icon-toolbar-select-text-image" class="thryv-tb-component select-ribbon-item" tooltip-title="Text" tabindex="0">Select Text</dropdown-button>
                    <dropdown-button name="thryv-toolbar-selection-annotation" @controller="states:SelectAnnotationController" ribbon-text="Select Annotation" ribbon-icon="thryv-toolbar-icon-annot" icon-class="thryv-toolbar-icon-annot" class="thryv-tb-component select-ribbon-item" tooltip-title="Annotation" tabindex="0">Select Annotation</dropdown-button>
                  </dropdown>
                </ribbon-button>
                <ribbon-button name="thryv-toolbar-dropdown-zoom" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-zoomin-ribbon">
                  <dropdown name="fv--inner-zoom-ribbon-dropdown" selected="0" @on.selected="self.select($args[0])" icon-class="fv__icon-toolbar-zoom-in" class="fv__ui-dropdown-hide-text thryv-ribbon-zoomin-dropdown" @aria:label.list="aria:labels.setzoom">
                    <dropdown-button name="dropdown-zoom-in" action="zoomin" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom In" ribbon-icon="fx-icon-ribbon_home_zoomin-32" icon-class="fv__icon-toolbar-zoom-in" tooltip-title="toolbar.buttons.zoomin" tabindex="0">toolbar.buttons.zoomin</dropdown-button>
                    <dropdown-button name="dropdown-zoom-out" action="zoomout" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom Out" ribbon-icon="fx-icon-ribbon_home_zoomout-32" icon-class="fv__icon-toolbar-zoom-out" tooltip-title="toolbar.buttons.zoomout" tabindex="0">toolbar.buttons.zoomout</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitpage" action="fitHeight" @controller="zoom:ZoomActionController" ribbon-text ="Fit Page" ribbon-icon="fx-icon-ribbon_home_fitpage-32" icon-class="fv__icon-toolbar-fit-page" tooltip-title="toolbar.buttons.fitHeight" tabindex="0">toolbar.buttons.fitHeight</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitwidth" action="fitWidth" @controller="zoom:ZoomActionController" ribbon-text ="Fit Width" ribbon-icon="fx-icon-ribbon_home_fitwidth-32" icon-class="fv__icon-toolbar-fit-width" tooltip-title="toolbar.buttons.fitWidth" tabindex="0">toolbar.buttons.fitWidth</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitvisible" action="fitVisible" @controller="zoom:ZoomActionController" ribbon-text ="Fit Vissible" ribbon-icon="fx-icon-ribbon_home_visible-32" icon-class="fv__icon-toolbar-fit-visible" tooltip-title="toolbar.buttons.fitVisible" tabindex="0">toolbar.buttons.fitVisible</dropdown-button>
                    <li class="fv__ui-dropdown-separator"></li>
                    <dropdown-button @foreach="scale in $pdfui.customScalingValues" @sync.text="scale * 100 + \'%\'" @controller="zoom:ZoomToScaleValueController" tabindex="0"></dropdown-button>
                  </dropdown>
                </ribbon-button>
                
                <div class="thryv-tb-component tb-divider"></div>

                <xbutton name="create-highlight" icon-class="fx-icon-sm fv__icon-toolbar-text-highlight" class="thryv-tb-component" @controller="states:CreateHighlightController" @tooltip tooltip-title="Highlight"></xbutton>
                <xbutton name="create-underline" icon-class="fx-icon-sm fv__icon-toolbar-underline" class="thryv-tb-component" @controller="states:CreateUnderlineController" @tooltip tooltip-title="Underline"></xbutton>
                <xbutton name="create-replace" icon-class="fx-icon-sm fv__icon-toolbar-replace" class="thryv-tb-component" @controller="states:CreateReplaceController" @tooltip tooltip-title="Replace"></xbutton>
                <xbutton name="create-strikeout" icon-class="fx-icon-sm fv__icon-toolbar-strikeout" class="thryv-tb-component" @controller="states:CreateStrikeoutController" @tooltip tooltip-title="Strikeout"></xbutton>
                <xbutton name="create-squiggly" icon-class="fx-icon-sm fv__icon-toolbar-squiggly" class="thryv-tb-component" @controller="states:CreateSquigglyController" @tooltip tooltip-title="Squiggly"></xbutton>
                <xbutton name="create-caret" icon-class="fx-icon-sm fv__icon-toolbar-insert" class="thryv-tb-component" @controller="states:CreateCaretController" @tooltip tooltip-title="Insert Text"></xbutton>

                <xbutton icon-class="thryv-toolbar-icon-areahighlight" class="thryv-tb-component" @controller="states:CreateAreaHighlightController">Area Highlight</xbutton>
                <xbutton icon-class="thryv-toolbar-icon-pencil" class="thryv-tb-component" @controller="states:CreatePencilController">Pencil</xbutton>
                <xbutton icon-class="thryv-toolbar-icon-eraser" class="thryv-tb-component" @controller="states:EraserController">Eraser</xbutton>

                <ribbon-button @controller="drawings:DrawingsDropdownController" name="create-shape-dropdown" @var.self="$component" not-immediately="true" class="thryv-tb-component thryv-ribbon-button thryv-drawing-ribbon"> 
                  <dropdown @aria:label.caret="aria:labels.toolbar.shape" @on.selected="self.select($args[0])" class="fv__ui-dropdown-hide-text" selected="0"> 
                    <create-square-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-square-button> 
                    <create-circle-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-circle-button> 
                    <create-polygon-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-polygon-button> 
                    <create-cloud-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-cloud-button> 
                    <create-arrow-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-arrow-button> 
                    <create-line-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-line-button> 
                    <create-polyline-button ribbon-text="toolbar.buttons.drawing" tabindex="0"></create-polyline-button> 
                  </dropdown> 
                </ribbon-button>

                <xbutton name="create-text" icon-class="fv__icon-toolbar-note" class="thryv-tb-component" @controller="states:CreateTextController">Note</xbutton>
                <create-attachment-button class="thryv-tb-component create-fac" @controller="states:CreateFileAttachmentController"></create-attachment-button>
                <xbutton name="freetext-typewriter"  icon-class="fx-icon-sm fv__icon-toolbar-typewriter" class="thryv-tb-component" @controller="states:CreateTypewriterController">Typewriter</xbutton>
                <xbutton icon-class="thryv-toolbar-icon-callout"class="thryv-tb-component" @controller="states:CreateCalloutController">Callout</xbutton>
                <xbutton icon-class="thryv-toolbar-icon-textbox"class="thryv-tb-component" @controller="states:CreateTextboxController">Textbox</xbutton>

                <xbutton name="thryv-toolbar-button-undo" icon-class="thryv-toolbar-icon-undo" class="thryv-tb-component">Undo</xbutton>
                <xbutton name="thryv-toolbar-button-redo" icon-class="thryv-toolbar-icon-redo" class="thryv-tb-component">Redo</xbutton>
                <xbutton name="thryv-toolbar-button-undoall" icon-class="thryv-toolbar-icon-undoall" class="thryv-tb-component">Undo All</xbutton>
              </div>
            </div>
            <div name="view-tab" class="thryv-tab-body">
              <div class="thryv-grouplist">
                <xbutton name="Thryv-toolbar-hand" @controller="states:HandController" icon-class="thryv-toolbar-icon-hand" class="thryv-tb-component">Hand</xbutton>
                <ribbon-button name="thryv-toolbar-selection-dropdown" @controller="selection:SelectionDropdownController" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-select-ribbon">
                  <dropdown name="thryv-toolabar-selection-ribbon-dropdown" @on.selected="self.select($args[0])" class="thryv-ribbon-dropdown" @aria:label.list="aria:labels.toolbar.selection">
                    <dropdown-button name="thryv-toolbar-selection-text" @controller="states:SelectTextAnnotationController" ribbon-text ="Select Text" ribbon-icon="fv__icon-toolbar-select-text-image" icon-class="fv__icon-toolbar-select-text-image" class="thryv-tb-component select-ribbon-item" tooltip-title="Text" tabindex="0">Select Text</dropdown-button>
                    <dropdown-button name="thryv-toolbar-selection-annotation" @controller="states:SelectAnnotationController" ribbon-text="Select Annotation" ribbon-icon="thryv-toolbar-icon-annot" icon-class="thryv-toolbar-icon-annot" class="thryv-tb-component select-ribbon-item" tooltip-title="Annotation" tabindex="0">Select Annotation</dropdown-button>
                  </dropdown>
                </ribbon-button>
                <ribbon-button name="thryv-toolbar-dropdown-zoom" @tooltip @var.self="$component" has-select="true" class="thryv-tb-component thryv-ribbon-button thryv-zoomin-ribbon">
                  <dropdown name="fv--inner-zoom-ribbon-dropdown" selected="0" @on.selected="self.select($args[0])" icon-class="fv__icon-toolbar-zoom-in" class="fv__ui-dropdown-hide-text thryv-ribbon-zoomin-dropdown" @aria:label.list="aria:labels.setzoom">
                    <dropdown-button name="dropdown-zoom-in" action="zoomin" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom In" ribbon-icon="fx-icon-ribbon_home_zoomin-32" icon-class="fv__icon-toolbar-zoom-in" tooltip-title="toolbar.buttons.zoomin" tabindex="0">toolbar.buttons.zoomin</dropdown-button>
                    <dropdown-button name="dropdown-zoom-out" action="zoomout" @controller="zoom:DropdownZoomInAndOutController" ribbon-text ="Zoom Out" ribbon-icon="fx-icon-ribbon_home_zoomout-32" icon-class="fv__icon-toolbar-zoom-out" tooltip-title="toolbar.buttons.zoomout" tabindex="0">toolbar.buttons.zoomout</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitpage" action="fitHeight" @controller="zoom:ZoomActionController" ribbon-text ="Fit Page" ribbon-icon="fx-icon-ribbon_home_fitpage-32" icon-class="fv__icon-toolbar-fit-page" tooltip-title="toolbar.buttons.fitHeight" tabindex="0">toolbar.buttons.fitHeight</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitwidth" action="fitWidth" @controller="zoom:ZoomActionController" ribbon-text ="Fit Width" ribbon-icon="fx-icon-ribbon_home_fitwidth-32" icon-class="fv__icon-toolbar-fit-width" tooltip-title="toolbar.buttons.fitWidth" tabindex="0">toolbar.buttons.fitWidth</dropdown-button>
                    <dropdown-button name="dropdown-zoom-fitvisible" action="fitVisible" @controller="zoom:ZoomActionController" ribbon-text ="Fit Vissible" ribbon-icon="fx-icon-ribbon_home_visible-32" icon-class="fv__icon-toolbar-fit-visible" tooltip-title="toolbar.buttons.fitVisible" tabindex="0">toolbar.buttons.fitVisible</dropdown-button>
                    <li class="fv__ui-dropdown-separator"></li>
                    <dropdown-button @foreach="scale in $pdfui.customScalingValues" @sync.text="scale * 100 + \'%\'" @controller="zoom:ZoomToScaleValueController" tabindex="0"></dropdown-button>
                  </dropdown>
                </ribbon-button>
                
                <div class="thryv-tb-component tb-divider"></div>

                <xbutton icon-class="thryv-toolbar-icon-loupe" class="thryv-tb-component" @controller="loupe:LoupeController">Loupe</xbutton>
                <xbutton icon-class="fv__icon-toolbar-marquee" class="thryv-tb-component" @controller="marquee:MarqueeToolController">Marquee</xbutton>
              </div>
            </div>

            <tooltip-layer @shortcut-context="builtin-text-selection-tooltip-shortcut-context" name="fv--text-selection-tooltip" class="fv--ui-text-selection-tooltip" @controller="collaboration-mode:TextSelectionController">
              <xbutton name="fv--text-selection-tooltip-copy" @tooltip=\'\' tooltip-title=\'contextmenu.annot.copy\' @controller="text-sel:CopySelectedTextController" icon-class="fx-icon-md fv__icon-toolbar-copy"></xbutton>
              <xbutton name="fv--text-selection-tooltip-create-highlight" @tooltip=\'\' tooltip-title=\'toolbar.tooltip.highlight.title\'  @controller="text-sel:CreateTextHighlightOnSelectedTextController" icon-class="fx-icon-md fv__icon-toolbar-text-highlight"></xbutton>
              <xbutton name="fv--text-selection-tooltip-create-strikeout" @tooltip=\'\' tooltip-title=\'toolbar.tooltip.strikeout.title\'  @controller="text-sel:CreateStrikeoutOnSelectedTextController" icon-class="fx-icon-md fv__icon-toolbar-strikeout"></xbutton>
              <xbutton name="fv--text-selection-tooltip-create-underline" @tooltip=\'\' tooltip-title=\'toolbar.tooltip.underline.title\'  @controller="text-sel:CreateUnderlineOnSelectedTextController" icon-class="fx-icon-md fv__icon-toolbar-underline"></xbutton>
              <xbutton name="fv--text-selection-tooltip-create-bookmark" @tooltip=\'\' tooltip-title=\'sidebar.bookmark.title\'  @controller="text-sel:CreateBookmarkOnSelectedTextController" icon-class="fx-icon-md fv__icon-toolbar-bookmark-md"></xbutton>
            </tooltip-layer>
          </div> 
        </div> 
        <div class="fv__ui-body thryv-viewer-container"> 
            <sidebar name="thryv-sidebar" @controller="sidebar:SidebarController" class="thryv-viewer-sidebar">
              <bookmark-sidebar-panel class="thryv-viewer-sidebar-items"></bookmark-sidebar-panel>
              <thumbnail-sidebar-panel @require-modules="thumbnail" class="thryv-viewer-sidebar-items"></thumbnail-sidebar-panel>
              <attachment-sidebar-panel class="thryv-viewer-sidebar-items"></attachment-sidebar-panel>
              <commentlist-sidebar-panel class="thryv-viewer-sidebar-items"></commentlist-sidebar-panel>
            </sidebar>
            <viewer class="thryv-viewer"></viewer> 
        </div>
        <template>
          <print:print-dialog @lazy></print:print-dialog>
          <fpmodule:file-property-dialog @lazy></fpmodule:file-property-dialog>
          <doc-attachment-dialog @lazy></doc-attachment-dialog>
          <div id="thryv-modal-basedonad" class="thryv-modal">
            <div class="thryv-modal-content">
              <span class="thryv-modal-close">&times;</span>
              <p>Thryv Based On Ad content here</p>
            </div>
          </div>
          <layer name="thryv-modal-copyright-layer" class="center thryv-modal copyright-layer" modal backdrop>
            <layer-header title="Copyright" class="ttm-layer-header"></layer-header>
            <div class="layer-content">
              Content Assistant PDF Reader Powered by Foxit. Copyright (C) 2003-2021 by Foxit Software Incorporated
            </div>
          </layer>
        </template> 
      </webpdf>`
    ].join('');
  }

  ngOnInit() {

    var localThis = this;

    //var CustomAppearance = UIExtension.appearances.RibbonAppearance
    var CustomAppearance = UIExtension.appearances.RibbonAppearance.extend({
      getLayoutTemplate: function () {
        return localThis.thryvToolbarOption0();
      },
      getDefaultFragments: function () {
        return [
          // Undo, redo, and undo all starts
          {
            target: 'thryv-toolbar-button-undo',
            config: {
              callback: function () {
                localThis.pdfuiHelper('undo-redo', 'undo');
              }
            }
          },
          {
            target: 'thryv-toolbar-button-redo',
            config: {
              callback: function () {
                localThis.pdfuiHelper('undo-redo', 'redo');
              }
            }
          },
          {
            target: 'thryv-toolbar-button-undoall',
            config: {
              callback: function () {
                localThis.pdfuiHelper('undo-redo', 'undoAll');
              }
            }
          },
          // Undo, redo, and undo all Ends
          // add image
          {
            target: 'thryv-add-image-from-list',
            config: {
              callback: async function() {

                const pdfViewer = await localThis.pdfui.getPDFViewer();
                const pdfDoc = pdfViewer.getCurrentPDFDoc();
                const pdfPage = await pdfDoc.getPageByIndex(0);

                let rect = {
                  left: pdfPage.getWidth() - 85,
                  right: pdfPage.getWidth() - 5,
                  top: pdfPage.getHeight() - 50,
                  bottom: pdfPage.getHeight() - 65
                }
                let annotJson = {
                  type: 'freetext',
                  rect: rect,
                  subject: 'Textbox',
                  defaultAppearance: {
                    textColor: 0x000000,
                    textSize: 8                    
                  },
                  contents: 'S 9783033142620',
                  borderInfo: {
                    width: 0
                  },
                  color: 0xffffff,
                  rotate: 0,
                  flags: 4
                };

                let newAnnotList = await pdfPage.addAnnot(annotJson);
                if (newAnnotList.length > 0)
                {
                  const newAnnot = newAnnotList[0];
                  const newAnnotId = newAnnot.getUniqueID();

                  console.log("New text annot ID: ", newAnnotId);

                  // Add to the list of initial annotations so it won't be deleted for being in the top margin
                  localThis.initialAnnots.push(newAnnotId);
                }

                // Add image onto page as a graphics object
                var imageResp = await fetch("/assets/ad1.png");
                var imageFile = await imageResp.arrayBuffer();

                let imgRect = {
                  left: 100,
                  bottom: 500,
                  right: 100 + 99,
                  top: 500 + 107
                }

                let info = {
                  type: PDFViewCtrl.PDF.constant.Graphics_ObjectType.Image,
                  buffer: imageFile,
                  rect: imgRect
                }
                pdfPage.addGraphicsObject(info);

                // Add image onto page as a Screen annotation
                var imageResp = await fetch("/assets/ad2.png");
                var imageFile = await imageResp.arrayBuffer();

                let imgAnnotRect = {
                  left: 300,
                  bottom: 500,
                  right: 300 + 99,
                  top: 500 + 107
                }

                let screenAnnotJson = {
                  type: 'screen',
                  rect: imgAnnotRect,
                  subject: 'Ad',
                  borderInfo: {
                    width: 0
                  },
                  color: 0xffffff,
                  rotate: 0,
                  flags: 4
                };

                newAnnotList = await pdfPage.addAnnot(screenAnnotJson);
                if (newAnnotList.length > 0)
                {
                  const newImgAnnot = newAnnotList[0];
                  
                  const imageAnnotResp = await fetch('/assets/ad3.png');
                  const imageAnnotFile = await imageAnnotResp.arrayBuffer();
                  let screenAnnot = (newImgAnnot as PDFViewCtrl.PDF.annots.Screen)
                  console.log("screenAnnot", screenAnnot)
                  await screenAnnot.setImage(imageAnnotFile);

                  const newAnnotId = newImgAnnot.getUniqueID();

                  console.log("New image annot ID: ", newAnnotId);

                  // Add to the list of initial annotations so it won't be deleted for being in the top margin
                  localThis.initialAnnots.push(newAnnotId);
                }
                

              }
            }
          },
          // multi file attachements
          {
            target: 'thryv-toolbar-doc-attachment',
            config: {
              callback: function () {
                localThis.pdfuiHelper('doc-attachment', 'showDialog');
              }
            }
          },
          // set based on Ad
          {
            target: 'thryv-toolbar-button-basedonad',
            config: {
              callback: function () {
                debugger;
                localThis.openSetBasedAdDialog();
                // var thryvModal = document.getElementById('thryv-modal-basedonad');
                // if (thryvModal) {
                //   thryvModal.style.display = 'block';
                // }
                // var span = document.getElementsByClassName('thryv-modal-close')[0];
                // span.addEventListener('click', function () {
                //   var thryvModal = document.getElementById('thryv-modal-basedonad');
                //   if (thryvModal) {
                //     thryvModal.style.display = 'none';
                //   }
                // });
              }
            }
          },
          // apply save and close and cancel starts
          {
            target: 'apply-cs',
            config: {
              callback: function () {
                debugger;
                localThis.stBasedAdDialogRef.close();
              }
            }
          },
          {
            target: 'saveandclose-cs',
            config: {
              callback: function () {
                debugger;
                localThis.stBasedAdDialogRef.close();
              }
            }
          },
          {
            target: 'cancel-cs',
            config: {
              callback: function () {
                debugger;
                localThis.stBasedAdDialogRef.close();
              }
            }
          },
          // apply save and close and cancel staendsrts

          // {
          //   target: 'selection-text-annotation',
          //   config: {
          //   callback: UIExtension.controllers.SelectTextAnnotationController
          //   }
          // },

          // {
          //   target: 'thryv-toolbar-copyright',
          //   config: {
          //     callback: function () {
          //       alert('Info button clicked');
          //     }
          //   }
          // },
        ];
      },
      disableAll: function () { }
    });

    UIExtension.PDFUI.module('thryvCustomControler', [])
    // .controller('SelectSingleFileController', {
    //   handle: function (file) {
    //     localThis.pdfLoad(file);
    //   }
    // })
    .controller('CopyrightDialog', {
      handle: function() {
        localThis.pdfui.getRootComponent().then(root => {
          const layer = root.getComponentByName('thryv-modal-copyright-layer');
          layer.show();
        });
      }
      });

    this.pdfui = new UIExtension.PDFUI({
      viewerOptions: {
        libPath: '/foxit-lib',
        jr: {
          ...license,
        },

        defaultAnnotConfig: function (type, intent) {
          let config = {};

          // There appears to be a bug in Foxit Web SDK 9.2, setting the ink color to pure black results
          // in the annotation disappearing after it is drawn. Instead, a value that is very close to
          // black is used
          let thryvBlack = 0x000000;
          let thryvBlackSpecial = 0x010101;
          let thryvRed = 0xaa0000;
          let thryvGreen = 0x00aa00;
          let thryvBlue = 0x0000aa;
          let thryvGray = 0x808080;

          console.log('Annot config: ', type);
          console.log('Annot intent: ', intent);

          switch (type) {
            case 'ink':
            case 'square':
            case 'circle':
            case 'line':
            case 'arrow':
            case 'polygon':
            case 'strikeout':
              config = {
                'color': thryvBlackSpecial,
                'opacity': 1,
                'borderInfo': {
                  'style': 0,
                  'width': 1
                }
              }
              break;

            case 'freetext':
              if (intent == 'FreeTextCallout') {
                config = {
                  'color': thryvBlackSpecial,
                  'opacity': 1,
                  'defaultAppearance': {
                    'textColor': thryvBlack,
                    'textSize': 10
                  },
                  'borderInfo': {
                    'style': 0,
                    'width': 1
                  }
                }
                break;
              }
              else if (intent == 'FreeTextTextbox') {
                config = {
                  'color': thryvBlackSpecial,
                  'opacity': 1,
                  'defaultAppearance': {
                    'textColor': thryvBlack,
                    'textSize': 10
                  },
                  'borderInfo': {
                    'style': 0,
                    'width': 1
                  }
                }
              }
              break;
            default:
              break;
          }
          console.log(config);
          return config;
        }
      },

      appearance: CustomAppearance,

      // renderTo: this.element.nativeElement,
      renderTo: '#pdf-ui',
      addons: Addons,
      // addons: [
      //    '/foxit-lib/uix-addons/doc-attachment/',
      //    '/foxit-lib/uix-addons/file-property/',
      //    '/foxit-lib/uix-addons/print/',         
      //    '/foxit-lib/uix-addons/undo-redo/',
      //    '/foxit-lib/uix-addons/thumbnail/',
      // ]
    });

    this.pdfui.setEraserSize(20);

    this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.annotationPermissionChanged, async function (event) {
      console.log(event);
    });

    this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.updateActiveAnnotation, async function (event) {
      console.log(event);
    });

    this.pdfui.addViewerEventListener(PDFViewCtrl.constants.ViewerEvents.openFileSuccess, async function(event) {
      localThis.initialAnnots.length = 0;
      const pdfViewer = await localThis.pdfui.getPDFViewer();
      const pdfDoc = pdfViewer.getCurrentPDFDoc();
      const annots = await pdfDoc.getAnnots();
      for (const pageAnnots of annots)
      {
        for (const annot of pageAnnots)
        {
          localThis.initialAnnots.push(annot.getUniqueID());
        }
      }
    });

    this.pdfui.openPDFByHttpRangeRequest({
      range: {
        // url: '/assets/FoxitPDFSDKforWeb_DeveloperGuide.pdf',
        url: '/assets/30861704.pdf',
      }
    })
  }

  openSetBasedAdDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'setbased-ad-dialog';
    dialogConfig.backdropClass = 'dialog-backdrop-cstm'
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      isData : true
    }
    let pdfDialogRef = this.dialog.open(SetbasedAdDialogComponent, dialogConfig)
    pdfDialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
