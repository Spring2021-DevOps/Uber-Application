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
import swal from 'sweetalert';


let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
var tempDate = new Date();

require('dotenv').config()

const { REACT_APP_PYTHON_HOST } = process.env;

const useStyles = makeStyles((theme) => ({
  
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(720 + theme.spacing(6))]: {
      width: 900,
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

const Compose = () => {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  // async launch POST
  const postTweet = async (firstNameP, lastNameP, sourceP, destinationP, journeyDateP) => {
    const paramdict = {
      'firstNameP': firstNameP,
      'lastNameP': lastNameP,
      'sourceP': sourceP,
      'destinationP': destinationP,
      'journeydDateP': journeyDateP
    }

    try {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramdict)
      }
      //const response = await fetch("http://0.0.0.0:5000/book-trip", config);
      var url = "http://" + REACT_APP_PYTHON_HOST + ":5000/book-trip"
      const response = await fetch(url, config);
      //const json = await response.json()
      if (response.ok) {
          //return json
          //return response
          swal("Your Trip Is Confirmed!");
          console.log("success on send.");
          
      } else {
          console.log("launch: failure on send!");
          swal("Some Issue Occurred");
      }

      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {
      console.log(error);
      alert("exception on send");
    }
  };

  function handleSubmit(event) {
    //alert("fffddd")

    event.preventDefault()

    const priv = true;
    //const username = 'Elon Musk';
  //  const myArray = [
  //    "women",
  //    "men"
  //  ];
   // const img_gender = myArray[Math.floor(Math.random()*myArray.length)];
   // const img_index = Math.floor(Math.random() * 100) + 1 ;
   // const img_url = 'https://randomuser.me/api/portraits/' + img_gender + '/' + img_index.toString() + '.jpg';
    
    postTweet(firstName, lastName, source, destination, journeyDate);  
    //alert('Your trip has been Booked!');
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {'Book an UBER Bus Trip'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} >
            <TextField
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={'First Name'}
              name="firstName"
              inputProps={{ pattern: "^[a-zA-Z]+$" }}
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={'Last Name'}
              name="lastName"
              inputProps={{ pattern: "^[a-zA-Z]+$" }}
              autoComplete="lastName"
              autoFocus
            />
            <TextField
             value={source} 
               onInput={(e) => setSource(e.target.value)} 
               variant="outlined" 
               margin="normal" 
               required 
               fullWidth 
               id="source" 
               label={'Source'} 
               name="source" 
               autoComplete="source" 
               autoFocus 
             /> 
           
            <TextField
              value={destination}
              onInput={(e) => setDestination(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="destination"
              label={'Destination'}
              name="destination"
              autoComplete="destination"
              autoFocus
            />


            <TextField
              value={journeyDate}
              onInput={(e) => setJourneyDate(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="journeyDate"
              label={'Journey Date'}
              type="date"
              name="journeyDate"
              autoComplete="journeyDate"
              inputProps={{
                min: `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+1)}-${formatTwoDigits(tempDate.getDate())}`,
                max: `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+3)}-${formatTwoDigits(tempDate.getDate())}`
              }}
              autoFocus
            />

            

            <Button
              style={{ background: 'black' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {'Submit'}
            </Button>
          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
          </div>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default Compose
