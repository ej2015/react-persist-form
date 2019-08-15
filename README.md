# React Persist Form 
A form wrapper to take care of the boilerplates. 

* handles inputs for you
* no dependency on Redux
* buil-in validation with [simple-react-validator](https://github.com/dockwa/simple-react-validator)
* biilt-in persistence with [react-persist-plus](https://github.com/ej2015/react-persist)

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
Step 2. create HOC
Step 3. use HOC
Step 4. connect to redux store (or provide `handleSubmit` in any other way)

On submission, data is passed to your handleSubmit method. Check the tests for details.


# Example
See this [example with redux](https://github.com/ej2015/react-persist-form-example)
