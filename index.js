import formWrapperCreater from './src/formWrapper'

const curried = wrapper => (
  name => (
    Form => (
        wrapper({Form, name})
      )
    )
  )
)

export const curriedFormWrapperCreater = curried(formWrapperCreater)

export default formWrapperCreater
