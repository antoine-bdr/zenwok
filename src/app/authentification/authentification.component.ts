import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Commande } from '../model/commande';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';

import { MapsAPILoader } from '@agm/core';
import { CommandeService } from '../services/commande.service';
import { Profil } from '../model/profil';
declare var google: any;

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit{
  type: boolean = true;

  commande: Commande = new Commande();
  adresseValide: boolean = false;

  etape: number = 0;

  profil: Profil = new Profil();

  email: string = '';
  passwordC: string = '';

  password: string = '';
  passwordConfirm: string = '';

  error: string = '';

  constructor(
    private panierService: PanierService,
    private commandeService: CommandeService,
    private mapsAPILoader: MapsAPILoader,
    private authService: AuthService,
    private router: Router
  ){
    this.commande.paiement = "card";
  }

  ngOnInit(){
    this.authService.user.subscribe(user => {
      if(user) {
        this.router.navigate(['/paiement']);
      }else{
        this.initAutocomplete();
        this.panierService.getType().subscribe((t) => {
          this.commande.type = t;
        });

        this.panierService.getPanier().subscribe((p) => {
          this.commande.panier = p;
        });

        this.panierService.getPrix().subscribe((prix) => {
          this.commande.prix = prix;
        });

        this.panierService.getEtape().subscribe((etape) => {
          this.etape = etape;
          console.log(this.etape);
        });
      }
    });
  }

  connexion(){
    this.authService.signIn(this.email, this.passwordC).subscribe(user => {
      console.log(user);
    });
    console.log(this.authService.user);
  }

  inscription(){
    this.authService.signUp(this.profil, this.password);
  }

  modifierAdresse(){
    this.adresseValide = false;
    this.commande.adresse = "";
  }

  validerCommande(){
    if(this.commande.type == "Emporté"){
      this.commande.adresse = '';
    }
    console.log(this.commande);
    this.commandeService.addCommande(this.commande);
  }

  retourMenu(){
    this.panierService.changerEtape(1);
  }

  initAutocomplete(){
    this.mapsAPILoader.load().then(() => {
      let options = {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(50.559560, 2.846184),
          new google.maps.LatLng(50.613323, 3.150131)
        ),
        strictBounds: true
      };
      let autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('adresse'),
        options);
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        console.log(place);
        this.commande.adresse = place.formatted_address
        this.adresseValide = true;
        console.log(this.commande);
        console.log(this.adresseValide);
      });
    });
  }

}
