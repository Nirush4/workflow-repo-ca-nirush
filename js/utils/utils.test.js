import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isActivePath, getUserName } from './utils.js'

describe('isActivePath', () => {
  it('returns true when current path matches href exactly', () => {
    expect(isActivePath('/about', '/about')).toBe(true)
  })

  it('returns true for root path ("/") when path is "/" or "/index.html"', () => {
    expect(isActivePath('/', '/')).toBe(true)
    expect(isActivePath('/index.html', '/')).toBe(true)
  })

  it('returns true when current path includes the href', () => {
    expect(isActivePath('/products/item/123', '/products')).toBe(true)
  })

  it('returns false when paths do not match', () => {
    expect(isActivePath('/about', '/contact')).toBe(false)
  })
})

// getUserName Tests
describe('getUserName', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns the name from user object in storage', () => {
    const user = { name: 'John Doe' }
    localStorage.setItem('user', JSON.stringify(user))
    expect(getUserName()).toBe('John Doe')
  })

  it('returns null when no user exists in storage', () => {
    expect(getUserName()).toBeNull()
  })

  it('returns null when user data is malformed', () => {
    localStorage.setItem('user', '{bad json}')
    expect(getUserName()).toBeNull()
  })
})
