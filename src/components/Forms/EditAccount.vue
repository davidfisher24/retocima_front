<template>  
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-card hover>
            <v-flex>
              <v-card-title>Editar Cuenta</v-card-title>
            </v-flex>
            <v-flex>
              
              <v-card-text>
                <v-progress-linear :indeterminate="true" color="primary" v-if="disabled"></v-progress-linear>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-layout>
                  <!-- Include key ups on text fields -->
                    <v-flex xs6 md12 class="px-1">
                      <v-text-field
                        label="Usuario"
                        v-model="model.username"
                        :rules="rules.username"
                        required
                        @keyup="alert = false, success = false"
                        :disabled="disabled"
                      ></v-text-field>
                      <v-text-field
                        label="Correo Electronico"
                        v-model="model.email"
                        :rules="rules.email"
                        required
                        @keyup="alert = false, success = false"
                        :disabled="disabled"
                      ></v-text-field>
                      <v-text-field
                        label="Nombre"
                        v-model="model.nombre"
                        :rules="rules.nombre"
                        required
                        @keyup="alert = false, success = false"
                        :disabled="disabled"
                      ></v-text-field>
                      <v-text-field
                            label="Apellido 1"
                            v-model="model.apellido1"
                            :rules="rules.apellido1"
                            required
                            @keyup="alert = false, success = false"
                            :disabled="disabled"
                          ></v-text-field>
                      </v-flex>
                      <v-flex xs6 md12 class="px-1">
                         
                          <v-text-field
                            label="Apellido 2"
                            v-model="model.apellido2"
                            :rules="rules.apellido2"
                            required
                            @keyup="alert = false, success = false"
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
                            @change="alert = false, success = false"
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
                            @change="alert = false, success = false"
                          ></v-select>
                          <v-text-field 
                            type="date" 
                            label="Fecha Nacimiento"
                            name="fechanacimiento" 
                            v-model="model.fechanacimiento" 
                            :rules="rules.dob" 
                            @keyup="alert = false, success = false"
                            :disabled="disabled"
                          ></v-text-field>
                      </v-flex>
                  </v-layout>
                </v-form>
                <v-alert outline color="success" icon="check_circle" :value="success">
                  Cuenta actualizado con exito.
                </v-alert>
                <v-alert outline color="error" icon="warning" :value="alert">
                  <!-- Map alert messages with v-for -->
                  <span v-for="message in alertMessage">{{message}}</span>
                </v-alert>
                <v-card-actions>
                  <!-- Button disabled during ajax -->
                  <v-btn flat @click="submit" :disabled="!valid || disabled">Editar</v-btn>
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
        email: this.$route.params.cimero.cimero.email,
        username: this.$route.params.cimero.cimero.username,
        nombre: this.$route.params.cimero.cimero.nombre,
        apellido1: this.$route.params.cimero.cimero.apellido1,
        apellido2: this.$route.params.cimero.cimero.apellido2,
        fechanacimiento: this.$route.params.cimero.cimero.fechanacimiento,
        pais: this.$route.params.cimero.cimero.pais.id,
        provincia: this.$route.params.cimero.cimero.provincia ? this.$route.params.cimero.cimero.provincia.id : null,
      },
      rules: rules,
      provinces: [],
      countries: [],
      spainId: null,
      valid: true,
      disabled:false,
      alert: false,
      success:false,
      alertMessage: [],
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
        //this.model.pais = this.spainId;
    },

    submit(){
      var self = this;
      if (this.$refs.form.validate()) {
        self.disabled = true;
        this.$store.dispatch("user/updateAccount",this.model).then(() =>{
          self.success = true;
          self.disabled = false;
        }).catch(err => {
          // Parse error message in the correct way
          self.alertMessage = [];
          if ('message' in err) self.alertMessage.push(err.message);
          else for (var key in err) self.alertMessage.push(err[key][0]);
          self.alert = true;
          self.disabled = false;
        })
      }
    },
  }
}
</script>
