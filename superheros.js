//md5 = require("js-md5");

const privateKey = "9e93625989c9b50f9697cb480295ab6f5e438c24";
const publicKey = "7cb0a4ed27d1881e58bb8854b8da448b";
const marvel_attribution = "Data provided by Marvel. © 2014 Marvel";

// "http://gateway.marvel.com/v1/public/characters?name=spiderman";
const marvel_endpoint = "http://gateway.marvel.com/v1/public/characters?";

// ts timestamp or string value
const ts = "1";

// Generated md5 secure hash value from
// "https://lig-membres.imag.fr/donsez/cours/exemplescourstechnoweb/js_securehash/"
// md5(ts + privateKey + publicKey)

//-----------------------------------//
// Global Variables
//-----------------------------------//
const hash = "3adf7bb9a202323bbf48908e0b94cb7b";

const auth = `&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
//const query = `${marvel_endpoint}&nameStartsWith=iron man${auth}`;

const form = document.querySelector("form");
const button = document.querySelector("#submit");
const input = document.querySelector("#hero-input");
const heroContainer = document.querySelector(".hero-container");
const returnMsg = document.querySelector("#return-msg");
const coverImg = document.querySelector("#hero-cover");

let userInput = "";

// image size - append the size option to the image jpg
// Reference https://developer.marvel.com/documentation/images
const marvel_imgSize = "standard_medium";

// axios
const getHero = async () => {
  let response = await axios.get(query);
  let results = response.data.data.results;

  console.log(response);
};

// read API results
const readResults = result => {
  let allHeros = [];
  for (let i = 0; i < result.length; i++) {
    allHeros.push({
      name: result[i].name,
      img: result[i].thumbnail.path,
      ext: result[i].thumbnail.extension,
      desc: result[i].description,
      uri: result[i].resourceURI
    });
  }
  displayResults(allHeros);
};

// display the results to html
const displayResults = heros => {
  let html = "";
  let img = "";

  // clear the previous results
  heroContainer.innerHTML = "";

  for (let i = 0; i < heros.length; i++) {
    img = `<img src="${heros[i].img}/${marvel_imgSize}.${heros[i].ext}" alt="Superhero Img"></img>`;
    html += `<div class="hero-desc">${img}<h3 class="hero-name">${heros[i].name}</h3></div>`;
  }

  if (html) {
    // remove the cover image before displaying results
    coverImg.style.display = "none";
    heroContainer.innerHTML = html;
  }
  // if api returns empty result
  else {
    returnMsg.innerHTML =
      "<p>Not a valid name, please try again (ex. spider-man, iron man, hulk ...)</p>";
  }
};

//--------------------------------------------------------------------//
// Main
//--------------------------------------------------------------------//

form.addEventListener("submit", async event => {
  event.preventDefault();
  returnMsg.innerHTML = "";
  userInput = input.value;

  if (userInput) {
    let query = `${marvel_endpoint}&nameStartsWith=${userInput}${auth}`;

    let response = await axios.get(query);
    let result = response.data.data.results;

    readResults(result);
  }
  // user did not enter name
  else {
    returnMsg.innerHTML = "<p>Please enter a name...</p>";
  }
});
