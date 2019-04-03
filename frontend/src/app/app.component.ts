import { Component } from '@angular/core';
import { BaseService } from "./base.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private base: BaseService) {}

  save() {
    this.base.getSettings();
  }

  cancel() {
    this.base.cancel();
  }
}
