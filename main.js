str     = ''; 
l_type  = 0;  
i       = 0;
arr     = [];
typeArr = [];
keyDown = false;
display = document.querySelector(".displayText"); 

document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'btn') {
    	val  = evt.target.innerHTML;
        type = evt.target.getAttribute("type");
        createDisplay(type, val)  
    }
}, false); 


document.onkeyup = function(e){
	if (e.key == "Shift") {
        keyDown = false;
    }
}

document.onkeydown = checkKey; 
function checkKey(e) {
	if (e.key == "Shift") {
        keyDown = true;
    }
    if (keyDown == false) {
        e = e || window.event;
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            createDisplay(1, e.key)
        } else if (e.keyCode == 190) {
            createDisplay(1, e.key)
        } else if (e.keyCode == 8) {
            undoText()
        } else if (e.key == "/" || e.key == "-") {
            createDisplay(2, e.key)
        } else if (e.key == "Enter") {
            calculate()
        }
    }
    else if (keyDown == true) {
       if (e.key == "+" || e.key == "*") {
            createDisplay(2, e.key)
       }
    } 
}


function createDisplay(type, val) {
    if (type == 1 || type == 2) { 
        if (l_type == 0 && type == 1) {
            arr[i] = val;
            typeArr[i] = 1;
        }
        if (l_type == 1 && type == 1) {
            ldt = arr[i] || '';
            arr[i] = ldt + val;
            typeArr[i] = 1;
        } else if (l_type == 2 && type == 1) {
            i++;
            arr[i] = val;
            typeArr[i] = 1;
        } else if (l_type == 1 && type == 2) {
            i++;
            arr[i] = val;
            typeArr[i] = 2;
        } else if (l_type == 2 && type == 2) {
            arr[i] = val;
            typeArr[i] = 2;
        }

        if (l_type == 0 && type == 1 || l_type > 0) {
            l_type = type;
        } 
        displayText(arr)  
    } else if (type == 3) {
        calculate(arr)
    } else if (type == 4) {
        str = '';
        arr = [];
        l_type = 0;
        display.innerHTML = ''; 
    } else if (type == 5) {
        undoText(arr)
    }
}

function undoText() { 
    lstTp = typeArr[i] || 1; 
    lstVl = arr[i] || '';    

    if (lstTp == 1) {
        lstVl = String(lstVl);
        newVl = lstVl.slice(0, -1);
        if (newVl == '') {
            arr.splice(arr.length - 1);
            typeArr.splice(typeArr.length - 1);

            if (arr != '' && arr.length > 1) {
                i = i - 1;
                l_type = 2;
            } else {
                l_type = 0;
            }
        } else {
            arr[i] = newVl;
            l_type = 1;
        }
    } else {
        arr.splice(arr.length - 1);
        typeArr.splice(typeArr.length - 1);
        i = i - 1;
        l_type = 1;
    }
    displayText(arr)
}

function displayText(arr = '') {
    str = '';
    if (arr != '') {
        for (ii in arr) {
            str += arr[ii];
        }
    }
    display.innerHTML = str; 
}

function calculate() {
    final = 0;
    lc_type = 0; 
    ls_func = ''; 
    if (arr != '') {
        for (ii in arr) {
            vl = arr[ii];
            type = typeArr[ii];
            num = parseFloat(vl);
            if (type == 1 && lc_type == 0) {
                final = num;
            } else if (type == 2 && lc_type == 1) {
                ls_func = vl;
            } else if (type == 1 && lc_type == 2) {
                if (ls_func == "+") {
                    final = final + num;
                } else if (ls_func == "-") {
                    final = final - num;
                } else if (ls_func == "*") {
                    final = final * num;
                } else if (ls_func == "/") {
                    final = final / num;
                } else if (Is_func == "%" ) {
                    final = final % num
                }
            }
            lc_type = type;
        }
    }

    str = final;
    arr = [];
    typeArr = [];
    l_type = 1;
    i = 0;
    arr[i] = final;
    typeArr[i] = 1;
    display.innerHTML = final 
}

