import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { MenuService } from './menu/menu.service';
import { PanierComponent } from './panier/panier.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaiementComponent } from './paiement/paiement.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReservationComponent } from './reservation/reservation.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio'

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    homeComponent,
    NavigationComponent,
    FooterComponent,
    MenuComponent,
    PanierComponent,
    MapComponent,
    AuthentificationComponent,
    PaiementComponent,
    ReservationComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCIT-NsoQ1N1LwS4uAXkMrJMITVEQ4T28s'
    }),
    NgxStripeModule.forRoot('pk_test_51MBngTDNNkah9XG7aSq4plwyhPYJJDDahCv8b7fm6ZadnSWADj4MfdxRaWYhm5OsH6uOO42hig9yBhA2c3sKNaAt00OzbeCCGP'),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    SlickCarouselModule,
    MatFormFieldModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressBarModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' }},
    MenuService
  ],
  bootstrap: [AppComponent],
  exports: [
    FooterComponent
  ]
})
export class AppModule { }
