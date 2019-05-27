import formWrapperCreater from './src/formWrapper'

const curried = wrapper => (
  validator => (
    store => (
      Form => (
        wrapper({Form, store, validator})
      )
    )
  )
)

export const curriedFormWrapperCreater = curried(formWrapperCreater)

export default formWrapperCreater
