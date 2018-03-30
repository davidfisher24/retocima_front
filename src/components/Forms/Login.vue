<template>  
  <div>
    <v-dialog :value='show' persistant>
      <v-card hover>
        <v-flex>
          <v-card-title>Entrar</v-card-title>
        </v-flex>
        <v-flex>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
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
      },
      rules: {
        email:  [
          v => !!v || 'Correo electronico es requirido',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Correo electronico tiene que ser valido'
        ],
        password:  [
          v => !!v || 'Contrasena es requirida',
        ],
      },
      valid: true,
      show: true
    }
  },
  methods: {
    submit(){
      if (this.$refs.form.validate()) {
        this.$store.dispatch("login", this.model).then(data => {
          this.$emit('login',data);
          this.show = false;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    empty (){
      this.model.email = '';
      this.model.password = '';
    },
  },
}
</script>
