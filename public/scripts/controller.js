function entKeyControll(){
    //Enterkey controll
    document.getElementById('textInput').onkeypress = function(){
        if(event.keyCode == 13){
            if(document.getElementById('textInput').value != ''){
                document.getElementById('button-addon2').click();
            }
        }
    }    
}

function redirectHome(){
    // if name value null
    if(localStorage.name == '' || localStorage.name == null || localStorage.name == undefined){
        alert('이름을 설정하세요')
        location.href='/'
    }    
}


function init(){
    entKeyControll();
    redirectHome();
}

init();