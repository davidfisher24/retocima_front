export default {
   email:  [
      v => !!v || 'Correo electronico es requirido',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Correo electronico tiene que ser valido'
    ],
    nombre:  [
      v => !!v || 'Nombre es requirido',
    ],
    apellido1:  [
      v => !!v || 'Apellido es requirido',
    ],
    username:  [
      v => !!v || 'Usuario es requirido',
    ],
    provincia:  [],
    dob:  [
      v => !!v || 'Fecha de nacimiento es requirido',
    ], 
    old:  [
      v => !!v || 'Contrasena actual es requirida',
    ],
    password:  [
      v => !!v || 'Contrasena nueva es requirida',
    ],
    password_confirmation:  [
      v => !!v || 'Contrasena nueva es requirida',
      v => v !== v.password || 'Contrasena tiene que ser igual'
    ], 
}