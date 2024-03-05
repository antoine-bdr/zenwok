export class Reservation {
    id?: number;
    date: number;
    datestr: string;
    heure: string;
    nbrPersonne: number;
    nom:string;
    num: string;
    email: string;
    profilId?: string;

    constructor(
        nom: string = '',
        date: number = new Date().getTime(),
        datestr: string = new Date(date).toLocaleDateString('fr-FR'),
        heure: string = '',
        nbrPersonne: number = 1,
        num: string = '',
        email: string = '',
        profilId : string = ''
    ){
        this.nom = nom;
        this.date = date;
        this.datestr = datestr;
        this.heure = heure;
        this.nbrPersonne = nbrPersonne;
        this.num = num;
        this.email = email;
        this.profilId = profilId;
    }  
}