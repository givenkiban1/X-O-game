const express = require('express')

const app = express()

app.use(express.static('public'))

console.log("we're live");

app.get('/' , (req, res)=> {
    res.send("Hellow world!");
    console.log("we are live baby!");
})


const server = app.listen(3007);
var x = 0;
const io = require("socket.io")(server);
    console.log("socket is on");

var d = [];
var data_log = []; //insert {}
var games = []; //insert {}
var users = [];

    io.on("connection" , (socket)=>{
        console.log("connection made");



 
        var user_id = -1;
 
 
        socket.on("add-user", (data)=>{
    
          if (data==null){
            console.log("add user called");
            d.push(x);
            user_id = x;
            console.log("user",x,"just joined");
            x++;
            socket.emit("newby-recognized", {id:user_id});
          }
          else{

            if (d.indexOf(data.id)<0){
                d[data.id] = data.id;
            }

            user_id = data.id;
            console.log("user id",user_id);

          }
          console.log("connect called, user's online:", users_left(d));
          //socket.emit, this is sending back to the socket that just connected
          //socket.broadcast.emit, this is sedning back to every other socket but this one\
          //io.emit, broadcasts to all 
          io.emit("users-online", {number:users_left(d) , users_online: d})
        });


        socket.on("want-2-play", (data)=>{

            socket.broadcast.emit("want-2-play-req", data);

        })

        socket.on("challenge-accepted" , (data)=>{
            socket.broadcast.emit("challenge-accepted-noty", data);
        })

        socket.on("challenge-rejected" , (data)=>{
            socket.broadcast.emit("challenge-rejected-noty", data);
        })

        socket.on("move-played", (data)=>{
            console.log("move-played");
            socket.broadcast.emit("move-played-noty", data);
            console.log(data);
        })

        socket.on("winner-1", (data)=>{
            socket.broadcast.emit("winner-1-noty", data);
        })

        socket.on("winner-2", (data)=>{
            socket.broadcast.emit("winner-2-noty", data);
        })

        socket.on("no-winner", (data)=>{
            socket.broadcast.emit("no-winner-noty", data);
        })

        socket.on('disconnect', () => {
            delete d[user_id];
            console.log("disconnect called, user's online:", users_left(d));
            console.log(d);
            io.emit("users-online", {number:users_left(d) , users_online: d})
            socket.broadcast.emit('user-left', {
                username: user_id,
                users_left:users_left(d),
              });
              user_id = -1;
            
          });

          //functions
          var users_left = function(x){
            
            var count = 0;
            
            for (var q=0; q<d.length; q++){
                  
                if (d[q]!= null){
                    count++;
                }
            }

            return count;
          }

       
    });

