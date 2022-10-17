const url = 'http://localhost:3200';

function onaddqty(event) {
    let cart = localStorage.getItem('cart');
    const product = event.srcElement.parentElement.parentElement.parentElement.previousSibling.previousSibling;
    const total = event.srcElement.parentElement.parentElement.parentElement.nextSibling?.children[0];
    const input = event.srcElement.parentElement.parentElement?.children[1];
    const price = event.srcElement.parentElement.parentElement.parentElement.previousSibling?.children[0];
    if (input && input.value) {
        input.value = Number(input?.value) + 1;
        total.innerHTML = input.value * Number(price.innerHTML);
        if (product && product.children) {
            if (product.children.length > 0) {
                const isbn = Number(product.children[1].innerHTML);
                if (cart) {
                    cart = JSON.parse(cart);
                    let tmpcart = [...cart];
                    const cartindex = tmpcart.findIndex(tpcart => tpcart.id === isbn);
                    if (cartindex !== -1) {
                        tmpcart[cartindex].qty = Number(input.value);
                    }
                    localStorage.setItem('cart', JSON.stringify(tmpcart));
                }
            }
        }
    }
}

function onsubqty(event) {
    let cart = localStorage.getItem('cart');
    const product = event.srcElement.parentElement.parentElement.parentElement.previousSibling.previousSibling;
    const total = event.srcElement.parentElement.parentElement.parentElement.nextSibling?.children[0];
    const input = event.srcElement.parentElement.parentElement?.children[1];
    const price = event.srcElement.parentElement.parentElement.parentElement.previousSibling?.children[0];
    if (input && input.value) {
        input.value = Number(input?.value) - 1;
        if(Number(input.value) === 0) {
            if(cart) {
                const isbn = Number(product.children[1].innerHTML);
                cart = JSON.parse(cart);
                let tmpcart = [...cart];
                tmpcart = tmpcart.filter(tpcart => Number(tpcart.id) !== isbn);
                product.parentElement.remove();
                localStorage.setItem('cart', JSON.stringify(tmpcart));
                return;
            }
        }
        total.innerHTML = input.value * Number(price.innerHTML);
        if (product && product.children) {
            if (product.children.length > 0) {
                const isbn = Number(product.children[1].innerHTML);
                if (cart) {
                    cart = JSON.parse(cart);
                    let tmpcart = [...cart];
                    const cartindex = tmpcart.findIndex(tpcart => tpcart.id === isbn);
                    if (cartindex !== -1) {
                        tmpcart[cartindex].qty = Number(input.value);
                    }
                    localStorage.setItem('cart', JSON.stringify(tmpcart));
                }
            }
        }
    }
}

function pagecart() {
    const cart = localStorage.getItem('cart');
    if(cart === null || undefined) {
        const btnclear = document.getElementsByClassName('clear-btn')[0];
        btnclear.remove();
    }
    if (window.location.pathname === '/cart') {
        fetch(url + '/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'cart': cart })
        })
            .then(res => res.json())
            .then(res => {
                const books = [...res.books];
                const productbody = document.getElementsByClassName('product-body')[0];
                for (let book of books) {
                    const tr = document.createElement('tr');
                    tr.classList.add('product-row');
                    let td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    let div = document.createElement('div');
                    div.innerHTML = book['Book-Title'];
                    td.appendChild(div);
                    div = document.createElement('div');
                    div.innerHTML = book['ISBN'];
                    td.appendChild(div);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    // 
                    let h6 = document.createElement('h6');
                    h6.innerHTML = book['Price'];
                    td.appendChild(h6);
                    tr.appendChild(td);
                    // 
                    td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    div = document.createElement('div');
                    let button = document.createElement('button');
                    button.classList.add('btn');
                    button.onclick = onsubqty;
                    let i = document.createElement('i');
                    i.classList.add('fa', 'fa-angle-down');
                    button.appendChild(i);
                    div.appendChild(button);
                    const input = document.createElement('input');
                    input.classList.add('form-control', 'w-25', 'd-inline');
                    input.setAttribute("type", "text");
                    input.setAttribute("value", book['qty']);
                    input.setAttribute("min", "0");
                    input.setAttribute("max", "10");
                    div.appendChild(input);
                    button = document.createElement('button');
                    button.classList.add('btn');
                    button.onclick = onaddqty;
                    i = document.createElement('i');
                    i.classList.add('fa', 'fa-angle-up');
                    button.appendChild(i);
                    div.appendChild(button);
                    td.appendChild(div);
                    tr.appendChild(td);
                    // 
                    td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    h6 = document.createElement('h6');
                    h6.innerHTML = Number(book['qty']) * Number(book['Price']);
                    td.appendChild(h6);
                    tr.appendChild(td);
                    productbody.appendChild(tr);
                }
            })
            .catch(err => console.log('err', err));
    }
}

function clearcart() {
    localStorage.removeItem('cart');
    window.location.reload();
}

window.clearcart = clearcart;

export { pagecart };