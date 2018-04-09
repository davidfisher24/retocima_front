<template>
    <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
        <div style="max-width:100%;">
            <BaseTable 
                store = "ranking"
                :storeData="storeData"
                :columns="columns"
                :filterOptions="{Provincia:'provinciaName'}"
                :searchOptions="['fullName']"
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
                    { value: 'rank', text: null, sortable:true,  },
                    { value: 'image', text: null, type: 'image', sortable: false },
                    { value: 'fullName', text: 'Nombre', sortable: true},
                    { value: 'provinciaName', text: 'Provincia', sortable: true},
                    { value: 'logros_count', text: 'Logros', sortable: true }
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
