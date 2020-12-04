export const getSmallData = () => {
    return dispatch => {
        dispatch({ type: 'IS_LOADING' })
        fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(res => {
                if (res.status !== 200) {
                    return dispatch({ type: 'GET_SERVER_ERROR' })
                } else {
                    return res.json()
                }
            })
            .then(data => {
                dispatch({ type: 'GET_SMALL_DATA', payload: data })
            })
    }
}

export const getBigData = () => {
    return dispatch => {
        dispatch({ type: 'IS_LOADING' })
        fetch('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(res => {
                if (res.status !== 200) {
                    return dispatch({ type: 'GET_SERVER_ERROR' })
                } else {
                    return res.json()
                }
            })
            .then(data => {
                dispatch({ type: 'GET_BIG_DATA', payload: data })
            })
    }
}

export const returnToMain = () => ({ type: 'RETURN_TO_INITIALL_STATE' })

export const toPageNum = num => ({ type: 'GET_SELECTED_PAGE', payload: num })

export const searchSelectedUser = key => ({ type: 'SEARCH_SELECTED_USER', payload: key })

export const addNewUserToTable = newUser => ({ type: 'ADD_NEW_USER', payload: newUser })

export const searchTermData = term => ({ type: 'SEARCH_TERM_IN_DATA', payload: term })

export const sortTable = (tag, direction) => ({ type: 'SORT_DATA', tag, direction })