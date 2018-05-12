<template>
  <v-container fluid fluid class="pa-0 mt-2">
    <v-layout wrap row>
      <PageTitle :text="title"></PageTitle>
      <bases v-if="page ==='bases'"></bases>
      <certificados v-if="page ==='certificados'"></certificados>
      <normas v-if="page ==='normas'"></normas>
      <responsables v-if="page ==='responsables'"></responsables>
      <pmf v-if="page ==='pmf'"></pmf>
      <zurron v-if="page ==='zurron'"></zurron>
    </v-layout>
  </v-container>
</template>

<script>
	import Bases from './Bases'
	import Certificados from './Certificados'
	import Normas from './Normas'
	import Responsables from './Responsables'
	import PMF from './PMF'
	import Zurron from './Zurron'
	import PageTitle from '../Layout/PageTitle'

	export default {
		data () {
			return {
				page: this.$route.params.page.toLowerCase(),
			}
		},

		computed: {
			title () {
				if (this.page === "pmf") return "PREGUNTAS MAS FRECUENTES"
				if (this.page === "responsables") return "GRUPO DE RESPONSABLES C.I.P"
				if (this.page === "zurron") return "¡¡ AL ZURRÓN !! , por María"
				return this.page.toUpperCase()
			}
		},

		watch: {
			'$route.params.page': function (page) {
		      this.page = page;
		    },
		},

		components: {
			'bases' : Bases,
			'certificados' : Certificados,
			'normas' : Normas,
			'responsables' : Responsables,
			'pmf' : PMF,
			'zurron' : Zurron,
			'PageTitle' : PageTitle,
		}
	}
</script>

