const date = document.getElementById("date")
function updateTime() {
    date.innerHTML = new Date()
}

updateTime();
setInterval(updateTime, 1000);