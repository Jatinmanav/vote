import React, { useState, useEffect } from 'react';
import axios from 'axios'
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
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../ColorVariables';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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

const Candidate =({ candidate, handleCandidateChange, candidateRows, handleCandidateSubmit })=> {
	const classes = useStyles();
	return(
    <form onSubmit={handleCandidateSubmit} className={classes.form} method="post">
    <Grid container spacing={2}>
        <Grid item xs={12}>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel>Candidate</InputLabel>
        <Select
            native
            value={candidate}
            onChange={handleCandidateChange}
            fullWidth
            required
            >
            <option value="" />
            {candidateRows()}
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

const Candidates =({elem})=> {
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
    const [ constituency, setConstituency ] = useState();
    const [ candidate, setCandidate ] = useState();
    const [ constituencies, setConstituencies ] = useState([]);
    const [ isConstituency, setIsConstitutency ] = useState(true)

    useEffect(() => {
      axios
        .get('http://localhost:3003/constituencies')
        .then(response => {
            setConstituencies(response.data)
      })
    }, [])


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

    const candidateRows =()=> {
      let filteredConstituencies = constituencies.filter((elem)=>elem.name === constituency);
      const candidateList = filteredConstituencies[0].candidates;
      console.log(candidateList)
      return candidateList.map(elem => {
          return(
              <Candidates
                  key={elem.candidateID}
                  elem={elem}
              />
          )
      })
    }

    const classes = useStyles();

    const handleConstituencyChange =(e)=> {
        console.log(e.target.value);
        setConstituency(e.target.value);
    }

    const handleCandidateChange =(e)=> {
        console.log(e.target.value);
        setCandidate(e.target.value);
    }

    const handleConstituencySubmit =(e)=> {
		e.preventDefault();
		console.log(constituency);
		setIsConstitutency(false);
		console.log(isConstituency)
	}
	
	const handleCandidateSubmit =(e)=> {
		e.preventDefault();
		console.log('Voted for ', candidate);
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
						{isConstituency ? 
							<Constituency constituency={constituency} handleConstituencyChange={handleConstituencyChange} constituencyRows={constituencyRows} handleConstituencySubmit={handleConstituencySubmit} />:
							<Candidate candidate={candidate} handleCandidateChange={handleCandidateChange} candidateRows={candidateRows} handleCandidateSubmit={handleCandidateSubmit} />
						}
                    </div>
                    </Card>
                    </Container>
                    <Constituencies />
            </ThemeProvider>
        </animated.div>
    )
}

export default Castvote