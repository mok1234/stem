const pname = document.getElementById("Name")
const price = document.getElementById("Price")
const Output = document.getElementById("output")
const inpimg = document.getElementById("inputimg")
const img = document.getElementById("img")
const prod = document.getElementById("product")
console.log(price.value)
const path = "http://127.0.0.1:5000/product"
function click(val){
    let request = {
        method : "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            Pid : val
        })
        
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
            
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
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
                let button = document.createElement('button')
                button.innerHTML = "Delete"
                button.addEventListener("click",() =>{
                    click(pro[2])
                    Load()
                })
                dv.appendChild(img)
                dv.appendChild(name)
                dv.appendChild(price)
                dv.appendChild(button)
                prod.append(dv)
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}

Load()
function changeimage(){
    if(inpimg.value == ""){
        img.src='';
        return
    }
    console.log(inpimg.files[0])
    img.src = (window.URL ? URL : webkitURL).createObjectURL(inpimg.files[0])
}
function upload(){
    if(pname.value==""){
        alert("insert Name");
        return;
    }
    if(price.value==""){
        alert("insert price")
        return
    }
    if(price.value<=0){
        alert("price < 0")
        return  
    }
    if(inpimg.value==""){
        alert("insert image")
        return
    }
    // let formData = {
    //     Pname:pname.value,
    //     image:inpimg.files[0],
    //     price:price.value
    // }
    const reader = new FileReader();
    reader.onload = function(event) {
        let base64string =  base64String = event.target.result.split(',')[1]
        let formData = {
            Pname:pname.value,
            image:base64string,
            price:price.value
        }
        let request = {
            method : "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(formData)
            
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
                console.log('Post request response:', data);
                Output.innerHTML = data.message;
                Load()
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
            pname.value = ""
        price.value = 
        inpimg.value = ""
        img.src = ""
    }
    reader.readAsDataURL(inpimg.files[0])
    // let request = {
    //     method : "PUT",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body : JSON.stringify(formData)
        
    // }
    // fetch("http://127.0.0.1:5000/product", request)
    //     .then(response => {
    //         // Check if the request was successful
    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }
    //         // Parse the JSON response
    //         return response.json();
    //     })
    //     .then(data => {
    //         // Handle the data returned from the server
    //         console.log('Post request response:', data);
    //         Output.innerHTML = data.message;
    //     })
    //     .catch(error => {
    //         // Handle any errors that occurred during the fetch
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
        
}
