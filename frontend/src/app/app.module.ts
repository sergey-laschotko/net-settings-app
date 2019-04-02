import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EthernetSettingsComponent } from './ethernet-settings/ethernet-settings.component';
import { WifiSettingsComponent } from './wifi-settings/wifi-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    EthernetSettingsComponent,
    WifiSettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
