const cardID = document.getElementById("cid")
const firstname = document.getElementById("firstname")
const classes = document.getElementById("class")
const money = document.getElementById("money")
const credit = document.getElementById("credit")
const sid = document.getElementById("sid")
const img = document.getElementById("img")
const output = document.getElementById("output")
const ssid = document.getElementById("ssid")
const tab = document.getElementById("tab")
const deafult = tab.innerHTML
function Load(formData){
    firstname.innerHTML = "Name : "
    classes.innerHTML = "class : "
    money.innerHTML ="money : "
    credit.innerHTML = "credit : "
    sid.innerHTML = "StudetId : "
    cardID.value = ""
    img.src = ""
    tab.innerHTML = deafult
    let request = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/attendance", request)
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
            for(let i = 0;i<data.data.length;i++){
                let tr = document.createElement("tr")
                let date = document.createElement("th")
                let time = document.createElement("th")
                date.innerHTML = data.data[i][0]
                time.innerHTML = data.data[i][1]
                tr.appendChild(date)
                tr.appendChild(time)
                tab.append(tr)
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
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
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
            cardID.value = ""
            ssid.value = ""
}
const path = "http://127.0.0.1:5000/user"
function check(method){
    let formData = {
        
    }
    if(method == "cid"){
        if(cardID.value.length < 10){
            alert("insert valid cardID")
            return
        }
        formData["cardID"] = cardID.value
    }
    else{
        if(ssid.value.length == 0){
            alert("insert valid studentid")
            return
        }
        formData["studentID"] = ssid.value
    }
    
    let request = {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/attendance", request)
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
            }
            if(data.message=="card change or not register yet"){
                return 
            }
            Load(formData)
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });

}