//md5 = require("js-md5");

const privateKey = "9e93625989c9b50f9697cb480295ab6f5e438c24";
const publicKey = "7cb0a4ed27d1881e58bb8854b8da448b";
const marvel_attribution = "Data provided by Marvel. © 2014 Marvel";

// "http://gateway.marvel.com/v1/public/characters?name=spiderman";
const marvel_endpoint = "http://gateway.marvel.com/v1/public/characters?";
const ts = "1";

// Generated md5 hash value from
// "https://lig-membres.imag.fr/donsez/cours/exemplescourstechnoweb/js_securehash/"
// md5(ts + privateKey + publicKey)
const hash = "3adf7bb9a202323bbf48908e0b94cb7b";

// const auth = `&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const auth = `&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

const query = `${marvel_endpoint}&nameStartsWith=spider${auth}`;

const superHero = [];

// axios
console.log("START HERE");

const getHero = async () => {
  let response = await axios.get(query);
  let results = response.data.data.results;
  debugger;

  console.log(response);
};

getHero();
