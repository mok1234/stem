const CardIdBox = document.getElementById("CardId")
const Value = document.getElementById("Value")
const Output = document.getElementById("output")
const prod = document.getElementById("product")
const selected = document.getElementById("selected")
const firstname = document.getElementById("firstname")
const classes = document.getElementById("class")
const sid = document.getElementById("sid")
const simage = document.getElementById("simage")
const money = document.getElementById("money")
const credit = document.getElementById("credit")
var Product = {}
var cost = 0
const path = "http://127.0.0.1:5000/product"
const path2 = "http://127.0.0.1:5000/user"
function click(val){
    console.log(val)
    cost+=val[1]
    Value.innerHTML = "price : "+cost
    let dv = document.createElement("div")
    let img = document.createElement("img")
    img.src = path+"/"+val[2]+".jpeg"
    dv.appendChild(img)     
    let name = document.createElement("p")
    let price = document.createElement("p")
    name.innerHTML = "Name : "+val[0]
    price.innerHTML = "price : "+val[1]
    dv.addEventListener("click",()=>{
        cost-=val[1]
        Value.innerHTML ="price : "+ cost
        dv.remove()
    })
    dv.appendChild(img)
    dv.appendChild(name)
    dv.appendChild(price)
    selected.appendChild(dv)
    
}
function Load(){
    prod.innerHTML = ""
    let request = {
        method : "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        
    }
    fetch("http://127.0.0.1:5000/product", request)
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
            console.log('Post request response:', data.data);
            Product = data.data
            for(let i = 0;i<Product.length;i++){
                let pro = Product[i]
                let dv = document.createElement("div")
                let img = document.createElement("img")
                img.src = path+"/"+pro[2]+".jpeg"
                dv.appendChild(img)
                let name = document.createElement("p")
                let price = document.createElement("p")
                name.innerHTML = "Name : "+pro[0]
                price.innerHTML = "price : "+pro[1]
                dv.addEventListener("click",()=>{
                    click(pro)
                })
                dv.appendChild(img)
                dv.appendChild(name)
                dv.appendChild(price)
                prod.append(dv)
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}

Load()
        
function Loadimage(){
    if(CardIdBox.value.length<10){
        return
    }
    let formData = {
        cardID : CardIdBox.value
    }
    firstname.innerHTML = "Name : "
    classes.innerHTML = "class : "
    sid.innerHTML = "StudetId : "
    money.innerHTML = "money : "
    credit.innerHTML = "credit : "
    console.log(CardIdBox.value)
    let request = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/money", request)
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
                simage.src = path2+"/"+data.data[5]+".jpeg"
                sid.innerHTML = "StudentId : "+data.data[5]
                money.innerHTML = "money : "+data.data[6]
                credit.innerHTML = "credit : "+data.data[7]
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}
function pay(){
    if(CardIdBox.value.length <10){
        alert("insert Valid CardId")
        return
    }
    let formData = {
        cardID : CardIdBox.value,
        Value : cost 
    }
    let request = {
        method : "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
        
    }
    fetch("http://127.0.0.1:5000/money", request)
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
        Output.innerHTML = data.message;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });
    cost = 0    
    simage.src = ""
    selected.innerHTML = ""
    CardIdBox.value = ""
    Value.innerHTML ="price : 0"    
    firstname.innerHTML = "Name : "
    classes.innerHTML = "class : "
    sid.innerHTML = "StudetId : "
    money.innerHTML = "money : "
    credit.innerHTML = "credit : "
}
