import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

  private productService = inject(ProductoService)

  categorias: any = [
    { name: 'Ropa Dama', code: 'rd' },
    { name: 'Ropa Caballero', code: 'rc' },
    { name: 'Herramientas', code: 'hr' },
    { name: 'Tecnologia', code: 'tec' },
    { name: 'Hogar', code: 'hgr' },
  ]

  cities: any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  products: any[] = [
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },
    { id: 1, nombre: "Teclado", precio: 3940.96, categoria_id: 1, stock: 12 },

  ];
  cols: any[] = [];

  constructor() {
    this.productService.funListar2().subscribe(
      (res: any) => {
        this.products = res.data
      }
    )
  }

  openNew() {

  }

  editProduct(prod: any) {

  }

  deleteProduct(prod: any) {

  }

}
