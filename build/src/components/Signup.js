import React, { useState, useContext } from 'react';
import Colors from '../ColorVariables'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSpring, animated } from 'react-spring';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext';
import signupService from '../services/signupComponent'

const Copyright =()=> {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: Colors.backgroundColor1,
    },
  },
  card: {
    marginTop: theme.spacing(8),
    minWidth: 325,
    padding: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.fontColor1,
    }
  },
});


const SignUp =()=> {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { auth, setAuthenticated } = useContext(AuthContext);
  

  const classes = useStyles();

  const animationStyle = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  })

  const patterns = {
    email: /^[a-z\d]{2,}\@\w{2,}\.([a-z]{2,4})$/,
    password: /^\w{8,20}$/,
    rollnum: /^[0-9]{7}$/,
  };

  const handleFirstNameChange =(e)=> {
    setFirstName(e.target.value);
  }

  const handleLastNameChange =(e)=> {
    setLastName(e.target.value);
  }

  const handleEmailChange =(e)=> {
    setEmail(e.target.value);
  }

  const handleRollNumChange =(e)=> {
    setRollNum(e.target.value);
  }

  const handlePasswordChange =(e)=> {
    setPassword(e.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
    setOpen(false);
  };

  const handleSubmit =(e)=> {
    e.preventDefault();
    const signupObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      rollNum: rollNum,
      password: password
    }

    console.log(firstName, lastName, email, rollNum, password);
    if(!patterns.email.test(email)){
      setErrorMessage('Enter a Valid Email ID');
      setOpen(true);
    }
    else if(!patterns.rollnum.test(rollNum)) {
      setErrorMessage('Enter a Valid Roll Number');
      setOpen(true);
    }
    else {
      signupService(signupObject);
      console.log('success')
      setAuthenticated('test');
    }
  }


  return (
        <AuthContextProvider>
          <animated.div style={animationStyle}>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card className={classes.card}>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                  <form onSubmit={handleSubmit} className={classes.form} method="post">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          onChange={handleFirstNameChange}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          onChange={handleLastNameChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={handleEmailChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="rollNum"
                          label="Roll Number"
                          name="rollNum"
                          autoComplete="rollnum"
                          onChange={handleRollNumChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={handlePasswordChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="signin" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={errorMessage}
                    variant="success"
                    action={[

                    <IconButton
                      key="close"
                      aria-label="close"
                      color="inherit"
                      className={classes.close}
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                    ]}
                  />
                </div>
                </Card>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Container>
            </ThemeProvider>
          </animated.div>
        </AuthContextProvider>
  );
}

export default SignUp;