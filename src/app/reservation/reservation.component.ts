import { Component, OnInit, ViewChild  } from '@angular/core';
import * as moment from 'moment';
import { Reservation } from '../model/reservation';
import { ReservationService } from '../services/reservation.service';

declare var M: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  @ViewChild('timeSelect') timeSelect: any;
  @ViewChild('dateSelect') dateSelect: any;

  heuresMidi: string[] = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45'];
  heuresSoir: string[] = ['17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45'];
  partySizes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  timesMidi: string[] = [];
  timesSoir: string[] = [];
  dateMin: Date = new Date();

  reservation: Reservation = new Reservation();

  page: boolean = false;

  constructor(private res: ReservationService) {
    
  }

  ngOnInit(): void {
    this.initMaterialize();
    this.updateAvailableTimes();
    console.log(this.reservation);
  }

  updateAvailableTimes() {
    const now = new Date();
    const dateRes = new Date(this.reservation.date);
    console.log(this.reservation.date);
    console.log(dateRes);
    this.reservation.datestr = dateRes.toLocaleDateString('fr-FR');
    const isToday = this.reservation.datestr === now.toLocaleDateString('fr-FR');
    let hours = isToday ? now.getHours() : 0;
    let minutes = isToday ? now.getMinutes() : 0;
    var availableTimes: any[] = [];

    for (let hour = hours; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === hours && minute <= minutes) {
          continue;
        }
        const dateTime = new Date(`${dateRes.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`);
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        availableTimes.push(time);
      }
    }
    
    this.timesMidi = this.heuresMidi.filter(h => availableTimes.includes(h));
    this.timesSoir = this.heuresSoir.filter(h => availableTimes.includes(h));

    if (this.timesMidi.length === 0 && this.timesSoir.length === 0) {
      // Augmente la date de réservation de 1 jour si aucun horaire n'est disponible
      dateRes.setDate(dateRes.getDate() + 1);
      this.dateMin = dateRes;
      this.reservation.date = dateRes.getTime();
      this.updateAvailableTimes();
      return;
    }

    this.reservation.heure = availableTimes[0] || '';
    console.log(this.timesSoir);
  }

  suivant(){
    this.page = true;
    this.initHtml();
    this.initMaterialize();
  }

  retour(){
    this.page = false;
  }

  validerReservation(){
    this.res.addReservation(this.reservation);
  }

  initHtml(){
    setTimeout(() => {
      this.timeSelect.nativeElement.selectedIndex = 0;
      M.FormSelect.init(this.timeSelect.nativeElement);
      //this.dateSelect.nativeElement.selectedIndex = 0;
      M.Datepicker.init(this.dateSelect.nativeElement);
    });
  }

  initMaterialize(){
    document.addEventListener('DOMContentLoaded', () => {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const now = new Date();
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {
        i18n: {
          months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
          monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
          weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
        },
        formatDate: 'dd/mm/yyyy',
        minDate : this.dateMin,
        firestDay: 1,
        setDefaultDate: true,
        autoClose: true,
        parse: function(date: any) {
          return moment(date, "dd/mm/yyyy").toDate();
        },
        onSelect: (date: any) => {
          console.log("Date sélectionnée : " + date);
          this.reservation.date = date.getTime();
          console.log("Date sélectionnée : " + this.reservation.date);
          this.updateAvailableTimes();
        }
      });
    });
  }
}
