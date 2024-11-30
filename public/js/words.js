const canvas = document.querySelector('canvas');
const ctx =  canvas.getContext('2d');
$letras = document.querySelector('#letras');
canvas.width = 700
canvas.height = 120
const dataContainer = document.getElementById('data-container'); const data = JSON.parse(dataContainer.getAttribute('data-json'));

/*Carga de  Letras*/    


const xmlString =`<TextureAtlas imagePath="sprites.png">
        <SubTexture name="letter_*" x="774" y="1032" width="256" height="256"/>
        <SubTexture name="letter_A" x="774" y="774" width="256" height="256"/>
        <SubTexture name="letter_B" x="774" y="516" width="256" height="256"/>
        <SubTexture name="letter_C" x="774" y="258" width="256" height="256"/>
        <SubTexture name="letter_D" x="774" y="0" width="256" height="256"/>
        <SubTexture name="letter_E" x="516" y="1548" width="256" height="256"/>
        <SubTexture name="letter_F" x="516" y="1290" width="256" height="256"/>
        <SubTexture name="letter_G" x="516" y="1032" width="256" height="256"/>
        <SubTexture name="letter_H" x="516" y="774" width="256" height="256"/>
        <SubTexture name="letter_I" x="516" y="516" width="256" height="256"/>
        <SubTexture name="letter_J" x="516" y="258" width="256" height="256"/>
        <SubTexture name="letter_K" x="516" y="0" width="256" height="256"/>
        <SubTexture name="letter_L" x="774" y="1290" width="256" height="256"/>
        <SubTexture name="letter_M" x="258" y="1290" width="256" height="256"/>
        <SubTexture name="letter_N" x="258" y="1032" width="256" height="256"/>
        <SubTexture name="letter_O" x="258" y="774" width="256" height="256"/>
        <SubTexture name="letter_P" x="258" y="516" width="256" height="256"/>
        <SubTexture name="letter_Q" x="258" y="258" width="256" height="256"/>
        <SubTexture name="letter_R" x="258" y="0" width="256" height="256"/>
        <SubTexture name="letter_S" x="0" y="1548" width="256" height="256"/>
        <SubTexture name="letter_T" x="0" y="1290" width="256" height="256"/>
        <SubTexture name="letter_U" x="0" y="1032" width="256" height="256"/>
        <SubTexture name="letter_V" x="0" y="774" width="256" height="256"/>
        <SubTexture name="letter_W" x="0" y="516" width="256" height="256"/>
        <SubTexture name="letter_X" x="0" y="258" width="256" height="256"/>
        <SubTexture name="letter_Y" x="0" y="0" width="256" height="256"/>
        <SubTexture name="letter_Z" x="258" y="1548" width="256" height="256"/>
        </TextureAtlas>`;


const xmlString1 =`<TextureAtlas imagePath="sprites.png">
        <SubTexture name="letter_*" x="258" y="1548" width="256" height="256"/>
        <SubTexture name="letter_A" x="774" y="1032" width="256" height="256"/>
        <SubTexture name="letter_B" x="774" y="774" width="256" height="256"/>
        <SubTexture name="letter_C" x="774" y="516" width="256" height="256"/>
        <SubTexture name="letter_D" x="774" y="258" width="256" height="256"/>
        <SubTexture name="letter_E" x="774" y="0" width="256" height="256"/>
        <SubTexture name="letter_F" x="516" y="1548" width="256" height="256"/>
        <SubTexture name="letter_G" x="516" y="1290" width="256" height="256"/>
        <SubTexture name="letter_H" x="516" y="1032" width="256" height="256"/>
        <SubTexture name="letter_I" x="516" y="774" width="256" height="256"/>
        <SubTexture name="letter_J" x="516" y="516" width="256" height="256"/>
        <SubTexture name="letter_K" x="516" y="258" width="256" height="256"/>
        <SubTexture name="letter_L" x="516" y="0" width="256" height="256"/>
        <SubTexture name="letter_M" x="774" y="1290" width="256" height="256"/>
        <SubTexture name="letter_N" x="258" y="1290" width="256" height="256"/>
        <SubTexture name="letter_O" x="258" y="1032" width="256" height="256"/>
        <SubTexture name="letter_P" x="258" y="774" width="256" height="256"/>
        <SubTexture name="letter_Q" x="258" y="516" width="256" height="256"/>
        <SubTexture name="letter_R" x="258" y="258" width="256" height="256"/>
        <SubTexture name="letter_S" x="258" y="0" width="256" height="256"/>
        <SubTexture name="letter_T" x="0" y="1548" width="256" height="256"/>
        <SubTexture name="letter_U" x="0" y="1290" width="256" height="256"/>
        <SubTexture name="letter_V" x="0" y="1032" width="256" height="256"/>
        <SubTexture name="letter_W" x="0" y="774" width="256" height="256"/>
        <SubTexture name="letter_X" x="0" y="516" width="256" height="256"/>
        <SubTexture name="letter_Y" x="0" y="258" width="256" height="256"/>
        <SubTexture name="letter_Z" x="0" y="0" width="256" height="256"/>
        </TextureAtlas>`;




const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString1,"text/html");

const jsonResult={
    imagePath : xmlDoc.querySelector("TextureAtlas").getAttribute("imagePath"),
    subTextures: {}
};

const subTextures = xmlDoc.querySelectorAll("SubTexture");
subTextures.forEach((subTexture)=>{
     
    let name = subTexture.getAttribute("name")
    
    jsonResult.subTextures[name]={
        x: parseInt(subTexture.getAttribute("x")),
        y: parseInt(subTexture.getAttribute("y")),
        width: parseInt(subTexture.getAttribute("width")),
        height: parseInt(subTexture.getAttribute("height"))
        }

});

