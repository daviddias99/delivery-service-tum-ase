from enum import Enum
import time

class State(Enum):
  UNLOCKED = 0
  OPEN = 1
  CLOSED = 2

class BoxStateMachine:

  def __init__(self) -> None:
    self.state = State.CLOSED

  def open(self):
    if self.isUnlocked():
      self.state = State.OPEN

  def close(self):
    if self.isOpen():
      self.state = State.CLOSED

  def unlock(self, id):
    self.lastRfid = id
    if self.isClosed():
      self.state = State.UNLOCKED

  def isOpen(self):
    return self.state == State.OPEN

  def isUnlocked(self):
    return self.state == State.UNLOCKED

  def isClosed(self):
    return self.state == State.CLOSED
  
  def getLastRfid(self):
    return self.lastRfid

  def __str__(self):
    return self.state.name

def handleClosed(config, led, state, rfidController, communications):
  rfid = rfidController.read()
  isValid = communications.open(rfid, config['box']['id'])
  print(f'Read id: {rfid}')
  print(f'The token is {"valid" if isValid else "not valid"}')
  if(isValid):
    led.greenOn()
    state.unlock(rfid)
  else:
    led.redOn()
    time.sleep(5)
    led.off()

def handleUnlocked(config, led, state, lightSensor):
  if lightSensor.active():
    state.open()
    time.sleep(config['box_close_waiting_period_sec'])
    if state.isOpen():
      led.redOn()
  else:
    time.sleep(config['read_cycle_period_sec'])

def handleOpen(config, led, state, lightSensor, communications):
  if not lightSensor.active():
    led.off()
    communications.close(state.getLastRfid(), config['box']['id'])
    state.close()
  else:
    time.sleep(config['read_cycle_period_sec'])