import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getSmallData, getBigData } from '../../actions'

import './getDataBtns.scss'

const GetDataBtns = ({ getSmallData, getBigData }) => {
    const [dataSizeBtn, setDataSizeBtn] = useState('')

    const btnHandler = dataSize => {
        setDataSizeBtn(dataSize)

        if (dataSize === 'smallData') {
            return getSmallData()
        }
        return getBigData()
    }

    return (
        <>
            <button className={`data-size-btn ${dataSizeBtn === 'smallData' ? 'active' : ''}`} onClick={() => btnHandler('smallData')}>
                Малый объем данных
            </button>
            <button className={`data-size-btn ${dataSizeBtn === 'bigData' ? 'active' : ''}`} onClick={() => btnHandler('bigData')}>
                Большой объем данных
            </button>
        </>
    )
}

const mapDispatchToProps = { getSmallData, getBigData }

export default connect(null, mapDispatchToProps)(GetDataBtns)