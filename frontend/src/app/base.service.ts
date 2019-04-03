import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url: string = "http://localhost:3000";
  saving: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getWifies() {
    return this.http.get(`${this.url}/wifi-nets`);
  }

  getSettings() {
    this.saving.emit('saving');
  }

  saveSettings(settings: any) {
    console.log(settings);
  }

  cancel() {
    this.saving.emit('cancel');
  }
}
