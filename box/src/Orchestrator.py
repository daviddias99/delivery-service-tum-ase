import os
import RPi.GPIO as GPIO
from state.BoxStateMachine import BoxStateMachine, handleClosed, handleOpen, handleUnlocked
from comms.CommunicationManagerCookie import CommunicationManagerCookie
from config.ConfigurationManager import ConfigurationManager
from devices.LedController import LedController
from devices.MutuallyExclusiveLedController import MutuallyExclusiveLedController
from devices.RfidController import RfidController
from devices.LightSensorController import LightSensorController

if __name__ == "__main__":
  
  # Config
  boxConfigPath = os.environ.get('BOX_CONFIG')
  boxInfoPath = os.environ.get('BOX_INFO')

  if boxInfoPath == None :
    print('No box info, shutting down.')
    exit(-1)

  configManager = ConfigurationManager(boxInfoPath, boxConfigPath)
  config = configManager.config


  # Devices
  redLedController = LedController(config['red_led_pin'])
  greenLedController = LedController(config['green_led_pin'])
  led = MutuallyExclusiveLedController(redLedController, greenLedController)
  rfidController = RfidController()
  lightSensor = LightSensorController(config['light_sensor_pin'])

  # State
  state = BoxStateMachine()
  
  # Communications
  communications = CommunicationManagerCookie(config['url'], config['endpoints']['open'], config['endpoints']['close'], config['endpoints']['xsrf'], config['cookie_field'], config['credentials']['api_key_cookie'])


  # State machine loop
  try:
    while True:
      print(f'Current state: {state}')
      if state.isClosed():
        handleClosed(config, led, state, rfidController, communications)
      elif state.isUnlocked():
        handleUnlocked(config, led, state, lightSensor)
      elif state.isOpen():
        handleOpen(config, led, state, lightSensor, communications)
  except KeyboardInterrupt:
    # GPIO must be cleaned up once you exit the script
    # Otherwise , other scripts may not work as you expect
    led.off()
    GPIO.cleanup()
    raise      