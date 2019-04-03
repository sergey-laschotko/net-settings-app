import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EthernetSettingsComponent } from './ethernet-settings/ethernet-settings.component';
import { WifiSettingsComponent } from './wifi-settings/wifi-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    EthernetSettingsComponent,
    WifiSettingsComponent,
    GeneralSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
