import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  // Método para procesar la compra de entradas
  purchaseTickets(eventName: string, quantity: number, finalPrice: number, discount: number) {
    // Lógica para manejar la compra de entradas
    const totalPrice = finalPrice - discount;
    console.log(`Compraste ${quantity} entradas para el evento ${eventName}. Precio total: $${totalPrice}`);
    
    // Aquí podrías agregar lógica adicional como envío de datos a un servidor, validaciones, etc.
    return {
      eventName: eventName,
      quantity: quantity,
      finalPrice: totalPrice
    };
  }
}
