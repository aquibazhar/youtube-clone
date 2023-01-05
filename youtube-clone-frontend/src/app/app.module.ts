import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaveVideoDetailsComponent,
    ToolbarComponent,
    UploadVideoComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
