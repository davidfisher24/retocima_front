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
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                    <v-flex xs6 class="px-1">
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
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        label="Confirmar Contrasena"
                        v-model="model.password_confirmation"
                        :rules="rules.password_confirmation"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        label="Nombre"
                        v-model="model.nombre"
                        :rules="rules.nombre"
                        required
                        @change="alert = false"
                        :disabled="disabled"
                      ></v-text-field>
                      </v-flex>
                      <v-flex class="px-1">
                         <v-text-field
                            label="Apellido 1"
                            v-model="model.apellido1"
                            :rules="rules.apellido1"
                            required
                            @change="alert = false"
                            :disabled="disabled"
                          ></v-text-field>
                          <v-text-field
                            label="Apellido 2"
                            v-model="model.apellido2"
                            :rules="rules.apellido2"
                            required
                            @change="alert = false"
                            :disabled="disabled"
                          ></v-text-field>
                          <v-select
                            :items="countries"
                            item-text="nombre"
                            item-value="id"
                            v-model="model.pais"
                            label="Pais"
                            auto
                            autocomplete
                            @change="alert = false"
                            :disabled="disabled"
                          ></v-select>
                          <v-select
                            :items="provinces"
                            item-text="nombre"
                            item-value="id"
                            v-model="model.provincia"
                            label="Provincia"
                            :rules="rules.provincia"
                            :disabled="model.pais !== spainId || disabled"
                            auto
                            autocomplete
                            @change="alert = false"
                          ></v-select>
                          <v-text-field 
                            type="date" 
                            label="Fecha Nacimiento"
                            name="fechanacimiento" 
                            v-model="model.fechanacimiento" 
                            :rules="rules.dob" 
                            @change="alert = false"
                            :disabled="disabled"
                          ></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-form>
                <v-alert outline color="error" icon="warning" :value="alert">
                  <span v-for="message in alertMessage">{{message}}</span>
                </v-alert>
                <v-card-actions>
                  <v-btn flat @click="submit" :disabled="!valid">Dar Se Alta</v-btn>
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
import ajax from '../../ajax';
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
        username:  [
          v => !!v || 'Usuario es requirido',
        ],
        provincia:  [
          v => this.spainId === this.model.pais && !!v || 'Provincia es requirida',
        ],
        dob:  [
          v => !!v || 'Fecha de nacimiento es requirido',
        ],
      },
      provinces: [],
      countries: [],
      spainId: null,
      valid: true,
      disabled:false,
      alert: false,
      alertMessage: [],
      show: true,
    }
  },

  mounted () {
    var self = this;
    Promise.all([
      ajax.provincias(),
      ajax.paises(),
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
        this.$store.dispatch("register", this.model).then(() => {
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
