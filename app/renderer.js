//DOM Elements
const linkSection = document.querySelector('.links');
const errormessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');

//DOM APIs
const parser = new DOMParser();
const parserResponse = text => {
    return parser.parseFromString(text, 'text/html');
};

const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText; //para buscar el titulo dentro del html
}

const storeLink = (title, url) => {
    localStorage.setItem(url, JSON.stringify({title, url})) //guardar texto en localstorage
}

//events
newLinkUrl.addEventListener('keyup', () =>{
    newLinkButton.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //para no refrescar ventana al enviar formulario
    const url = newLinkUrl.value;
    const response = await fetch(url);
    const text = await response.text();  //convertir el html de la pagina en texto plano
    const html = parserResponse(text);
    const title = findTitle(html);
    storeLink(title, url);
    console.log(title)
})