export class Menu {
    id?: number;
    nom:string;
    description: string;
    prix: number;
    categorie: number;
    idStripe: string;

    constructor(
        nom: string = '',
        description: string = '',
        prix: number = 0,
        categorie: number = 1,
        idStripe: string = ''
    ){
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.categorie = categorie;
        this.idStripe = idStripe;
    } 

    
}