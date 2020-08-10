import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    HeaderComponent, LoaderComponent
  ]
})
export class ComponentsModule { }
