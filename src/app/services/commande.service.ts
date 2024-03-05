import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../model/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private commande = new BehaviorSubject<Commande>(new Commande());

  constructor() { }

  addCommande(c: Commande){
    this.commande.next(c);
    console.log(this.commande);
  }

  deleteCommande(){
    this.commande.next(new Commande());
  }
}