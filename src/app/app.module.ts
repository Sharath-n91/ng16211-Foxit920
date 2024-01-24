import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { HomeComponent } from './home/home.component';

const MATERIAL_MODULES = [
  MatCommonModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatExpansionModule,
  MatTooltipModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SideNavComponent,
    PdfViewerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MATERIAL_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
