export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  if (cname == 'atk') {
    localStorage.setItem('expireTime', expires)
  }
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}

export function deleteCookie() {
  document.cookie = 'atk' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'rtk' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
