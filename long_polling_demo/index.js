const app = require("express")();

const jobs = {};

/* serving a little html on / 
* so I can use localhost:8080 to send fetches  
* the / is a real html document without a default-src = 'none' to avoid csp issues
* the / also is the same origin as the fetches url so no isssues with cors
*/
app.get("/", (req, res) => {
  res.end("<!doctype html><title>ok</title>ok");
});

app.post("/submit", (req,res) => {
    const jobId = `job:${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId,0);
    res.end("\n\n" + jobId + "\n\n");
})


app.get("/checkstatus", async (req,res) => {
    console.log(jobs[req.query.jobId]);

    while(await checkJobComplete(req.query.jobId) == false);
    res.end("\n\nJobStatus: Complete "  + jobs[req.query.jobId] + "%\n\n");

});



app.listen(8080, () => console.log("Listening on port 8080"));


async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if(jobs[jobId] < 100)
           setTimeout(() => resolve(false), 1000)
        else 
            resolve(true)
    })
}

function updateJob(jobId, prg) {
    jobs[jobId] = prg;
    
    console.log(`updated ${jobId} to ${prg}`);
     
    if(prg == 100) return;

    this.setTimeout(() => {
        updateJob(jobId, prg + 10)
    }, 3000);
}


