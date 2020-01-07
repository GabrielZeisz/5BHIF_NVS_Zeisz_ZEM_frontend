<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field readonly v-if="error" label="Regular" color=red value="errortext"></v-text-field>
                  <v-text-field label="Name" name="register" prepend-icon="person" v-model="registeruser.name" type="text"></v-text-field>
                  <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password" v-model="registeruser.password"></v-text-field>
                  <v-text-field id="address" label="Adresse" name="address" prepend-icon="house" type="text" v-model="registeruser.address"></v-text-field>

                  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="registeruser.bday" label="Geburtstag" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="registeruser.bday" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="menu = false">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined @click="goback()">zurück</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register()">speichern</v-btn>
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
      drawer: null,
      menu: false,
      daten: [],
      benutzer: {},
      registeruser: {},
      error: false,
      errortext: "Username or Password wrong!"
    }),
    // mounted() {
    //   var self = this;
    //   this.$http.get('http://localhost:8081/persons').then((response) => {
    //     if (response['status'] == 200) {
    //       self.daten = response.data[0]
    //     }
    //   })
    // },
    methods: {
      register() {
        var self = this;
        // console.log(this.registeruser)
        this.$http.post('https://localhost:8443/persons/register', self.registeruser).then((response) => {
          if (response['status'] == 200) {
            self.benutzer = response.data[0]
            var ubergeben = self.benutzer
            self.$router.push({path: '/calendar', params: {ubergeben}})
          }
          else{
            self.error = true;
          }
        })
      },
      goback(){
        window.history.go(-1)
      }
    }
  }
</script>
