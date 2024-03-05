export class Profil {
    id?: string;
    genre: boolean;
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    adresse: string;

    constructor(
        genre: boolean = false,
        nom: string = '',
        prenom: string = '',
        tel: string = '',
        email: string = '',
        adresse: string = ''
        ){
            this.genre = genre;
            this.nom = nom;
            this.prenom = prenom;
            this.tel = tel;
            this.email = email;
            this.adresse = adresse;
    }
}