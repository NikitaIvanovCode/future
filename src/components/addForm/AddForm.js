import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addNewUserToTable } from '../../actions'
import InputMask from 'react-input-mask';

import './addForm.scss'

const AddForm = ({ addNewUserToTable }) => {
    const [form, setForm] = useState(false)
    const [error, setError] = useState(false)

    const formHandler = e => {
        e.preventDefault()
        if (e.target.phone.value.indexOf('_') > -1) {
            return setError(true)
        }
        const newUser = {
            id: parseInt(e.target.id.value),
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value
        }

        addNewUserToTable(newUser)

        e.target.id.value = ''
        e.target.firstName.value = ''
        e.target.lastName.value = ''
        e.target.email.value = ''
        e.target.phone.value = ''
    }

    return (
        <div>
            <button className={`${form ? 'active' : ''}`} onClick={() => setForm(!form)}>Добавить в таблицу</button>
            {form ?
                <form className="add-form" onSubmit={formHandler}>
                    <input className="add-form__item" name="id" type="text" required placeholder="id" />
                    <input className="add-form__item" name="firstName" type="text" required placeholder="firstName" />
                    <input className="add-form__item" name="lastName" type="text" required placeholder="lastName" />
                    <input className="add-form__item" name="email" type="email" required placeholder="email" />
                    <InputMask className="add-form__item" name="phone" type="tel" required placeholder="phone" mask="(999)999-9999" />
                    {error ? <p>Проверьте номер телефона.</p> : null}
                    <button className="add-form__item" type="submit">Отправить</button>
                </form>
                : null}
        </div>
    )
}

const mapDispatchToProps = { addNewUserToTable }

export default connect(null, mapDispatchToProps)(AddForm)