import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrls: ['./wifi-settings.component.css']
})
export class WifiSettingsComponent implements OnInit {
  wifiEnabled: boolean = false;
  wifiSecurity: boolean = false;
  showWifiVariants: boolean = false;
  wifiNet: string = "";
  wifiSecurityKey: string = "";
  wifiVariants: string[] = [];
  settings: any = null;

  autoIP: boolean = true;
  ipAddress: string = "";
  subnetMask: string = "";
  defaultGateway: string = "";
  autoDNS: boolean = true;
  preferredDNSServer: string = "";
  alternativeDNSServer: string = "";

  emptyWifiNet: boolean = false;
  emptyWifiSecurityKey: boolean = false;

  @ViewChild('generalSettings') generalSettings: any;
  
  constructor(private base: BaseService) { }

  ngOnInit() {
    this.getWifies();
    this.getLastSettings();
    this.base.saving
      .subscribe((event: string) => {
         if (event === "cancel") {
          this.wifiEnabled = false;
          this.wifiSecurity = false;
          this.showWifiVariants = false;
          this.wifiNet = "";
          this.wifiVariants = [];
          this.generalSettings.clearForm();
        }
      });
  }
  
  getWifies() {
    this.base.getWifies()
      .subscribe((results: any) => {
        let favorites = results.filter((result: any) => result.favorite === true);
        let unFavorites = results.filter((result: any) => result.favorite === false);
        favorites.sort((a: any, b: any) => {
          return b.strength - a.strength;
        });
        unFavorites.sort((a: any, b: any) => {
          return b.strength - a.strength;
        });

        this.wifiVariants = [...favorites, ...unFavorites];
      });
  }

  getLastSettings() {
    this.base.getLastSettings()
      .subscribe((result: any) => {
        if (result) {
          if (result.error) {
            return;
          }
          this.wifiEnabled = result.wifi.wifiEnabled;
          this.wifiNet = result.wifi.wifiNet;
          this.wifiSecurity = result.wifi.wifiSecurity;
          this.wifiSecurityKey = result.wifi.wifiSecurityKey;
          this.autoIP = result.wifi.autoIP;
          this.ipAddress = result.wifi.ipAddress;
          this.subnetMask = result.wifi.subnetMask;
          this.defaultGateway = result.wifi.defaultGateway;
          this.autoDNS = result.wifi.autoDNS;
          this.preferredDNSServer = result.wifi.preferredDNSServer;
          this.alternativeDNSServer = result.wifi.alternativeDNSServer;
        }
      });
  }

  toggleWifi() {
    this.wifiEnabled = !this.wifiEnabled;
    if (!this.wifiEnabled) {
      this.wifiNet = "";
      this.wifiSecurity = false;
      this.wifiSecurityKey = "";
      this.showWifiVariants = false;
      this.generalSettings.clearForm();
    }
  }

  toggleWifiSecurity() {
    this.wifiSecurity = !this.wifiSecurity;
    if (!this.wifiSecurity) {
      this.wifiSecurityKey = "";
    }
  }

  toggleWifiVariants() {
    this.showWifiVariants = !this.showWifiVariants;
  }

  setWifiNet(net: any) {
    this.wifiNet = net.name;
    this.emptyWifiNet = false;
  }

  getSettings(generalSettings: any) {
    this.settings = null;
    this.settings = generalSettings;
    let invalid = false;
    if (this.wifiEnabled && !this.wifiNet) {
      this.emptyWifiNet = true;
      invalid = true;
    }
    if (this.wifiSecurity && !this.wifiSecurityKey) {
      this.emptyWifiSecurityKey = true;
      invalid = true;
    }
    if (invalid) {
      return false;
    }
    if (!this.settings) {
      return false;
    }
    let settings = {
      wifiEnabled: this.wifiEnabled,
      wifiNet: this.wifiNet,
      wifiSecurity: this.wifiSecurity,
      wifiSecurityKey: this.wifiSecurityKey,
      autoIP: this.settings.autoIP,
      ipAddress: this.settings.ipAddress,
      subnetMask: this.settings.subnetMask,
      defaultGateway: this.settings.defaultGateway,
      autoDNS: this.settings.autoDNS,
      preferredDNSServer: this.settings.preferredDNSServer,
      alternativeDNSServer: this.settings.alternativeDNSServer
    };
    this.base.transferSettings(settings);
  }

  onWifiSecurityKeyInput() {
    this.emptyWifiSecurityKey = false;
  }
}
