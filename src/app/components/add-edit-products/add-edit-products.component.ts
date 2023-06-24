import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder, private _productService: ProductService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar '
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    });
  }


  addProducto() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }
    this.loading = true;

    if (this.id != 0) {
      // Es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = true;
        this.toastr.info(`El producto ${product.name} se actualizó correctamente`, 'Producto Actualizado');
        this.router.navigate(['/']);
      })
    } else {
      // Es agregar
      this._productService.saveProduct(product).subscribe(() => {
        this.loading = true;
        this.toastr.success(`Se Agregó correctamente el producto ${product.name}`, 'Producto Agregado');
        this.router.navigate(['/']);
      })
    }
  }
}
