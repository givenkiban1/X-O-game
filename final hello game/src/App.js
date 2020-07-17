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
import Typography from '@material-ui/core/Typography';
import SimpleTable from './table/component/data-table'
import { number } from 'prop-types';


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

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3007/");

var userDetails = JSON.parse(localStorage.getItem('user-id'));
//localStorage.setItem('user', JSON.stringify(user))
//localStorage.getItem('token')

if (userDetails==null){
  
  //give user random username
  
  socket.emit("add-user",null);
  socket.on("newby-recognized", (data)=>{
    localStorage.setItem('user-id', JSON.stringify(data));
    userDetails = JSON.parse(localStorage.getItem('user-id'));
  })
}
else
{
  socket.emit("add-user",{id:userDetails.id})
}


socket.on("user-left", (data)=>{
  console.log("user", data.username ,"has left us");
  console.log("#user's that are left:", data.users_left);
})

socket.on("users-online", (data)=>{
  console.log("user's online", data.number);
})


function App() {
  const classes = useStyles();
  const [myId, setID] = useState(-1);

  const [currentUser , setCurrentUser] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winner2, setWinner2] = useState(null);
  const [hasGameStarted, setGameStart] = useState(false);
  const [ready2PickOpp, setReady2Opp] = useState(false);
  const [opp, setOpp] = useState(false);
  

  const [usersOnline, setOnlineUsers] = useState(null);
  
  const [acceptingWinnerStat, setWS] = useState(true);

  const [open, setOpen] = useState(false);

  const [onlineUsersDB , setOnlineUsersDB] =  useState(null);
  const [userNo, setUserNo] = useState(null); //this is used to control when a user can play

  const [draw, setDraw] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setWinner2(-1);
    setDraw(false)
    setGameStart(false);
    setReady2Opp(false);
  };


  socket.on("users-online", (data)=>{
    console.log("user's online heard");
    setOnlineUsers(data.number);
    setOnlineUsersDB(data.users_online);

  })

  const requestGame = (id)=>{
    
    socket.emit("want-2-play", {myid:myId, userid: id});

  }

  socket.on("challenge-accepted-noty",(data)=>{
    
    if (myId == data.myid){

      alert("Your opponent has accepted your challenge");
      setGameStart(true);
      setUserNo(1);

      setOpp(data.userid);

    }


  })
  
  socket.on("challenge-rejected-noty",(data)=>{

    if (myId == data.myid){
      alert("Your opponent has rejected your challenge");
      setGameStart(false);
    }
  })


  socket.on("want-2-play-req", (data)=>{

    if (myId == data.userid){

     var ans =window.confirm("Hey, A User would like to verse you, are you up for this ?");
      console.log(ans);

      if (ans){
        
        socket.emit("challenge-accepted", data);
        setGameStart(true);
        setUserNo(2);
        setOpp(data.myid);

        alert("you are player 2, so wait for challenger to play before you can");

      }
      else
      {
        socket.emit("challenge-rejected", data);
        setGameStart(false);
        alert("you've refused to verse the opponent who's challenged you");
      }
    }

  })

  const noOneOnline = (arr)=>{

    var online_db = [];

    arr.map((val)=>{

      console.log("val",val);
      if (val!=null && val!=myId){
        online_db.push(val); 
      }


      console.log("online_db", online_db);

      

    })

    return online_db;
    

  }

  const want2Play = (e) =>{

    setID(userDetails.id);
    setReady2Opp(true);

    console.log("online_users are ", onlineUsersDB);
 
}

  const dontPlay = (e)=>{
    alert("great ;)");
  }



  return (
    <div className="App">
      <header className="App-header">
{/*  <img src={logo} className="App-logo" alt="logo" />*/}
        
  <div className={classes.root}>
   
      {

    hasGameStarted?

    <Grid container spacing={3}>
        
        
        <Grid item xs={6} sm={2}>
          
        <Controls user={1} currentUser={currentUser==1}/>
          
        </Grid>
        <Grid item xs={6} sm={8}>
          <Paper className={classes.paper}>
            
          <Table playedByUser={currentUser} setCurrentUser={setCurrentUser} winner={winner2} socket={socket}
          userHasWon = {setOpen} setWinner={setWinner} acceptingWinnerStat={acceptingWinnerStat} setWS={setWS}
          enabled={hasGameStarted} canPlay={userNo==currentUser} myid = {myId} oppId = {opp} socket = {socket} userNo = {userNo} 
          setDraw = {setDraw}
          />

          </Paper>

          <br/>
          <br/>

          <Paper>
          
          <Typography variant="h3" gutterBottom >
                <div className={"online-logo"}></div>
                <p className={"score-data-title"}> User's Online : {usersOnline}</p>
          </Typography>

          </Paper>


        </Grid>
        <Grid item xs={6} sm={2}>
          
        <Controls user={2} currentUser={currentUser==2}/>

          
        </Grid>

        

    </Grid>
          :

          ready2PickOpp?

          <div className="pick-opp" style={{width:"50%", marginLeft:"25%", marginTop:"1%"}}>
            <Paper className = {classes.paper} style={{width:"100%", minHeight:"500px"}}>


              {

                noOneOnline(onlineUsersDB)==null?
                
                <Typography variant="h3" gutterBottom >
                        <p> There are no opponents</p>
                </Typography>
                
                :

                <div>
                {
                  noOneOnline(onlineUsersDB).map((val)=>(

                  <Button onClick={(event)=>{requestGame(val)}} style={{width:"100%", backgroundColor:"lightblue"}}>  User {val}  </Button> 

                  ))
                }
                </div>

              }



            </Paper>
          </div>

          :

        <div className="no-game" style={{width:"50%", marginLeft:"25%", marginTop:"5%"}}>
        <Paper className = {classes.paper} style={{width:"100%", height:"500px"}}>

        <Typography variant="h3" gutterBottom >
                <p className={"score-data-title"}> XO Chronicles</p>
        </Typography>

          <div className={"xoposter-1"}></div>
          <div className={"xoposter-2"}></div>



        <p>Hey, do you want to start a new game ? </p>
        <br/>
        <Button style={{backgroundColor:"grey"}} onClick={want2Play}>Yes</Button>
        <Button style={{backgroundColor:"grey", marginLeft:"10px"}} onClick={dontPlay}>No</Button>
        </Paper>
        </div>

        }




    
  </div>

  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{ draw? "No Winner": "Congratulations to Player "+winner}</DialogTitle>
    <DialogContent style={{ height: 400, width: 450,
     }} className={"dialog-content"}
    >
      <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}}>
        {draw ?
          "This match has been a tie"
        :
        "Player " + winner + " has won this round of the game."
        }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>

      </header>
    </div>
  );
}

export default App;
