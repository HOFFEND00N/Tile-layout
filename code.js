var currentColor = "white";
const height = 132;
const width = 48;
var counterMap = new Map();
var colorsMap = new Map();
InitializeCounterMap(counterMap);
InitializeColorsMap(colorsMap);
function InitializeColorsMap(e)
{
    e.set('brown', 'brown');
    e.set('red', 'red');
    e.set('rgb(220, 85, 57)', 'brick');
    e.set('grey', 'grey');
    e.set('rgb(195, 176, 145)', 'haki');
    e.set('rgb(137, 255, 137)', 'green');
    e.set('white', 'white');
    e.set('rgb(58, 163, 255)', 'blue')
    e.set('rgb(76, 133, 255)', 'darkBlue');
    e.set('rgb(0, 173, 112)', 'darkGreen');
    e.set('black', 'black');
}

function InitializeCounterMap(e) {
    e.set('brown', 306);
    e.set('red', 792);
    e.set('rgb(220, 85, 57)', 630);
    e.set('grey', 219);
    e.set('rgb(195, 176, 145)', 1072);
    e.set('rgb(137, 255, 137)', 780);
    e.set('white', 14);
    e.set('rgb(58, 163, 255)', 954)
    e.set('rgb(76, 133, 255)', 152);
    e.set('rgb(0, 173, 112)', 261);
    e.set('black', 176);
}

function tableCreate() {
    var tdId = 0;
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.id = "dataTable";
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < width; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < height; j++) {
            var td = document.createElement('td');
            td.id = tdId;
            tdId++;
            td.backgroundColor = "white";
            tr.appendChild(td);
            td.onclick = function () {
                var tmp = event.target.id;
                var td = document.getElementById(tmp);
                var backColor = td.style.backgroundColor;
                console.log(backColor);
                if (backColor !== '') {
                    counterMap.set(backColor, counterMap.get(backColor) + 1);
                    document.getElementById(colorsMap.get(backColor) + 'Cnt').innerHTML = counterMap.get(backColor);
                }
                counterMap.set(currentColor, counterMap.get(currentColor) - 1);
                document.getElementById(colorsMap.get(currentColor) + 'Cnt').innerHTML = counterMap.get(currentColor);
                td.style.backgroundColor = currentColor;
                console.log('Color changed. Element =', tmp);
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

function ChangeColor() {
    var buttonId = event.target.id;
    var button = document.getElementById(buttonId);
    currentColor = button.style.backgroundColor;
}

function DownloadTable() {
    var dataTable = document.getElementById("dataTable");
    var lines = [];
    var rows = Array.from(dataTable.querySelectorAll("tr"));
    for(var row of rows) {
        for (let i = 0; i < height; i++) {
            var color = row.children[i].style.backgroundColor; 
            lines.push(color  + "\n");
        }
    }
    
    var txtBlob = new Blob(lines, {type: "text/plain"});
    var blobUrl = URL.createObjectURL(txtBlob);
    var anchorElement = document.createElement("a");
    
    anchorElement.href = blobUrl;
    anchorElement.download = "Table-exprot.txt";
    anchorElement.click();
    
    setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
    }, 500);
}

function UploadTable() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            var color = content.split('\n');
            for(var i = 0 ; i < color.length - 1; i++) {
                var td = document.getElementById(i);
                currentColor = color[i];
                td.onclick = function () {
                    var tmp = event.target.id;
                    var td = document.getElementById(tmp);
                    var backColor = td.style.backgroundColor;
                    console.log(backColor);
                    if (backColor !== '') {
                        counterMap.set(backColor, counterMap.get(backColor) + 1);
                        document.getElementById(colorsMap.get(backColor) + 'Cnt').innerHTML = counterMap.get(backColor);
                    }
                    counterMap.set(currentColor, counterMap.get(currentColor) - 1);
                    document.getElementById(colorsMap.get(currentColor) + 'Cnt').innerHTML = counterMap.get(currentColor);
                    td.style.backgroundColor = currentColor;
                    console.log('Color changed. Element =', tmp);
                }
                if(currentColor != '')
                    td.click();
            }
        }
    }
    input.click();
}