<template>  
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card hover>
            <v-flex>
              <v-card-title>Escoger nueva contraseña</v-card-title>
            </v-flex>
            <v-flex>
              
              <v-card-text>
                <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                    <v-flex xs12 class="px-1">
                      <v-text-field
                        label="Confirmar Correo Electronico"
                        v-model="model.email"
                        :rules="rules.email"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                      ></v-text-field>
                      <v-text-field
                        label="Contrasena Nueva"
                        v-model="model.password"
                        :rules="rules.password"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                        :type="newIcon ? 'password' : 'text'"
                        :append-icon="newIcon ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (newIcon = !newIcon)"
                      ></v-text-field>
                      <v-text-field
                        label="Confirmar Contrasena Nueva"
                        v-model="model.password_confirmation"
                        :rules="rules.password_confirmation"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                        :type="confirmIcon ? 'password' : 'text'"
                        :append-icon="confirmIcon ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (confirmIcon = !confirmIcon)"
                      ></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-form>
                <v-alert outline color="error" icon="warning" :value="alert">
                  <span v-for="message in alertMessage">{{message}}</span>
                </v-alert>
                <v-card-actions>
                  <v-btn flat @click="submit" :disabled="!valid">Enviar</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>      
</template>


<script>
import rules from './rules'
export default {
  data () {
    return {
      model: {
        email: '',
        password: '',
        password_confirmation: '',
        token: this.$route.params.token,
      },
      rules: rules,
      valid: true,
      disabled:false,
      alert: false,
      alertMessage: [],
      oldIcon: true,
      newIcon: true,
      confirmIcon: true,
    }
  },

  methods: {
    submit(){
      var self = this;
      if (this.$refs.form.validate()) {
        self.disabled = true;
        this.$store.dispatch("user/resetPassword",this.model).then(() =>{
          this.$router.push({name: 'home'});
          this.$store.dispatch('showGlobalAlert',{type: 'success', message: 'Contraseña ha sido reseteado con éxito.'})
        }).catch(err => {
          self.alertMessage = [];
          for (var key in err.errors) self.alertMessage.push(err.errors[key]);
          self.alert = true;
          self.disabled = false;
        })
      }
    },
  }
}
</script>
