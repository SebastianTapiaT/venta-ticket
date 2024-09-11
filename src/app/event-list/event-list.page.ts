import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface EventItem {
  name: string;
  price: number;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {

  events: EventItem[] = [
    { name: 'Concierto de Rock', price: 90000 },
    { name: 'Película en Cine', price: 5000 },
    { name: 'Partido de Fútbol', price: 25000 },
    { name: 'Obra de Teatro', price: 15000 }
  ];

  totalAmount: number = 0;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  async addTicket(event: EventItem) {
    const alert = await this.alertController.create({
      header: 'Confirmar Compra',
      message: `Has seleccionado el ${event.name} con un precio de ${event.price} CLP. ¿Deseas continuar al checkout?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Compra cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.totalAmount += event.price;
            this.router.navigate(['/checkout'], {
              queryParams: { eventName: event.name, eventPrice: event.price, totalAmount: this.totalAmount }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
