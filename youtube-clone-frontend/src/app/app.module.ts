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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { HistoryComponent } from './components/history/history.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { LikedVideosComponent } from './components/liked-videos/liked-videos.component';
import { ChipsBarComponent } from './components/chips-bar/chips-bar.component';
import { ViewsPipe } from './pipes/views.pipe';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { RegisterComponent } from './components/register/register.component';
import { VideoDescriptionComponent } from './components/video-description/video-description.component';
import { CommentsComponent } from './components/comments/comments.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SearchVideosComponent } from './components/search-videos/search-videos.component';
import { SearchComparePipe } from './pipes/search-compare.pipe';
import { EmptyPlaylistComponent } from './components/empty-playlist/empty-playlist.component';
import { LikedPlaylistViewComponent } from './components/liked-playlist-view/liked-playlist-view.component';
import { HistoryCardViewComponent } from './components/history-card-view/history-card-view.component';
import { HistoryManagementComponent } from './components/history-management/history-management.component';
import { HistoryCardComponent } from './components/history-card/history-card.component';
import { DateAndDayPipe } from './pipes/date-and-day.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SaveVideoDetailsComponent,
    ToolbarComponent,
    UploadVideoComponent,
    VideoPlayerComponent,
    WatchVideoComponent,
    HistoryComponent,
    SubscriptionsComponent,
    LikedVideosComponent,
    ChipsBarComponent,
    ViewsPipe,
    RelativeTimePipe,
    RegisterComponent,
    VideoDescriptionComponent,
    CommentsComponent,
    OrderByPipe,
    SuggestionsComponent,
    SearchVideosComponent,
    SearchComparePipe,
    EmptyPlaylistComponent,
    LikedPlaylistViewComponent,
    HistoryCardViewComponent,
    HistoryManagementComponent,
    HistoryCardComponent,
    DateAndDayPipe,
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
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AuthConfigModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
