var Tado = require('node-tado').default;

module.exports = function(RED) {

    function TadoHome(n) {
        RED.nodes.createNode(this, n);

        this.username = n.username;
        this.password = n.password;
        this.client = new Tado();
    }
    RED.nodes.registerType("tado-home", TadoHome);

    function TadoNode(n) {
        RED.nodes.createNode(this, n);

        var node = this;
        node.home = RED.nodes.getNode(n.home);
        node.interval = n.interval;
        node.path = n.path;
        node.timer = {};
        
        function fetchData() {
            node.timer = setTimeout(fetchData, node.interval * 1000);

            var client = node.home.client;
            var first = client.token
              ? new Promise(function(resolve, reject) { resolve(true) } )
              : client.login(node.home.username, node.home.password);

            first
                .then(function(success) {
                    return client.api(node.path);
                })
                .then(function(result) {
                    var msg = {};
                    msg.payload = result;
                    node.send(msg);
                    node.status({});
                })
                .catch(function(err) {
                    node.error(JSON.stringify(err));
                    node.status({ fill: "red", shape: "dot", text: "error" });
                });
        }

        node.on("close", function(){
            if (node.timer) {
                clearTimeout(node.timer);
            }
        });

        fetchData();
    }
    RED.nodes.registerType("tado", TadoNode);

};
