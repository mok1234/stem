const Output2 = document.getElementById("output2")
const studenttorem = document.getElementById("sid")
const cardtorem = document.getElementById("cid")



function remove(){
    if(studenttorem.value=="" && cardtorem.value==""){
        alert("insert Something")
        return
    }
    if(cardtorem.value.length!=0 && cardtorem.value.length!=10){
        alert("Invalid CardId")
        return
    }
    let formData = {
        studentID : studenttorem.value,
        cardID : cardtorem.value
    }
    let request = {
        method : "DELETE",
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
            Output2.innerHTML = data.message
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
        studenttorem.value=""
        cardtorem.value=""
}