import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../ColorVariables';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import castVoteComponent from '../services/castVoteComponent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AuthContext } from '../contexts/AuthContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: Colors.fontColor1,
    }
  },
});

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
  formControl: {
    minWidth: 330,
  },
}));

const Constituency =({ constituency, handleConstituencyChange, constituencyRows, handleConstituencySubmit })=> {
  const classes = useStyles();

  return(
    <form onSubmit={handleConstituencySubmit} className={classes.form} method="post">
    <Grid container spacing={2}>
        <Grid item xs={12}>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Constituency</InputLabel>
        <Select
            native
            value={constituency}
            onChange={handleConstituencyChange}
            fullWidth
            required
            >
            <option value="" />
            {constituencyRows()}
        </Select>
        </FormControl>
        </Grid>
    </Grid>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
    >
        Submit
    </Button>
    </form>
  )
}

const Constituencies =({elem})=> {
    if(elem===undefined){
      return (
        <option value=" " />
      )
    }
    return (
        <option value={elem.name}> {elem.name} </option>
    )
}


const Castvote =()=> {
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const {userData} = useContext(AuthContext);
    const [ constituency, setConstituency ] = useState();
    const [ constituencies, setConstituencies ] = useState([]);
    console.log(userData);

    useEffect(() => {
      axios
        .get('http://localhost:3003/constituencies')
        .then(response => {
            setConstituencies(response.data)
      })
    }, [])


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrorMessage('');
      setOpen(false);
    };

    const animationStyle = useSpring({
        opacity: 1,
        from: {
            opacity: 0,
        },
    })

    const constituencyRows =()=> {
		return constituencies.map(elem =>{
        	return(
            <Constituencies
                key={elem.id}
                elem={elem}
            />
            )
        }
	    )
	}

    const classes = useStyles();

    const handleConstituencyChange =(e)=> {
        console.log(e.target.value);
        setConstituency(e.target.value);
    }

    const handleConstituencySubmit =async(e)=> {
		  e.preventDefault();
      console.log(constituency);
      const newObject = {email: userData.email, candidate: constituency};
      const result = await castVoteComponent(newObject);
      console.log(result);
      if(result === true){
        console.log("success");
        setErrorMessage("You have successfully Cast your Vote! Please Visit the Results Page!")
        setOpen(true);
      } else {
        console.log("Already Voted")
        setErrorMessage("You have already Cast your Vote!  Please Visit the Results Page!")
        setOpen(true);
      }
	  }
	
    return (
        <animated.div style={animationStyle}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Card className={classes.card}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Cast Vote
                        </Typography>
						         	<Constituency constituency={constituency} handleConstituencyChange={handleConstituencyChange} constituencyRows={constituencyRows} handleConstituencySubmit={handleConstituencySubmit} />
                    </div>
                    </Card>
                    </Container>
                    <Constituencies />
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
            </ThemeProvider>
        </animated.div>
    )
}

export default Castvote