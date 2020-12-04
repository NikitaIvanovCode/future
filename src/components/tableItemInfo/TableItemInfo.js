import React from 'react'
import { connect } from 'react-redux'

import './tableItemInfo.scss'

const TableItemInfo = ({ selectedUser }) => {
    if (selectedUser && (selectedUser.address !== undefined || selectedUser.description !== undefined)) {
        const { firstName, lastName, description, address: { streetAddress, city, state, zip } } = selectedUser

        return (
            <div className="tableItemInfo">
                <div>Выбран пользователь: <b>{firstName} {lastName}</b></div>
                <div>Описание: <div>{description}</div></div>
                <div>Адрес проживания: <b>{streetAddress}</b></div>
                <div>Город: <b>{city}</b></div>
                <div>Провинция/штат: <b>{state}</b></div>
                <div>Индекс: <b>{zip}</b></div>
            </div>
        )
    }

    return null
}

const mapStateToProps = ({ selectedUser }) => {
    return { selectedUser }
}

export default connect(mapStateToProps)(TableItemInfo)