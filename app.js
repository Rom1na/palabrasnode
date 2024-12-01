
require('dotenv').config();
const express = require('express');
const path = require('path');
const app  = express();
const port = process.env.PORT || 3000;



async function lecturaCsv(url) {
   
   try {
     const response = await fetch(url); // Usa await directamente en fetch
     const csv = await response.text(); // Convierte la respuesta a texto
     const datos = csv
       .split("\n")
       .slice(1) // Omite el encabezado
       .map((row) => {
         const [id,palabra,definicion,categoria] = row.split(",");
         return {id,palabra,definicion,categoria};
       });
 
     return datos; // Devuelve los datos en formato JSON
   } catch (error) {
     console.error("Error al leer el CSV:", error);
     throw new Error("No se pudo procesar el archivo CSV");
   }
 }


function determUrl(option){
 let uuu;
  switch(option){
    case 'deportes':
      uuu = process.env.DEPORTES;
    break;
    case 'general':
      uuu = process.env.ESPANOL;
    break;
    case 'capitales':
      uuu = process.env.CAPITALES;
    break;
    case 'animales':
      uuu = process.env.ANIMALES;
    break;    
    case 'instrumentos':
      uuu = process.env.INST;
    break;    
    case 'geografia':
      uuu = process.env.GEO;
    break;    
    case 'vegetales':
      uuu =process.env.VEGETALES ;
    break;        
   
  }
  return uuu;
   
} 

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

 

app.set('views', __dirname + "/views");

app.set('view engine','ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static('public', {
  setHeaders: function (res, path) {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    next();
  }
}));





app.get ('/',(req,res)=>{
   /* /*  res.send('<h1>¡Hola Mundos!</h1>'); 
   let n ="Romina"
   res.render('index',{n}) */
   res.render('index');



});











/* rutas dinámicas */

app.get('/eng/:id',(req,res)=>{
  const opt = req.params.id;
  res.render('palabrasE',{opt})

});




app.get('/esp/:id', async (req, res) => {
  try {
     const cate= req.params.id; 
     const ep = determUrl(cate);
     const informacionJson = await lecturaCsv(ep);
     res.render('wordsE',{ data: JSON.stringify(informacionJson),cate});
     /* res.json(informacionJson); */
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Hubo un problema al procesar el CSV.' });
   }

   
  
});







 




app.listen(port,()=>{
   console.log(`servidor escuchando en el puerto ${port}`); 
});