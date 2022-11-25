import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brands } from '../../../interfaces/brands.interface';
import { BrandsService } from '../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-brands',
  templateUrl: './add-edit-brands.component.html',
  styleUrls: ['./add-edit-brands.component.css']
})
export class AddEditBrandsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  svc: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private __brandService: BrandsService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.svc = 'Editar ';
      this.getBrand(this.id);
    }
  }

  getBrand(id: number) {
    this.loading = true;
    this.__brandService.getBrand(id).subscribe((data: Brands) => {
      this.loading = false;
      this.form.setValue({
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion
      });
    });
  }

  addProduct() {
    this.loading = true;
    const {codigo, nombre, descripcion} = this.form.value;
    const brand: Brands = {
      codigo,
      nombre,
      descripcion,
      id: 0
    }

    if (this.id !== 0) {
      brand.id = this.id;
      this.__brandService.updateBrand(this.id, brand).subscribe(()=>{
        this.loading = false;
        this.toastr.info(`La marca ${nombre} ha sido actualizada.`, 'Marca actualizada');
        this.router.navigate(['/marcas']);
      });
    }else{
      this.__brandService.saveBrand(brand).subscribe(() => {
        this.loading = false;
        this.toastr.success(`La marca ${nombre} ha sido agregada.`, 'Marca agregada');
        this.router.navigate(['/marcas']);
      });
    }
  }
}
