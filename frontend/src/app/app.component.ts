import { Component } from '@angular/core';
import { BaseService } from "./base.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  savedSuccessfully: boolean = false;

  constructor(private base: BaseService) {}

  ngOnInit() {
    this.base.saving
      .subscribe((event: any) => {
        if (event === "saved") {
          this.savedSuccessfully = true;
          setTimeout(() => {
            this.savedSuccessfully = false;
          }, 2000);
        }
      });
  }

  save() {
    this.base.getSettings();
  }

  cancel() {
    this.base.cancel();
  }
}
