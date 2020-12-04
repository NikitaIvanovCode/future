import React from 'react'
import { connect } from 'react-redux'
import { toPageNum } from '../../actions'

import './pagination.scss'

const Pagination = ({ amountPages, selectedPage, toPageNum }) => {
    const pagesArr = []
    for (let i = 1; i <= amountPages; i++) {
        pagesArr.push(i)
    }

    if (amountPages < 2) {
        return null
    }

    return (
        <ul className="pagination-list">
            {pagesArr.map(item => {
                return <li className={`pagination-list__item ${item === selectedPage + 1 ? 'active' : ''}`} key={item} onClick={() => toPageNum(item - 1)}>{item}</li>
            })}
        </ul>
    )
}

const mapStateToProps = ({ amountPages, selectedPage }) => {
    return { amountPages, selectedPage }
}

const mapDispatchToProps = { toPageNum }

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)