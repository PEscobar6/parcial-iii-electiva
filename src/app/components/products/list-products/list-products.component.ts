import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listProducts: Products[] = []
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;

    this._productService.getListProducts().subscribe((data: Products[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    })
  }
}
