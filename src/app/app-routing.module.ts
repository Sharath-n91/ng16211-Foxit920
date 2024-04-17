import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { HomeComponent } from './home/home.component';
import { PdfViewerFdDefaultComponent } from './pdf-viewer-fd-default/pdf-viewer-fd-default.component';
// import { PdfViewerUpdatesComponent } from './pdf-viewer-updates/pdf-viewer-updates.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'pdfViewer',
        component: PdfViewerComponent
      },
      // {
      //   path: 'pdfViewerUpdates',
      //   component: PdfViewerUpdatesComponent
      // },
      {
        path: 'pdfViewerFdDefault',
        component: PdfViewerFdDefaultComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
