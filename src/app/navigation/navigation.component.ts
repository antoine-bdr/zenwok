import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
declare var M: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  nbrItem: number = 0;

  constructor(private panierService: PanierService){

  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, Option);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    this.panierService.getPanier().subscribe((p) => {
      this.nbrItem = 0;
      p.forEach((panier) => {
        this.nbrItem = this.nbrItem + panier.quantite;
      });
    });
  }

}
