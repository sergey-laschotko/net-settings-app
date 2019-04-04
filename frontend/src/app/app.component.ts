import { Component } from '@angular/core';
import { BaseService } from "./base.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gotMessage: boolean = false;
  message: string = "";

  constructor(private base: BaseService) {}

  ngOnInit() {
    this.base.saving
      .subscribe((event: any) => {
        if (event === "Not connected to database") {
          this.message = "Not connected to database";
          this.gotMessage = true;
          setTimeout(() => {
            this.gotMessage = false;
            this.message = "";
          }, 2000);
        }
        if (event === "saved") {
          this.message = "Saved Successfully";
          this.gotMessage = true;
          setTimeout(() => {
            this.gotMessage = false;
            this.message = "";
          }, 2000);
        }
      });

      this.base.getLastSettings()
        .subscribe((result: any) => {
          if (result) {
            if (result.error == "Not connected to database") {
              this.message = result.error;
              this.gotMessage = true;
              setTimeout(() => {
                this.gotMessage = false;
                this.message = "";
              }, 2000);
            }
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
