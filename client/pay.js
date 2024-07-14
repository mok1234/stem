const CardIdBox = document.getElementById("CardId")
const Value = document.getElementById("Value")
const Output = document.getElementById("output")
const prod = document.getElementById("product")
const selected = document.getElementById("selected")
const simage = document.getElementById("simage")
var Product = {}
var cost = 0
const path = "http://127.0.0.1:5000/product"
const path2 = "http://127.0.0.1:5000/user"
function click(val){
    console.log(val)
    cost+=val[1]
    Value.innerHTML = cost
    let dv = document.createElement("div")
    let img = document.createElement("img")
    img.src = path+"/"+val[2]+".jpeg"
    dv.appendChild(img)
    let name = document.createElement("p")
    let price = document.createElement("p")
    name.innerHTML = val[0]
    price.innerHTML = val[1]
    dv.addEventListener("click",()=>{
        cost-=val[1]
        Value.innerHTML = cost
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
                name.innerHTML = pro[0]
                price.innerHTML = pro[1]
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
        cardId : CardIdBox.value
    }
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
            img = data.image
            console.log(data.image)
            simage.src = path2+'/'+img+".jpeg"
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
    Value.value = "0"
    CardIdBox.value = ""
    Value.innerHTML ="0"    
}
