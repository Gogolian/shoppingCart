import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatastorageService } from 'src/app/services/datastorage.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataService: DatastorageService) { }

  ngOnInit(): void {
  }

  saveData(){
    this.dataService.storeRecipes()
  }

  fetchData(){
    this.dataService.fetchRecipes()
  }

}
