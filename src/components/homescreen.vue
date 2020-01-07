<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Willkommen!</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-actions>
                <v-btn color="primary" @click="login()">login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register()">registrieren</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {
      register() {
        this.$router.push({
          path: '/register'
        })
      },
      login() {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>
