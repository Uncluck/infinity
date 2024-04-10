import {useDispatch, useSelector} from "react-redux";
import UserForm from "../UserForm/UserForm";
import {addSelectedUser, fetchDataSuccess} from "../../redux-state/reducer/usersSlice";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import s from './UserList.module.css'

const UserList = () => {
    const {data: users, selectedUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        if (fetching) {
            axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=20&_page=${currentPage}`)
                .then(response => {
                    dispatch(fetchDataSuccess(response.data));
                    setCurrentPage(prevState => prevState + 1);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching, currentPage]);


    useEffect(() => {
        containerRef.current.addEventListener('scroll', handleScroll);
        return () => {
            containerRef.current.removeEventListener('scroll', handleScroll);
        }
    }, [])


    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollHeight - (container.scrollTop + container.clientHeight) < 100) {
            setFetching(true);
        }
    }

    return (
        <div>
            <div className={s.container} ref={containerRef}>
                <ul className={s.list}>
                    {users.map(user => (
                        <li key={user.id} onClick={() => {
                            dispatch(addSelectedUser(user))
                        }}>{`Пользователь ${user.id}`}</li>
                    ))}
                </ul>
            </div>
            <div className={s.formComponent}>
                {selectedUser && <UserForm />}
            </div>
        </div>

    );
}

export default UserList;