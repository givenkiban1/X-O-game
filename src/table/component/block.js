import React, { Component, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import '../table.css';

class Block extends Component {

    constructor(props) {
        super(props);

        
        this.state = {
          user: null,
        };
        
    }

    componentDidMount(){
        
        this.props.props.socket.on("move-played-noty",(data)=>{

            if (data.to == this.props.props.myid){
                console.log("opp has just played");

                if (this.props.id == data.blockId){
                    this.setState({user: data.userNo});

                    if (data.userNo==1){
                
                        this.props.data[this.props.row][this.props.col] = 'O';
        
                    }
                    else if(data.userNo==2){
                        this.props.data[this.props.row][this.props.col] = 'X';
                    }
        
    
                }

                this.props.props.setCurrentUser(data.nextCurrentUser);

                console.log("data from user:",this.props.data);


            }


        })

    }

    PlayMove = (e) => {
        if (this.state.user==null && this.props.props.canPlay) {
            this.setState({user: this.props.props.playedByUser});

            this.props.props.socket.emit("move-played", {by:this.props.props.myid, to:this.props.props.oppId, 
                userNo:this.props.props.userNo, nextCurrentUser: (this.props.props.playedByUser==1?2:1),
                blockId: this.props.id, row: this.props.row, col: this.props.col
            });
            
            if (this.props.props.playedByUser==1){
                
                this.props.data[this.props.row][this.props.col] = 'O';

            }
            else if(this.props.props.playedByUser==2){
                this.props.data[this.props.row][this.props.col] = 'X';
            }

            console.log("my data :", this.props.data);

            this.props.props.setCurrentUser(this.props.props.playedByUser==1?2:1);
        }
        
    } 

    componentDidUpdate(){
          
        if (this.props.props.winner!=null){
            this.state.user = null;

            console.log("setting to null");
            this.props.props.setWinner(null);
        }

    }

    render(){

        return (
        <Paper elevation={3}>
            <div className={
                this.state.user && this.state.user==1 ?  "table-block block-item1": 
                this.state.user && this.state.user==2 ?  "table-block block-item2": "table-block"} onClick={this.PlayMove}>

            </div>
        </Paper>
      );

    }

}

export default Block;
