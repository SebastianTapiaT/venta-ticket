import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  purchaseTickets(eventName: string, quantity: number, finalPrice: number, discount: number) {
    // Lógica para procesar la compra (aquí solo es un log, pero puedes integrarlo con un backend)
    console.log(`Evento: ${eventName}, Cantidad de entradas: ${quantity}, Precio final: ${finalPrice} CLP, Descuento aplicado: ${discount}%`);
  }
}
