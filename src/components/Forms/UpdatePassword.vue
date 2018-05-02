<template>  
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card hover>
            <v-flex>
              <v-card-title>Cambiar Contraseña</v-card-title>
            </v-flex>
            <v-flex>
              
              <v-card-text>
                <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                    <v-flex xs12 class="px-1">
                      <v-text-field
                        ref="old"
                        label="Contraseña Actual"
                        v-model="model.old"
                        :rules="rules.old"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                        :append-icon="oldIcon ? 'visibility' : 'visibility_off'"
                        :type="oldIcon ? 'password' : 'text'"
                        :append-icon-cb="() => (oldIcon = !oldIcon)"
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
                <v-alert outline color="success" icon="check_circle" :value="success">
                  Contraseña actualizado con exito.
                </v-alert>
                <v-alert outline color="error" icon="warning" :value="alert">
                  <span v-for="message in alertMessage">{{message}}</span>
                </v-alert>
                <v-card-actions>
                  <v-btn flat @click="submit" :disabled="!valid">Cambiar</v-btn>
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
        old: '',
        password: '',
        password_confirmation: '',
      },
      rules: rules,
      valid: true,
      disabled:false,
      alert: false,
      success:false,
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
        this.$store.dispatch("updatePassword",this.model).then(() =>{
          self.success = true;
          self.disabled = false;
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
