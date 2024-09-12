import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertController } from '@ionic/angular';  // Importar el AlertController

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
    private eventService: EventService,
    private alertController: AlertController // Inyectar el AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventName = params['eventName'];
      this.eventPrice = +params['eventPrice'];
      this.calculateFinalPrice();
    });
  }

  calculateFinalPrice() {
    if (!this.customerAge || this.customerAge < 0) {
      this.customerAge = 0;
    }

    if (!this.quantity || this.quantity < 1) {
      this.quantity = 1;
    }

    if (this.customerAge < 18) {
      this.discount = 10; // Descuento del 10%
    } else if (this.customerAge > 60) {
      this.discount = 20; // Descuento del 20%
    } else {
      this.discount = 0; // Sin descuento
    }

    const discountAmount = (this.eventPrice * this.discount / 100);
    this.finalPrice = (this.eventPrice - discountAmount) * this.quantity;
  }

  async completePurchase() {
    if (this.customerName && this.customerLastName && this.customerAge && this.quantity > 0) {
      console.log(`Compra completada para ${this.customerName} ${this.customerLastName}, edad: ${this.customerAge}`);
      console.log(`Evento: ${this.eventName}, Cantidad: ${this.quantity}, Precio final: ${this.finalPrice}`);

      // Mostrar el mensaje emergente (alert) con el resumen de compra
      await this.showPurchaseSummary();

      // Llamar al servicio para registrar la compra (opcional)
      this.eventService.purchaseTickets(this.eventName, this.quantity, this.finalPrice, this.discount);
    } else {
      console.log('Por favor, complete todos los campos correctamente.');
    }
  }

  // Método para mostrar la alerta con el resumen de compra
  async showPurchaseSummary() {
    const alert = await this.alertController.create({
      header: 'Resumen de Compra',
      message: `
        <p><strong>Evento:</strong> ${this.eventName}</p>
        <p><strong>Entradas:</strong> ${this.quantity}</p>
        <p><strong>Precio por Entrada:</strong> ${this.eventPrice} CLP</p>
        <p><strong>Descuento:</strong> ${this.discount}%</p>
        <p><strong>Total a Pagar:</strong> ${this.finalPrice} CLP</p>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
