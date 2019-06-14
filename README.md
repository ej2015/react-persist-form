# React Persist Form 
A form wrapper to take care of the boiler plates. 

* handles inputs for you
* no dependency on Redux
* buil-in validation with (simple-react-validator)[https://github.com/dockwa/simple-react-validator]
* biilt-in persistence with (react-persist-plus)[https://github.com/ej2015/react-persist]

Installation
```
npm install react-persist-form --save
```

# Approach
It is often not necessary or desirable to handle form inputs with the redux store. The form inputs are local to the form and are no concerns of the store. The extra boilerplate work to handle them slows down the development and crams up the codebase.

This package separates the form handling from the biz logic. The form wrapper will take care of the inputs locally. When the form is submitted, the data is passed back to the app.

Integraions:

* validation: it comes with simple-react-validator. You can pass in a different validator object (e.g. your custom simple-react-validator), which will be passed back to your form for the actual implementation.
* persistence: it uses react-persist-plus to allow persistence. Defaults to use sessionStorage.


# Basic Usage
Create an HOC with the wrapper provided by this package. To use the HOC, you just need to provide your own `error` and `handleSubmit`. On submission, the data is passed back to your `handleSubmit` with the key
An example of using the package with redux:

Step 1. define your form
```
import formWrapperCreater from 'react-simple-form'

//data contains the fields. Input name needs to be the same as the key in data (e.g. 'name' in the example below)
const Form = ({ data, handleChange, handleSubmit, validator }) => (
  <form onSubmit={handleSubmit}>
    <input
      label='Email'
      name='email'
      value={data.email}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)
```

Step 2. create HOC
```
//pass in the form name for persistence

const FormWrapper = formWrapperCreater('mySpecialForm')
```
Step 3. use HOC
Only `Form`, `initialFields` and `handleSubmit` are required. You can optionally set `validator` or `store` 
```
//{ store: null } disables persistence
class WrappedForm extends Component {
  render () {
    const { error, handleSubmit } = this.props
    return (
      <FormWrapper
        Form={Form}
        initialFields={initialFields}
        handleSubmit={handleSubmit}
        validator={validator}
      />
    )
  }
}
```

Step 4. connect to redux store (or provide `handleSubmit` in any other way)
```
//on submission, data is passed to your handleSubmit method
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: data => dispatch(setUser(data))
  }
}

export default connect({}, mapDispatchToProps)(WrappedForm)
```
# Example
See this [example with redux](https://github.com/ej2015/react-persist-form-example)
