let grabInput;

function Load(){
    /*var mydata = JSON.parse(data);
    alert(mydata[0].name);
    alert(mydata[0].age);
    alert(mydata[1].name);
    alert(mydata[1].age);*/
}


function savetoJSON(){
    grabInput = document.getElementById("inputTxt").value;
    localStorage.setItem("inputTxt", grabInput);
}

function loadfromJSON(){
    document.getElementById("outputTxt").innerText = localStorage.getItem("inputTxt");
}