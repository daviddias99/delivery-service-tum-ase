import requests
import json

class CommunicationManagerCookie():
  def __init__(self, url: str, openEndpoint: str, closeEndpoint: str, xsrfEndpoint: str, cookieName:str, cookie: str) -> None:
    self.url = url
    self.openEndpoint = openEndpoint
    self.closeEndpoint = closeEndpoint
    self.xsrfEndpoint = xsrfEndpoint
    self.cookie = cookie
    self.cookieName = cookieName
    self.session = requests.Session()

    self.params = {
      'mode': 'cors',
      'cache': 'no-cache',
      'redirect': 'follow',
      'referrerPolicy': 'origin-when-cross-origin'
    }
    
  def getBaseHeaders(self, xsrf_token):
    return {
      'Content-Type' : 'application/json',
      'X-XSRF-TOKEN': xsrf_token,
    }

  def getXSRFToken(self):
    response = self.httpRequest('GET',f'{self.url}/{self.xsrfEndpoint}', None)

    if response.status_code != 200:
      raise ValueError('Could not get token')
    else:
      cookies = response.cookies.get_dict()
      return None if 'XSRF-TOKEN' not in cookies else response.cookies.get_dict()['XSRF-TOKEN']

  def httpRequest(self, method, url, params, headers= '', content= '', auth= '') :
    if method == 'GET':
      res = self.session.get(url, params=params, timeout=5)
      return res
    elif method == 'POST':
      if auth == '' :

        res = self.session.post(url, headers=headers, json=content, cookies={self.cookieName: self.cookie}, timeout=15)

        return res
      else :
        res = self.session.post(url, params=params, headers=headers, auth=auth)
        return res
    else :
        raise ValueError('Method Not Found')

  def open(self, rfId: str, boxId: str) -> bool:
    self.xsrf_token = self.getXSRFToken() or self.xsrf_token

    try:
      result = self.httpRequest(
        'POST',
        f'{self.url}/{self.openEndpoint}',
        None,
        self.getBaseHeaders(self.xsrf_token),
        {'rfId': rfId, 'boxId': boxId}
      )
    except Exception:
      return False
  
    if result.status_code == 200:
      return True
    else:
      return False

  def close(self, rfId: str, boxId: str) -> bool:
    self.xsrf_token = self.getXSRFToken() or self.xsrf_token

    result = self.httpRequest(
      'POST',
      f'{self.url}/{self.closeEndpoint}',
      None,
      self.getBaseHeaders(self.xsrf_token),
      {'rfId': rfId, 'boxId': boxId}
    )

    if result.status_code == 200:
      return True
    else:
      return False
