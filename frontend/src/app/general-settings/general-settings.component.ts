import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseService } from "../base.service";

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {
  @Input() autoIP: boolean = true;
  @Input() autoDNS: boolean = true;
  @Input() ipAddress: string = "";
  @Input() subnetMask: string = "";
  @Input() defaultGateway: string = "";
  @Input() preferredDNSServer: string = "";
  @Input() alternativeDNSServer: string = "";
  @Output() transferSettings: EventEmitter<any> = new EventEmitter();

  emptyIP: boolean = false;
  emptySubnetMask: boolean = false;
  emptyPreferredDNSServer: boolean = false;

  constructor(private base: BaseService) { }

  ngOnInit() {
    this.base.saving
      .subscribe((event: string) => {
        if (event === "saving") {
          let invalid = false;
          if (!this.autoIP && !this.ipAddress) {
            this.emptyIP = true;
            invalid = true;
          }
          if (!this.autoIP && !this.subnetMask) {
            this.emptySubnetMask = true;
            invalid = true;
          }
          if (!this.autoDNS && !this.preferredDNSServer) {
            this.emptyPreferredDNSServer = true;
            invalid = true;
          }
          if (invalid) {
            return false;
          }
          let settings = {
            autoIP: this.autoIP,
            ipAddress: this.ipAddress,
            subnetMask: this.subnetMask,
            defaultGateway: this.defaultGateway,
            autoDNS: this.autoDNS,
            preferredDNSServer: this.preferredDNSServer,
            alternativeDNSServer: this.alternativeDNSServer
          };

          this.transferSettings.emit(settings);
        } else if (event === "cancel") {
          this.clearForm();
        }
      });
  }

  toggleIP(state: string) {
    if (state === "auto") {
      this.autoIP = true;
      this.ipAddress = "";
      this.subnetMask = "";
      this.defaultGateway = "";
      this.emptyIP = false;
      this.emptySubnetMask = false;
    } else if (state === "manually") {
      this.autoIP = false;
    } else {
      return false;
    }
  }

  toggleDNS(state: string) {
    if (state === "auto") {
      this.autoDNS = true;
      this.preferredDNSServer = "";
      this.alternativeDNSServer = "";
      this.emptyPreferredDNSServer = false;
    } else if (state === "manually") {
      this.autoDNS = false;
    } else {
      return false;
    }
  }

  onIpInput() {
    this.emptyIP = false;
  }

  onSubnetMaskInput() {
    this.emptySubnetMask = false;
  }

  onPreferredDNSServerInput() {
    this.emptyPreferredDNSServer = false;
  }

  clearForm() {
    this.autoIP = true;
    this.ipAddress = "";
    this.subnetMask = "";
    this.defaultGateway = "";
    this.autoDNS = true;
    this.preferredDNSServer = "";
    this.alternativeDNSServer = "";
  }
}
