const cardID = document.getElementById("cid")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const classes = document.getElementById("class")
const room = document.getElementById("room")
const money = document.getElementById("money")
const credit = document.getElementById("credit")
const sid = document.getElementById("sid")
const img = document.getElementById("img")
const output = document.getElementById("output")
const path = "http://127.0.0.1:5000/user"
function check(){
    firstname.innerHTML = ""
    lastname.innerHTML = ""
    classes.innerHTML = ""
    room.innerHTML = ""
    money.innerHTML =""
    credit.innerHTML = ""
    sid.innerHTML = ""
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
                firstname.innerHTML = data.data[0]
                lastname.innerHTML =data.data[1]
                classes.innerHTML = data.data[2]
                room.innerHTML = data.data[3]
                money.innerHTML = data.data[4]
                credit.innerHTML = data.data[5]
                console.log(path+"/"+data.data[7]+".jpeg")
                img.src = path+"/"+data.data[7]+".jpeg"
                sid.innerHTML = data.data[7]
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
        cardID.value = ""
}