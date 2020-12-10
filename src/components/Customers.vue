<template>
    <v-container>
        <h1>Customers</h1>
        <v-card>
            <v-card-title>Add customer</v-card-title>
            <v-card-text>
                <v-row>
                    <v-text-field
                            v-model="name"
                            label="Name"
                    ></v-text-field>
                    <v-text-field
                            v-model="mobile"
                            label="Mobile"
                    ></v-text-field>
                    <v-text-field
                            v-model="whatsapp"
                            label="Whatsapp number"
                    ></v-text-field>
                    <v-text-field
                            v-model="address"
                            label="Address"
                    ></v-text-field>
                    <v-text-field
                            v-model="sites"
                            label="Sites"
                    ></v-text-field>
                </v-row>
                <v-btn
                        light
                        elevation="20"
                        @click="addCustomer"
                >Add</v-btn>
            </v-card-text>
        </v-card>

        <v-card
                elevation="5"
                style="margin-top: 4px;"
            v-for="item in customers"
            :key="item.ID">
            <v-card-text>
                <v-row class="justify-space-between black--text">
                    <p>{{item.name}}</p>
                    <p>Phone: {{item.mobile}}</p>
                    <p>Whatsapp: {{item.whatsapp_number}}</p>
                </v-row>
                <v-row class="justify-space-between black--text">
                    <p>{{item.address}}</p>
                    <p>{{item.sites}}</p>
                    <p>Created At: {{item.CreatedAt}}</p>
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
        name: 'customers',
        data: () => ({
            name: "",
            mobile: "",
            whatsapp: "",
            address: "",
            sites: "",
            snackbar: false,
            snackbarText: "",
            customers: []
        }),
        methods: {
            addCustomer: function () {
                axios.post(P_URL + 'add_customer', JSON.stringify({
                    name: this.name,
                    mobile: this.mobile,
                    whatsapp_number: this.whatsapp,
                    address: this.address,
                    sites: this.sites
                })).then(response => {
                    this.snackbarText = response.data.message;
                    this.snackbar = true;
                    this.name = "";
                    this.mobile = "";
                    this.whatsapp = "";
                    this.address = "";
                    this.sites = "";
                    this.getCustomers()
                })
            },
            getCustomers: function () {
                axios.get(P_URL + 'get_all_customers').then(response => {
                    this.customers = response.data;
                })
            }
        },
        mounted: function () {
            this.getCustomers();
        }
    }
</script>
