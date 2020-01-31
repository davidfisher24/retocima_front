<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card hover>
            <v-flex>
              <v-card-title>Darse Alta</v-card-title>
            </v-flex>
            <v-flex>

              <v-card-text>
                <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                    <v-flex xs6 md12 class="px-1">
                      <v-text-field
                        label="Usuario"
                        v-model="model.username"
                        :rules="rules.username"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                      ></v-text-field>
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
                        required
                        @change="alert = false"
                        :disabled="disabled"
                        :type="passIcon ? 'password' : 'text'"
                        :append-icon="passIcon ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (passIcon = !passIcon)"
                      ></v-text-field>
                      <v-text-field
                        label="Confirmar Contrasena"
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
                  <v-btn flat @click="submit" :disabled="!valid || disabled">Dar Se Alta</v-btn>
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
        username: '',
        password_confirmation: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        fechanacimiento: '',
        pais: null,
        provincia: null,
      },
      rules: rules,
      provinces: [],
      countries: [],
      spainId: null,
      valid: true,
      disabled:false,
      alert: false,
      alertMessage: [],
      show: true,
      passIcon: true,
      confirmIcon: true,
    }
  },

  watch: {
    "model.pais" () {
      if (this.spainId === this.model.pais) {
        this.rules.provincia = [(v) => !!v || 'Provincia es requirida']
      } else {
        this.rules.provincia = []
      }
    }
  },

  mounted () {
    var self = this;
    Promise.all([
      this.$store.dispatch("provincias/all"),
      this.$store.dispatch("paises/all")
    ]).then(function(data){
      self.provinces = data[0];
      self.countries = data[1];
      self.findSpain();
    })
  },

  methods: {
    findSpain () {
        this.spainId = this.countries.find(c => c.nombre === "España").id;
        this.model.pais = this.spainId;
    },

    submit(){
      var self = this;
      if (this.$refs.form.validate()) {
        self.disabled = true;
        this.$store.dispatch("user/register", this.model).then(() => {
          this.$store.dispatch('showGlobalAlert',{type: 'success', message: 'Cuenta creado con exito.'})
          self.$router.push({name:"home"});
        }).catch(err => {
          self.alertMessage = [];
          for (var key in err) self.alertMessage.push(err[key]);
          self.alert = true;
          self.disabled = false;
        });
      }
    },
  }
}
</script>
