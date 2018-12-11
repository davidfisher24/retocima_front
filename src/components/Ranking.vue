<template>
    <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
        <div style="max-width:100%;">
            <BaseTable 
                store = "ranking"
                :storeData="storeData"
                :columns="columns"
                :filterOptions="{Provincia:'provinciaName'}"
                :searchOptions="['fullname']"
                :defaultPagination='defaultPagination'
                :title="title"
                @action="action"
            ></BaseTable>
        </div>
    </v-container>
</template>

<script>

    import BaseTable from '../components/Tables/BaseTable.vue';

    export default {

        components: {
            'BaseTable': BaseTable,
        },

        data: function() {
            return {
                columns: [
                    { value: 'rank', text: null, sortable:true, mobile:true },
                    { value: 'image', text: null, type: 'image', sortable: false,mobile:true },
                    { value: 'fullname', text: 'Nombre', sortable: true ,mobile:true},
                    { value: 'provinciaName', text: 'Provincia', sortable: true, mobile:false},
                    { value: 'logro_count', text: 'Logros', sortable: true,mobile:true }
                ],
                title: "Ranking de cimeros",
                defaultPagination: {
                    rowsPerPage: 25,
                    sortBy: 'rank',
                    descending: false,
                    page: 1,
                },
            };
        },

        computed: {
            storeData () {
                return this.$route.params.storeData;
            },
        },

        methods: {
            action(id){
                this.$router.push({name: 'cimero', params: {uid: id}});
            },
        }
    }

</script>
