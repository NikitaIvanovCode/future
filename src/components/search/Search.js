import React from 'react'
import { connect } from 'react-redux'
import { searchTermData } from '../../actions'

import './search.scss'

const Search = ({ searchTermData }) => {
    const searchFormHandler = e => {
        e.preventDefault()
        const term = e.target.term.value.trim().toLowerCase()
        searchTermData(term)
    }

    return (
        <form onSubmit={searchFormHandler}>
            <input className="search__input" name="term" type="text" placeholder="Поиск..." />
            <button type="submit">Искать</button>
        </form>
    )
}

const mapDispatchToProps = { searchTermData }

export default connect(null, mapDispatchToProps)(Search)