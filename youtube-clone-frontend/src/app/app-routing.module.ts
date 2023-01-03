import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'upload-video', component: UploadVideoComponent },
  { path: 'save-video/:id', component: SaveVideoDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
