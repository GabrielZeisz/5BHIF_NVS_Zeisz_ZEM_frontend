<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>


              </v-toolbar>
              <v-card-text>



                <h1>{{daten}}</h1>



                <v-form>
                  <v-text-field label="Login" name="login" prepend-icon="person" type="text"></v-text-field>

                  <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loadthedata()">Login</v-btn>
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
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      daten: {}
    }),
    methods: {
      loadthedata() {
        var self = this
        this.$http.get('http://localhost:8081/').then((response) => {
          if (response['status'] == 200) {
            self.daten = response.data
          }
        })

      }
    }
  }
</script>
