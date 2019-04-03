const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    ethernet: {
        autoIP: Boolean,
        ipAddress: String,
        subnetMask: String,
        defaultGateway: String,
        autoDNS: Boolean,
        preferredDNSServer: String,
        alternativeDNSServer: String
    },
    wifi: {
        wifiEnabled: Boolean,
        wifiNet: String,
        wifiSecurity: Boolean,
        wifiSecurityKey: String,
        autoIP: Boolean,
        ipAddress: String,
        subnetMask: String,
        defaultGateway: String,
        autoDNS: Boolean,
        preferredDNSServer: String,
        alternativeDNSServer: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Settings", SettingsSchema);