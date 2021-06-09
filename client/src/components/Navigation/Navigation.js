import React from 'react'
import { useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export default function Navigation({ loggedIn, logout }) {
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        history.push(`/${newValue}`);
        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels 
        >
            <BottomNavigationAction value="" label="Products" icon={<AppsIcon />}/>
            {loggedIn ? <BottomNavigationAction label="Logout" onClick={() => { logout() }} value="login" to="/login" icon={<ExitToAppIcon />} /> :
                <BottomNavigationAction label="Login" value="login" icon={<LockOpenIcon />} />}
        </BottomNavigation>
    )
}
