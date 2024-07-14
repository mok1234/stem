const studentID  = document.getElementById("StudentID")
const output = document.getElementById("output")
const money = document.getElementById("money")
const credit = document.getElementById("credit")
const img = document.getElementById("img")
const path = "http://127.0.0.1:5000"
function changeimg(){
    img.src = path+"/user/"+studentID.value+".jpeg"
}
function deposit(){
    if(studentID.value.length == 0){
        alert("insert studentID")
        return
    }
    if(credit.value.length+money.value.length == 0){
        alert("insert credit or money")
        return
    }
    let formData = {
        studentID : studentID.value
    }
    if(credit.value.length>0){
        formData["credit"] = credit.value
    }
    if(money.value.length>0){
        formData["money"] = money.value
    }
    console.log(formData)
    let request = {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch(path+"/money", request)
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
            output.innerHTML = data.message
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
        studentID.value=""
        money.value=""
        credit.value=""
        img.src =""
}