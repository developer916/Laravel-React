import _ from 'lodash'

import lhtmlStyleValues from '../../../../../../common/lhtml-style'

import {
  LHTML_LOAD,
  LHTML_STORE,
  LHTML_ADD_ROW,
  LHTML_SELECT,
  LHTML_REMOVE,
  LHTML_UPDATE_ATTRIBUTE,
  LHTML_ADD_BUTTON,
  LHTML_CHANGE_TYPE
} from './action-types'

const settingsList = lhtmlStyleValues.settingsList
const buttonTypes = lhtmlStyleValues.buttonTypes

const initialState = {
  editor: {
    key: '0',
    type: 'container',
    style: {
      padding: '15px',
    },
    general: {
      rows: 0,
    },
    settings: {
      idStr: '',
      classStr: ''
    },
    data: []
  },
  selected: {}
}


const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case LHTML_LOAD:
      return load(state, payload)
    case LHTML_STORE:
      return store(state, payload)
    case LHTML_ADD_ROW:
      return addRow(state, payload)
    case LHTML_SELECT:
      return selectElement(state, payload)
    case LHTML_REMOVE:
      return removeElement(state, payload)
    case LHTML_UPDATE_ATTRIBUTE:
      return updateAttribute(state, payload)
    case LHTML_ADD_BUTTON:
      return addButton(state, payload)
    case LHTML_CHANGE_TYPE:
      return changeType(state, payload)
    default:
      return state
  }
}

function load(state, payload) {
  return Object.assign({}, state, {
    editor: _.isEmpty(payload.code) ? initialState.editor : payload.code.htmlJson,
    selected: {}
  })
}

function store(state, payload) {

  return state
}

// Select Element
function selectElement(state, payload) {
  return Object.assign({}, state, { selected: payload })
}

// Remove Element
function removeElement(state, payload) {
  const {editor} = state

  let data = []
  if (payload.type === 'column') {
    data = editor.data.map(row => {
      const rowsData = row.data.filter(column => column.key !== payload.key)
      return {
        ...row,
        data: rowsData
      }
    })
  } else {
    data = editor.data.filter(row => row.key !== payload.key)
  }

  // re-generate key of row, column, button
  let updatedData = data.map((row, index) => {
    row.key = (editor.key + index)
    const rowsData = row.data.map((column, idx) => {
      column.key = (row.key + idx)
      const columnsData = column.data.map((button, bIdx) => {
        return {
          ...button,
          key: (column.key + bIdx)
        }
      })
      return {
        ...column,
        key: (row.key + idx),
        data: columnsData
      }
    })
    return {
      ...row,
      key: (editor.key + index),
      general: {
        column: row.data.length
      },
      data: rowsData
    }
  })

  let newEditor = {
    ...editor,
    data: updatedData
  }

  return Object.assign({}, state, {
    editor: newEditor,
    selected: {}
  })
}

// update selected with Editor
function updateEditorWithNewSelected(state, newSelected) {
  // update selected with Editor Data
  const {editor} = state

  const data = editor.data.map(row => {
    const rowsData = row.data.map(column => {
      const columnsData = column.data.map(button => {
        if (button.key === newSelected.key) {
          return { ...button, ...newSelected }
        }
        return button
      })

      if (column.key === newSelected.key) {
        return { ...column, ...newSelected }
      }
      return { ...column, data: columnsData }
    })

    if (row.key === newSelected.key) {
      return { ...row, ...newSelected }
    }
    return { ...row, data: rowsData }
  })

  let newEditor = {
    ...editor,
    data
  }

  return newEditor
}

// Update Attribute of selected
function updateAttribute(state, payload) {
  const {selected} = state

  let newSelected = {}
  if (settingsList.includes(payload.name)) {
    if (payload.name === 'type') {
      newSelected = {
        ...selected,
        settings: {
          ...selected.settings,
          [payload.name]: payload.value,
          icon: payload.value
        }
      }
    } else {
      newSelected = {
        ...selected,
        settings: {
          ...selected.settings,
          [payload.name]: payload.value
        }
      }
    }
  } else {
    newSelected = {
      ...selected,
      style: {
        ...selected.style,
        [payload.name]: payload.value
      }
    }
  }

  let newEditor = updateEditorWithNewSelected(state, newSelected)

  return Object.assign({}, state, { editor: newEditor, selected: newSelected })
}

// Button - Functions
function addButton(state, payload) {
  const {rowObj, columnObj} = payload

  const {editor} = state

  const data = editor.data.map(obj => {
    if (obj.key === rowObj.key) {
      obj.data.push(columnObj)
      obj.general.column = obj.general.column + 1
      return { ...obj }
    }
    return obj
  })

  let newEditor = {
    ...editor,
    data
  }

  return Object.assign({}, state, { editor: newEditor })
}

// Row - Functions
function addRow(state, payload) {
  const {editor} = state

  const row = editor.data.find((row) => (row.key === payload.key))

  if (!row) {
    let general = {
      rows: editor.general.rows + 1
    }

    const data = [...editor.data, payload]
    let newEditor = {
      ...editor,
      general,
      data,
    }

    return Object.assign({}, state, { editor: newEditor })
  }

  return updateRow(state, payload)
}

function updateRow(state, payload) {
  const {editor} = state

  const data = editor.data.map(obj => {
    if (obj.key === payload.key) {
      return { ...obj, ...payload }
    }
    return obj
  })

  let newEditor = {
    ...editor,
    data
  }

  return Object.assign({}, state, { editor: newEditor })
}

function changeType(state, payload) {
  const {selected} = state

  const oldType = buttonTypes.includes(selected.settings.type) ? 'button' : selected.settings.type,
    newType = buttonTypes.includes(payload.value) ? 'button' : payload.value

  let newSelected = {}
  if (oldType !== newType) {
    switch (newType) {
      case "text":
        newSelected = {
          ...selected,
          settings: {
            [payload.name]: payload.value,
            title: 'ex. Subscribe with Socials',
            idStr: '',
            classStr: '',
          },
          style: {
            fontSize: '16px',
            color: '#151b1e',
            backgroundColor: '#ffffff',
            lineHeight: '1.2',
            fontWeight: '500'
          }
        }
        break;
      case "link":
        newSelected = {
          ...selected,
          settings: {
            [payload.name]: payload.value,
            title: '*** ICS File Link ***',
            idStr: '',
            classStr: '',
          },
          style: {
            border: '1px solid',
            fontSize: '14px',
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
            borderBottomLeftRadius: '2px',
            borderBottomRightRadius: '2px',
            paddingLeft: '5px',
            paddingTop: '5px',
            paddingRight: '5px',
            paddingBottom: '5px',
            backgroundColor: '#d3d3d3',
            wordBreak: 'break-all'
          }
        }
        break;
      default: // button
        newSelected = {
          ...selected,
          style: {
            boxSizing: 'border-box',
            height: '100%',
            color: '#151b1e',
            backgroundColor: '#c0cadd',
            borderColor: '#c0cadd'
          },
          settings: {
            type: 'none',
            title: 'Button',
            icon: 'none',
            idStr: '',
            classStr: '',
          }
        }
        break;
    }
  } else {
    return updateAttribute(state, payload)
  }

  let newEditor = updateEditorWithNewSelected(state, newSelected)

  return Object.assign({}, state, { editor: newEditor, selected: newSelected })
}

export default reducer;