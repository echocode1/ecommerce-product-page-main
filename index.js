document.addEventListener('DOMContentLoaded',() => {

    let prev_next_icon = document.getElementById('select-icons');

/* event-listener to view and exit menu */
    let openMenu = document.getElementById('menu-open-icon');
    let closeMenu = document.getElementById('exit-menu');
    let nav = document.getElementById('nav-bar')

    function viewMenu(){
        nav.style.display = 'flex';
        prev_next_icon.style.display = 'none';
    }
    openMenu.addEventListener('click', viewMenu)

    function exitMenu(){
        if(nav.style.display = 'flex' && window.innerWidth < 576){
            nav.style.display = 'none';
            prev_next_icon.style.display = 'flex';
        }if(window.innerWidth > 576 ){
            lightBox.style.display = 'none';
            thumbnails.style.display = 'none';
            prev_next_icon.style.display = 'none';
            overlay.style.display = 'none';
            document.querySelector('.main-container').style.margin = '7vh auto 0 auto';
            document.getElementById('exit-menu').innerHTML = `
            <img src="images/icon-close.svg" alt="exit-menu">`
            document.getElementById('exit-menu').style.display = 'none';
        }
        if(window.innerWidth > 1000 ){
            document.querySelector('.main-container').style.margin = '12vh auto 0 auto';
        }
    }
    closeMenu.onclick = exitMenu;

    /* event listenner to toggle to swipe product when arrow is clicked */
    let currentIndex = 0;
    let backFlip = document.getElementById('previous-icon');
    let next = document.getElementById('next-icon');
    let images = document.querySelectorAll('#sneaker-product1 img');
   
    function updateImageSlide(){
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentIndex)
        })
    }

    function nextImage(){
        currentIndex = (currentIndex + 1) % images.length;
        updateImageSlide();
    }

    function backFlipImage(){
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImageSlide();
    }

    next.addEventListener('click', nextImage)
    backFlip.addEventListener('click', backFlipImage)
    updateImageSlide();

    /* eventlistener to increase,decrease carts choice and add to cart */
    let decrease = document.getElementById('minus-icon');
    let increase = document.getElementById('plus-icon');
    let notePad = document.getElementById('result-input');
    let cartAmount = document.getElementById('cart-num');
    let addToCart = document.getElementById('add-to-cart')

    increase.onclick = () => {
        let value1 = Number(notePad.textContent)
        if(!isNaN(value1)){
            notePad.textContent = value1 + 1 
        }
    }
    decrease.onclick = () => {
        let value2 = Number(notePad.textContent);
       if(!isNaN(value2) && value2 > 0){
        notePad.textContent = value2 - 1;
       }
       else{
        window.alert('You need to choose an item to add to cart !')
       }
    }

    function add_to_cart(){
        cartAmount.style.display = 'block';
        if(cartAmount.textContent > 0){
            let num1 = Number(notePad.textContent);
            let num2 = Number(cartAmount.textContent);

            cartAmount.textContent = num1 + num2;
            notePad.textContent = 0;
        }else{
            if(notePad.textContent > 0){
                cartAmount.textContent = notePad.textContent ;
                notePad.textContent = 0
            }else{
                cartAmount.style.display = 'none';
            }
        }
    }
    addToCart.addEventListener('click', add_to_cart)

    /*event listener to display the basket full or empty*/
    let cart = document.querySelector('#cart-icon');
    let basketContainer = document.getElementById('basket-filled');
    const cartCalc = document.getElementById('calc');
    const emptyResponse = document.getElementById('empty-response');
    const emptyBasket = document.getElementById('product-checkout');

    function basketFull(){
        let num = Number(cartAmount.textContent);
        prev_next_icon.style.display = 'none';
        if(basketContainer.style.display === 'block' &&
            emptyBasket.style.display === 'none' && 
            emptyResponse.style.display === 'flex'
        ){
            basketContainer.style.display = 'none'
        }else{
            if(num > 0){
                cartCalc.innerHTML = `
                <p> $125.00 x ${num}  <span id ='result'>$${(125 * num).toFixed(2,0)}</span> </p>
                `
                basketContainer.style.display = 'block';
            }else{
                basketContainer.style.display = 'block';
                emptyBasket.style.display = 'none';
                emptyResponse.style.display = 'flex';
            }
        }
    }
    cart.addEventListener('click', basketFull)

    /*function to delete items from basket-full*/
    const deleteIcon = document.getElementById('delete')
    function deleteItem(){
        const cartNum = Number(cartAmount.textContent);
        if(cartNum > 1){
            cartAmount.textContent = cartNum - 1;
            cartCalc.innerHTML = 
            `<p> $125.00 x ${cartNum - 1}  <span id ='result'>$${(125 * (cartNum - 1)).toFixed(2,0)}</span> </p>`
        }else{
            cartAmount.textContent = '';
            basketContainer.style.display = 'block';
            emptyBasket.style.display = 'none';
            emptyResponse.style.display = 'flex';
        }
    }
    deleteIcon.addEventListener('click', deleteItem)

    /* function to checkout carts */
    let checkout = document.getElementById('checkout');

    function cartCheckout(){
        basketContainer.style.display = 'none';
        cartAmount.style.display = 'none';
        cartAmount.textContent = '';
        if(window.innerWidth > 576){
            prev_next_icon.style.display = 'none';
        }else{
            prev_next_icon.style.display = 'flex';
        }
    }
    checkout.addEventListener('click', cartCheckout);

    /* light-box for desktop */
    const lightBox = document.getElementById('light-box');
    let selector = document.getElementById('light-box__selector');
    const thumbnails = document.getElementById('sneaker__thumbnail1')
    let overlay = document.getElementById('nav-overlay');

    function lightBoxDisplay(){
        if(imgSelector.innerHTML ===
            `<img id="active" src="images/image-product-1.jpg" alt="sneaker-pics1">`)
        {
            if(window.innerWidth > 576){
                lightBox.style.display = 'block';
                thumbnails.style.display = 'flex';
                prev_next_icon.style.display = 'flex';
                overlay.style.display = 'block';
                document.querySelector('.main-container').style.margin = '7vh auto 0 auto';
                document.getElementById('exit-menu').innerHTML = 'X';
                document.getElementById('exit-menu').style.display = 'block';
            }
            if(window.innerWidth > 1000 ){
                document.querySelector('.main-container').style.margin = '12vh auto 0 auto';
            }
        }
        else{
            imgSelector.innerHTML =
            `<img id="active" src="images/image-product-1.jpg" alt="sneaker-pics1">`
        }
    }
    selector.addEventListener('click', lightBoxDisplay);
    
    let thumbnail2 = document.getElementById('light-box__selector2');
    let thumbnail3 = document.getElementById('light-box__selector3');
    let thumbnail4 = document.getElementById('light-box__selector4');
    let imgSelector = document.getElementById('main-selector')
    thumbnail2.onclick = () => {
        imgSelector.innerHTML = 
        `<img src="images/image-product-2-thumbnail.jpg" alt="product-thumbnail2">`
    }
    thumbnail3.onclick = () => {
        imgSelector.innerHTML = 
        `<img src="images/image-product-3-thumbnail.jpg" alt="product-thumbnail3">`
    }
    thumbnail4.onclick = () => {
        imgSelector.innerHTML = 
        `<img src="images/image-product-4-thumbnail.jpg" alt="product-thumbnail4">`
    }

})