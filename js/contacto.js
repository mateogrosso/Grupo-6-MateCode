// Espera a que el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los elementos del formulario
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('btn-submit');
    const feedback = document.getElementById('form-feedback');
  
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
  
    const errNombre = document.getElementById('error-nombre');
    const errEmail = document.getElementById('error-email');
    const errMensaje = document.getElementById('error-mensaje');

    // Define las validaciones
    // Las validaciones se definen como funciones que reciben el valor del campo y retornan un mensaje de error si el valor no es válido
    // Si el valor es válido, retorna una cadena vacía ''
    const validators = {
      nombre: (v) => v.trim().length >= 3 ? '' : 'Ingresá al menos 3 caracteres.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresá un email válido.',
      mensaje: (v) => v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
    };
  
     // setState: pinta el campo según esté OK o con error
      // - Agrega/quita clases .is-valid / .is-invalid (para estilos)
      // - Escribe el texto de error en el <small> correspondiente
      // - Añade aria-invalid=true cuando hay error (accesibilidad)
    function setState(input, errorEl, msg){
      if (msg){
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        errorEl.textContent = msg;
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorEl.textContent = '';
        input.removeAttribute('aria-invalid');
      }
    }
  
    // Validación en tiempo real: : cada vez que el usuario escribe, chequeamos el campo y actualizamos su estado visual.
    nombre.addEventListener('input', () => setState(nombre, errNombre, validators.nombre(nombre.value)));
    email.addEventListener('input', () => setState(email, errEmail, validators.email(email.value)));
    mensaje.addEventListener('input', () => setState(mensaje, errMensaje, validators.mensaje(mensaje.value)));
  
    // Validación en el envío del formulario: cuando el usuario hace click en el botón de enviar, chequeamos todos los campos y mostramos el mensaje de error correspondiente.
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.className = ''; // limpia clases
      feedback.textContent = '';
  
      // Ejecuta TODAS las validaciones finales
      const m1 = validators.nombre(nombre.value);
      const m2 = validators.email(email.value);
      const m3 = validators.mensaje(mensaje.value);

      // // Pinta cada campo según corresponda
      setState(nombre, errNombre, m1);
      setState(email, errEmail, m2);
      setState(mensaje, errMensaje, m3);
      //Si alguna validación falla, mostramos un aviso general y cortamos
      if (m1 || m2 || m3){
        feedback.classList.add('err');
        feedback.textContent = 'Revisá los campos marcados.';
        return;
      }
  
      // Simulamos "envío" (no hay backend en este sprint)
      submitBtn.disabled = true; // Evita doble click
 
      feedback.classList.add('ok');
      feedback.textContent = '✅ ¡Mensaje enviado! Gracias por escribirnos.';
      form.reset(); //Limpio el formulario
  
      // limpiar estilos de validación: quita las clases .is-valid / .is-invalid de los campos
      [nombre, email, mensaje].forEach(el => el.classList.remove('is-valid','is-invalid'));
      submitBtn.disabled = false;
    });
  });
  
 