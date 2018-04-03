<template>  
  <div>
    <v-dialog :value='show' persistant>
      <v-card hover>
        <v-flex>
          <v-card-title>Entrar</v-card-title>
        </v-flex>
        <v-flex>
          <v-card-text>
            <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Correo Electronico"
                v-model="model.email"
                :rules="rules.email"
                required
                @change="alert = false"
                :disabled="disabled"
              ></v-text-field>
              <v-text-field
                label="Contrasena"
                v-model="model.password"
                :rules="rules.password"
                @change="alert = false"
                required
                type="password"
                :disabled="disabled"
              ></v-text-field>
            </v-form>
            <v-alert outline color="error" icon="warning" :value="alert">
              Estos credenciales no son correctos
            </v-alert>
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
      show: true,
      alert: false,
      disabled: false,
    }
  },
  methods: {
    submit(){
      this.disabled = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("login", this.model).then(data => {
          this.$emit('login',data);
          this.show = false;
          this.disabled = false;
        }).catch(err => {
          this.alert = true;
          this.disabled = false;
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
