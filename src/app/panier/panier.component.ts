import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Panier } from '../model/panier';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit{

  panier: Panier[] = new Array();
  prix: number = 0;
  type: string = "Emporté";

  etape: number = 0;

  constructor(private panierService: PanierService,
              private router: Router,
              private http: HttpClient){
  }

  ngOnInit(){
      this.panierService.getPanier().subscribe((p) => {
        this.panier = p;
        console.log(this.panier);
      });

      this.panierService.getPrix().subscribe((prix) => {
        this.prix = prix;
      });
      this.panierService.getType().subscribe((typeL) => {
        this.type = typeL;
        console.log(typeL)
      });
      this.panierService.getEtape().subscribe((etape) => {
        this.etape = etape;
        console.log(this.etape);
      });
  }

  ajoutQuantite(item: Panier){
    this.panierService.addItem(item);
  }

  retirerPanier(nom: string){
    this.panierService.removeItem(nom);
  }

  changerTypeLivraison(){
    this.panierService.updateTypeLivraison(this.type);
  }

  etape2(){
    this.panierService.changerEtape(2);
  }

  etape3(){
    this.panierService.changerEtape(3);
  }

  goToPayment() {
    console.log(this.panier);
    this.http.post('http://localhost:4242/create-checkout-session', {
    item: this.panier
}).subscribe(async (res: any) => {
    let stripe = await loadStripe('pk_test_51NnMTXFm98DZVzhNOZqwmELkaS0fsVy55H66f0W0u4zHOKWrvsfsVfG7dd7Ynou10WlyA66YOfB490eROD5eUyAv00LjYdecWQ');
    if (res.url) {
        window.location.href = res.url;
    } else {
        stripe?.redirectToCheckout({
            sessionId: res.id
        });
    }
});
  }

}
