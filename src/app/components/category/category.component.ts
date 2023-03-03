import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/enums/categorie';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  selectedCategory!: Categorie;
  categories=Categorie;

}
