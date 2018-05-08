<template>  
  <div>
      <v-card hover>
        <v-flex>
          <v-card-title class="py-1">
            Entrar
            <v-spacer></v-spacer>
            <v-btn small icon @click="$emit('close',null)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
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
                :type="passIcon ? 'password' : 'text'"
                :append-icon="passIcon ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (passIcon = !passIcon)"
                :disabled="disabled"
              ></v-text-field>
            </v-form>
            <v-alert outline color="error" icon="warning" :value="alert">
              Estos credenciales no son correctos
            </v-alert>
            <v-card-actions>
              <v-btn flat @click="submit" :disabled="!valid">Entrar</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-flex>
      </v-card>
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
      },
      rules: rules,
      valid: true,
      alert: false,
      disabled: false,
      passIcon: true,
    }
  },

  
  methods: {
    submit(){
      this.disabled = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/login", this.model).then(data => {
          this.disabled = false
          this.$emit('close',null)
        }).catch(err => {
          this.alert = true
          this.disabled = false
        });
      }
    },
  },
}
</script>
