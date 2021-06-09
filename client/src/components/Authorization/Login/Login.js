import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import './Login.css';

const Login = ({ login }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    let sendLogin = (e) => {
        e.preventDefault();
        const loginUser = { name, password };
        fetch('http://localhost:9000/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUser)
        }).then((res) => {
            if (res.status === 200) {
                login();
                history.push('/');
            } else if (res.status === 401) {
                alert("Incorrect usernaem or password!");
            } else {
                throw res.error;
            }
        });
    }

    return (
        <div className="container">
            {error != "" ? <Alert severity="error">{error}</Alert> : null}
            <FormControl className="email-container">
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" onChange={(e) => setName(e.target.value)} aria-describedby="my-helper-text" />
            </FormControl>

            <FormControl className="password-container">
                <InputLabel htmlFor="password" >Password</InputLabel>
                <Input id="email" type="password" onChange={(e) => setPassword(e.target.value)} aria-describedby="my-helper-text" />
            </FormControl>

            <Button color="primary" onClick={sendLogin}>Login</Button>

            <p>Not registered yet? Sign up!</p>
            <Link className="register-button" to={{
                pathname: "/register",
            }}>Register</Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                Bajusz István (OBYBZK) Web Technológiák II. beadandó <br></br>
                Az oldal tetjén lévő két gombra kattintva lehet a felületek között váltani. <br></br>
                A "Products" felületen kérdezhető le az adatbázis tartalma, illetve módosítható az. Ez csak akkor lehetséges, ha be van jelentkezve a felhasználó. <br></br>
                Ha nincs bejelentkezve, akkor egy message card jelzi a felhasználónak, hogy lépjen be, ha hozzá szeretne férni az adatokhoz. <br></br>
                A "Login" felületen lehet bejelentkezni. Sikertelen bejelentkezés esetén erre figyelmeztet az oldal. <br></br>     
                Bejelentkezés után a "Login" gomb "Logout" gombra módosul, erre kattintva kijelentkezik a felhasználó. <br></br> <br></br>
            </div>

        </div>
    )
}

export default Login;