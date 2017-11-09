module.exports = function(RED) {
    "use strict";
    const icingaapi = require("icinga2-api");

    function Icinga2Node(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var credentials = RED.nodes.getNode(config.creds);
        if(!credentials) {
            node.error("No API credentials configured.", config);
        }

        node.on('input', function (msg) {
            // TODO: Annoying that, about having to parse the bloody port...
            var api = new icingaapi(credentials.api_url, "5665", credentials.api_user, credentials.api_pass);

            // By default, handle errors and pass results on in payload
            var defaultHandler = function(err, res) {
              if(err) {
                node.error(err, msg);
              }
              else {
                msg.payload = res;
                node.send(msg);
              }
            };

            // For now, user is responsible for sending the payload as
            // the arguments to the method.
            var args = msg.payload;
            if(config.method == "getStatus") {
              api.getStatus(defaultHandler);
            }
            else if(config.method == "getHosts") {
              api.getHosts(args, defaultHandler);
            }
            else if(config.method == "getServices") {
              api.getServices(args, defaultHandler);
            }
            else {
              node.error("Method '" + config.method + "' not (yet) implemented.");
            };

            return msg;
        });
    }
    RED.nodes.registerType("icinga2", Icinga2Node);
};
