import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorMenuPageRoutingModule } from './vendor-menu-routing.module';

import { VendorMenuPage } from './vendor-menu.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorMenuPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VendorMenuPage]
})
export class VendorMenuPageModule { }
