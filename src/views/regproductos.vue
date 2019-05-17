<template >
    <v-container>
        <v-layout align-center column fluid >
            <!--Titulo-->
            <v-flex>
                <v-card height="70" flat> 
                    <v-layout align-center justify-space-around row fill-height pa-2>
                        <v-card-title primary-title>
                            <span class="text-uppercase headline">
                                <p>Registro de productos</p>
                            </span>
                        </v-card-title>
                            <span>
                                <img src="../assets/iconbox.png" alt="iconbox" width="55px" height="50px" pa-5>
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
                                        :items="subcategorias[convertirIndice(n)]"
                                        label="Subcategoria"
                                        required
                                        ></v-select>
                                    </div>
                                </div>
                            <v-divider></v-divider>
                            <v-text-field
                            v-model="name"
                            :error-messages="nameErrors"
                            :counter="30"
                            label="Nombre del Producto"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            ></v-text-field>
                            
                            <v-text-field
                            v-model="price"
                            :error-messages="priceErrors"
                            :counter="4"
                            label="Precio"
                            required
                            @input="$v.price.$touch()"
                            @blur="$v.price.$touch()"
                            ></v-text-field>
                        </form>
                            
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
        price: { required, numeric, maxValue: maxValue(9999) }
    },
    data: () => ({
        name: '',
        price: null,
        select: null,
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
        !this.$v.price.maxValue && errors.push('El precio no debe exceder de $9,999')
        !this.$v.price.numeric && errors.push('Debe ser numero')
        !this.$v.price.required && errors.push('Es necesario un precio.')
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
      }
    }
    
}
</script>
