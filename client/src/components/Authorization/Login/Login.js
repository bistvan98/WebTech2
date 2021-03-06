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
                Bajusz Istv??n (OBYBZK) Web Technol??gi??k II. beadand?? <br></br>
                Az oldal tetj??n l??v?? k??t gombra kattintva lehet a fel??letek k??z??tt v??ltani. <br></br>
                A "Products" fel??leten k??rdezhet?? le az adatb??zis tartalma, illetve m??dos??that?? az. Ez csak akkor lehets??ges, ha be van jelentkezve a felhaszn??l??. <br></br>
                Ha nincs bejelentkezve, akkor egy message card jelzi a felhaszn??l??nak, hogy l??pjen be, ha hozz?? szeretne f??rni az adatokhoz. <br></br>
                A "Login" fel??leten lehet bejelentkezni. Sikertelen bejelentkez??s eset??n erre figyelmeztet az oldal. <br></br>     
                Bejelentkez??s ut??n a "Login" gomb "Logout" gombra m??dosul, erre kattintva kijelentkezik a felhaszn??l??. <br></br> <br></br>
            </div>

        </div>
    )
}

export default Login;