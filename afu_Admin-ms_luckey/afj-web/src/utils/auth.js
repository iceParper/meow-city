import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userIdKey = 'userId'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey,token);
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey);
}

export function getUserId() {
  // return Cookies.get(userIdKey);
  return localStorage.getItem(userIdKey);
}

export function setUserId(userId) {
  // return Cookies.set(userIdKey, userId)
  return localStorage.setItem(userIdKey,userId);
}

export function removeUserId() {
  // return Cookies.remove(userIdKey)
  return localStorage.removeItem(userIdKey);
}
