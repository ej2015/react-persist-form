import React, { PureComponent } from 'react'
import { Persist } from 'react-persist-plus'
import pickBy from 'lodash.pickby'
import SimpleReactValidator from 'simple-react-validator'
import { getValueFromEvent } from './utils'

const formWrapperCreater = formName => {
    class FormWrapper extends PureComponent {
      constructor(props) {
        super(props)
        this.state = props.initialFields
        this.handleSubmit = props.onSubmit
        this.Form = props.Form
        this.validator = props.validator || new SimpleReactValidator()
        this.store = (typeof props.store === 'undefined') ? window.sessionStorage : props.store
      }

      dispatchAttributeChange = changes => {
        this.setState((state, props) => ({ ...state, ...changes }))
      }

      handleChange = e => {
        let changes = getValueFromEvent(e)
        this.dispatchAttributeChange(changes)
      }

      handleValidationAndSubmit = event => {
        event.preventDefault()
        if (this.validator.allValid()) {
          this.handleSubmit(this.state)
        } else {
          this.validator.showMessages()
          this.forceUpdate()
        }
      }

      blacklist = data => {
        return pickBy(data, (v, k) => !['password'].includes(k))
      }

      render() {
        return (
          <>
            {this.store && <Persist
              name={formName}
              data={this.blacklist(this.state)}
              debounce={500}
              onMount={data => this.setState(data)}
              store={this.store}
            />}
            { this.Form ({
              handleChange: this.handleChange,
              handleSubmit: this.handleValidationAndSubmit,
              validator: this.validator,
              data: this.state
            })}

            />
          </>
        )
      }
    }
    return FormWrapper
}

export default formWrapperCreater
