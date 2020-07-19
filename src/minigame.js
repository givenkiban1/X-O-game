import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table/table'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Controls from './table/component/controls';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:"95%",
    paddingTop:"15px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function GameApp() {
  const classes = useStyles();

  const [currentUser , setCurrentUser] = useState(1);
  const [winner, setWinner] = useState(null);
  const [acceptingWinnerStat, setWS] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="App">
      <header className="App-header">
{/*  <img src={logo} className="App-logo" alt="logo" />*/}
        
  <div className={classes.root}>
   
    <Grid container spacing={3}>
        <Grid item xs={6} sm={2}>
          
        <Controls user={1} currentUser={currentUser==1}/>
          
        </Grid>
        <Grid item xs={6} sm={8}>
          <Paper className={classes.paper}>
            
          <Table playedByUser={currentUser} setCurrentUser={setCurrentUser} winner={winner}
          userHasWon = {setOpen} setWinner={setWinner} acceptingWinnerStat={acceptingWinnerStat} setWS={setWS}
          />

          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          
        <Controls user={2} currentUser={currentUser==2}/>
          
        </Grid>

    </Grid>
    
  </div>

  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Congratulations to Player "+winner}</DialogTitle>
    <DialogContent style={{ height: 400, width: 450,
     }} className={"dialog-content"}
    >
      <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}}>
        Player {winner} has won this round of the game. would you like to continue ? if you choose no, then your score history will
        be erased,
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        No
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
  

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default GameApp;
