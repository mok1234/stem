const cardID = document.getElementById("cid")
const firstname = document.getElementById("firstname")
const classes = document.getElementById("class")
const money = document.getElementById("money")
const credit = document.getElementById("credit")
const sid = document.getElementById("sid")
const img = document.getElementById("img")
const output = document.getElementById("output")
const path = "http://127.0.0.1:5000/user"
const tab = document.getElementById("tab")
const work = document.getElementById("work")
const deafult2  = work.innerHTML
const grade = document.getElementById("grade")
const deafult = tab.innerHTML
function check(){
    firstname.innerHTML = "Name : "
    classes.innerHTML = "class : "
    money.innerHTML ="money : "
    credit.innerHTML = "credit : "
    sid.innerHTML = "StudentId : "
    work.innerHTML = deafult2
    if(cardID.value.length < 10){
        return
    }
    let formData = {
        cardID : cardID.value
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
                output.innerHTML = ""
                firstname.innerHTML = "Name : "+data.data[0]+" "+data.data[1]
                classes.innerHTML = "class : "+data.data[2]+"/"+data.data[3]
                money.innerHTML = "money : "+data.data[4]
                credit.innerHTML = "credit : "+data.data[5]
                console.log(path+"/"+data.data[7]+".jpeg")
                img.src = path+"/"+data.data[7]+".jpeg"
                sid.innerHTML = "StudentId : "+data.data[7]
                grade.innerHTML =""
                for(let i = 0;i<data.attendance.length;i++){
                    let tr = document.createElement("tr")
                    let date = document.createElement("th")
                    let time = document.createElement("th")
                    date.innerHTML = data.attendance[i][0]
                    time.innerHTML = data.attendance[i][1]
                    tr.appendChild(date)
                    tr.appendChild(time)
                    tab.append(tr)
                }
                for(let i = 0;i<data.work.length;i++){
                    let tr = document.createElement("tr")
                    let name = document.createElement("th")
                    let deadline = document.createElement("th")
                    let score = document.createElement("th")
                    name.innerHTML = data.work[i][0]
                    deadline.innerHTML = data.work[i][1]
                    score.innerHTML = data.work[i][2]
                    tr.appendChild(name)
                    tr.appendChild(deadline)
                    tr.appendChild(score)
                    work.append(tr)
                }
                for(let i = 1;i<=12;i++){
                    if(data.grade[i]){
                        let p = document.createElement("p")
                        p.innerHTML = "เกรด ม."+String(Math.floor((i+1)/2))+" เทอม "+ String(1+(i-1)%2)+" : "+String(data.grade[i]) 
                        grade.appendChild(p)
                    }
                }
                
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
        cardID.value = ""
}