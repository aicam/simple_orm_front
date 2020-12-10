<template>
    <v-container>
        <!-- Dialog -->
        <v-dialog
                v-model="dialog"
                width="500"
        >

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Edit Order
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-autocomplete
                                :items="product_names"
                                v-model="edditing_order.product_name"
                                label="Product name"
                        ></v-autocomplete>
                        <v-autocomplete
                                v-model="edditing_order.product_unit"
                                :items="product_units"
                                label="Product unit"></v-autocomplete>
                        <v-text-field
                                v-model="edditing_order.quantity"
                                label="Quantity"></v-text-field>
                        <v-text-field
                                v-model="edditing_order.rate_per_unit"
                                label="Rate per unit"></v-text-field>
                        <v-text-field
                                v-model="edditing_order.comments"
                                label="Comment"></v-text-field>
                    </v-row>
                    <v-btn
                            @click="submitEdited"
                            light
                            elevation="20"
                    >Edit
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>


        <h1>Orders</h1>
        <v-card>
            <v-card-title>Add Order</v-card-title>

            <v-card-text>
                <v-row>
                    <v-autocomplete
                            :items="product_names"
                            v-model="product_name"
                            label="Product name"
                    ></v-autocomplete>
                    <v-autocomplete
                            v-model="product_unit"
                            :items="product_units"
                            label="Product unit"></v-autocomplete>
                    <v-text-field
                            v-model="quantity"
                            label="Quantity"></v-text-field>
                    <v-text-field
                            v-model="rate_per_unit"
                            label="Rate per unit"></v-text-field>
                    <v-text-field
                            v-model="comment"
                            label="Comment"></v-text-field>
                </v-row>
                <v-btn
                        @click="addOrder"
                        light
                        elevation="20"
                >Add
                </v-btn>
            </v-card-text>

        </v-card>

        <v-card
                elevation="5"
                style="margin-top: 7px;"
                v-for="item in orders"
                :key="item.ID"
        >
            <v-card-text>
                <v-row class="justify-space-between black--text">
                    <p>{{item.product_name}}</p>
                    <p>{{item.product_unit}}</p>
                    <p>{{item.quantity}}</p>
                    <p>{{item.rate_per_unit}}</p>
                    <p>{{item.comments}}</p>
                </v-row>
                <v-row class="justify-space-around">
                    <v-btn
                            @click="removeOrder(item)"
                            color="primary"
                            depressed
                    >
                        <v-icon>mdi-delete</v-icon>
                        Delete
                    </v-btn>
                    <v-btn
                            @click="startEditingOrder(item)"
                            color="primary"
                            depressed
                    >
                        <v-icon>mdi-gavel</v-icon>
                        Edit
                    </v-btn>
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
        name: "Orders",
        data: () => ({
            product_name: "",
            product_unit: "",
            quantity: null,
            rate_per_unit: null,
            comment: "",
            snackbar: false,
            snackbarText: "",
            product_names: [],
            product_units: [],
            orders: [],
            dialog: false,
            edditing_order: {}
        }),
        methods: {
            getAllProducts: function () {
                axios.get(P_URL + 'get_all_products').then(response => {
                    response.data.map(item => {
                        if (!this.product_names.includes(item.p_name))
                            this.product_names.push(item.p_name);
                        if (!this.product_units.includes(item.p_unit))
                            this.product_units.push(item.p_unit);
                    })
                })
            },
            addOrder: function () {
                axios.post(P_URL + 'add_order', JSON.stringify({
                    product_name: this.product_name,
                    product_unit: this.product_unit,
                    quantity: parseInt(this.quantity),
                    rate_per_unit: parseInt(this.rate_per_unit),
                    comments: this.comment
                })).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true;
                    this.product_name = "";
                    this.product_unit = "";
                    this.quantity = null;
                    this.rate_per_unit = null;
                    this.comment = "";
                })
            },
            getAllOrders: function () {
                axios.get(P_URL + 'get_all_orders').then(response => {
                    this.orders = response.data;
                })
            },
            removeOrder: function (item) {
                axios.post(P_URL + 'remove_order', JSON.stringify(item)).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true;
                    this.getAllOrders();
                })
            },
            startEditingOrder: function (item) {
                this.edditing_order = item;
                this.dialog = true;
            },
            submitEdited: function () {
                this.edditing_order.quantity = parseInt(this.edditing_order.quantity);
                this.edditing_order.rate_per_unit = parseInt(this.edditing_order.rate_per_unit);
                axios.post(P_URL + 'update_order', JSON.stringify(this.edditing_order)).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true;
                    this.getAllOrders();
                    this.dialog = false;
                })
            }
        },
        mounted: function () {
            this.getAllProducts();
            this.getAllOrders()
        }
    }
</script>

<style scoped>

</style>
