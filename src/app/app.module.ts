import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

import { HomeComponent } from './home/home.component';
import { PdfViewerFdDefaultComponent } from './pdf-viewer-fd-default/pdf-viewer-fd-default.component';
import { PdfViewerDialogComponent } from './pdf-viewer-dialog/pdf-viewer-dialog.component';
import { SetbasedAdDialogComponent } from './setbased-ad-dialog/setbased-ad-dialog.component';
// import { PdfViewerUpdatesComponent } from './pdf-viewer-updates/pdf-viewer-updates.component';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatExpansionModule,
  MatSidenavModule
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SideNavComponent,
    PdfViewerComponent,
    HomeComponent,
    PdfViewerFdDefaultComponent,
    PdfViewerDialogComponent,
    SetbasedAdDialogComponent,
    // PdfViewerUpdatesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MATERIAL_MODULES,
  ],
  exports: [PdfViewerDialogComponent, SetbasedAdDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
