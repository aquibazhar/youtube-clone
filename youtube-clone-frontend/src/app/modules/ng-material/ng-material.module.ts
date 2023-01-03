import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

const MaterialModules = [MatIconModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatListModule, MatButtonModule]

@NgModule({
  imports: MaterialModules,
  exports: MaterialModules
})
export class NgMaterialModule { }
