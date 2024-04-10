import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {store} from "./redux-state/store";
import UserList from "./components/UserList/UserList";

function App() {

    return (
        <Provider store={store}>
            <UserList />
        </Provider>
    )
}

export default App;