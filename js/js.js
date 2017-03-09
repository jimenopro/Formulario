var nota = 0;
var respuestasMultiple1 = [];
var respuestasMultiple2 = [];
var respuestaText1 = null;
var respuestaText2 = null;
var respuestasRadio1 = [];
var respuestasRadio2 = [];
var respuestaSelect1 = null;
var respuestaSelect2 = null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var formElement = null;


window.onload = function () {

    //correccion
    formElement = document.getElementById('myForm');
    formElement.onsubmit = function () {
        inicializar();
        if (comprobar()) {
            corRadio1();
            corText1();
            corCheckbox1();
            corSelect1();
            corMultiple1();
            corText2();
            corMultiple2();
            corRadio2();
            corSelect2();
            corCheckbox2();
            Nota();
        }
        return false;
    };

//xml request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "https://rawgit.com/jimenopro/Formulario/master/xml/PreguntasXML.xml", true);
    xhttp.send();
}


function gestionarXml(dadesXml) {
    //parsear xml
    var xmlDoc = dadesXml.responseXML; 

    //radio
    var tituloRadio1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
    var tituloRadio2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    var opcionesRadio1 = [];
    var opcionesRadio2 = [];
    var noptr1 = xmlDoc.getElementById("p01").getElementsByTagName('option').length;
    var noptr2 = xmlDoc.getElementById("p08").getElementsByTagName('option').length;
    for (i = 0; i < noptr1; i++) {
        opcionesRadio1[i] = xmlDoc.getElementById("p01").getElementsByTagName('option')[i].innerHTML;
    }
    for (i = 0; i < noptr2; i++) {
        opcionesRadio2[i] = xmlDoc.getElementById("p08").getElementsByTagName('option')[i].innerHTML;
    }
    putDataRadio1(tituloRadio1, opcionesRadio1);
    putDataRadio2(tituloRadio2, opcionesRadio2);
    var nresr1 = xmlDoc.getElementById("p01").getElementsByTagName('answer').length;
    var nresr2 = xmlDoc.getElementById("p08").getElementsByTagName('answer').length;
    for (i = 0; i < nresr1; i++) {
        respuestasRadio1[i] = xmlDoc.getElementById("p01").getElementsByTagName("answer")[i].innerHTML;
    }
    for (i = 0; i < nresr2; i++) {
        respuestasRadio2[i] = xmlDoc.getElementById("p08").getElementsByTagName("answer")[i].innerHTML;
    }

    //texto
    var tituloText1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
    var tituloText2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    putDataText1(tituloText1);
    putDataText2(tituloText2);
    respuestaText1 = String(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
    respuestaText2 = String(xmlDoc.getElementsByTagName("answer")[7].innerHTML);

    //select
    var tituloSelect1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
    var tituloSelect2 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    var opcionesSelect1 = [];
    var opcionesSelect2 = [];
    var nopts1 = xmlDoc.getElementById("p04").getElementsByTagName('option').length;
    var nopts2 = xmlDoc.getElementById("p09").getElementsByTagName('option').length;
    for (i = 0; i < nopts1; i++) {
        opcionesSelect1[i] = xmlDoc.getElementById("p04").getElementsByTagName('option')[i].innerHTML;
    }
    for (i = 0; i < nopts2; i++) {
        opcionesSelect2[i] = xmlDoc.getElementById("p09").getElementsByTagName('option')[i].innerHTML;
    }
    putDataSelect1(tituloSelect1, opcionesSelect1);
    putDataSelect2(tituloSelect2, opcionesSelect2);
    respuestaSelect1 = parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
    respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[12].innerHTML);

    //multiple
    var tituloMultiple1 = xmlDoc.getElementsByTagName("title")[4].innerHTML;
    var tituloMultiple2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
    var opcionesMultiple1 = [];
    var opcionesMultiple2 = [];
    var noptm1 = xmlDoc.getElementById("p05").getElementsByTagName('option').length;
    var noptm2 = xmlDoc.getElementById("p07").getElementsByTagName('option').length;
    var nresm1 = xmlDoc.getElementById("p05").getElementsByTagName('answer').length;
    var nresm2 = xmlDoc.getElementById("p07").getElementsByTagName('answer').length;
    for (i = 0; i < noptm1; i++) {
        opcionesMultiple1[i] = xmlDoc.getElementById("p05").getElementsByTagName('option')[i].innerHTML;
    }
    for (i = 0; i < noptm2; i++) {
        opcionesMultiple2[i] = xmlDoc.getElementById("p07").getElementsByTagName('option')[i].innerHTML;
    }
    putDataMultiple1(tituloMultiple1, opcionesMultiple1);
    putDataMultiple2(tituloMultiple2, opcionesMultiple2);
    for (i = 0; i < nresm1; i++) {
        respuestasMultiple1[i] = xmlDoc.getElementById("p05").getElementsByTagName("answer")[i].innerHTML;
    }
    for (i = 0; i < nresm2; i++) {
        respuestasMultiple2[i] = xmlDoc.getElementById("p07").getElementsByTagName("answer")[i].innerHTML;
    }

    //checkbox
    var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].innerHTML;
    var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
    var opcionesCheckbox1 = [];
    var opcionesCheckbox2 = [];
    var noptc1 = xmlDoc.getElementById("p03").getElementsByTagName('option').length;
    var noptc2 = xmlDoc.getElementById("p10").getElementsByTagName('option').length;
    for (i = 0; i < noptc1; i++) {
        opcionesCheckbox1[i] = xmlDoc.getElementById("p03").getElementsByTagName('option')[i].innerHTML;
    }
    for (i = 0; i < noptc2; i++) {
        opcionesCheckbox2[i] = xmlDoc.getElementById("p10").getElementsByTagName('option')[i].innerHTML;
    }
    putDataCheckbox1(tituloCheckbox1, opcionesCheckbox1);
    putDataCheckbox2(tituloCheckbox2, opcionesCheckbox2);
    var nresc1 = xmlDoc.getElementById("p03").getElementsByTagName('answer').length;
    var nresc2 = xmlDoc.getElementById("p10").getElementsByTagName('answer').length;
    for (i = 0; i < nresc1; i++) {
        respuestasCheckbox1[i] = xmlDoc.getElementById("p03").getElementsByTagName("answer")[i].innerHTML;
    }
    for (i = 0; i < nresc2; i++) {
        respuestasCheckbox2[i] = xmlDoc.getElementById("p10").getElementsByTagName("answer")[i].innerHTML;
    }
}


