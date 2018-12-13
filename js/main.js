function components() {

    var hamburger = document.querySelector('.nav__hamb')
    var menu = document.querySelector('.menu')

    function openNav() {
        menu.classList.toggle('menu--open')
    }

    hamburger.addEventListener('click', openNav)
}

components()