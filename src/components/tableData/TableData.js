import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { searchSelectedUser, sortTable } from '../../actions'

import './tableData.scss'

const TableData = ({ data, searched, selectedPage, searchSelectedUser, sortTable }) => {
    const [renderData, setRenderData] = useState(data)

    useEffect(() => {
        if (searched) {
            return setRenderData(searched)
        }

        return setRenderData(data)
    }, [searched, data])

    if (renderData.length == 0) {
        return <p>Ничего не найдено.</p>
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID
                        <span className="table__btn" onClick={() => sortTable('id', 'toDown')}>&#9660;</span>
                        <span className="table__btn" onClick={() => sortTable('id', 'toUp')}>&#9650;</span>
                    </th>
                    <th>first name
                        <span className="table__btn" onClick={() => sortTable('firstName', 'toDown')}>&#9660;</span>
                        <span className="table__btn" onClick={() => sortTable('firstName', 'toUp')}>&#9650;</span>
                    </th>
                    <th>last name
                        <span className="table__btn" onClick={() => sortTable('lastName', 'toDown')}>&#9660;</span>
                        <span className="table__btn" onClick={() => sortTable('lastName', 'toUp')}>&#9650;</span>
                    </th>
                    <th>email
                        <span className="table__btn" onClick={() => sortTable('email', 'toDown')}>&#9660;</span>
                        <span className="table__btn" onClick={() => sortTable('email', 'toUp')}>&#9650;</span>
                    </th>
                    <th>phone
                        <span className="table__btn" onClick={() => sortTable('phone', 'toDown')}>&#9660;</span>
                        <span className="table__btn" onClick={() => sortTable('phone', 'toUp')}>&#9650;</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {renderData[selectedPage].map(({ id, firstName, lastName, email, phone }) => {
                    return (
                        <tr key={id + phone} onClick={() => searchSelectedUser(id + phone)}>
                            <td>{id}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const mapStateToProps = ({ data, selectedPage, searched }) => {
    return { data, selectedPage, searched }
}

const mapDispatchToProps = { searchSelectedUser, sortTable }

export default connect(mapStateToProps, mapDispatchToProps)(TableData)