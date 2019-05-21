<template>
    <v-container>
        <v-card>
            <v-layout align-space-around justify-space-between row fill-height>
                <v-flex pa-5 xs4>
                    <img :src="usuario.imagenPerfil" alt="" width="150px">
                    <v-flex class="mt-5 grey--text text--darken-1 headline">
                        Datos de Usuario
                    </v-flex>
                    <v-flex mt-4>
                        <v-layout align-space-around justify-start row fill-height>
                            <v-flex xs4 class="subheading grey--text text--darken-1">
                                <p>Nombre</p>
                                <p>Boleta</p>
                                <p>Correo</p>
                                <p>Productos publicados</p>
                            </v-flex>
                            <v-flex xs1 class="subheading">
                                <p>{{usuario.nombre}}</p>
                                <p>{{usuario.boleta}}</p>
                                <p>{{usuario.correo}}</p>
                                <p>{{usuario.noProductos}}</p>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>
                <v-flex pa-5>
                    <v-layout align-space-around justify-space-around row fill-height>
                        <v-flex>
                            <v-card>
                                <v-card-title class="guinda white--text">Produtos</v-card-title>
                                <v-card-actions>
                                    
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card>
                                <v-card-title class="guinda white--text">
                                    Historial
                                </v-card-title>
                                <v-card-actions>

                                </v-card-actions>
                            </v-card>
                        </v-flex>
                        <v-flex>
                            <v-card>
                                <v-card-title class="guinda white--text">
                                    Comentarios
                                </v-card-title>
                                <v-card-actions v-for="n in comentarios" :key="n">
                                    {{n.texto}}
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            
        </v-card>
    </v-container>
</template>


<script>
import store from '../store'
import app from '../config';
import { createCipher } from 'crypto';
var db = app.database();
var comentariosBD = db.ref('usuarios/comentarios');

export default {
    firebase: {
        comentarios: comentariosBD
    },
    data() {
        return{
            usuario: {
                imagenPerfil: require('../assets/bshoplog.png'),
                nombre: 'Ricardo',
                boleta: 2015080452,
                correo: 'alikingno@gmail.com',
                noProductos: 5
            }
        }
    },
    created(){
       console.log(store.state.login);
    }
}
</script>
