import requests
import json

class CommunicationManager():
  def __init__(self, url: str, validateEndpoint: str, authEndpoint: str, csrfEndpoint: str, credentials: dict) -> None:
    self.url = url
    self.validateEndpoint = validateEndpoint
    self.authEndpoint = authEndpoint
    self.csrfEndpoint = csrfEndpoint
    self.session = requests.Session()
    self.params = {
      'mode': 'cors',
      'cache': 'no-cache',
      'credentials': 'include',
      'redirect': 'follow',
      'referrerPolicy': 'origin-when-cross-origin'
    }

    self.credentials = credentials
    self.csrf_token = self.getXSRFToken()
    

  def getXSRFToken(self):
    response = self.httpRequest(
      'GET',
      f'{self.url}/{self.csrfEndpoint}',
      self.params,
    )

    if response.status_code != 200:
      raise ValueError('Could not get token')
    else:
      return response.cookies.get_dict()['XSRF-TOKEN']

  def auth(self):
    xsrf_token = self.getXSRFToken()
    response = self.httpRequest(
      'POST',
      f'{self.url}/{self.authEndpoint}',
      self.params,
      self.getBaseHeaders(xsrf_token),
      '',
      self.credentials
    )

    if response.status_code != 200:
      raise ValueError('Could not get jwt')
    else:
      return str(response.content)[2:-1]

  def getBaseHeaders(self):
    return {
      'Content-Type' : 'application/json',
      'X-XSRF-TOKEN' : self.csrf_token
    }

  def httpRequest(self, method, url, params, headers= '', content= '', auth= '') :
    if method == 'GET':
      res = self.session.get(url, params=params)
      return res
    elif method == 'POST':
      if auth == '' :
        res = self.session.post(url, params=params, headers=headers, json=content)
      else :
        res = self.session.post(url, params=params, headers=headers, auth=auth)
        return res
    else :
        raise ValueError('Method Not Found')

  def validate(self, id: str) -> bool:
    result = self.httpRequest(
      'POST',
      f'{self.url}/{self.validateEndpoint}',
      self.params,
      self.getBaseHeaders(self.csrf_token),
      {'id': id}
    )

    if result.status_code != 200:
      return False
    else:
      return json.loads(result.json())['isValid']