//corregir
function corRadio1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.rio.length; i++) {
        if (f.rio[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio1.length; j++) {
                if (i + 1 == respuestasRadio1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasRadio1.length;
                darRespuestaHtml("Pregunta 1: " + (i + 1) + " correcta");
            } else {
                nota -= 1.0 / respuestasRadio1.length;
                darRespuestaHtml("Pregunta 1: " + (i + 1) + " incorrecta");
            }
        }
    }
}

function corRadio2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.capital.length; i++) {
        if (f.capital[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio2.length; j++) {
                if (i + 1 == respuestasRadio2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasRadio2.length;
                darRespuestaHtml("Pregunta 8: " + (i + 1) + " correcta");
            } else {
                nota -= 1.0 / respuestasRadio2.length;
                darRespuestaHtml("Pregunta 8: " + (i + 1) + " incorrecta");
            }
        }
    }
}

function corText1() {
    var t = document.getElementById("text1").value;
    var s = t.toUpperCase();
    var res = respuestaText1.toUpperCase();
    if (s == res) {
        darRespuestaHtml("Pregunta 2: Correcto");
        nota += 1;
    } else {
        darRespuestaHtml("Pregunta 2: Incorrecto");
        nota -= 1;
    }
}

function corText2() {
    var t = document.getElementById("text2").value;
    var s = t.toUpperCase();
    var res = respuestaText2.toUpperCase();
    if (s == res) {
        darRespuestaHtml("Pregunta 6: Correcto");
        nota += 1;
    } else {
        darRespuestaHtml("Pregunta 6: Incorrecto");
        nota -= 1;
    }
}

function corSelect1() {
    var sel = formElement.elements[9];
    if (sel.selectedIndex == respuestaSelect1) {
        darRespuestaHtml("Pregunta 4: Correcto");
        nota += 1;
    } else
        darRespuestaHtml("Pregunta 4: Incorrecto");
}

function corSelect2() {
    var sel = formElement.elements[17];
    if (sel.selectedIndex == respuestaSelect2) {
        darRespuestaHtml("Pregunta 9: Correcto");
        nota += 1;
    } else
        darRespuestaHtml("Pregunta 9: Incorrecto");
}

function corCheckbox1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.isla.length; i++) {
        if (f.isla[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox1.length; j++) {
                if (i + 1 == respuestasCheckbox1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox1.length;
                darRespuestaHtml("Pregunta 3: correcta");
            } else {
                nota -= 1.0 / respuestasCheckbox1.length;
                darRespuestaHtml("Pregunta 3:  incorrecta");
            }
        }
    }
}

function corCheckbox2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.ralph.length; i++) {
        if (f.ralph[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox2.length; j++) {
                if (i + 1 == respuestasCheckbox2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox2.length;
                darRespuestaHtml("Pregunta 10:  correcta");
            } else {
                nota -= 1.0 / respuestasCheckbox2.length;
                darRespuestaHtml("Pregunta 10:  incorrecta");
            }
        }
    }
}

