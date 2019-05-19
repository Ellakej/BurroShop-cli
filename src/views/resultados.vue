<template>
    <v-container>
        <v-layout align-space-around justify-start column fill-height>
            <!--Titulo-->
            <v-flex>
                <div class="headline">
                    Resultados de Busqueda
                </div>
                <v-flex mt-2>
                    <b class="guinda--text">{{index.numresultados}}</b> resultados fueron encontrados de tu busqueda <b class="guinda--text">{{index.busqueda}}</b>
                </v-flex>
            </v-flex>
            <v-divider></v-divider>
            
            <!--Tarjeta de Busqueda-->
            
                <v-flex mt-4>
                    <v-card elevation=1>
                        <v-layout align-start justify-space-around row fill-height>
                            <v-flex pa-3>
                                <img :src="contenido.imagenes" alt="imagen" width="200px">
                                
                            </v-flex>
                            <v-flex xs7>
                                <v-card-title primary-title>
                                    <div>
                                    <div class="headline">{{contenido.titulo}}</div>
                                    <div>{{contenido.texto}}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            index: {
                numresultados: 3,
                busqueda: 'Lorem ipsum'
            },
            contenido: {
                imagenes: require('../assets/com.jpg'),
                titulo: 'Lorem 1',
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id temporibus repellat sunt rerum sequi nemo nisi pariatur distinctio ut, ullam vitae quaerat quos, in quia dolores laudantium ea? A, fugiat!' 
                
            }
        }
    }
}
</script>


