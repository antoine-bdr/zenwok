import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../model/menu';
import { Panier } from '../model/panier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private panier = new BehaviorSubject<Panier[]>([]);
  private prix = new BehaviorSubject<number>(0);
  private type = new BehaviorSubject<string>('Emporté');
  private etape = new BehaviorSubject<number>(1);

  constructor() {
    this.loadCartFromLocalStorage();
    this.loadPriceFromLocalStorage();
    this.loadTypeFromLocalStorage();
   }

  addItem(itemPanier: Panier){
    const items = this.panier.getValue();
    const foundItem = items.find(item => item.nom === itemPanier.nom);
    if(foundItem){
      foundItem.quantite++;
      this.panier.next(items);
    }else{
      this.panier.next([itemPanier, ...items]);
    }
    this.updateSum();
    this.saveCartToLocalStorage();
  }

  removeItem(nom: string){
    const allItems = this.panier.getValue();
    console.log(allItems);
    const foundItem = allItems.find(item => item.nom === nom);
    if (foundItem) {
      foundItem.quantite--;
      if (foundItem.quantite === 0) {
        const remainingItems = allItems.filter(item => item.nom !== nom);
        console.log(remainingItems);
        this.panier.next(remainingItems);
      } else {
        this.panier.next(allItems);
      }
    }
    this.updateSum();
    this.saveCartToLocalStorage();
  }



  updateSum(){
    const allItems = this.panier.getValue();
    const newSum = allItems.reduce((val, item: Panier) => val += item.prix * item.quantite, 0);
  
    this.prix.next(newSum);
    this.savePriceToLocalStorage();
  }

  updateTypeLivraison(type: string){
    this.type.next(type);
    this.saveTypeToLocalStorage();
  }

  changerEtape(num: number){
    this.etape.next(num);
    console.log(this.etape);
  }

  getPanier(){
    return this.panier.asObservable();
  }

  getPrix(){
    return this.prix.asObservable();
  }

  getType(){
    return this.type.asObservable();
  }

  getEtape(){
    return this.etape.asObservable();
  }

  clearCart(){
    this.panier.next([]);
    this.prix.next(0);
  }

  //Sauvegarde local

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.panier.getValue()));
  }

  savePriceToLocalStorage() {
    localStorage.setItem('price', this.prix.getValue().toString());
  }
  
  saveTypeToLocalStorage() {
    localStorage.setItem('type', JSON.stringify(this.type.getValue()));
  }

  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.panier.next(JSON.parse(storedCart));
    }
  }

  loadPriceFromLocalStorage() {
    const storedPrice = localStorage.getItem('price');
    if (storedPrice) {
      this.prix.next(parseFloat(storedPrice));
    }
  }
  
  loadTypeFromLocalStorage() {
    const storedType = localStorage.getItem('type');
    if (storedType) {
      this.type.next(JSON.parse(storedType));
    }
  }
}