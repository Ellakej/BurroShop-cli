<template >
    <v-container>
        <v-layout align-center column fluid >
            <!--Titulo-->
            <v-flex>
                <v-card height="70" flat img="./"> 
                    <v-layout align-center justify-space-around row fill-height pa-2>
                        <v-card-title primary-title>
                            <span class="text-uppercase headline">
                                <p>Registro de productos</p>
                            </span>
                        </v-card-title>
                            <span>
                                <v-icon large>fas fa-box-open</v-icon>
                            </span>
                    </v-layout>
                </v-card>
            </v-flex>

            <!--Contenido-->
            <v-flex pt-3>
                <v-card>
                    <v-layout pa-4>
                        <form>
                            <!--Categorias-->
                            <v-select
                                v-model="select"
                                :items="categorias"
                                :error-messages="selectErrors"
                                label="Categoria"
                                required
                                @change="$v.select.$touch()"
                                @blur="$v.select.$touch()"
                                ></v-select>

                                <!--SubCategorias-->
                                <div v-for="n in categorias" :key="n">
                                    <div v-if="n === select">
                                        <v-select
                                        v-model="subselect"
                                        :items="subcategorias[convertirIndice(n)]"
                                        label="Subcategoria"
                                        required
                                        ></v-select>
                                    </div>
                                </div>
                            <v-divider></v-divider>
                            
                            <!--Nombre del Producto-->
                            <v-text-field
                            v-model="name"
                            :error-messages="nameErrors"
                            :counter="30"
                            label="Nombre del Producto"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            ></v-text-field>
                            
                            <!--Precio-->
                            <v-text-field
                            v-model="price"
                            :error-messages="priceErrors"
                            :counter="4"
                            label="Precio en MXN"
                            required
                            @input="$v.price.$touch()"
                            @blur="$v.price.$touch()"
                            ></v-text-field>

                            <!--Descripcion-->
                            <v-textarea
                            v-model="descripcion"
                            :error-messages="descripcionErrors"
                            label="Descripcion"
                            required
                            counter
                            maxlength="300"
                            @input="$v.descripcion.$touch()"
                            @blur="$v.descripcion.$touch()"
                            ></v-textarea>
                            <span>
                                <p class="text-uppercase subheading">Fotografia</p>
                                <v-btn
                                    :loading="loading3"
                                    :disabled="loading3"
                                    color="guinda"
                                    class="white--text"
                                    @click="loader = 'loading3'"
                                >
                                    <v-icon>cloud_uploading</v-icon>
                                    Subir
                                </v-btn>
                            </span>
                        </form>
                    </v-layout>
                </v-card>
            </v-flex>

            <v-flex pt-2>
                <v-card>
                    <v-layout pa-2>
                            <v-btn flat
                            to="./"
                            >
                                <v-icon>fas fa-save</v-icon>
                                &nbsp;
                                Guardar
                            </v-btn>
                            <v-btn flat
                            @click="limpiarDatos"
                            >
                                <v-icon>fas fa-broom</v-icon>
                                &nbsp;
                                Limpiar
                            </v-btn>
                            <v-btn flat
                            to="./"
                            >
                                <v-icon>fas fa-times-circle</v-icon>
                                &nbsp;
                                Salir
                            </v-btn>
                    </v-layout>
                </v-card>
            </v-flex>
            
        </v-layout>
    </v-container>
    

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, numeric, maxValue } from 'vuelidate/lib/validators'





export default {
    mixins: [validationMixin],
    validations: {
        name: { required, maxLength: maxLength(30) },
        select: { required },
        price: { required, numeric, maxValue: maxValue(9999) },
        descripcion: { required }
    },
    data: () => ({
        loader: null,
        loading3: false,
        descripcion: '',
        name: '',
        price: null,
        select: '',
        subselect: null,
        categorias: [
            'Comida',
            'Materiales',
            'Libros',
            'Segunda mano',
            'Renta'
        ],
        subcategorias: [
            ['Preparada', 'Rapida', 'Snacks', 'Bebidas', 'Botanas'],
            ['Plasticos', 'Computacion', 'Mantenimiento Industial', 'Sistemas Automotrices', 'Otros'],
            ['Plasticos', 'Computacion', 'Mantenimiento Industial', 'Sistemas Automotrices','Basicas', 'Humanisticas', 'Otros'],
            ['Laboratorio', 'Carreras', 'Dibujo', 'Miscelaneo'],
            ['Laboratorio', 'Carreras', 'Dibujo', 'Miscelaneo']
        ]
    }),
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    computed: {
        selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Selecciona una categoria')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('El nombre no puede pasar de los 30 caracteres')
        !this.$v.name.required && errors.push('Es necesario un nombre.')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.price.$dirty) return errors
        !this.$v.price.maxValue && this.$v.price.numeric && errors.push('El precio no debe exceder de $9,999')
        !this.$v.price.numeric && errors.push('Debe ser numero')
        !this.$v.price.required && errors.push('Es necesario un precio.')
        return errors
      },
      descripcionErrors() {
        const errors = []
        if (!this.$v.descripcion.$dirty) return errors
        !this.$v.descripcion.required && errors.push('Es necesaria una descripcion')
        return errors
      }
    },
    methods: {
      convertirIndice (n) {
          var cons = 0;
          for(cons; cons <= 4; cons++){
              if(this.categorias[cons] === n)
              return cons;
          }
      },
      limpiarDatos(){
          this.select = null;
          this.subselect = null;
          this.name = '';
          this.price = null;
          this.descripcion = '';
      },
    }
    
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
