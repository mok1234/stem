const FirstNameBox = document.getElementById("firstname")
const LastNameBox = document.getElementById("lastname")
const ClassBox = document.getElementById("class")
const RoomBox = document.getElementById("room")
const StudentIdBox = document.getElementById("StudentId")
const CardIdBox = document.getElementById("CardId")
const Output = document.getElementById("output")
const inpimg = document.getElementById("inputimg")
const img = document.getElementById("img")

function changeimage(){
    if(inpimg.value == ""){
        img.src='';
        return
    }
    console.log(inpimg.files[0])
    img.src = (window.URL ? URL : webkitURL).createObjectURL(inpimg.files[0])
}
function send(image){
    let formData = {
        firstname : FirstNameBox.value,
        lastname : LastNameBox.value,
        class : ClassBox.value,
        room : RoomBox.value,
        studentID : StudentIdBox.value,
        cardID : CardIdBox.value,
        image:image
    }
    let request = {
        method : "PATCH",
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
            Output.innerHTML = data.message
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}
function register(){
        if(StudentIdBox.value==""){
            alert("insert StudentId")
            return
        }
        if(CardIdBox.value.length!=0 && CardIdBox.value.length!=10){
            alert("Invalid CardId")
            return
        }
        if(inpimg.value !="" ){
            const reader = new FileReader();
            reader.readAsDataURL(inpimg.files[0])
            reader.onload = function(event) {
                let base64string =  base64String = event.target.result.split(',')[1]
                send(base64string)
            }
            reader.readAsDataURL(inpimg.files[0])
        }
        else{
            send("")
        }
        FirstNameBox.value=""
        LastNameBox.value=""
        ClassBox.value=""
        RoomBox.value=""
        StudentIdBox.value=""
        CardIdBox.value=""
        inpimg.value = ""
        img.src = ""
    }
    
    

