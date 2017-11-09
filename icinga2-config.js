module.exports = function(RED) {
    function Icinga2Config(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.api_url = n.api_url;
        this.api_user = n.api_user;
        this.api_pass = n.api_pass;
    }
    RED.nodes.registerType("icinga2-config", Icinga2Config);
};
