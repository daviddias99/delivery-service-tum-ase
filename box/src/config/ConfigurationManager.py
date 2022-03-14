import json
from os import path

class ConfigurationManager:

  DEFAULT_CONFIG_PATH: str = path.join(path.dirname(__file__), 'default_config.json')

  def __init__(self, boxInfoPath: str, boxConfigPath: str = None) -> None:
    self.config = None
    self.readBoxConfig(boxConfigPath if boxConfigPath else self.DEFAULT_CONFIG_PATH)
    self.readBoxInfo(boxInfoPath)

  def readBoxConfig(self, path: str) -> None:

    with open(self.DEFAULT_CONFIG_PATH) as default_config_json_file:
      config: dict = json.load(default_config_json_file)
      self.config = config

    with open(path) as config_json_file:
      config: dict = json.load(config_json_file)
      self.config = {**self.config, **config}

  def readBoxInfo(self, path: str) -> None:
    with open(path) as config_json_file:
      config: dict = json.load(config_json_file)
      self.config['box'] = config