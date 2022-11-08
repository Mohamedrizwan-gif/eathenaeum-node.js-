const url = window.location.origin;
// 'http://localhost:3200';

function onaddqty(event) {
    let cart = localStorage.getItem('cart');
    console.log(cart);
    const product = event.currentTarget.parentElement.parentElement.previousSibling.previousSibling;
    const total = event.currentTarget.parentElement.parentElement.nextSibling;
    const input = event.currentTarget.parentElement.children[1];
    const price = event.currentTarget.parentElement.parentElement.previousSibling.innerText;
    if (input && input.value) { 
        input.value = Number(input?.value) + 1;
        total.innerHTML = input.value * Number(price.replace('$', ''));
        total.innerHTML = '$' + total.innerHTML;
        if (product && product.children) {
            if (product.children.length > 0) {
                const isbn = Number(product.children[0]?.children[2].getAttribute('isbn'));
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
    const product = event.currentTarget.parentElement.parentElement.previousSibling.previousSibling;
    const total = event.currentTarget.parentElement.parentElement.nextSibling;
    const input = event.currentTarget.parentElement.children[1];
    const price = event.currentTarget.parentElement.parentElement.previousSibling.innerText;
    if (input && input.value) {
        input.value = Number(input?.value) - 1;
        if (Number(input.value) === 0) {
            if (cart) {
                const isbn = Number(product.children[0]?.children[2].getAttribute('isbn'));
                cart = JSON.parse(cart);
                let tmpcart = [...cart];
                tmpcart = tmpcart.filter(tpcart => Number(tpcart.id) !== isbn);
                console.log(tmpcart);
                console.log(product.parentElement)
                product.parentElement.remove();
                localStorage.setItem('cart', JSON.stringify(tmpcart));
                return;
            }
        }
        total.innerHTML = input.value * Number(price.replace('$', ''));
        total.innerHTML = '$' + total.innerHTML;
        if (product && product.children) {
            if (product.children.length > 0) {
                const isbn = Number(product.children[0]?.children[2].getAttribute('isbn'));
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
    if (cart === null || undefined) {
        const btnclear = document.getElementsByClassName('clear-btn')[0];
        if(btnclear) {
            btnclear.remove();
        }
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
                let keybookauthor, keybooktitle, keyisbn, keyprice, keypublisher;
                if (books.length > 0) {
                    let [bookauthor, booktitle, isbn, price, publisher, ...rest] = Object.keys(books[0]);
                    keybookauthor = bookauthor;
                    keybooktitle = booktitle;
                    keyisbn = isbn;
                    keyprice = price;
                    keypublisher = publisher
                }
                else {
                    document.getElementsByClassName('cart-empty')[0].style.display = 'table-cell';
                }
                const productbody = document.getElementsByClassName('product-body')[0];
                for (let book of books) {
                    const tr = document.createElement('tr');
                    tr.classList.add('product-row');
                    let td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    let ul = document.createElement('ul');
                    ul.classList.add('list-unstyled');
                    let li = document.createElement('li');
                    li.innerHTML = book[keybooktitle];
                    ul.append(li);
                    li = document.createElement('li');
                    li.innerHTML = '(' + book[keybookauthor] + ')';
                    ul.append(li);
                    li = document.createElement('li');
                    li.setAttribute('isbn', book[keyisbn]);
                    li.innerHTML = book[keypublisher];
                    ul.append(li);
                    td.appendChild(ul);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    // 
                    let h6 = document.createElement('h6');
                    h6.innerHTML = '$' + book[keyprice];
                    td.appendChild(h6);
                    tr.appendChild(td);
                    // 
                    td = document.createElement('td');
                    td.classList.add('text-center', 'align-middle');
                    let div = document.createElement('div');
                    let button = document.createElement('button');
                    button.classList.add('btn', 'btn-sub');
                    button.addEventListener('click', onsubqty);
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
                    button.classList.add('btn', 'btn-add');
                    button.addEventListener('click', onaddqty);
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
                    h6.innerHTML = '$' + h6.innerHTML;
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