function onAddCart(event) {
    const isbn = Number(event.srcElement.id);
    const loadcart = localStorage.getItem('cart');
    if (loadcart === null) {
        const addcart = [{ id: isbn, qty: 1 }];
        localStorage.setItem('cart', JSON.stringify(addcart));
        return
    }
    const parsedcart = JSON.parse(loadcart);
    const tmpcart = [...parsedcart];
    const cartindex = tmpcart.findIndex(data => data.id === isbn);
    if (cartindex === -1) {
        tmpcart.push({ id: isbn, qty: 1 });
        localStorage.setItem('cart', JSON.stringify(tmpcart));
        return;
    }
    if (cartindex !== -1) {
        tmpcart[cartindex] = { id: isbn, qty: tmpcart[cartindex].qty + 1 };
        localStorage.setItem('cart', JSON.stringify(tmpcart));
        return;
    }
}

window.onAddCart = onAddCart;

export default onAddCart;