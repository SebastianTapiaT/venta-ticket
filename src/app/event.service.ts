import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events = [
    { name: 'Concierto de Rock', price: 15000 },
    { name: 'Película en Cine', price: 5000 },
    { name: 'Partido de Fútbol', price: 10000 },
    { name: 'Obra de Teatro', price: 8000 }
  ];

  private purchaseHistory: any[] = []; // Guardar el historial de compras

  constructor() { }

  // Obtener la lista de eventos
  getEvents() {
    return this.events;
  }

  // Simular la compra de entradas
  purchaseTickets(eventName: string, quantity: number, finalPrice: number, discount: number) {
    const purchase = {
      event: eventName,
      quantity: quantity,
      finalPrice: finalPrice,
      discount: discount
    };
    
    this.purchaseHistory.push(purchase);  // Guardar la compra en el historial
    console.log(`Compra realizada: ${eventName}, Cantidad: ${quantity}, Precio total: ${finalPrice}, Descuento aplicado: ${discount}%`);
  }

  // Obtener el historial de compras
  getPurchaseHistory() {
    return this.purchaseHistory;
  }
}
