# React Persist 
A form wrapper that handles the form input within the wrapper's own state. It is packed with some extra goodies: validation and persistence.

```
npm install react-persist-form --save
```

# Approach
It is often not necessary or desirable to handle form inputs with the redux store. The form inputs are local to the form and are no concerns of the store. The extra boilerplate work to handle them slows down the development and crams up the codebase.

This package extracts the form handling from the biz logic. The form wrapper will take care of the inputs locally. When the form is submitted, the data is passed back to the app.

Integraions:

validation: it comes with simple-react-validator. You can pass in a different validator object (e.g. your custom simple-react-validator), which will be passed back to your form for the actual implementation.
persistence: it uses react-persist-plus to allow persistence. Defaults to use sessionStorage.


# Basic Usage
Create an HOC with the wrapper provided by this package. To use the HOC, you just need to provide your own `error` and `handleSubmit`. On submission, the data is passed back to your `handleSubmit` with the key
An example of using the package with redux:

```
import formWrapperCreater from 'react-simple-form'

//define your form with this signature
//pass handleChange to your inputs. They will be handled automatically
//data is entirely defined by you. You can use it to populate the inputs
//inputs need unique name, which is used as the key for the data, which is persisted in store and returned on submission
const Form = ({ error, data, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      label='Email'
      name='email'
      onChange={handleChange}
    />
    {error && <div> error </div>}
    <button type='submit'>Submit</button>
  </form>
)

//displayName is used for persistence
Form.displayName = 'mySpecialForm'

//create HOC
//you can change validator or store using named arguments `validator` or `store`
//{ store: null } disables persistence
const FormWrapper = formWrapperCreater({ Form })

//use HOC
//you need to provide your own `error` and `handleSubmit` here
class WrappedForm extends Component {
  render () {
    const { error, handleSubmit } = this.props
    return (
      <FormWrapper
        data = {{error }}
        onSubmit={handleSubmit}
      />
    )
  }
}

//connect to redux store
//on submission, data contains all the fileds, e.g. { email: 'a@b.com'}}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: data => dispatch(setUser(data))
  }
}

export default connect({}, mapDispatchToProps)(WrappedForm)

```


