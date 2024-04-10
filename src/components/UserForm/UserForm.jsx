import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {saveUpdatedUser, updateSelectedUserField} from "../../redux-state/reducer/usersSlice";
import s from './UserFrom.module.css'

const UserForm = () => {
    const user = useSelector(state => state.users.selectedUser)
    const dispatch = useDispatch()


    const inputOnChange = (el, field) => {
        dispatch(updateSelectedUserField({ field, value: el.target.value }));
    }

    const saveUser = () => {
        dispatch(saveUpdatedUser())
    }

    return (
        <div>
             <div className={s.form}>
                <input type="text" value={user.name} onChange={(el) => inputOnChange(el, 'name')}/>
                <input type="text" value={user.email} onChange={(el) => inputOnChange(el, 'email')}/>
                <input type="number" value={user.body} onChange={(el) => inputOnChange(el, 'body')}/>
                <button className={s.save_button} onClick={() => saveUser()}>Save</button>
            </div>
        </div>
        );
}

export default UserForm;