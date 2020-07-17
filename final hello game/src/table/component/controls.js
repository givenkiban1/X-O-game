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

class Controls extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user: props.user,
          
          currentUser: props.currentUser,
        };



    }

    
    render(){

        const currentUser = this.props.currentUser;

        return (
        <Paper elevation={3} className={"Controls"}>
            
            {currentUser ? <div className={"control-item"}></div> : <div className={"control-item-none"}></div>
            }
            

            <Typography variant="h3" gutterBottom >
                <p className={"user-title"}> Player {this.props.user} </p>
            </Typography>
            
            <br/>

            <div className={"table-controls"}>
                {
                    this.props.user==1?
                <div className={"control-item-1"}></div>
                    :
                <div className={"control-item-2"}></div>
                }
            </div>

            <Typography variant="h3" gutterBottom >
                <p className={"user-score"}> Your score is </p>
            </Typography>
            
        </Paper>
      );

    }

}

export default Controls;
