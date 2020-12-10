<template>
    <v-container class="mx-auto">
        <v-card class="justify-space-around" elevation="10">
            <v-container>
                <v-text-field
                        v-model="username"
                        label="Username"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                ></v-text-field>
                <v-btn
                        @click="submitLogin"
                        class="float-none"
                        color="success"
                >
                    Login
                </v-btn>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import axios from 'axios'

    const P_URL = "http://localhost:4300/";
    export default {
        name: 'HelloWorld',
        data: () => ({
            token: null,
            username: null,
            password: null
        }),
        methods: {
            submitLogin: function () {
                axios.post(P_URL + 'admin_login', JSON.stringify({
                    username: this.username,
                    password: this.password
                })).then(response => {
                    if (response.data.status)
                        localStorage.setItem("Token", response.data.token);
                })
            }
        }
    }
</script>
