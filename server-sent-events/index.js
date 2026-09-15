const app = require("express")();

// let jobs = {};


app.get("/", (req, res) => {
   res.send("Hello!");
});


app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
   
})

const port = process.env.PORT || 8888;


let i = 0;
function send(res) {
    res.write("data: " + `hello from the server -- [${i++}]\n\n`);
    
    setTimeout(() => send(res), 1000);
}

app.listen(port);

console.log(`Listening on ${port}`);