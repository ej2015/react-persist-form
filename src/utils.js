export const getValueFromEvent = e => {
  const { target } = e

  if (target) {
    const value = (target.type === 'checkbox') ? target.checked : target.value
    return { [target.name]: value }
  }
}
