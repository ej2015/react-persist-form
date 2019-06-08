import React, { PureComponent } from 'react'
import { Persist } from 'react-persist-plus'
import pickBy from 'lodash.pickby'
import SimpleReactValidator from 'simple-react-validator'
import { getValueFromEvent } from './utils'

const formWrapperCreater = ({name, Form}) => {
    class FormWrapper extends PureComponent {
      constructor(props) {
        super(props)
        this.state = props.initialFields
        this.handleSubmit = props.onSubmit
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
        return pickBy(data, (v, k) => k.match(/password/) === null )
      }

      render() {
        return (
          <>
            {this.store && <Persist
              name={name}
              data={this.blacklist(this.state)}
              debounce={500}
              onMount={data => this.setState(data)}
              store={this.store}
            />}
            < Form
              handleChange = {this.handleChange}
              handleSubmit = {this.handleValidationAndSubmit}
              validator = {this.validator}
              data = {this.state}
              error = {this.props.error}
            />
          </>
        )
      }
    }
    return FormWrapper
}

export default formWrapperCreater
