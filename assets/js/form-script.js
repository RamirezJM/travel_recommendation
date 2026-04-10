
// contact form script

const contactForm = document.querySelector('.contact__form')
contactForm.addEventListener('submit', (ev) => {
  ev.preventDefault()

  alert('Thank you for reaching out! Your message has been sent successfully. We will get back to you soon.')
  contactForm.reset()
})