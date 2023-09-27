import { add } from '../src'

describe('add function', () => {
  it('should return the sum of two numbers', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(0, 0)).toBe(0)
    expect(add(-1, 1)).toBe(0)
  })
})
