import { getValueFromEvent } from './utils'

let event = {
  target: {
    name: 'email',
    value: 'a'
  }
}

describe('getValueFromEvent', () => {
  describe('input fields', () => {
    it('should return an object', () => {
      expect(getValueFromEvent(event)).toEqual({ email: 'a' })
    })
  })

  describe('checkbox', () => {
    it('should return an object', () => {
      event.type = 'checkbox'
      expect(getValueFromEvent(event)).toEqual({ email: 'a' })
    })
  })
})
