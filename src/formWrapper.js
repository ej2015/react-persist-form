import React, { Component } from 'react'
import { Persist } from 'react-persist-plus'
import pickBy from 'lodash.pickby'
import SimpleReactValidator from 'simple-react-validator'
import { getValueFromEvent } from './utils'

const formWrapperCreater = ({ form }) => {
  const validator = new SimpleReactValidator()
  return ({ Form, validator = validator, store = window.sessionStorage }) => {
    class FormWrapper extends Component {
      constructor(props) {
        super(props)
        this.state = { _form: {}, error: null, ...props.data }
        this.handleSubmit = props.onSubmit
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.data.error !== this.props.data.error) {
          this.setState({ error: nextProps.data.error })
        }
      }

      dispatchAttributeChange = changes => {
        this.setState((state, props) => {
          let newForm = { ...state._form, ...changes }
          return { ...state, _form: newForm }
        })
      }

      handleChange = e => {
        let changes = getValueFromEvent(e)
        this.dispatchAttributeChange(changes)
      }

      handleValidationAndSubmit = event => {
        event.preventDefault()
        if (validator.allValid()) {
          this.handleSubmit(this.state._form)
        } else {
          validator.showMessages()
          this.forceUpdate()
        }
      }

      whitelist = data => {
        return pickBy(data, (v, k) => !['password', 'error'].includes(k))
      }

      render() {
        return (
          <>
            {store && <Persist
              name={form}
              data={this.whitelist(this.state)}
              debounce={500}
              onMount={data => this.setState(data)}
              store={store}
            />}
            <Form
              data={this.state}
              handleChange={this.handleChange}
              error={this.state.error}
              handleSubmit={this.handleValidationAndSubmit}
              validator={validator}
            />
          </>
        )
      }
    }

    return FormWrapper
  }
}

export default formWrapperCreater
