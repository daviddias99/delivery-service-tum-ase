class MutuallyExclusiveLedController:
  def __init__(self, redLed, greenLed) -> None:
    self.redLed = redLed
    self.greenLed = greenLed

  def redOn(self) -> None:
    self.greenLed.off()
    self.redLed.on()

  def greenOn(self) -> None:
    self.redLed.off()
    self.greenLed.on()

  def off(self) -> None:
    self.redLed.off()
    self.greenLed.off()

  def isOn(self) -> bool:
    return self.redLed.isOn or self.greenLed.isOn