export class Panier {
    id?: number;
    nom:string;
    quantite: number;
    prix: number;
    categorie: number;

    constructor(
        nom: string = '',
        quantite: number = 0,
        prix: number = 0,
        categorie: number = 1
    ){
        this.nom = nom;
        this.quantite = quantite;
        this.prix = prix;
        this.categorie = categorie;
    }  
}