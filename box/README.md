# ASE Box

Code for the ASE Delivery box (Raspberry PI)

---

## Running the system

To run the box, first create `json` file containing the box information. The file should contain the following information:

```json
{
  "id": "61ff9eb4ad25a66b41db614f",
  "name": "Stiftsbigen",
  "address": {
    "addressLine1": "Schröfelhofstraße",
    "addressLine2": "18",
    "city": "München",
    "postalCode": "81375"
  }
}
```

The file's path is provided to the system using an environment variable `BOX_INFO`.

To customize the box, a configuration file should also be created. If no file is defined, the system will use the following default values:

```json
{
  "red_led_pin": 19,
  "green_led_pin": 26,
  "light_sensor_pin": 4,
  "read_cycle_period_sec": 2,
  "box_close_waiting_period_sec": 5,
  "url": "http://192.168.0.103:8088",
  "endpoints": {
    "open": "box/open",
    "close": "box/close",
    "xsrf": ""
  },
  "cookie_field": "jwt",
  "credentials": {
    "api_key_cookie": "REDACTED"
  }
}
```

For the system to use your configuration, define a `BOX_CONFIG` environment variable. 

Finally, to run the system execute the `python3 Orchestrator.py` command on the `src` directory.

## System structure

The `comms` directory contains code related with the communication with the backend server. It uses the url and endpoints defined in the configuration to execute open and close requests and fetching the XSRF token.

The `devices` directory contains controllers for the several hardware devices: led, light sensor and rfid sensor.

The `state` directory contains the logic for executing operations (implements a state machine). The box can either be open, unlocked or closed at any given point. The box starts off as closed.

The `Orchestrator.py` file is responsible for initalization and providing the main state machine loop.

The `OrchestratorDummy.py` file is a non-hardware version of the code used to test backend logic.