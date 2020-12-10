<template>
    <v-container>
        <h1>Payments</h1>
        <v-card>
            <v-card-title>Add payment</v-card-title>
            <v-card-text>
                <v-row>
                    <v-autocomplete
                            :items="customers"
                            filled
                            v-model="c_name"
                            label="Customer Name"
                    ></v-autocomplete>
                    <v-text-field
                            v-model="amount"
                            label="Amount"
                    ></v-text-field>
                    <v-text-field
                            v-model="method"
                            label="Method"
                    ></v-text-field>
                    <v-text-field
                            v-model="comment_on"
                            label="comment"
                    ></v-text-field>
                    <v-date-picker v-model="time_added" v-if="dt"></v-date-picker>
                    <v-btn style="margin-bottom: 30px"
                            depressed color="primary"
                    @click="dt = !dt">
                        {{dt ? 'Close date picker' : 'Open date picker'}}</v-btn>
                </v-row>
                <v-btn
                        light
                        elevation="20"
                        @click="addPayment"
                >Add
                </v-btn>
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
        name: "Payment",
        data: () => ({
           c_name: "",
           amount: null,
            method: "",
            comment_on: "",
            time_added: null,
            dt: false,
            customers: [],
            snackbar: false,
            snackbarText: ""
        }),
        methods: {
            addPayment: function () {
                axios.post(P_URL + 'add_payment', JSON.stringify({
                    customer_name: this.c_name,
                    amount: parseInt(this.amount),
                    method: this.method,
                    comment: this.comment,
                    time_added: new Date(this.time_added)
                })).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true
                    this.c_name = ""
                    this.amount = null
                    this.method = ""
                    this.comment = ""
                    this.time_added = ""
                })
            },
            getCustomers: function () {
                axios.get(P_URL + 'get_all_customers').then(response => {
                    for (let i = 0; i < response.data.length; i++)
                        this.customers.push(response.data[i].name)
                })
            },
            getPayments: function () {

            }
        },
        mounted: function () {
            this.getCustomers()
        }
    }
</script>

<style scoped>

</style>
