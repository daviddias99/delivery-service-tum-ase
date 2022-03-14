from comms.CommunicationManagerCookie import CommunicationManagerCookie
from config.ConfigurationManager import ConfigurationManager
import time 

def signalOpen(id: str):
  return True

if __name__ == "__main__":
  configManager = ConfigurationManager('/home/pi/Desktop/ase-box/src/config/box_info.json')
  config = configManager.config
  communications = CommunicationManagerCookie(config['url'], config['endpoints']['open'], config['endpoints']['close'], config['endpoints']['xsrf'], config['cookie_field'], config['credentials']['api_key_cookie'])

  while True:
    id = input('Insert RFID:')
    isValid = communications.open(id, config['box']['id'])
    print(f'Read id: {id}')
    print(f'The token is {"valid" if isValid else "not valid"}')
    time.sleep(5)
    communications.close(id, config['box']['id'])

