import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  allProds: any;
  selectedLang: String;
  catId: String;
  totalPages = 0;
  totalProducts = 0;
  cats: any;
  currentPage = 1;
  productsToShow = 9;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private transltion: TranslateService
  ) {
    route.params.subscribe((params) => {
      this.catId = params.id;
      this.getProds();
    });
  }

  ngOnInit(): void {
    console.log('iukjk.khkjgtf');

    this.selectedLang = this.transltion.currentLang;
    this.transltion.onLangChange.subscribe((lang) => {
      this.selectedLang = lang.lang;
      if (lang.lang === 'en') {
        document.getElementsByTagName('body')[0].style.direction = 'ltr';
      } else {
        document.getElementsByTagName('body')[0].style.direction = 'rtl';
      }
    });
    this.products.getAllCats().then((categories) => {
      this.cats = categories;
    });
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
  getProds(){
    this.products.getProdsByCat(this.catId,{ page: this.currentPage, limit: this.productsToShow }).subscribe((prods:any) => {
      this.allProds = prods.products;
      this.totalPages = Math.ceil(prods.totalProducts / this.productsToShow);

    });
  }
  nextPage() {
    this.products
      .getProdsByCat(this.catId, {
        page: this.currentPage + 1,
        limit: this.productsToShow,
      })
      .toPromise()
      .then((prods: any) => {
        this.allProds = prods.products;
        this.currentPage += 1;
        scrollTo(0,0)
      });
  }
  previousPage() {
    this.products
      .getProdsByCat(this.catId, {
        page: this.currentPage - 1,
        limit: this.productsToShow,
      })
      .toPromise()
      .then((prods: any) => {
        this.allProds = prods.products;
        this.currentPage -= 1;
        scrollTo(0,0)
      });
  }
}
