# Tado node for Node-RED

This is a node for Node-RED to grab data from your Tado Smart Thermostat. You'll need your Tado username and password.

## Installation

In your Node-RED directory:

```
npm install node-red-contrib-tado
```

## Usage

This package adds 1 input node and 1 configuration node to Node-RED.

The configuration node defines the Tado home and comprises the following options:

  * **Username**: The username of your account.
  * **Password**: The password of your account.

The input node comprises the following options:

  * **Home**: The Tado home, defined above.
  * **Path**: The path to get data from the Tado API.
  * **Interval**: The interval, in seconds, between calls to the Tado API.

## License

MIT
