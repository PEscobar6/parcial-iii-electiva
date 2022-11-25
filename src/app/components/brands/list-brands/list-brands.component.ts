import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brands } from '../../../interfaces/brands.interface';
import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css']
})
export class ListBrandsComponent implements OnInit {
  listBrands: Brands[] = []
  loading: boolean = false;
  imageSrc = 'assets/No-data.svg';
  imageAlt = 'No data found';

  constructor(private __brandsService: BrandsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListsBrands();
  }

  getListsBrands() {
    this.loading = true;

    this.__brandsService.getBrands().subscribe((data: Brands[]) => {
      this.listBrands = data
      this.loading = false;
    });
  }

  deleteBrand(id: number) {
    this.loading = true;
    this.__brandsService.deleteBrand(id).subscribe(() => {
      this.getListsBrands();
      this.toastr.warning('La marca fue eliminada correctamente', 'Marca eliminada');
    });
  }

}
