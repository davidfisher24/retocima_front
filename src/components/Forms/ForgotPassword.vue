<template>  
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card hover>
            <v-flex>
              <v-card-title>He olvidado mi contraseña
                <v-spacer></v-spacer>
                <v-btn small icon @click="$emit('closeForgotPassword',null)">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-card-title>
            </v-flex>
            <v-flex>
              
              <v-card-text>
                <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                    <v-flex xs12 class="px-1">
                      <v-text-field
                        label="Correo Electronico"
                        v-model="model.email"
                        :rules="rules.email"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                      ></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-form>
                <v-alert outline color="success" icon="check_circle" :value="success">
                  Has recibido un correo electronico para resetear tu contraseña.
                </v-alert>
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
      },
      rules: rules,
      valid: true,
      disabled:false,
      alert: false,
      success:false,
      alertMessage: [],
    }
  },

  methods: {
    submit(){
      var self = this;
      if (this.$refs.form.validate()) {
        self.disabled = true;
        this.$store.dispatch("user/forgotPassword",this.model).then(() =>{
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
