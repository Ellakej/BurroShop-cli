<template>
  <v-container >
    <v-layout align-space-between justify-space-around row fill-height>
      <v-layout class="guinda white--text" align-start justify-center column>
          <v-card class="guinda white--text" flat>
            <v-flex pa-5>
              <v-flex class="display-1">Registrate</v-flex>
              <v-flex class="headline" pt-3>Es gratis   <v-icon color="white">fas fa-burn</v-icon> </v-flex>
            </v-flex>
            
          </v-card>
          
      </v-layout>
      <v-flex>
        <v-layout > 
        <v-card light flat>
          <v-layout pa-4>
            <v-flex>
            <form >
              <v-text-field
                v-model="boleta"
                :error-messages="boletaErrors"
                :counter="10"
                maxlength="10"
                label="Boleta"
                required
                @input="$v.boleta.$touch()"
                @blur="$v.boleta.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="nombre"
                :error-messages="nameErrors"
                :counter="50"
                label="Nombre"
                required
                @input="$v.nombre.$touch()"
                @blur="$v.nombre.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="correo"
                :error-messages="emailErrors"
                label="Correo Electronico"
                required
                @input="$v.correo.$touch()"
                @blur="$v.correo.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                required
                id="password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                type="password"
              ></v-text-field>
              <v-text-field
              v-model="confirmpassword"
                :error-messages="cpasswordErrors"
                label="Confirm Password"
                required
                id="confirmpassword"
                @input="$v.confirmpassword.$touch()"
                @blur="$v.confirmpassword.$touch()"
                type="password"
              ></v-text-field>
              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Semestre"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="¿Aceptas los terminos y condiciones?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn @click="submit">Registrate</v-btn>
              <v-btn @click="clear">Limpiar</v-btn>
            </form>
            </v-flex>
            </v-layout>
        </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, minLength, numeric } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      boleta:{required,minLength:minLength(10),maxLength:maxLength(10), numeric},
      nombre: { required, maxLength: maxLength(50) },
      correo: { required, email },
      password:{required,minLength:minLength(5)},
      confirmpassword:{required,minLength:minLength(5)},
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      boleta: '',
      nombre: '',
      correo: '',
      select: null,
      items: [
        'Primer Semestre',
        'Segundo Semestre',
        'Tercer Semestre',
        'Cuarto Semestre',
        'Quinto Semestre',
        'Sexto Semestre'
      ],
      checkbox: false
    }),

    computed: {
        boletaErrors () {
        const errors = []
        if (!this.$v.boleta.$dirty) return errors
        !this.$v.boleta.maxLength && errors.push('Boleta Incorrecta')
        !this.$v.boleta.required && errors.push('Es Necesario tu boleta')
        !this.$v.boleta.minLength && errors.push('Boleta Incorrecta 2')
        return errors
      },
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('Tienes que aceptar para continuar!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Selecciona un Semestre')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.nombre.$dirty) return errors
        !this.$v.nombre.maxLength && errors.push('El nombre debe ser de maximo 15 caracteres')
        !this.$v.nombre.required && errors.push('Es necesario tu nombre.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.correo.$dirty) return errors
        !this.$v.correo.email && errors.push('Introduce un e-mail correcto')
        !this.$v.correo.required && errors.push('Es necesario un e-mail')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Contraseña muy corta')
        !this.$v.password.required && errors.push('Contraseña Necesaria')
        return errors
      },
      cpasswordErrors () {
        const errors = []
        if (!this.$v.confirmpassword.$dirty) return errors
        !this.$v.confirmpassword.required && errors.push('Contraseña Necesaria')
        if(document.getElementById('password').value != document.getElementById('confirmpassword').value)
        errors.push('Contraseñas diferentes')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        db.ref("Usuario/"+this.boleta).once("value", snapshot => {
           if (snapshot.exists()){
             console.log('Existe el usuario')
             }else{
               var data= '08Burroshop08';
               var cifrado = CryptoJS.AES.encrypt(this.password,data).toString();
               db.ref("Usuario/"+this.boleta).set(
                 {
                   nombre:this.nombre,
                   contraseña:cifrado,
                   email:this.correo,
                   semestre:this.select,
                   },function(error){
                     if(error){
                       console.log('Error Al Guardar')
                       }else{
                         console.log('Usuario Registrado')}})}
                         });
                         this.$v.$reset()
      },
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.nombre = ''
        this.correo = ''
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>