function corMultiple1() {
    var mul = document.getElementsByClassName("opmult1");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple1.length; j++) {
                if (i + 1 == respuestasMultiple1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple1.length;
                darRespuestaHtml("Pregunta 5:  correcta");
            } else {
                nota -= 1.0 / respuestasMultiple1.length;
                darRespuestaHtml("Pregunta 5:  incorrecta");
            }
        }
    }
}

function corMultiple2() {
    var mul = document.getElementsByClassName("opmult2");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple2.length; j++) {
                if (i + 1 == respuestasMultiple2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple2.length;
                darRespuestaHtml("Pregunta 7:  correcta");
            } else {
                nota -= 1.0 / respuestasMultiple2.length;
                darRespuestaHtml("Pregunta 7:  incorrecta");
            }
        }
    }
}


// datos a html
function putDataRadio1(t, opt) {
    var radioContainer = document.getElementById('radioDiv1');
    document.getElementById('tituloRadio1').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "rio";
        input.id = "rio_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function putDataRadio2(t, opt) {
    var radioContainer = document.getElementById('radioDiv2');
    document.getElementById('tituloRadio2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "capital";
        input.id = "capital_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function putDataCheckbox1(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv1');
    document.getElementById('tituloCheckbox1').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "isla_" + i);
        input.type = "checkbox";
        input.name = "isla";
        input.id = "isla_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function putDataCheckbox2(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "ralph_" + i);
        input.type = "checkbox";
        input.name = "ralph";
        input.id = "ralph_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function putDataSelect1(t, opt) {
    document.getElementById("tituloSelect1").innerHTML = t;
    var select = document.getElementById("select1");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}

function putDataSelect2(t, opt) {
    document.getElementById("tituloSelect2").innerHTML = t;
    var select = document.getElementById("select2");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}

function putDataMultiple1(t, opt) {
    document.getElementById("tituloMultiple1").innerHTML = t;
    var multiple = document.getElementById("multiple1");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        option.className = "opmult1";
        multiple.options.add(option);
    }
}

function putDataMultiple2(t, opt) {
    document.getElementById("tituloMultiple2").innerHTML = t;
    var multiple = document.getElementById("multiple2");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        option.className = "opmult2";
        multiple.options.add(option);
    }
}

function putDataText1(t) {
    document.getElementById("tituloText1").innerHTML = t;
}

function putDataText2(t) {
    document.getElementById("tituloText2").innerHTML = t;
}


//respuestas
function darRespuestaHtml(r) {
    var p = document.createElement("p");
    var node = document.createTextNode(r);
    p.appendChild(node);
    document.getElementById('resultados').appendChild(p);
}

function Nota() {
    if(nota>9){
    darRespuestaHtml("Nota: " + nota + " puntos sobre 10, no existe la perfeccion, maki");
    }
    else{
        darRespuestaHtml("Nota: " + nota + " puntos sobre 10");
    }
}

function inicializar() {
    document.getElementById('resultados').innerHTML = "";
    nota = 0.0;
}

//hacer que se introduzcan datos 
function comprobar() {
    var f = formElement;

    var checked = false;
    for (i = 0; i < f.rio.length; i++) {
        if (f.rio[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[0].focus();
        alert("Rellena la pregunta 1");
        return false;
    }

    if (document.getElementById("text1").value == "") {
        f.elements[4].focus();
        alert("Rellena la pregunta 2");
        return false;
    }

    checked = false;
    for (i = 0; i < f.isla.length; i++) {
        if (f.isla[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[2].focus();
        alert("Rellena la pregunta 3");
        return false;
    }

    if (f.elements[9].selectedIndex == 0) {
        f.elements[9].focus();
        alert("Rellena la pregunta 4");
        return false;
    }

    if (f.elements[10].selectedIndex == 0) {
        f.elements[10].focus();
        alert("Rellena la pregunta 5");
        return false;
    }

    if (document.getElementById("text2").value == "") {
        f.elements[11].focus();
        alert("Rellena la pregunta 6");
        return false;
    }

    if (f.elements[12].selectedIndex == 0) {
        f.elements[12].focus();
        alert("Rellena la pregunta 7");
        return false;
    }

    checked = false;
    for (i = 0; i < f.capital.length; i++) {
        if (f.capital[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[7].focus();
        alert("Rellena la pregunta 8");
        return false;
    }

    if (f.elements[17].selectedIndex == 0) {
        f.elements[17].focus();
        alert("Rellena la pregunta 9");
        return false;
    }

    checked = false;
    for (i = 0; i < f.ralph.length; i++) {
        if (f.ralph[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[9].focus();
        alert("Rellena la pregunta 10");
        return false;
    }
    return true;
}