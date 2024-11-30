
const canvas = document.querySelector('canvas');
const ctx =  canvas.getContext('2d');
$letras = document.querySelector('#letras');
canvas.width = 650
canvas.height = 120
const opcion = document.getElementById('titulo').textContent;
console.log(opcion);
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


 async function traerPalabra(palabra){
 

   try {
         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`);
         const data = await response.json();
         const word = data[0].word;
         const definition = data[0].meanings[0].definitions[0].definition;
        // console.log(`Palabra: ${word}`);
       //  console.log(`Definición: ${definition}`);
         return respuesta = {
             "word": word,
             "definition": definition,
         };
     } catch (error) {
         return console.error('Error:', error);
     }

    


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
        inti.innerText =`letters left to try:${intentos}`;
        if (intentos <5 ){
            inti.style.color ="red";
        }
      inp = event.target.id.toUpperCase();
      
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
        inti.innerText =`Congratulations! You've found the word, click here to continue`
        inti.style.color = "lightgreen"
        inti.style.border ="3px solid lightgreen"
        inti.style.cursor ="pointer"
        blockkeys();
        inti.onclick= function() {window.location.reload() };
        //window.location.reload();
     }
     if (intentos == 0){
        inti.innerText =`Im sorry, you've used all your tries.Click here to continue`
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
        inti.innerText =`letters left to try:${intentos}`;
       
            if (intentos <5 ){
                inti.style.color ="red";
            }

       
        const {key} = event
        inp = key.toUpperCase();
        
           
        console.log(inp);
        checkInput(inp);

      }
          
        
    }



    
    
}





