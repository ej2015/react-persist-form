import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import formWrapperCreater from './formWrapper'

Enzyme.configure({ adapter: new Adapter() })

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

const FormWrapper = formWrapperCreater({ Form })

const ConnectedForm = ({ error, handleSubmit }) => (
  <FormWrapper
    data = {{ email: '', error }}
    onSubmit={handleSubmit}
  />
)

let handleSubmit = jest.fn()

describe('formWrapperCreater', () => {
  it('renders', () => {
    const component = renderer.create(
      ConnectedForm({ handleSubmit: handleSubmit })
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should handle submit', () => {
    let event = { target: { value: 'a' } }
    let wrapper = shallow(<ConnectedForm handleSubmit={handleSubmit} />)
    wrapper.simulate('submit', event)
    expect(handleSubmit.mock.calls.length).toBe(1)
  })
})
