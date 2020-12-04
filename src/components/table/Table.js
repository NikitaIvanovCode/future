import React from 'react'
import { connect } from 'react-redux'
import TableData from '../tableData/TableData'
import Pagination from '../pagination/Pagination'
import AddForm from '../addForm/AddForm'
import Search from '../search/Search'

import './table.scss'

const Table = ({ data }) => {
    if (!data) {
        return <p>Выберите объем данных.</p>
    }

    return (
        <div>
            <div className="table__add-search">
                <AddForm />
                <Search />
            </div>
            <TableData />
            <Pagination />
        </div>
    )
}

const mapStateToProps = ({ data }) => {
    return { data }
}

export default connect(mapStateToProps)(Table)