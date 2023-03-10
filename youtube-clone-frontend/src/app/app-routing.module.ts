import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LikedVideosComponent } from './components/liked-videos/liked-videos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { SearchVideosComponent } from './components/search-videos/search-videos.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'history', canActivate: [AuthGuard], component: HistoryComponent },
  {
    path: 'subscriptions',
    canActivate: [AuthGuard],
    component: SubscriptionsComponent,
  },
  {
    path: 'liked-videos',
    canActivate: [AuthGuard],
    component: LikedVideosComponent,
  },
  {
    path: 'upload-video',
    canActivate: [AuthGuard],
    component: UploadVideoComponent,
  },
  {
    path: 'save-video',
    canActivate: [AuthGuard],
    component: SaveVideoDetailsComponent,
  },
  { path: 'watch-video/:videoId', component: WatchVideoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search/:searchInput', component: SearchVideosComponent },
  {
    path: 'watch-later',
    canActivate: [AuthGuard],
    component: WatchLaterComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