let respuesta;
let definicion;
let intentos= '';
let display;
let inti;
let inp;

    


//console.log(jsonResult.subTextures[key].y)

const L1 =['Q','W','E','R','T','Y','U','I','O','P'];
const L2 =['A','S','D','F','G','H','J','K','L'];
const L3 =['Z','X','C','V','B','N','M'];


String.prototype.replaceAt = function(index, replacement) {
return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


function traerPalabra(lista,cant){
 
         console.log(lista);
  
         const random = Math.floor(Math.random() * cant)   /* número random del  0 al  104 */
         const word = lista[random].palabra;
         const definition = lista[random].definicion;
        
         return respuesta = {
             "word": word,
             "definition": definition,
         };
   


 }





function dispBtn(arrB,ct){


for (let bo=0; bo<arrB.length;bo++){
        
        let boton = document.createElement("BUTTON");
        let te = document.createTextNode(arrB[bo]);
        boton.appendChild(te);
        boton.id = (arrB[bo]);
        boton.className = 'buttton'
        boton.onclick = btnClick
        document.getElementById(ct).appendChild(boton);
        
        
 };

}


function btnClick (event){
   
    let bt = document.getElementById(event.target.id)
     if (bt.className != 'inactive'){
        intentos = intentos-1;
        inti.innerText =`intentos disponibles:${intentos}`;
        if (intentos <5 ){
            inti.style.color ="red";
        }
      inp = event.target.id;
      checkInput(inp);

     }
    
     
}


function blockkeys(){
    let botones =[]
    botones = document.getElementsByTagName ('button')
    
 //  botones.forEach((bot) => console.log(bot));

   Array.from(botones).forEach(child => {
    //child.style.backgroundColor ='black'
    child.className='inactive'
});
    //console.log(botones)  
}



function endGame (){

     let control = display.split("*").length-1


     inti.style.borderRadius = "8px"
     inti.style.padding = "3px"
     
    
     if (control == 0){
        inti.innerText =`Felicitaciones! Encontraste la palabra.Click aquí para continuar`
        inti.style.color = "lightgreen"
        inti.style.border ="3px solid lightgreen"
        inti.style.cursor ="pointer"
        blockkeys();
        inti.onclick= function() {window.location.reload() };
        //window.location.reload();
     }
     if (intentos == 0){
        inti.innerText =`Lo siento, ya utilizaste todos tus intentos.Click aquí para continuar`
        inti.style.color = "red"
        inti.style.border ="3px solid red"
        inti.style.cursor ="pointer"


        blockkeys();
        inti.onclick= function() {window.location.reload() };

     }
     
     

}
       

   

function checkInput(letra){
  
     
  
  for ( let l=0;l<respuesta.length;l++)  
    
    
    if (respuesta[l]== letra){
    display = display.replaceAt(l,letra);
    let bt = document.getElementById(letra)
   // bt.style.backgroundColor= 'black'
    bt.className ='inactive'

    }
    
    //console.log(display)  
   


}

function initEvents(){
    document.addEventListener('keydown', keydownHandler)

    
   



    function keydownHandler(event) {

        if(intentos > 0){
        intentos = intentos-1;
        inti.innerText =`Intentos disponibles :${intentos}`;
       
            if (intentos <5 ){
                inti.style.color ="red";
            }

       
        const {key} = event;
        inp = key.toUpperCase();
        checkInput(inp);
    
    }

    }

    
    
}





function drawLetra(letra,posx,posy) {

    const anchoDibujo = 55;
    const altoDibujo = 55;

    if (letra === "-") {
        // Si es un espacio, dibuja un rectángulo vacío del tamaño de la letra
        ctx.fillStyle = "#111"; 
        ctx.fillRect(posx, posy, anchoDibujo, altoDibujo);
    } else {
        const param = letra;
        const key = `letter_${param}`;

        ctx.drawImage(
            $letras, // source
            jsonResult.subTextures[key].x, // coordenadas de recorte
            jsonResult.subTextures[key].y,
            256, // tamaño de recorte - width
            256, // tamaño de recorte - height
            posx, // posición
            posy,
            anchoDibujo, // ancho del dibujo
            altoDibujo // alto del dibujo
        );
    }


   
  
  

 }



 function drawPalabra(pal){

    
    let comienzo =25;
    let ancho =55;
    let largo = pal.length;

    for (let i =0 ; i< largo;i++){

        drawLetra(pal[i],comienzo+ancho*i,30);
        
    }


}





function drawLinea(pal,y){

    
        let comienzo =25;
        let ancho =58;
        
        let largo = pal.length;

        for (let i =0 ; i< largo;i++){

            drawLetra(pal[i],comienzo+ancho*i,y);
            
        }

}   





function draw(){

    drawPalabra(display);
    endGame();
       
   window.requestAnimationFrame(draw);
}





async function usarRespuesta() {
    // Llamar a traerPalabra y esperas su resultado
    const resp = traerPalabra(data,51);
    
    // usar la variable respuesta fuera de traerPalabra
   // console.log(resp);
    respuesta = resp.word
    definicion= resp.definition;
    intentos =  respuesta.length *3;
    respuesta= respuesta.toUpperCase();
    document.getElementById('definicion').innerText=definicion;
    display = respuesta.replace(/./g,'*')
    
    inti = document.getElementById('intento')
    inti.innerText =`Intentos disponibles:${intentos}`;
    draw();
    //console.log('length',wordsArray.length);
    checkInput("-");
}




usarRespuesta();



dispBtn(L1,'contenedor');  
dispBtn(L2,'contenedor1');
dispBtn(L3,'contenedor2');




 

 initEvents();
 
 
 
