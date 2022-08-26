// npm init -y
// npm i express
// npm i morgan
// npm i ejs
// npm i uuid
// npm install uuid

const { Router } = require('express');
const router = Router();
const fs = require('fs');
// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');


//****leer la informacion del json actual****//
const json_books = fs.readFileSync('src/books.json', 'utf-8');
let arrayBooks = JSON.parse(json_books);
//****************************************** */

router.get('/', (req, res) => {
    res.render("index.ejs", {
      arrayBooks
    });
} )

router.get('/new-entry', (req, res) => {
  res.render("new-entry");
} )

//********************************Crear un libro************************************** */
router.post('/new-entry', (req, res) => {
  const { title, author, image, description } = req.body;
  if (!title || !author || !image || !description) {
    res.status(400).send('Escribe todos los campos')
    return;
  }

  let newBook = {
    id: uuidv4(),
    title,
    author,
    image,
    description
  };

  arrayBooks.push(newBook);

  //***************Escribir la informacion en el json*************** */
  const jsonBooks = JSON.stringify(arrayBooks)
  fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
  //************************************************** */

  res.redirect('/'); // redirigir pagina principal al agregar un dato
})


//*****************************Eliminar un libro******************************************** */

router.get('/delete/:id', (req, res) => {
  arrayBooks = arrayBooks.filter(book => book.id != req.params.id);
  const jsonBooks = JSON.stringify(arrayBooks)
  fs.writeFileSync('src/books.json', jsonBooks, 'utf-8');
  res.redirect('/'); // redirigir pagina principal al agregar un dato


})
//*****************************Eliminar un libro******************************************** */


module.exports = router;