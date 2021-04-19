import { useHistory } from 'react-router-dom'
import { saveAuthorisation, isAuthorised } from '../../utils/auth'
//import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//import Button from '@material-ui/Button'
import Paper from '@material-ui/core/Paper'
//import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const SignIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const { setAuthMenuOpen } = useContext(MenuContext)

  function handleSubmit(event) {
    event.preventDefault()

    // verify user/pwd
    //.. return userid

    // save more: name, group, userid
//    authenticate({
//      displayName: 'User',
//      email: username,
//    })
  }

  const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPasswordInput] = useState('');

//const history = useHistory();

const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
}

const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
}

const handleLoginSubmit = (e) => {
    e.preventDefault();
    let hardcodedCred = {
        email: 'uberadmin@gmail.com',
        password: 'password123'
    }

    if ((emailInput == hardcodedCred.email) && (passwordInput == hardcodedCred.password)) {
        //combination is good. Log them in.
        //this token can be anything. You can use random.org to generate a random string;
        const token = '123456abcdef';
        sessionStorage.setItem('auth-token', token);
        //go to www.website.com/todo
        history.push('/bookings');
    } else {
        //bad combination
        alert('wrong email or password combination');
    }
}

const mystyle = {
  color: "white",
  marginTop :200,
  marginLeft: 300,
  marginRight:300,
  border: '2px solid black',
  fontFamily: "Arial",
  textAlign: 'center',
  backgroundColor: 'black',
  opacity: 0.7
  
};

return (
    <div className="login-page" style={mystyle} >
        <h1>Admin Login</h1>
        <form autoComplete="off" onSubmit={handleLoginSubmit}>
            <div className="form-group">
                <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={emailInput}
                onChange={handleEmailChange}
                />
            </div><br></br>
            <div className="form-group">
                <input
                type="password"
                autoComplete="new-password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={passwordInput}
                onChange={handlePasswordChange}
                />
            </div><br></br>
            <button type="submit" className="btn btn-primary">
                Submit
            </button><br></br><br></br>
      </form>
    </div>
  );
}

export default SignIn
