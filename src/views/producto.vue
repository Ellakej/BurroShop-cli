<template>
    <v-container>
        <v-card>
            <v-layout justify-space-between row fill-height>
                <!--Fotografias-->
                <v-flex>
                    <v-layout align-space-between justify-start column>
                        <v-flex xs6 mt-5 ml-5 mb-3 mr-4>
                            <img :src="imagenes.principal" alt="imagen" width="100%">
                        </v-flex>
                        <v-layout ml-5 mb-5>
                            <v-flex v-for="i in 4" :key="i">
                                <v-img :src="imagenes.principal" width="85%"></v-img>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-flex>

                    <!--Panel de informacion-->
                    <v-flex xs6 mt-5 mr-5 mb-5 ml-1>
                        <v-layout align-space-between justify-space-between column fill-height>
                        <v-flex class="display-1 font-weight-bold text-uppercase">
                            {{texto.titulo}}
                        </v-flex>
                        <v-flex mt-4>
                            {{texto.descripcion}}
                        </v-flex>
                        <v-flex class="font-weight-medium guinda--text title" mt-3>
                            Precio: ${{texto.precio}} 
                        </v-flex>
                        <v-flex>
                            <v-layout align-start justify-space-between row class="body-2 text-uppercase" mt-3>
                                <v-flex >
                                    <span >Categoria:</span>
                                     
                                    <v-chip color="guinda" class="white--text">
                                    {{texto.categoria}}
                                </v-chip>
                                </v-flex>
                                <v-flex>
                                    Subcategoria:
                                    <v-chip color="guinda" class="white--text">
                                    {{texto.subcategoria}}
                                </v-chip>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                            <v-flex pt-2>
                                <v-layout align-center>
                                    <v-btn color="guinda" class="white--text" round>
                                    <v-icon>fas fa-shopping-cart</v-icon>
                                    &nbsp;&nbsp;&nbsp;
                                    Comprar
                                </v-btn>
                                </v-layout>
                        </v-flex>
                        </v-layout>
                    </v-flex>
            </v-layout>
        </v-card>

        <!--Caja de comentarios-->
        <v-flex mt-3>
            <v-card>
                <v-layout pa-2>
                    <v-flex pa-3 class="title">
                    Comentarios
                </v-flex>
                    <div class="text-xs-center">
                        <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    @click="comentario.texto = ''"
                                    color="guinda"
                                    class="white--text"
                                    v-on="on"
                                    >
                                    Agregar Comentario
                                </v-btn>
                            </template>

                        <v-card>
                            <v-card-title
                            class="headline guinda lighten-1 white--text"
                            primary-title
                            >
                            Comentario:
                            </v-card-title>
                            <v-flex pa-2>
                                <v-textarea label="Comentario" v-model="comentario.texto" counter maxlength="300">
                                </v-textarea>
                            </v-flex>
                            

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                flat
                                @click="agregarComentario"
                            >
                                Comentar
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </div>
                </v-layout>

                <!--Comentario-->
                <v-layout v-for="n in comentarios" :key="n"  align-start justify-start row pl-5 pr-5 pb-3 pt-3>
                    <v-flex xs1 mr-2>
                        <v-icon>{{usuario.icono}}</v-icon>
                    </v-flex>
                    <v-flex>{{n.texto}}</v-flex>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="eliminar" width="500" >
                        <template v-slot:activator="{ on }">
                                <v-btn
                                    color="guinda"
                                    v-on="on"
                                    flat
                                    icon
                                    >
                                    <v-icon>fas fa-times-circle</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="headline guinda lighten-1 white--text" primary-title>
                                    Deseas &nbsp;<b>ELIMINAR</b>&nbsp; tu comentario?
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-layout align-center justify-center>
                                            <v-btn color="guinda darken-1" flat @click="borrarComentario(n)">si</v-btn>
                                            <v-btn color="guinda darken-1" flat @click="eliminar = false">no</v-btn>
                                        </v-layout>
                                    </v-card-actions>
                            </v-card>
                    </v-dialog>
                </v-layout>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>

import app from '../config';
var db = app.database();
var comentariosBD = db.ref('usuarios/comentarios');

export default {
    firebase: {
        comentarios: comentariosBD
    },
    data(){
        return{
            dialog: false,
            eliminar: false,
            comentario: {
                texto: ''
            },
            usuario: {
                icono: 'fas fa-user'
            },
            imagenes: {
                principal: require('../assets/com.jpg')
            },
            texto: {
                titulo: 'Lorem',
                descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus rerum cumque nihil odit nemo? Reprehenderit veniam quos, facere eius animi maxime minima ipsam quia sit repellat asperiores cum harum ipsum!',
                precio: 15,
                categoria: 'Comida',
                subcategoria: 'Snacks'
            }
        }
    },
    methods: {
        agregarComentario(){
            comentariosBD.push(this.comentario);
            console.log(this.comentario);
            this.dialog = false;
        },
        borrarComentario(comentario){
            comentariosBD.child(comentario['.key']).remove();
            this.eliminar = false;
        }
    }
}
</script>
