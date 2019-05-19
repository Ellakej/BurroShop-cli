<template>
    <v-container>
        <v-card>
            <v-layout justify-space-between row fill-height>
                <!--Fotografias-->
                <v-flex>
                    <v-layout align-space-between justify-start column>
                        <v-flex xs6 mt-5 ml-5 mb-3 mr-4>
                            <img :src="imagenes.principal" alt="imagen" width="120%">
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
    </v-container>
</template>

<script>
export default {
    data(){
        return{
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
    }
}
</script>
