import { Panier } from "./panier";

export class Commande {
    id?: number;
    nom: string;
    tel: string;
    mail: string;
    adresse: string;
    type: string;
    prix: number;
    panier: Panier[]
    paiement: string;

    constructor(
        nom: string = '',
        tel: string = '',
        mail: string = '',
        adresse: string = '',
        type: string = 'Emporté',
        prix: number = 0,
        panier: Panier[] = [],
        paiement: string = "carte"
    ){
        this.nom = nom;
        this.tel = tel;
        this.mail = mail;
        this.adresse = adresse;
        this.type = type;
        this.prix = prix;
        this.panier = panier;
        this.paiement = paiement;
    } 

    
}