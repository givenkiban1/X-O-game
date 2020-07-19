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
import './table.css';
import Block from './component/block';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board_condition:[["-","-","-"],["-","-","-"],["-","-","-"]],
        };

        console.log(this.state.board_condition);

    }

    isDraw = ()=>{
        var i = 0;
        this.state.board_condition.map((arr)=>{
            arr.map((x)=>{
                if (x!="-"){
                    i++;
                }
            });
        });
        if (i==9){
            return true
        }
        else
        return false;
    }

    clearTable = ()=>{
        this.state = {
            board_condition:[["-","-","-"],["-","-","-"],["-","-","-"]],
        };
        console.log("clear table called, clear self = true");
    }

    componentDidMount(){
      // this.props.socket

      
    }

    componentDidUpdate(){
        //console.log("XYZ:",this.state.board_condition);

        //conditions for User 1 to Win
        if (
        (
            (this.state.board_condition[0][0]==this.state.board_condition[0][1] 
            && this.state.board_condition[0][0]==this.state.board_condition[0][2]
            && this.state.board_condition[0][0]=='O'
            )
            ||
            (
            this.state.board_condition[1][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[1][0]==this.state.board_condition[1][2]
            && this.state.board_condition[1][0]=='O'
            )
            ||
            (
            this.state.board_condition[2][0]==this.state.board_condition[2][1] 
            && this.state.board_condition[2][0]==this.state.board_condition[2][2]
            && this.state.board_condition[2][0]=='O'
            )
            //END CHECKING ACROSS COLUMNS IN EACH ROW
            ||
            
            //NOW CHECKING DOWN ROWS IN EACH COLUM
            (
            this.state.board_condition[0][0]==this.state.board_condition[1][0] 
            && this.state.board_condition[0][0]==this.state.board_condition[2][0]
            && this.state.board_condition[0][0]=='O'
            )
            ||
            (
            this.state.board_condition[0][1]==this.state.board_condition[1][1] 
            && this.state.board_condition[0][1]==this.state.board_condition[2][1]
            && this.state.board_condition[0][1]=='O'
            )
            ||
            (
            this.state.board_condition[0][2]==this.state.board_condition[1][2] 
            && this.state.board_condition[0][2]==this.state.board_condition[2][2]
            && this.state.board_condition[0][2]=='O'
            )
            //END CHECKING DOWN EACH ROW

            ||

            //NOW WE"RE CHECKING THE 2 DIAGONALS
            (
            this.state.board_condition[0][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[0][0]==this.state.board_condition[2][2]
            && this.state.board_condition[0][0]=='O'
            )
            ||
            (
            this.state.board_condition[2][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[2][0]==this.state.board_condition[0][2]
            && this.state.board_condition[2][0]=='O'
            )
        ) && this.props.acceptingWinnerStat==true
    
            //END CHECKING THE DIAGONALS
            )
            {
                //User 1 has won
                console.log("USER 1 HAS WON!");
                //set game to fin, show a diaglog or so and option to restart...
                //also if there is a restart, user's score must be incremented.
                //also code for the condition of a draw....

                this.props.userHasWon(true);
                this.props.setWinner(1);
                this.props.setWS(false);
                this.clearTable();

                this.props.socket.emit("winner-1", {myid:this.props.myid, opp: this.props.oppId});


            }

        else 
        if (
        (
            (this.state.board_condition[0][0]==this.state.board_condition[0][1] 
            && this.state.board_condition[0][0]==this.state.board_condition[0][2]
            && this.state.board_condition[0][0]=='X'
            )
            ||
            (
            this.state.board_condition[1][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[1][0]==this.state.board_condition[1][2]
            && this.state.board_condition[1][0]=='X'
            )
            ||
            (
            this.state.board_condition[2][0]==this.state.board_condition[2][1] 
            && this.state.board_condition[2][0]==this.state.board_condition[2][2]
            && this.state.board_condition[2][0]=='X'
            )
            //END CHECKING ACROSS COLUMNS IN EACH ROW
            ||
            
            //NOW CHECKING DOWN ROWS IN EACH COLUM
            (
            this.state.board_condition[0][0]==this.state.board_condition[1][0] 
            && this.state.board_condition[0][0]==this.state.board_condition[2][0]
            && this.state.board_condition[0][0]=='X'
            )
            ||
            (
            this.state.board_condition[0][1]==this.state.board_condition[1][1] 
            && this.state.board_condition[0][1]==this.state.board_condition[2][1]
            && this.state.board_condition[0][1]=='X'
            )
            ||
            (
            this.state.board_condition[0][2]==this.state.board_condition[1][2] 
            && this.state.board_condition[0][2]==this.state.board_condition[2][2]
            && this.state.board_condition[0][2]=='X'
            )
            //END CHECKING DOWN EACH ROW

            ||

            //NOW WE"RE CHECKING THE 2 DIAGONALS
            (
            this.state.board_condition[0][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[0][0]==this.state.board_condition[2][2]
            && this.state.board_condition[0][0]=='X'
            )
            ||
            (
            this.state.board_condition[2][0]==this.state.board_condition[1][1] 
            && this.state.board_condition[2][0]==this.state.board_condition[0][2]
            && this.state.board_condition[2][0]=='X'
            )
        ) && this.props.acceptingWinnerStat==true
    
            //END CHECKING THE DIAGONALS
            )
            {
                //User 2 has won
                console.log("USER 2 HAS WON!");
                
                this.props.userHasWon(true);
                this.props.setWinner(2);
                this.props.setWS(false);
                this.clearTable();

                this.props.socket.emit("winner-2", {myid:this.props.myid, opp: this.props.oppId});

                //set game to fin, show a diaglog or so and option to restart...
                //also if there is a restart, user's score must be incremented.
                //also code for the condition of a draw....
            }
            else if (this.isDraw()){

                console.log(
                    "This is a Draw!"
                );

                this.props.socket.emit("no-winner", {myid:this.props.myid, opp: this.props.oppId});

                this.clearTable();

            }
    }
    
    render(){

        return (
        <div className={"table"}>

            <Block props={this.props} id={1} row={0} col={0} data={this.state.board_condition}/>
            <Block props={this.props} id={2} row={0} col={1} data={this.state.board_condition} />
            <Block props={this.props} id={3} row={0} col={2} data={this.state.board_condition} />
            <br/>
            <Block props={this.props} id={4} row={1} col={0} data={this.state.board_condition} />
            <Block props={this.props} id={5} row={1} col={1} data={this.state.board_condition} />
            <Block props={this.props} id={6} row={1} col={2} data={this.state.board_condition} />
            <br/>
            <Block props={this.props} id={7} row={2} col={0} data={this.state.board_condition} />
            <Block props={this.props} id={8} row={2} col={1} data={this.state.board_condition} />
            <Block props={this.props} id={9} row={2} col={2} data={this.state.board_condition} />

        </div>

      );

    }

}

export default Table;
