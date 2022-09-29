var img_out = 0
var img_in = 0
var indice = 0
var cards = 0

function reveal() {
  let reveals = document.querySelectorAll(".reveal");
  
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
window.addEventListener("scroll", reveal);

function next(){
  cards = document.getElementsByClassName("formacion_tres_card")
  for(let i = 0; i < cards.length; i++){
    cards[0].classList.remove("deslizar_out_prev")
    cards[1].classList.remove("deslizar_out_prev")
  }
  cards[indice].classList.remove("deslizar_in")
  cards[indice].classList.add("deslizar_out_next")
  var e = indice
  cards[e].addEventListener("transitionend", function m(){
    cards[e].removeEventListener("transitionend", m)
    cards[e].classList.remove("deslizar_out_next")
  })
  indice += 1
  indice %= cards.length
  cards[indice].classList.remove("deslizar_out_next")
  cards[indice].classList.add("deslizar_in")
}

function prev(){
  cards = document.getElementsByClassName("formacion_tres_card")
  for(let i = 0; i < cards.length; i++){
    cards[0].classList.remove("deslizar_out_next")
    cards[1].classList.remove("deslizar_out_next")
  }
  cards[indice].classList.remove("deslizar_in")
  cards[indice].classList.add("deslizar_out_prev")
  var r = indice
  cards[r].addEventListener("transitionend", function n(){
    cards[r].removeEventListener("transitionend", n)
    cards[r].classList.remove("deslizar_out_prev")
  })
  indice += 1
  indice %= cards.length
  cards[indice].classList.remove("deslizar_out_prev")
  cards[indice].classList.add("deslizar_in")
}

next_ = document.getElementsByClassName("formacion_next")

next_[0].addEventListener("mouseover", function(e){
  cards = document.getElementsByClassName("formacion_card")
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.add("dance")
  }
});

next_[0].addEventListener("mouseout", function(e){
  cards = document.getElementsByClassName("formacion_card")
  for(i = 0; i < cards.length; i++){
    cards[i].classList.remove("dance")
  }
});

prev_ = document.getElementsByClassName("formacion_prev")

prev_[0].addEventListener("mouseover", function(e){
  cards = document.getElementsByClassName("formacion_card")
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.add("dance")
  }
});

prev_[0].addEventListener("mouseout", function(e){
  cards = document.getElementsByClassName("formacion_card")
  for(let i = 0; i < cards.length; i++){
    cards[i].classList.remove("dance")
  }
});

function fadeOut(img){
  img.classList.remove("fade-in")
  img.classList.add("fade-out")
}

function fadeIn(img){
  img.classList.remove("fade-out")
  img.classList.add("fade-in")
}

function changeProyecto(){
  let proyecto = document.getElementsByClassName("proyecto_activo")
  for(let i = 0; i<proyecto[0].childNodes.length; i++){
    if(proyecto[0].childNodes[i].classList == "preview_img"){
      var preview = proyecto[0].childNodes[i]
    }
  }

  for (let i = 0; i<preview.childNodes.length; i++){
    let node = preview.childNodes[i];
    if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
      node.parentNode.removeChild(node);
  }
  
  for (let i = 0; i < preview.childNodes.length; i++){
    if(preview.childNodes[i].nodeName == "IMG"){
      if(preview.childNodes[i].classList.length == 1){
        img_out = preview.childNodes[i]
        fadeOut(img_out)
        i_next = i+1
        i_next %= (preview.childNodes.length-1)
        img_in = preview.childNodes[i_next]
        img_out.addEventListener("transitionend", function x(){
          img_out.removeEventListener("transitionend", x);
          fadeIn(img_in);
          img_in.addEventListener("transitionend", function x(){
            img_in.removeEventListener("transitionend", x);
            img_in.classList.remove("fade-in")
          })
        })
        break;
      }
    }
  }
}

setInterval(changeProyecto, 6000)


