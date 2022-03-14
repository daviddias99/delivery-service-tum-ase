from mfrc522 import SimpleMFRC522

class RfidController:
  def __init__(self) -> None:
    self.reader = SimpleMFRC522()


  def read(self) -> str or None:
    id, _ = self.reader.read()
    return id
