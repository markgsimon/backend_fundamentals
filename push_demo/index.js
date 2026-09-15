const http = require("http");
const WebSocketServer = require('websocket').server;
let connections = [];

//create a raw http server (this will help us create the TCP which will then pass to the websocket)
const httpServer = http.createServer();


// pass the http server object to the WebSocketServer library to do allthe job, this class will override
const wss = new WebSocketServer({httpServer: httpServer});

httpServer.listen(8080, () => console.log("My server is listening on port 8080"));



wss.on("request", request => {
    const connection = request.accept(null, request.origin);

    connection.on("message", message => {
        // someone just send a message, push to everyone, tell everybody
        console.log(`Message received: ${connection.socket.remotePort} says ${message.utf8Data}`)
        connections.forEach (c => c.sendUTF(`Users${connection.socket.remotePort} says something ${message.utf8Data}`));
    })
    
    connections.push(connection);

    // someone just connected tell everybody
    connections.forEach(c => c.sendUTF(`Users ${connection.socket.remotePort} just connected`));


    connection.on("close", (reasoncode, description) => {
        connections = connections.filter(conn => conn != connection);
        console.log('Peer disconnected.');
    })

    // httpServer.listen(8080, () => {
    //     console.log('Server is listening on port 8080');
    // })

})
