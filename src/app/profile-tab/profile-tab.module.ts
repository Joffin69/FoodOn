import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile-tab.page';

import { Tab3PageRoutingModule } from './profile-tab-routing.module'
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    Tab3PageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProfilePage]
})
export class Tab3PageModule { }
