import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url: string = "http://localhost:3000";
  saving: EventEmitter<any> = new EventEmitter();
  ethernetSettings: any = null;
  wifiSettings: any = null;

  constructor(private http: HttpClient) { }

  getWifies() {
    return this.http.get(`${this.url}/wifi-nets`);
  }

  getSettings() {
    this.ethernetSettings = null;
    this.wifiSettings = null;
    this.saving.emit('saving');
    if (this.ethernetSettings && this.wifiSettings) {
      let settings = {
        ethernet: {
          ...this.ethernetSettings
        },
        wifi: {
          ...this.wifiSettings
        }
      }; 
      
      this.saveSettings(settings);
    }
  }

  transferSettings(settings: any) {
    if (settings.wifiEnabled !== undefined) {
      this.wifiSettings = {...settings};
    } else {
      this.ethernetSettings = {...settings};
    }
  }

  saveSettings(settings: any) {
    this.http.post(`${this.url}/save-settings`, { settings })
      .subscribe((result: any) => {
        if (result) {
          if (result.error == "Not connected to database") {
            this.saving.emit("Not connected to database");
            return;
          }
          this.saving.emit("saved");
        }
      });
  }

  getLastSettings() {
    return this.http.get(`${this.url}/last-settings`);
  }

  cancel() {
    this.saving.emit('cancel');
  }
}
