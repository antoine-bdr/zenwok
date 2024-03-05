import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Menu } from '../model/menu';

@Injectable(
  {providedIn: 'root'}
)
export class MenuService {

  constructor(private fire: Firestore) { }

  getMenuList() : Observable <Menu[]>{
    const menuRef = collection(this.fire, "menu");
    const q = query(menuRef, orderBy("categorie"), orderBy("nom"));
    return collectionData(q, { idField: 'id'}) as Observable<Menu[]>;
  }

  getCategorie(): Observable <any[]>{
    const categorieRef = collection(this.fire, "categorie");
    return collectionData(categorieRef, { idField: "id" }) as Observable<any[]>;
  }
}
