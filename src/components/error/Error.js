import React from 'react'
import { connect } from 'react-redux'
import { returnToMain } from '../../actions'

import './error.scss'

const Error = ({ returnToMain }) => {
    return (
        <div className="error">
            <h2>Ошибка. Что-то пошло не так.</h2>
            <button onClick={() => returnToMain()}>На главную</button>
        </div>
    )
}

const mapDispatchToProps = { returnToMain }

export default connect(null, mapDispatchToProps)(Error)