function drawLetra(letra,posx,posy) {

    const param = letra;
    const key = `letter_${param}`;

     ctx.drawImage(
       $letras, /* source*/
       jsonResult.subTextures[key].x,  /*coordenadas de recorte*/
       jsonResult.subTextures[key].y,
       256,  /* tamaño de recorte - width*/
       256, /* tamaño de recorte - height*/
       posx, /* posición*/
       posy,
       55, /* ancho el dibujo */
       55  /* alto del dibujo */

     )
  

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


function deterLista(option){
    
    let lista=[];
     switch(option){
       case 'general':
         lista = wordsArray; 
       break;     
       case 'animals':
         lista = animals;
       break;    
       case 'instruments':
         lista = musicalInstruments;
       break;    
       case 'geo':
         lista = geographyTerms;
       break;    
       case 'vegetables':
         lista = vegetables;
       break;        
   
     }
     return lista;
      
   } 









async function usarRespuesta(op) {
    // Llamar a traerPalabra y esperas su resultado
    const resp = await traerPalabra(op);
    
    // usar la variable respuesta fuera de traerPalabra
   // console.log(resp);
    respuesta = resp.word
    definicion= resp.definition;
    intentos =  respuesta.length *3;
    respuesta= respuesta.toUpperCase();
    document.getElementById('definicion').innerText=definicion;
    display = respuesta.replace(/./g,'*')
    inti = document.getElementById('intento')
    inti.innerText =`letters left to try:${intentos}`;
    draw();
    //console.log('length',wordsArray.length);

}


/*Palabras x categorias*/

const OPTIONS = ["injury","emphasis","coffee","buyer","night","paper","person","apartment","election","office","bird","way","girl","library","height"]
const wordsArray1 = [
    "apple", "banana", "cherry", "grape", "lemon", "orange", "peach", "plum", 
    "straw", "melon", "mango", "berry", "candy", "honey", "cream", "bread", 
    "butter", "cheese", "bacon", "beans", "pasta", "pizza", "sauce", "toast",
    "salad", "water", "juice", "sugar", "syrup", "cookie", "donut", "chips",
    "eggs", "fruit", "grain", "basil", "carrot", "tomato", "potato", "onion",
    "pepper", "spice", "olive", "dairy", "steak", "lamb", "fish", "prawn",
    "squid", "chicken", "bison", "pork", "beef", "turkey", "sausage", "bread",
    "muffin", "toast", "croissant", "pancake", "waffle", "bagel", "biscuit", 
    "yogurt", "smoothie", "coffee", "latte", "mocha", "tea", "drink", "water", 
    "juice", "soda", "cola", "shake", "lemonade", "punch", "milk", "cocoa", 
    "jelly", "ice", "frozen", "spoon", "plate", "fork", "knife", "bowl", "glass",
    "cup", "straw", "mug", "bottle", "blender", "oven", "stove", "grill", 
    "skillet", "fryer", "mixer", "pot", "pan", "cooker", "cutter", "spatula", 
    "whisk", "tongs", "oven", "apron", "cloth", "towel", "napkin", "stool",
    "chair", "table", "floor", "door", "window", "curtain", "light", "lamp",
    "shelf", "rug", "mat", "pillow", "blanket", "sheet", "sofa", "bench",
    "desk", "clock", "radio", "phone", "watch", "glove", "shoe", "hat", "scarf",
    "coat", "suit", "belt", "dress", "shirt", "pants", "jeans", "sock"
  ];
  const wordsArray = [
    "apple", "banana", "cherry", "grape", "lemon", "orange", "peach", "plum", 
    "straw", "melon", "mango", "berry", "candy", "honey", "cream", "bread", 
    "butter", "cheese", "bacon", "beans", "pasta", "pizza", "sauce", "toast",
    "salad", "water", "juice", "sugar", "syrup", "cookie", "donut", "chips",
    "eggs", "fruit", "grain", "basil", "carrot", "tomato", "potato", "onion",
    "pepper", "spice", "olive", "dairy", "steak", "lamb", "fish", "prawn",
    "squid", "chicken", "bison", "pork", "beef", "turkey", "sausage", "bread",
    "muffin", "toast", "croissant", "pancake", "waffle", "bagel", "biscuit", 
    "yogurt", "smoothie", "coffee", "latte", "mocha", "tea", "drink", "water", 
    "juice", "soda", "cola", "shake", "lemonade", "punch", "milk", "cocoa", 
    "jelly", "ice", "frozen", "spoon", "plate", "fork", "knife", "bowl", "glass",
    "cup", "straw", "mug", "bottle", "blender", "oven", "stove", "grill", 
    "skillet", "fryer", "mixer", "pot", "pan", "cooker", "cutter", "spatula", 
    "whisk", "tongs", "oven", "apron", "cloth", "towel", "napkin", "stool",
    "chair", "table", "floor", "door", "window", "curtain", "light", "lamp",
    "shelf", "rug", "mat", "pillow", "blanket", "sheet", "sofa", "bench",
    "desk", "clock", "radio", "phone", "watch", "glove", "shoe", "hat", "scarf",
    "coat", "suit", "belt", "dress", "shirt", "pants", "jeans", "sock", "shorts",
    "blouse", "skirt", "jacket", "tie", "ring", "bracelet", "necklace", "earring",
    "hair", "brush", "comb", "mirror", "shampoo", "soap", "towel", "razor",
    "tooth", "paste", "mouth", "floss", "bowl", "bucket", "bin", "tray", "duster",
    "broom", "mop", "scrub", "polish", "vacuum", "sweep", "clean", "dust", 
    "wipe", "rinse", "wash", "dry", "iron", "fold", "hang", "clothes", "laundry", 
    "basket", "tub", "sink", "bath", "shower", "toilet", "seat", "flush", "tap",
    "faucet", "pipe", "drain", "plunger", "bucket", "pail", "soap", "tissue",
    "napkin", "brush", "scrub", "mop", "polish", "spray", "sponge", "glass",
    "mirror", "window", "door", "wall", "floor", "carpet", "mat", "rug", "tile",
    "plank", "paint", "nail", "screw", "bolt", "drill", "saw", "hammer", "file",
    "tool", "wrench", "clamp", "glue", "tape", "wire", "rope", "string", "brush",
    "can", "bucket", "ladder", "hose", "pipe", "clamp", "fence", "gate", "shed",
    "barn", "wall", "post", "beam", "plank", "brick", "stone", "cement", "sand",
    "gravel", "dirt", "soil", "weed", "plant", "flower", "tree", "shrub", "grass",
    "leaf", "root", "branch", "stem", "bloom", "bud", "seed", "fruit", "berry",
    "nut", "bark", "sap", "trunk", "log", "stump", "mushroom", "fern", "ivy",
    "vine", "weed", "bush", "garden", "lawn", "yard", "park", "trail", "path",
    "road", "street", "avenue", "alley", "drive", "lane", "highway", "bridge",
    "tunnel", "track", "rail", "line", "station", "port", "harbor", "dock",
    "wharf", "pier", "ship", "boat", "raft", "canoe", "kayak", "sail", "oar",
    "paddle", "anchor", "mast", "deck", "cabin", "crew", "captain", "mate", 
    "sailor", "diver", "sub", "marine", "coral", "reef", "fish", "whale", 
    "shark", "dolphin", "seal", "otter", "crab", "lobster", "shell", "clam", 
    "oyster", "pearl", "rock", "stone", "sand", "wave", "tide", "surf", 
    "current", "beach", "shore", "coast", "bay", "gulf", "island", "reef", 
    "lake", "pond", "river", "stream", "creek", "brook", "spring", "water", 
    "fountain", "pool", "swim", "boat", "raft", "float", "sink", "dive", 
    "sub", "marine", "wave", "storm", "wind", "rain", "cloud", "snow", 
    "ice", "hail", "storm", "fog", "mist", "dew", "frost", "blow", "drift", 
    "gust", "breeze", "gale", "storm", "typhoon", "hurricane", "tornado", 
    "cyclone", "lightning", "thunder", "quake", "flood", "tide", "wave", 
    "volcano", "eruption", "fire", "burn", "flame", "smoke", "ash", "cinder", 
    "coal", "ember", "spark", "flare", "explosion", "blast", "detonation", 
    "impact", "crash", "collision", "wreck", "ruin", "break", "crack", 
    "shatter", "smash", "destroy", "demolish", "crush", "grind", "mash", 
    "squash", "flatten", "level", "dismantle", "tear", "rip", "cut", "slice",
    "chop", "dice", "carve", "whittle", "shave", "trim", "prune", "snip", 
    "shear", "sever", "cleave", "hack", "slash", "stab", "pierce", "jab", 
    "poke", "prod", "thrust", "strike", "hit", "beat", "punch", "kick", 
    "smack", "slap", "whip", "lash", "flick", "swat", "bash", "slam", 
    "bump", "nudge", "tap", "knock", "rap", "bang", "clap", "snap", 
    "crack", "pop", "blast", "boom", "crash", "rumble", "growl", "grunt", 
    "snarl", "bark", "howl", "yell", "shout", "cry", "sob", "weep", "moan", 
    "groan", "whine", "whimper", "scream", "shriek", "wail", "roar", "bellow", 
    "cheer", "clap", "sing", "chant", "hum", "murmur", "whisper", "giggle", 
    "laugh", "chuckle", "snicker", "guffaw", "snort", "cough", "sneeze", 
    "hiccup", "burp", "belch", "fart", "spit", "swallow", "chew", "bite", 
    "lick", "luck", "blow", "spit", "sneeze", "sniff", "smell", "taste", 
    "touch", "feel", "sense", "see", "look", "stare", "gaze", "glance", 
    "peek", "peep", "squint", "blink", "wink", "nod", "shake", "shrug", 
    "frown", "smile", "grin", "scowl", "glare", "stare", "grimace"
  ];  

  const geographyTerms = [
    "Continent",
    "Ocean",
    "Mountain",
    "Valley",
    "River",
    "Lake",
    "Desert",
    "Forest",
    "Jungle",
    "Island",
    "Peninsula",
    "Gulf",
    "Bay",
    "Cape",
    "Strait",
    "Archipelago",
    "Plateau",
    "Mountain range",
    "Canyon",
    "Glacier",
    "Volcano",
    "Equator",
    "Meridian",
    "Parallel",
    "Tropic",
    "Hemisphere",
    "Altitude",
    "Latitude",
    "Longitude",
    "Climate",
    "Biome",
    "Ecosystem",
    "Biodiversity",
    "Geology",
    "Hydrography",
    "Orography",
    "Cartography",
    "Topography",
    "Physical geography",
    "Human geography",
    "Antarctica",
    "Arctic",
    "Tropic of Cancer",
    "Tropic of Capricorn",
    "Arctic Circle",
    "Antarctic Circle",
    "Tectonic plate",
    "Geological fault",
    "Savanna",
    "Wetland"
  ];
  
  const animals = [
    "Lion",
    "Tiger",
    "Elephant",
    "Giraffe",
    "Zebra",
    "Rhinoceros",
    "Hippopotamus",
    "Kangaroo",
    "Koala",
    "Panda",
    "Wolf",
    "Fox",
    "Bear",
    "Deer",
    "Moose",
    "Bison",
    "Horse",
    "Donkey",
    "Camel",
    "Llama",
    "Alpaca",
    "Sheep",
    "Goat",
    "Cow",
    "Pig",
    "Dog",
    "Cat",
    "Rabbit",
    "Hamster",
    "Mouse",
    "Rat",
    "Squirrel",
    "Beaver",
    "Otter",
    "Seal",
    "Walrus",
    "Whale",
    "Dolphin",
    "Shark",
    "Clownfish",
    "Seahorse",
    "Octopus",
    "Squid",
    "Jellyfish",
    "Starfish",
    "Crab",
    "Lobster",
    "Frog",
    "Toad"
  ];


  const musicalInstruments = [
    "Piano",
    "Guitar",
    "Violin",
    "Flute",
    "Trumpet",
    "Saxophone",
    "Drums",
    "Clarinet",
    "Oboe",
    "Trombone",
    "Harp",
    "Double bass",
    "Bassoon",
    "Tuba",
    "Mandolin",
    "Banjo",
    "Accordion",
    "Xylophone",
    "Marimba",
    "Vibraphone",
    "Timpani",
    "Castanets",
    "Triangle",
    "Gong",
    "Sitar",
    "Tabla",
    "Didgeridoo",
    "Balalaika",
    "Bandoneon",
    "Lute",
    "Pan flute",
    "Cuatro",
    "Charango",
    "Ocarina",
    "Kalimba",
    "Djembe",
    "Bouzouki",
    "Erhu",
    "Shamisen",
    "Koto",
    "Baglama",
    "Santur",
    "Duduk",
    "Hang",
    "Theremin",
    "Synthesizer",
    "Melodica",
    "Harmonica",
    "Ukulele"
  ];
  
  const vegetables = [
    "Carrot",
    "Potato",
    "Tomato",
    "Onion",
    "Lettuce",
    "Spinach",
    "Broccoli",
    "Cauliflower",
    "Cabbage",
    "Zucchini",
    "Eggplant",
    "Pepper",
    "Chayote",
    "Turnip",
    "Beetroot",
    "Radish",
    "Celery",
    "Asparagus",
    "Artichoke",
    "Pumpkin",
    "Sweet potato",
    "Cassava",
    "Pea",
    "Bean",
    "Corn",
    "Cucumber",
    "Garlic",
    "Ginger",
    "Leek",
    "Mushroom",
    "Okra",
    "Parsnip",
    "Rutabaga",
    "Shallot",
    "Squash",
    "Swiss chard",
    "Watercress",
    "Yam",
    "Kale",
    "Collard greens",
    "Mustard greens",
    "Turnip greens",
    "Brussels sprouts",
    "Fennel",
    "Endive",
    "Radicchio",
    "Bok choy",
    "Kohlrabi",
    "Scallion",
    "Chicory"
  ];
  
  

let cant;  
if (opcion == 'general'){
   cant = 562;
}else{
   cant = 51;   
}






const random = Math.floor(Math.random() * cant)   /* número random del  0 al  562 */
const list = deterLista(opcion);

usarRespuesta(list[random]);














 


dispBtn(L1,'contenedor');  
dispBtn(L2,'contenedor1');
dispBtn(L3,'contenedor2');




 

 initEvents();
 
 
 
