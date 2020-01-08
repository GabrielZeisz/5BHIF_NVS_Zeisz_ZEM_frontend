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
                <v-form>
                  <v-text-field readonly v-if="error" label="Regular" color=red value="errortext"></v-text-field>
                  <v-text-field label="Login" name="login" prepend-icon="person" v-model="loginuser.username" type="text"></v-text-field>
                  <v-text-field id="password" label="Passwort" name="password" prepend-icon="lock" type="password" v-model="loginuser.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined @click="goback()">zurück</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
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
      daten: [],
      benutzer: {},
      loginuser: {},
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
    methods:{
      login(){
        // // this.$router.push('/calendar')
//var self = this;
        // // console.log(this.loginuser)
        // this.$http.post('https://localhost:8443/persons/login', self.loginuser).then((response) => {
        //   if (response['status'] == 200) {
        //     self.benutzer = response.data[0]
        //     var ubergeben = self.benutzer
        //     self.$router.push({path: '/calendar', params: {ubergeben}})
        //   }
        //   else{
        //     self.error = true;
        //   }
        //
        // })
        let router = this.$router
       //console.log(self)
       let xhr = new XMLHttpRequest()

       xhr.onreadystatechange = function(){
           if(xhr.readyState == 4) {
             if(xhr.status == 200){
               let user = JSON.parse(xhr.responseText)
               router.push({name: 'calendar', params: {loggeduser: user}})
             }
             else {
               console.log("error " + xhr.status)
           }
         }
       }

       xhr.open("POST", "https://localhost:8443/persons/login", true)
       xhr.setRequestHeader("Content-Type", "Application/json")
       xhr.send(JSON.stringify({"username":this.loginuser.username, "password":this.loginuser.password}))
      },
      goback(){
        window.history.go(-1)
      }
    }
  }
</script>
