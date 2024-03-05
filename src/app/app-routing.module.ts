import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { homeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: homeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'paiement', component: PaiementComponent},
  {path: 'connexion', component: ConnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
