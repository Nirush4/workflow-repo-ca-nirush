// src/utils.js

export function isActivePath(currentPath, href) {
  if (currentPath === href) return true
  if (href === '/' && (currentPath === '/' || currentPath === '/index.html'))
    return true
  if (currentPath.includes(href)) return true
  return false
}

export function getUserName() {
  const userData = localStorage.getItem('user')
  if (!userData) return null

  try {
    const user = JSON.parse(userData)
    return user.name || null
  } catch {
    return null
  }
}
