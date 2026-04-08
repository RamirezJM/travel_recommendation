
const menuButton = document.querySelector('.menu__btn')
const nav = document.querySelector('.nav__list')

menuButton.addEventListener('click', () =>{
  nav.classList.toggle('active')
})

