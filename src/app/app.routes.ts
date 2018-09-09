import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './shared/services/authentication/authentication.guard';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './products-list/product/product-details/product-details.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
