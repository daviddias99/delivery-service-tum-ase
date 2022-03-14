import RPi.GPIO as GPIO

class LedController:
  
  def __init__(self, gpio_pin: int, dummy: bool = False) -> None:
    self.gpio_pin = gpio_pin
    self.isOn = False
    self.dummy = dummy
    
    if not dummy:
      GPIO.setmode(GPIO.BCM)
      GPIO.setwarnings(False)
      GPIO.setup(gpio_pin, GPIO.OUT, initial=GPIO.LOW)
    pass

  def on(self) -> None:
    if not self.dummy:
      GPIO.output(self.gpio_pin, GPIO.HIGH)
    self.isOn = True

  def off(self) -> None:
    if not self.dummy:
      GPIO.output(self.gpio_pin, GPIO.LOW)
    self.isOn = False

  def toggle(self) -> bool:
    if self.isOn:
      self.off()
    else:
      self.on()

    return self.isOn
  