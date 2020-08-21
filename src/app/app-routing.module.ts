import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'setup-profile',
    loadChildren: () => import('./pages/setup-profile/setup-profile.module').then(m => m.SetupProfilePageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'vendor-menu',
    loadChildren: () => import('./pages/vendor-menu/vendor-menu.module').then(m => m.VendorMenuPageModule)
  },
  {
    path: 'order-dish',
    loadChildren: () => import('./pages/order-dish/order-dish.module').then(m => m.OrderDishPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
