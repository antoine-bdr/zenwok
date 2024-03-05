import { Injectable } from '@angular/core';
import { Reservation } from '../model/reservation';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationCollection: AngularFirestoreCollection <Reservation>;

  constructor(private afs: AngularFirestore) { 
    this.reservationCollection = this.afs.collection<Reservation>('reservation');
  }

  addReservation(r: Reservation){
    const reservation = {...r}
    return this.reservationCollection.add(reservation);
  }
}