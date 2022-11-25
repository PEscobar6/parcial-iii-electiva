import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/products.service';
import { Products } from '../../../interfaces/products.interface';
import { BrandsService } from '../../../services/brands.service';
import { Brands } from 'src/app/interfaces/brands.interface';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';
  brands: Brands[] = [];

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private _brandService: BrandsService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      valorUnitario: [null, Validators.required],
      fechaExpedicion: [null, Validators.required],
      fechaVencimiento: [null, Validators.required],
      marcaId: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
    this.getBrands();
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getBrands() {
    // Faltó validación
    this._brandService.getBrands().subscribe((brands: Brands[]) => {
      this.brands = brands;
      console.log(brands);
      
    });
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Products) => {
      this.loading = false;
      this.form.setValue({
        codigo: data.codigo,
        nombre: data.nombre,
        valorUnitario: data.valorUnitario,
        fechaExpedicion: data.fechaExpedicion,
        fechaVencimiento: data.fechaVencimiento,
        marcaId: data.marcaId
      })
    })
  }

  addProduct() {
    const {codigo, nombre, valorUnitario, fechaExpedicion, fechaVencimiento, marcaId} = this.form.value;
    const product: Products = {
      codigo,
      nombre,
      valorUnitario,
      fechaExpedicion,
      fechaVencimiento,
      marcaId,
      id: 0
    }
    console.log("Producto", product);
    
    this.loading = true;

    if (this.id !== 0) {
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${nombre} fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/products']);
      })

    } else {
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${nombre} ha sido agregado.`, 'Producto registrado');
        this.loading = false;
        this.router.navigate(['/products']);
      })
    }
  }
}
