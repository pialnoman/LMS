import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carbon-tracker';

  constructor(
    private storage: LocalstorageService
  ) { }

  ngOnInit() {
    console.log("apps running")
    this.storage.storeData();
  }
}
