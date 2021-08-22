//DOM Elements
const linksSection = document.querySelector('.links');
const errormessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');

//DOM APIs
const parser = new DOMParser();
const { shell } = require('electron');

const parserResponse = text => {
    return parser.parseFromString(text, 'text/html');
};

const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText; //para buscar el titulo dentro del html
}

const storeLink = (title, url) => {
    localStorage.setItem(url, JSON.stringify({title, url})) //guardar texto en localstorage
}

const getLinks = () => {
    return Object.keys(localStorage)
        .map(key => JSON.parse(localStorage.getItem(key)));
}

const createLinkElement = link => {
    return `
        <div class="grid grid-cols-3 shadow bg-red-100 m-2 rounded-3xl px-3">
            <div class="col-span-1">
                <h3>${link.title}</h3>
            </div>
            <div class="col-span-2">
                <p class="text-blue-500">
                    <a href="${link.url}">${link.url}</a>
                </p>
            </div>
        </div>
    `
}

//renderizar links
const renderLinks = () => {
    const linksElements = getLinks().map(createLinkElement).join('');
    linksSection.innerHTML = linksElements;
}

//para borrar input
const clearForm = () => {
    newLinkUrl.value = null;
};

const handleError = (error, url) => {
    errormessage.innerHTML = `
        Hubo un error agregando la URL: "${url}" : ${error.message}
    `.trim();
    setTimeout( () => {
        errormessage:innerHTML = null;
    }, 3000);
} 

//events
renderLinks(); //para pintar luego que un enlace ha sido agregado

newLinkUrl.addEventListener('keyup', () =>{
    newLinkButton.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //para no refrescar ventana al enviar formulario
    const url = newLinkUrl.value;
    try { //para comprobar ni hay errores
        const response = await fetch(url);
        const text = await response.text();  //convertir el html de la pagina en texto plano
        const html = parserResponse(text);
        const title = findTitle(html);
        storeLink(title, url);
        clearForm();
        renderLinks(); //para pintar luego que un enlace ha sido agregado
   } catch (error) {
        handleError(error, url)
    }
});

//Eliminar datos
clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    linksSection.innerHTML = '';
})

linksSection.addEventListener('click', (e) => {
    if (e.target.href) {
        e.preventDefault();
        shell.openExternal(e.target.href);
    }
} )