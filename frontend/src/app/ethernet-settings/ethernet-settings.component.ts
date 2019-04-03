import { Component, OnInit } from '@angular/core';
import { BaseService } from "../base.service";

@Component({
  selector: 'app-ethernet-settings',
  templateUrl: './ethernet-settings.component.html',
  styleUrls: ['./ethernet-settings.component.css']
})
export class EthernetSettingsComponent implements OnInit {
  autoIP: boolean = true;
  ipAddress: string = "";
  subnetMask: string = "";
  defaultGateway: string = "";
  autoDNS: boolean = true;
  preferredDNSServer: string = "";
  alternativeDNSServer: string = "";

  constructor(private base: BaseService) { }

  ngOnInit() {
    this.getLastSettings();
  }

  getLastSettings() {
    this.base.getLastSettings()
      .subscribe((result: any) => {
        if (result) {
          this.autoIP = result.ethernet.autoIP;
          this.ipAddress = result.ethernet.ipAddress;
          this.subnetMask = result.ethernet.subnetMask;
          this.defaultGateway = result.ethernet.defaultGateway;
          this.autoDNS = result.ethernet.autoDNS;
          this.preferredDNSServer = result.ethernet.preferredDNSServer;
          this.alternativeDNSServer = result.ethernet.alternativeDNSServer;
        }
      });
  }

  getSettings(event: any) {
    if (event) {
      this.base.transferSettings(event);
    }
  }
}
