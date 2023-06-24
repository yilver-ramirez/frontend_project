import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {

  ListProducts: Product[] = [
    {id: 1,name: 'coca cola', description: 'bebida gaseosa', price: 2500, stock: 25},
    {id: 2, name: 'Corona', description: 'cerveza', price: 3500, stock: 5},
    {id: 3, name: 'Hit', description: 'Jugo hit', price: 5500, stock: 15}
  ]

  constructor(){}

  ngOnInit(): void {

  }
}
