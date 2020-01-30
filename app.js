


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "js-fixter.firebaseapp.com",
    databaseURL: "https://js-fixter.firebaseio.com",
    projectId: "js-fixter",
    storageBucket: "js-fixter.appspot.com",
    messagingSenderId: "641461022231",
    appId: "1:641461022231:web:da3011169910aaa0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//DOM VARIABLES

const restaurantesList = document.querySelector('.restaurants_list')
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')

// VARIABLES
const newRestaurantes  ={}

/*LOGIcA Firebase*/
const db = firebase.firestore()
const restaurantesRef = db.collection('restaurantes')

const getRestaurantes =()=>{
  restaurantesRef.get()
  .then((snap)=>{
    snap.forEach((doc)=>{
      console.log(doc.data())
      const card = document.createElement('div')
      const content = `
         <img src="${doc.data().imgURL}"/>
         <div>
          <h3>${doc.data().nombre}</h3>
          <p>${doc.data().direccion}</p>
         </div>

      `
      card.innerHTML = content
      card.classList.add('card')
      restaurantesList.appendChild(card)

    })
    console.log(snap)
  }) .catch((error)=>{
    console.log(error)

  })
}

getRestaurantes()

const saveRestaurante = (e) =>{
  e.preventDefault()
  restaurantesRef.add(newRestaurantes)
  .then((res)=>{

  }).catch((error)=>{

  })
}

/*Logica del DOM*/

const handleInput=(e) =>{
   const val = e.target.value
   const field = e.target.name
   newRestaurantes[field] = val
   console.log(newRestaurantes)
}

//events
inputs.forEach((input)=>{
  input.addEventListener('input', handleInput)
})

form.addEventListener('submit', saveRestaurante)
