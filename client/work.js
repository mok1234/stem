const classinp = document.getElementById("classinp")
const room = document.getElementById("room")
const studentid = document.getElementById("studentid")
const sid = document.getElementById("sid")
const workname = document.getElementById("workname")
const deadline = document.getElementById("deadline")
const score = document.getElementById("score")
console.log(score)
const img = document.getElementById("img")
const tab = document.getElementById("tab")
const classes = document.getElementById("classes")
const firstname = document.getElementById("name")
const deafult = tab.innerHTML
const path = "http://127.0.0.1:5000/user"

function del(wid){
    let formData = {
        WorkID : wid
    }
    let request = {
        method : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/work", request)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Handle the data returned from the server
            console.log('Post request response:', data);
            Load()
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}
function send(method){
    let Score =0
    if(workname.value.length==0){
        alert("insert workname")
        return
    }
    if(deadline.value.length==0){
        alert("insert deadline")
        return
    }
    if(score.value.length > 0){
        Score = score.value
    }
    let formData = {
        Score: Score,
        WorkName : workname.value,
        DeadLine : deadline.value
    }
    if(method == "student"){
        if(studentid.value.length==0){
            alert("insert studentID")
            return
        }
        formData["StudentID"] = studentid.value
    }
    else{
        if(classinp.value.length == 0){
            alert("insert class")
            return
        }
        if(room.value.length == 0){
            alert("insert room")
            return
        }
        formData["Room"] = room.value
        formData["Class"] = classinp.value 
    }
    let request = {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
    }
    fetch("http://127.0.0.1:5000/work", request)
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Handle the data returned from the server
        console.log('Post request response:', data);
        if(method == "student"){
            Load()
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });

}
function Load(){
    firstname.innerHTML = "Name : "
    classes.innerHTML = "class : "
    sid.innerHTML = "StudentId : "
    tab.innerHTML = deafult
    if(studentid.value==""){
        return
    }
    let formData = {
        studentID : studentid.value
    }
    let request = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/user", request)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Handle the data returned from the server
            console.log('Post request response:', data);
            if(data.message){
                output.innerHTML = data.message
                return
            }
            if(data.data){
                firstname.innerHTML = "Name : "+data.data[0]+" "+data.data[1]
                classes.innerHTML = "class : "+data.data[2]+"/"+data.data[3]
                img.src = path+"/"+data.data[7]+".jpeg"
                sid.innerHTML = "StudentId : "+data.data[7]
                // for(let i = 0;i<data.attendance.length;i++){
                //     let tr = document.createElement("tr")
                //     let date = document.createElement("th")
                //     let time = document.createElement("th")
                //     date.innerHTML = data.attendance[i][0]
                //     time.innerHTML = data.attendance[i][1]
                //     tr.appendChild(date)
                //     tr.appendChild(time)
                //     tab.append(tr)
                // }
                for(let i = 0;i<data.work.length;i++){
                    let tr = document.createElement("tr")
                    let name = document.createElement("th")
                    let deadline = document.createElement("th")
                    let score = document.createElement("th")
                    name.innerHTML = data.work[i][0]
                    deadline.innerHTML = data.work[i][1]
                    score.innerHTML = data.work[i][2]
                    let button = document.createElement("button")
                    button.innerHTML = "Delete"
                    button.addEventListener("click",()=>{
                        del(data.work[i][4])
                    })
                    tr.appendChild(name)
                    tr.appendChild(deadline)
                    tr.appendChild(score)
                    tr.appendChild(button)
                    tab.append(tr)
                }
                
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}