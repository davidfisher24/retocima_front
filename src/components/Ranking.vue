
<template>
<v-app>
    <v-container>
        <v-layout v-show="this.$route.name === 'ranking'">
            <v-flex>
                <BaseTable 
                    :data="data"
                    :columns="columns"
                    :filterOptions="{Provincia:'provinciaName'}"
                    :searchOptions="['fullName']"
                    :title="title"
                    @action="action"
                ></BaseTable>
            </v-flex>
        </v-layout>
        <router-view></router-view>
    </v-container>
</v-app>
</div>
</template>

<script>

    import BaseTable from '../components/Tables/BaseTable.vue';
    import axios from 'axios'

    export default {

        components: {
            'BaseTable': BaseTable,
        },

        mounted: function() {
            this.$store.dispatch('ranking').then(data => this.data = data);
        },

        data: function() {
            return {
                data: [],
                columns: [
                    { value: 'rank', text: 'Posicion', sortable:true },
                    { value: 'image', text: '', type: 'image', sortable: false },
                    { value: 'fullName', text: 'Nombre', sortable: true},
                    { value: 'provinciaName', text: 'Provincia', sortable: true},
                    { value: 'logros_count', text: 'Logros', sortable: true }
                ],
                title: "Ranking de cimeros"
            };
        },

        methods: {
            action(id){
                this.$router.push({name: 'cimero', params: {uid: id}});
            },
        }
    }

</script>
