const initialState = {
    data: null,
    isLoader: false,
    isError: false,
    amountPages: null,
    selectedPage: 0,
    selectedUser: null,
    searched: null
}

const splitData = data => {
    let size = 50
    let groupedData = []
    for (let i = 0; i < Math.ceil(data.length / size); i++) {
        groupedData[i] = data.slice((i * size), (i * size) + size)
    }
    return groupedData
}

const getAmountPages = data => {
    const amountPages = Math.ceil(data.length / 50)
    return amountPages
}

const searchSelectedUser = (key, idx, data) => {
    const user = data[idx].find(({ id, phone }) => (id + phone) === key)
    return user
}

const addNewUser = (data, newUser) => {
    const dataFlat = data.flat()
    const newData = [newUser, ...dataFlat]
    return splitData(newData)
}

const searchTermInData = (state, term) => {
    const { data } = state
    const dataFlat = data.flat()
    const searchedItems = dataFlat.filter(item => {
        return (
            item.id === +term ||
            item.firstName.toLowerCase().includes(term) ||
            item.lastName.toLowerCase().includes(term) ||
            item.email.toLowerCase().includes(term) ||
            item.phone.replace(/[()-]/g, '').includes(term)
        )
    })

    return {
        ...state,
        amountPages: getAmountPages(searchedItems),
        searched: splitData(searchedItems)
    }
}

const sortDirection = (sortedArr, direction) => {
    if (direction === 'toDown') {
        return splitData(sortedArr.reverse())
    }
    return splitData(sortedArr)
}

const sortData = (data, tag, direction) => {
    const dataFlat = data.flat()
    if (tag === 'id') {
        const sortedArr = dataFlat.sort((a, b) => {
            return a.id - b.id
        })

        return sortDirection(sortedArr, direction)
    }

    else if (tag === 'phone') {
        const sortedArr = dataFlat.sort((a, b) => {
            let phoneA = +a.phone.replace(/[()-]/g, '')
            let phoneB = +b.phone.replace(/[()-]/g, '')
            return phoneA - phoneB
        })

        return sortDirection(sortedArr, direction)
    }

    else {
        const sortedArr = dataFlat.sort((a, b) => {
            let valueA = a[tag].toLowerCase()
            let valueB = b[tag].toLowerCase()
            if (valueA < valueB)
                return -1
            if (valueA > valueB)
                return 1
            return 0
        })

        return sortDirection(sortedArr, direction)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return {
                ...state,
                isLoader: true,
                selectedUser: null
            }

        case 'GET_SERVER_ERROR':
            return {
                ...state,
                isLoader: false,
                error: true
            }

        case 'RETURN_TO_INITIALL_STATE':
            return {
                ...state,
                isError: false,
                data: null
            }

        case 'GET_SMALL_DATA':
            return {
                ...state,
                data: splitData(action.payload),
                isLoader: false,
                amountPages: getAmountPages(action.payload)
            }

        case 'GET_BIG_DATA':
            return {
                ...state,
                data: splitData(action.payload),
                isLoader: false,
                amountPages: getAmountPages(action.payload)
            }

        case 'GET_SELECTED_PAGE':
            return {
                ...state,
                selectedPage: action.payload
            }

        case 'SEARCH_SELECTED_USER':
            return {
                ...state,
                selectedUser: searchSelectedUser(action.payload, state.selectedPage, state.data)
            }

        case 'ADD_NEW_USER':
            return {
                ...state,
                data: addNewUser(state.data, action.payload)
            }

        case 'SEARCH_TERM_IN_DATA':
            return searchTermInData(state, action.payload)

        case 'SORT_DATA':
            return {
                ...state,
                data: sortData(state.data, action.tag, action.direction)
            }

        default:
            return state
    }
}

export default reducer