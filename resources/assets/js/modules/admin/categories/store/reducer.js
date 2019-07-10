import {
    SUPER_CATEGORY_LIST,
    SUPER_CATEGORY_ADD,
    SUPER_CATEGORY_UPDATE,
    SUPER_CATEGORY_REMOVE,
    SUPER_GET_CATEGORY
} from './action-types';


const initialState = {
    data: [],
}


const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
        case SUPER_CATEGORY_ADD:
            return add(state, payload)
        case SUPER_CATEGORY_UPDATE:
            return update(state, payload)
        case SUPER_GET_CATEGORY:
            return get(state, payload)
        case SUPER_CATEGORY_REMOVE:
            return remove(state, payload)
        case SUPER_CATEGORY_LIST:
            return list(state, payload)
        default:
            return state
    }
}


function add(state, payload) {
    const category = state.data.find((category) => (category.id === payload.id))

    if (!category) {
        const data = [...state.data, payload]

        return Object.assign({}, state, {
            ...state,
            data
        })
    }

    return update(state, payload)
}

function update(state, payload) {
    const data = state.data.map(obj => {

        if (obj.id === payload.id) {
            return { ...obj, ...payload }
        }
        return obj
    })

    return Object.assign({}, state, {
        ...state,
        data
    })
}

function remove(state, id) {
    const data = state.data.filter(obj => obj.id !== id)

    return Object.assign({}, state, {
        ...state,
        data
    })
}

function list(state, payload) {
    state = Object.assign({}, {
        ...state,
        data: payload.categories
    })

    return state
}


export default reducer