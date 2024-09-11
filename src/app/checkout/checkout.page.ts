import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  eventName: string = '';
  eventPrice: number = 0;
  customerName: string = '';
  customerLastName: string = '';
  customerAge: number = 0;
  finalPrice: number = 0;
  discount: number = 0;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventName = params['eventName'];
      this.eventPrice = +params['eventPrice'];
      this.calculateFinalPrice();
    });
  }

  calculateFinalPrice() {
    if (this.customerAge !== undefined) {
      if (this.customerAge < 18) {
        this.discount = 10;
      } else if (this.customerAge > 60) {
        this.discount = 20;
      } else {
        this.discount = 0;
      }
      this.finalPrice = (this.eventPrice * this.quantity) - ((this.eventPrice * this.discount / 100) * this.quantity);
    }
  }

  completePurchase() {
    if (this.customerName && this.customerLastName && this.customerAge) {
      console.log(`Compra completada para ${this.customerName} ${this.customerLastName}, edad: ${this.customerAge}`);
      console.log(`Evento: ${this.eventName}, Cantidad: ${this.quantity}, Precio final: ${this.finalPrice}`);
      
      // Llamar al servicio para registrar la compra
      this.eventService.purchaseTickets(this.eventName, this.quantity, this.finalPrice, this.discount);
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}
