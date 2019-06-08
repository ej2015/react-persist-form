# React Persist Form 
A form wrapper that handles the form input within the wrapper's own state. It is packed with some extra goodies: validation and persistence.

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

```
import formWrapperCreater from 'react-simple-form'

//Step 1. define your form
//data is entirely defined by you. One use case is to populate the inputs
//inputs need unique name, which is used as the key for the data, which is persisted in store and returned on submission
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

//Step 2. create HOC
//pass in the form name for persistence
//optional: you can change validator or store by setting `validator` or `store`
//{ store: null } disables persistence
const FormWrapper = formWrapperCreater('mySpecialForm')

//Step 3. use HOC
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

//Step 4. connect to redux store (or provide handleSubmit in any other way)
//on submission, data contains all the fileds, e.g. { email: 'a@b.com'}}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: data => dispatch(setUser(data))
  }
}

export default connect({}, mapDispatchToProps)(WrappedForm)

```

The wrapper passes a few props for your form.

* data: all fields
* handleChange: provided by the wrapper, add this to your inputs
* handleSubmit: provided by you through the wrapper. it receives the values of all the inputs that are given `handleChange`.
* validator: an instance of SimpleReactValidator by default. You can pass in your own through the warpper

* Step 2: `Form`, `initialFields` and `handleSubmit` are required. 
* Step 3: Only `handleSubmit` is required and you need to define it and pass it to the form wrapper.