function activarProyecto(a){
  let proyecto_activo = document.getElementsByClassName("proyecto_activo")
  let proyecto = document.getElementsByClassName("proyecto_info_preview")
  proyecto_activo[0].classList.remove("proyecto_activo")
  proyecto[a].classList.add("proyecto_activo")
}

function upLabel(id){
  let input = document.getElementById(id)
  if(input.id == "lmensaje"){
    input.classList.add("upLabel_textarea")
  }
  else{
    input.classList.add("upLabel")
  }
}

function menu() {
  let menu = document.getElementsByClassName("mobile")[0]
  let menu_btn = document.getElementsByClassName("menu_mobile")[0]

  for (let i = 0; i<menu_btn.childNodes.length; i++){
    let node = menu_btn.childNodes[i];
    if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
      node.parentNode.removeChild(node);
  }

  if(menu.classList.length == 1){
    menu.classList.add("visible_mobile")
    menu_btn.childNodes[0].classList.remove("EncogerLineFirst_rev")
    menu_btn.childNodes[1].classList.remove("rotate45deg_rev")
    menu_btn.childNodes[2].classList.remove("rotate135deg_rev")
    menu_btn.childNodes[3].classList.remove("EncogerLineLast_rev")

    menu_btn.childNodes[0].classList.add("EncogerLineFirst")
    menu_btn.childNodes[1].classList.add("rotate45deg")
    menu_btn.childNodes[2].classList.add("rotate135deg")
    menu_btn.childNodes[3].classList.add("EncogerLineLast")
  }
  else{
    menu.classList.remove("visible_mobile") 
    menu_btn.childNodes[0].classList.remove("EncogerLineFirst")
    menu_btn.childNodes[1].classList.remove("rotate45deg")
    menu_btn.childNodes[2].classList.remove("rotate135deg")
    menu_btn.childNodes[3].classList.remove("EncogerLineLast")
  }
}

function formValidate(){
  let status = true

  let nombre = document.getElementById("nombre").value
  let email = document.getElementById("email").value
  let asunto = document.getElementById("asunto").value
  let mensaje = document.getElementById("mensaje").value

  let warning = "" 

  if(nombre.length > 50){
    warning += "El campo 'Nombre' no debe superar los 50 caracteres.<br>"
    status = false
  }
  else if(nombre.replace(/ /g, "").length == 0){
    warning += "El campo 'Nombre' no debe estar vacio o en blanco.<br>"
    status = false
  }

  if(email.length > 50){
    warning += "El campo 'Email' no debe superar los 50 caracteres.<br>"
    status = false
  }
  else if(email.replace(/ /g, "").length == 0){
    warning += "El campo 'Email' no debe estar vacio o en blanco.<br>"
    status = false
  }
  else{
    status = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    if(!status){
      warning += "Debe ingresar un email valido.<br>"
    }
  }

  if(asunto.length > 50){
    warning += "El campo 'Asunto' no debe superar los 50 caracteres.<br>"
    status = false
  }
  else if(asunto.replace(/ /g, "").length == 0){
    warning += "El campo 'Asunto' no debe estar vacio o en blanco.<br>"
    status = false
  }

  if(mensaje.length > 300){
    warning += "El campo 'Mensaje' no debe superar los 300 caracteres.<br>"
    status = false
  }
  else if(mensaje.replace(/ /g, "").length == 0){
    warning += "El campo 'Mensaje' no debe estar vacio o en blanco.<br>"
    status = false
  }

  if(!status){
    const dialogo = document.querySelector('#dialog');
    document.querySelector('#text_dialog').innerHTML = warning;
    dialogo.show()
    dialogo.addEventListener('click', () => dialogo.close());
  }
  else{
    const dialogo = document.querySelector('#dialog');
    dialogo.close()
  }

  return status

}

const form = document.getElementById('form');
form.addEventListener("change", () => {
    document.getElementById('btnsend').disabled = !formValidate()
});