import { Component, OnInit, ViewChild } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  async ngOnInit() {
    const stripe = await loadStripe('pk_test_51NnMTXFm98DZVzhNOZqwmELkaS0fsVy55H66f0W0u4zHOKWrvsfsVfG7dd7Ynou10WlyA66YOfB490eROD5eUyAv00LjYdecWQ');  // Utilisez votre clé publiable de mode test
    // Votre logique d'intégration ici
  }
}