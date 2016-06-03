const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const findDOMNode = require('react-dom').findDOMNode

module.exports = EditableLabel


inherits(EditableLabel, Component)
function EditableLabel() {
  Component.call(this)
}

EditableLabel.prototype.render = function() {
  const props = this.props
  let state = this.state

  if (state && state.isEditingLabel) {

    return h('div.editable-label', [
      h('input', {
        defaultValue: props.textValue,
        onKeyPress:(event) => {
          this.saveIfEnter(event)
        },
      }),
      h('button', {
        onClick:() => this.saveText(),
      }, 'Save')
    ])

  } else {
    return h('div', {
      onClick:(event) => {
        this.setState({ isEditingLabel: true })
      },
    }, this.props.children)
  }
}

EditableLabel.prototype.saveIfEnter = function(event) {
  if (event.key === 'Enter') {
    this.saveText()
  }
}

EditableLabel.prototype.saveText = function() {
  var container = findDOMNode(this)
  var text = container.querySelector('.editable-label input').value
  this.props.saveText(text)
  this.setState({ isEditingLabel: false, textLabel: text })
}