<template>
    <div class="chartWrapper" v-if="logArray.labels">
        <div class="chartAreaWrapper">
            <div class="chartAreaWrapper2">
                <Bar :chart-data="logArray" :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false
                }" />
            </div>
        </div>
    </div>

</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 200
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        logArray() {
            let o = {}
            if (this.$root.session.writer.selected.log) {
                /*
                let log = {}
               
                let high = 0
                Object.keys(this.$root.session.writer.selected.log).forEach((d) => {
                    log[d] = (this.$root.session.writer.selected.log[d] - prevCount)
                    prevCount = this.$root.session.writer.selected.log[d]
                })

                // generate the list of all the dates as an object from day 1
                let startdate = Object.keys(this.$root.session.writer.selected.log)[0]
                let enddate = Object.keys(this.$root.session.writer.selected.log)[Object.keys(this.$root.session.writer.selected.log).length - 1]
                let valArray = []
                let prevCount = 0
                console.log(startdate, enddate)
                for (var dateArray = [], dt = new Date(startdate); dt <= new Date(enddate); dt.setDate(dt.getDate() + 1)) {
                    let nextday = new Date(dt)
                    var dd = String(nextday.getDate()).padStart(2, '0');
                    var mm = String(nextday.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = nextday.getFullYear();
                    nextday = yyyy + "-" + mm + "-" + dd
                    dateArray.push(nextday);
                    let val = 0

                    if (this.$root.session.writer.selected.log[nextday]) {
                        val = this.$root.session.writer.selected.log[nextday] - prevCount
                        prevCount = this.$root.session.writer.selected.log[nextday]
                    }
                    valArray.push(val)
                }
*/


                o.labels = Object.keys(this.$root.session.writer.selected.log)

                let valArray = []
                let prev = 0
                o.labels.forEach(l => {
                    if (this.$root.session.writer.selected.log[l]) {
                        valArray.push(this.$root.session.writer.selected.log[l] - prev)
                    }
                    prev = this.$root.session.writer.selected.log[l]
                })

                o.datasets = [{
                    label: 'Words',
                    backgroundColor: '#f87979',
                    data: valArray
                }]

            }



            return o
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>

<style scoped>
.chartWrapper {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    width: 100%;
}
</style>