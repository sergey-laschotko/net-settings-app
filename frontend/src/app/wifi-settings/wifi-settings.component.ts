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
    this.base.saving
      .subscribe((event: string) => {
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
        if (event === "saving") {
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

          console.log(settings);
        } else if (event === "cancel") {
          this.wifiEnabled = false;
          this.wifiSecurity = false;
          this.showWifiVariants = false;
          this.wifiNet = "";
          this.wifiVariants = [];
          this.autoIP = true;
          this.ipAddress = "";
          this.subnetMask = "";
          this.defaultGateway = "";
          this.autoDNS = true;
          this.preferredDNSServer = "";
          this.alternativeDNSServer = "";
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

  toggleWifi() {
    this.wifiEnabled = !this.wifiEnabled;
    if (!this.wifiEnabled) {
      this.wifiNet = "";
      this.wifiSecurity = false;
      this.wifiSecurityKey = "";
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

  getSettings(settings: any) {
    this.settings = settings;
  }

  onWifiSecurityKeyInput() {
    this.emptyWifiSecurityKey = false;
  }
}
