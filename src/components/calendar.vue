<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                + Termin
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Erstellen eines Termins
              </v-card-title>


              <v-card-text>
                <!-- Name and details -->
                <v-text-field label="Name" v-model="saveevent.name"></v-text-field>
                <v-text-field label="Beschreibung" v-model="saveevent.details"></v-text-field>
                <!-- Name and details -->

                <!-- DATE -->
                <v-menu v-model="startdate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="saveevent.start" label="Startdatum" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="saveevent.start" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <v-menu v-model="enddate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="saveevent.end" label="Enddatum" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="saveevent.end" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <!-- DATE -->

                <!-- COLOR -->
                <v-overflow-btn class="my-2" :items="dropdown_font" label="Farbe" target="#dropdown-example" v-model="saveevent.color"></v-overflow-btn>
                <!-- COLOR -->
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">
                  abbrechen
                </v-btn>
                <v-btn color="primary" flat @click="eventissaved()">
                  speichern
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Tag</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Woche</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Monat</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 Tage</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">


        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor" :event-margin-bottom="3" :now="today" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
          @change="updateRange"></v-calendar>

        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon @click="toggleevent()">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title>
                <h3 v-if="updateevent">{{selectedEvent.name}}</h3>
                <v-text-field v-if="!updateevent" v-model="selectedEvent.name"></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="deleteevent(selectedEvent)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-if="updateevent" v-html="selectedEvent.details"></span>
              <v-textarea v-if="!updateevent" name="input-7-1" v-model="selectedEvent.details"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="recoverstat()">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script>
  let eventlist = require('../assets/events.json')
  export default {
    props: ['loggeduser'],
    data: () => ({
      listevent: eventlist,
      recoverevent: {},
      updateevent: true,
      saveevent: {},
      dropdown_font: ['green', 'blue', 'red', 'purple', 'orange'],
      startdate: false,
      enddate: false,
      datepickerend: new Date().toISOString().substr(0, 10),
      datepickerstart: new Date().toISOString().substr(0, 10),
      dialog: false,
      benutzer: {},
      today: '2019-01-01',
      focus: '2019-01-01',
      type: 'month',
      typeToLabel: {
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        '4day': '4 Tage',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [{
        name: 'default',
        details: 'default',
        start: '2020-01-08',
        end: '2020-01-15',
        color: 'blue'
      }],
    }),
    computed: {
      title() {
        const {
          start,
          end
        } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter() {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC',
          month: 'long',
        })
      },
    },
    mounted() {
      this.today = new Date()
      this.focus = new Date()
      this.$refs.calendar.checkChange()
      this.benutzer = this.loggeduser
      this.events = this.loggeduser['planner']
    },
    methods: {
      deleteevent(selectedEvent) {
        console.log(selectedEvent)
        console.log(this.events)
        this.events=[]
        console.log(this.events)

        let xhr = new XMLHttpRequest()
        // let self = this
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              // let object = JSON.parse(xhr.responseText)
              // console.log(object)
              // self.benutzer['planner'].push(object)
            } else {
              console.log("error " + xhr.status)
            }
          }
        }

        xhr.open("DELETE", "https://localhost:8443/xplanners?identifer=" + this.selectedEvent['identifier'], true)
        xhr.setRequestHeader("Content-Type", "Application/json")

        //this.listevent.splice(selectedEvent)
        this.selectedOpen = false
      },
      toggleevent() {

        if (this.updateevent == true) {
          this.updateevent = false
        } else {
          this.updateevent = true
        }
      },
      recoverstat() {
        this.selectedOpen = false
        this.selectedEvent = this.recoverevent
      },
      eventissaved() {
        let xhr = new XMLHttpRequest()
        let self = this
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              let object = JSON.parse(xhr.responseText)
              console.log(object)
              self.benutzer['planner'].push(object)
            } else {
              console.log("error " + xhr.status)
            }
          }
        }

        xhr.open("POST", "https://localhost:8443/xplanners", true)
        xhr.setRequestHeader("Content-Type", "Application/json")
        xhr.send(JSON.stringify(this.saveevent))

        //   this.benutzer['planner'].push(this.saveevent)

        console.log(JSON.stringify(this.benutzer))
        this.dialog = false
        self.listevent.push(this.saveevent)

        this.savetheuser()

      },
      savetheuser() {
        let xhr = new XMLHttpRequest()
        // let self = this
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              // let object = JSON.parse(xhr.responseText)
              // console.log(object)
              // self.benutzer['planner'].push(object)
            } else {
              console.log("error " + xhr.status)
            }
          }
        }
        //        xhr.open("POST", "https://localhost:8443/persons?identifier=" + this.benutzer['identifier'], true)
        xhr.open("POST", "https://localhost:8443/persons", true)
        xhr.setRequestHeader("Content-Type", "Application/json")
        xhr.send(JSON.stringify(this.benutzer))
      },
      viewDay({
        date
      }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor(event) {
        return event.color
      },
      setToday() {
        this.focus = this.today
      },
      prev() {
        this.$refs.calendar.prev()
      },
      next() {
        this.$refs.calendar.next()
      },
      showEvent({
        nativeEvent,
        event
      }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange({
        start,
        end
      }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth(d) {
        return d > 3 && d < 21 ?
          'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
  }
</script>
