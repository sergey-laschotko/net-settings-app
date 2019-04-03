import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  getSettings(event: any) {
    console.log(event);
  }
}
