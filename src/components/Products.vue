<template>
    <v-container>
        <h1>Products</h1>


        <v-card elevation="10">
            <v-container>
                <v-card-title>Add product</v-card-title>
                <v-text-field
                        v-model="p_name"
                        label="product name"
                ></v-text-field>
                <v-text-field
                        v-model="p_unit"
                        label="unit"
                ></v-text-field>
                <v-btn light elevation="7" @click="addProduct">
                    Add
                </v-btn>
            </v-container>
        </v-card>

        <v-card
                v-for="item in products"
                :key="item.ID"
                elevation="10"
                style="margin: 10px;"
        >
            <v-card-title>{{item.p_name}}</v-card-title>
            <v-card-subtitle>Unit: {{item.p_unit}}</v-card-subtitle>
            <v-card-text>
                <v-row
                        align="center"
                        class="justify-space-between"
                >
                    Date added: {{item.CreatedAt}}
                    <v-icon>mdi-delete</v-icon>
                </v-row>
            </v-card-text>
        </v-card>

        <v-snackbar
                v-model="snackbar"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>
    import axios from 'axios'

    const P_URL = "http://localhost:4300/";
    export default {
        name: "ProductPage",
        data: () => ({
            p_name: "",
            p_unit: "",
            snackbar: false,
            snackbarText: "",
            products: [],
        }),
        methods: {
            addProduct: function () {
                axios.post(P_URL + "add_product", JSON.stringify({
                    p_name: this.p_name,
                    p_unit: this.p_unit
                })).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true;
                    this.getProducts();
                })
            },
            getProducts: function () {
                axios.get(P_URL + "get_all_products").then(response => {
                    this.products = response.data;
                })
            }
        },
        mounted: function () {
            this.getProducts();
        }
    }
</script>
