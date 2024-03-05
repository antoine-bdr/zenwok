import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Menu } from '../model/menu';
import { PanierService } from '../services/panier.service';
import { Panier } from '../model/panier';
import { Location } from '@angular/common';
declare var M: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  categorie: any[] = new Array();
  menu: Menu[] = new Array();

  itemPanier: Panier[] = new Array();

  panier: Panier[] = new Array();
  prix: number = 0;

  constructor(private menuService: MenuService,
              private panierService: PanierService,
              private location: Location){

  }

  ngOnInit(){
    this.scroll();
    this.loadMenu();
    this.loadCategorie();
    
    this.panierService.getPanier().subscribe((p) => {
      this.panier = p;
    });

    this.panierService.getPrix().subscribe((prix) => {
      this.prix = prix;
    });
  }

  goBack(): void {
    this.location.back();
  }

  loadMenu(){
    this.menuService.getMenuList().subscribe((menuList) => {
      this.menu = menuList;
      console.log(menuList);
    });
  }

  loadCategorie(){
    this.menuService.getCategorie().subscribe((cat) => {
      this.categorie = cat;
      console.log(cat);
    });
  }

  ajoutPanier(menu: Menu){
    var panierItem: Panier = {nom: menu.nom, quantite: 1, prix: menu.prix, categorie: menu.categorie}
      this.panierService.addItem(panierItem);
  }

  ajoutQuantite(item: Panier){
    this.panierService.addItem(item);
  }

  retirerPanier(nom: string){
    this.panierService.removeItem(nom);
  }

  scrollMenu(id: any){
    console.log(id);
    const target = document.querySelector(`#_${id}`);
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scroll(){
    window.addEventListener('scroll', function() {
      var panier = document.querySelector('.panier') as HTMLElement;
      var topPosition = window.pageYOffset + 15; // 40px est la position initiale du panier
      if(panier != null){
        panier.style.position = 'absolute';
        panier.style.top = topPosition + 'px';
      }
    });
  }
}
