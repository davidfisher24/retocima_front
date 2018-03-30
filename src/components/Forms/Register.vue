<template>  
  <div>
    <v-dialog :value='show' persistant>
      <v-card hover>
        <v-flex>
          <v-card-title>Darse Alta</v-card-title>
        </v-flex>
        <v-flex>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Usuario"
                v-model="model.username"
                :rules="rules.username"
                required
              ></v-text-field>
              <v-text-field
                label="Correo Electronico"
                v-model="model.email"
                :rules="rules.email"
                required
              ></v-text-field>
              <v-text-field
                label="Contrasena"
                v-model="model.password"
                :rules="rules.password"
                required
              ></v-text-field>
              <v-text-field
                label="Confirmar Contrasena"
                v-model="model.password_confirmation"
                :rules="rules.password_confirmation"
                required
              ></v-text-field>
              <v-text-field
                label="Nombre"
                v-model="model.nombre"
                :rules="rules.nombre"
                required
              ></v-text-field>
              <v-text-field
                label="Apellido 1"
                v-model="model.apellido1"
                :rules="rules.apellido1"
                required
              ></v-text-field>
              <v-text-field
                label="Apellido 2"
                v-model="model.apellido2"
                :rules="rules.apellido2"
                required
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn flat @click="submit" :disabled="!valid">Entrar</v-btn>
              <v-btn flat @click="empty">Vaciar</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>      
</template>


<script>
import axios from 'axios';
export default {
  data () {
    return {
      model: {
        email: '',
        password: '',
        username: '',
        password_confirmation: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
      },
      rules: {
        email:  [
          v => !!v || 'Correo electronico es requirido',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Correo electronico tiene que ser valido'
        ],
        password:  [
          v => !!v || 'Contrasena es requirida',
        ],
        password_confirmation:  [
          v => !!v || 'Contrasena es requirida',
        ],
        nombre:  [
          v => !!v || 'Nombre es requirido',
        ],
        apellido1:  [
          v => !!v || 'Apellido es requirido',
        ],
        uusername:  [
          v => !!v || 'Usuario es requirido',
        ],
      },
      valid: true,
      show: true
    }
  },
  methods: {
    submit(){
      /*if (this.$refs.form.validate()) {
        this.$store.dispatch("login", this.model).then(() => {
          this.show = false;
        }).catch(err => {
          console.log(err);
        });
      }*/
    },
    empty (){
      this.model.email = '';
      this.model.username = '';
      this.model.password = '';
      this.model.password_confirmation = '';
      this.model.nombre = '';
      this.model.apellido1 = '';
      this.model.papellido2 = '';
    },
  }
}
</script>
