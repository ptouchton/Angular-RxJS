import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  product;


  product$ = this.productService.selectedProducts$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) { }

}
