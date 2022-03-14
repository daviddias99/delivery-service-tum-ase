import RPi.GPIO as GPIO

class LightSensorController():

  def __init__(self, gpio_pin) -> None:
    self.gpio_pin = gpio_pin
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(self.gpio_pin, GPIO.IN)

  def active(self) -> bool:
    return GPIO.input(self.gpio_pin) == 1