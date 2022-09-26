// *** Fetchdata

Primero debemos declarar e importar el paquete de XMLHttpRequest, que nos permite utilizar objetos (XHR) para interactuar con servidores (en este caso la API de Platzi) para esto hacemos:
```js
const XMLHttpRequest = require('XMLHttpRequest');
```
Lo que hace aquí “require()” es importar el módulo del id que le pasemos, además puede importar JSON y archivos locales. Pero necesitamos trabajar con XMLHttpRequest para manipular la API.

Declaramos como constante el url de la API:
```js
const API = 'https://api.escuelajs.co/api/v1/products';
```
Ahora es momento de iniciar con la función principal que en términos simples es:
```js
function fetchData(urlApi, callback) {
}
```
El parámetro ‘urlApi’ hace referencia a cualquier API con la cuál estemos trabajando, en este caso la FakeStore de Platzi.
El segundo parámetro ‘callback’ es donde posteriormente vamos a pasar una función como argumento para poder controlar el flujo de información de la API.

Necesitamos alguna manera de poder manipular las solicitudes que haremos para consultar los datos, para ello vamos a crear un espacio en memoria (una variable) en donde guardar el objeto (XHR) que importamos y gracias a los métodos ya construídos nos será mil veces más fácil desarrollar nuestra funcíon.
```js
let xhttp = new XMLHttpRequest();
```
Si estas familiarizado con OOP (Programación Orientada a Objetos) sabrás entonces que esto no es más que un constructor vacío, de la misma forma que:
```js
let perrito = new Animal(); 🐶
let manzana = new Fruta();  🍎
```
Muy bien, ya podemos utilizar nuestra variable ‘xhttp’ (en conjunto al callback) como un objeto para acceder y manipular la API. Primero debemos abrir una solicitud (un request) esto lo hacemos con el método ‘.open()’
```js
xhttp.open('GET', urlApi, true);
```
Ahora bien el primer parámetro es el tipo de solicitud que vamos a realizar, pudo haber sido “POST”, “PUT”, “DELETE”. Pero vamos a utilizar “GET” 😎
El segundo parámetro es la url de la API a la cuál le vamos a realizar el request.
Último y tercer parámetro recibe un booleano para indicarle si vamos a utilizar asíncronismo o no, tal simple como TRUE o FALSE según el caso.

|

Vamos a hacer una función anónima para verificar que el request de los datos ha salido con éxito y en caso de un tener error hacer registro de éste. Para ello nos vamos a apoyar de la propiedad de ‘.onreadystatechange’ ésta llamará a la función cada que el readyState cambie (readyState retorna el número del estado en dónde se encuentra el request)
```js
xhttp.onreadystatechange = function (e) {
}
```
Ahora bien el ciclo de vida del readyState es el siguiente:

///
0   UNSENT              Client has been created open() not called yet
1   OPENED              open() has been called       
2   HEADRES-RECIEVED    send() has been called, and headers and status are available
3   LOADING             downloading; responserText hols partial data
4   DONE                the operation is complete       
///

Entonces debemos parar en ‘4’ cuando la operacion ha sido completada
```js
	if (xhttp.readyState === 4) {
} ✅
```
Una vez completado con éxito necesitamos saber que tipo de respuesta nos entregó el servidor, así que volvemos a verificar con un ’ if ’ la propiedad ‘.status’ según el tipo de respuestas:
///
1   informational responses     
2   sucessful responses 
3   redirection messages
4   client error responses
5   server error responses
///

Entonces el if nos queda de la siguiente manera:
```js
if (xhttp.readyState === 4) {
	if (xhttp.status === 200) {
	} ✅
} ✅
```
¡Ya comprobamos que tanto el request como el response hayan sido exitosos! Ahora podemos invocar nuestro callback (función por definir más tarde para manipular los datos)
```js
if (xhttp.readyState === 4) {
	if (xhttp.status === 200) {
		callback(null, JSON.parse(xhttp.responseText));
	} ✅
} ✅
```
¿Y por qué tiene tantos parámetros el callback si aún nisquiera lo hemos definido? 🤔 Mira te explico:

El primero vamos a utilizarlo en caso de que se presente un error, pero como ya hemos verificado eso podemos simplemente dejarlo como un ‘null’.
En el segundo usamos la función ‘JSON.parse()’ para convertir en datos que podamos controlar el texto que nos retorna la propiedad ‘.responseText’ después de hacer el request.
Listo🥳, dejamos preparado nuestro callback sin errores y con la información “traducida” para cualquier momento en el que necesitemos usarla. Pero (sep, siempre hay un ‘pero’) ¿Y si el request no es exitoso?¿Qué va a pasar con nuestra función?😔

Hay que regresarnos al primer if y utilizar la estructura de else para que en caso de haber un error registrarlo y enviarlo al callback (donde antes habiamos puesto ‘null’) y ahora pasar el null en la parte de los datos, ya que nunca pudo consultarlos.
```js
if (xhttp.readyState === 4) {
	if (xhttp.status === 200) {
		callback(null, JSON.parse(xhttp.responseText)); ✅
	} ✅
} else ❌ {
		const error = new Error('error' + urlApi);
		return callback(error, null);
}
```
🏆 ¡¡ Acabamos la función !! 🏆
Ya solo resta utilizar el método ‘.send()’ después de procesar los datos para enviar el request al server (API)
```js
xhttp.send();
```
Cualquier feedback es bien recibido para complementar mis conocimientos y el de cualquiera que lea esto.
<h5>⚠️(BONUS)⚠️</h5>
Para no usar “Magic numbers” se pueden declarar los estados a verificar como constantes, les dejo mi código completo
```js
const XMLHttpRequest = require('XMLHttpRequest');
const API = 'https://api.escuelajs.co/api/v1/products';
const DONE = 4;
const OK = 200;

function fetchData(urlApi, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlApi, true);
    xhttp.onreadystatechange = function (e) {
        if (xhttp.readyState === DONE && xhttp.status === OK) {
            callback(null, JSON.parse(xhttp.responseText));
        } else {
            const error = new Error('error' + urlApi);
            return callback(error, null);
        }
    }
    xhttp.send();
}
```