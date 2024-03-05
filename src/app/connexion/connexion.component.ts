import { Component } from '@angular/core';
import { Commande } from '../model/commande';
import { CommandeService } from '../services/commande.service';
import { Profil } from '../model/profil';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  type: boolean = true;

  commande: Commande = new Commande();
  adresseValide: boolean = false;

  profil: Profil = new Profil();

  constructor(private commandeService: CommandeService){

  }


  validerCommande(){
    if(this.commande.type == "Emporté"){
      this.commande.adresse = '';
    }
    console.log(this.commande);
    this.commandeService.addCommande(this.commande);
  }

}
