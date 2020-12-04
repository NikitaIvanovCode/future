import React from 'react'
import { connect } from 'react-redux'
import GetDataBtns from '../getDataBtns/GetDataBtns'
import Loader from '../loader/Loader'
import Table from '../table/Table'
import TableItemInfo from '../tableItemInfo/TableItemInfo'
import Error from '../error/Error'

import './app.scss'

const App = ({ isLoader, isError }) => {
    if (isError) {
        return <Error />
    }

    return (
        <main>
            <div className="get-data-block">
                <GetDataBtns />
            </div>
            {isLoader ? <Loader /> : <Table />}
            <TableItemInfo />
        </main>
    )
}

const mapStateToProps = ({ isLoader, isError }) => {
    return { isLoader, isError }
}

export default connect(mapStateToProps)(App)