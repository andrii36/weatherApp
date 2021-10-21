let initialState = {
    info: [],
    infoByCityDaily: null,
    currentCity: null
}

function mainReducer (state = initialState, action) {
    switch(action.type){
        case 'setInfo': {
            return {
                ...state,
                info: [...state.info, action.info]
            }
        }
        case 'setCurrentCity': {
            return {
                ...state,
                currentCity: action.currentCity
            }
        }
        case 'setInfoDaily': {
            return {
                ...state,
                infoByCityDaily: action.info
            }
        }
        default: return state
    }
}

export default mainReducer