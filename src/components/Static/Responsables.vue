<template>
<v-container fluid>
		<v-layout wrap row class="text-xs-center primary--text body-2 mx-2">
		  <v-flex xs12 md8 class="px-2">
		  	<p class="headline accent--text">COMITE PERMANENTE</p>
		  	<v-layout row wrap class="px-5">
		  		<v-flex xs12 md3 v-for="profile in cip">
		  			<img :src="imagePath(profile.image)"  :alt="profile.name" class="cip-image">
		  			<p class="title pt-2">{{profile.name}}</p>
		  			<p class="subheading">({{profile.province}})</p>
		  		</v-flex>
		  	</v-layout>
		  </v-flex>
		  <v-flex xs12 md4 class="px-2">
		  	<v-flex><img src="@/assets/mapa-zonas.png" alt="iberias-map" style="max-width:100%;height:auto;"></v-flex>
		  </v-flex>
		</v-layout>
		<ResponsablesCarousel :regions="regions"></ResponsablesCarousel>
  </v-container>
</template>

<style>
	.cip-image {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
		padding: 20px;
		width:100%;
	}

</style>

<script>
    import ResponsablesCarousel from './ResponsablesCarousel'
	export default {
		components: {
			'ResponsablesCarousel' : ResponsablesCarousel,
		},
		data () {
			return {
				cip: [
					{name: 'Diego Agüero', province: 'Gironia', image: 'cip1'},
					{name: 'Juanto Uribarri', province: 'Bizkaia', image: 'cip2'},
					{name: 'Ander Guaza', province: 'Bizkaia', image: 'cip3'},
					{name: 'Miguel Bernabe', province: 'Zaragoza', image: 'cip4'},
				],
				regions: [
					{zone: 'oeste', profiles: [
						{name: 'Javier Costas', province: 'Asturias', image: 'oeste-1'},
						{name: 'David Argibay', province: 'Pontevedra', image: 'oeste-2'},
						{name: 'Francisco Otero', province: 'Pontevedra', image: 'oeste-3'},
					]},
					{zone: 'norte', profiles: [
						{name: 'Aitor Antxustegi', province: 'Bizkaia', image: 'norte-1'},
						{name: 'Luis Fdo. Vallejo ', province: 'Gipuzkoa', image: 'norte-2'},
						{name: 'David Pérez ', province: 'Cantabria', image: 'norte-3'},
					]},
					{zone: 'este',  profiles: [
						{name: 'María Fuster', province: 'Barcelona', image: 'este-1'},
						{name: 'Roger Sala', province: 'Barcelona', image: 'este-2'},
						{name: 'J. Javier Marco', province: 'Barcelona', image: 'este-3'},
					]},
					{zone: 'centro', profiles: [
						{name: 'José R. González', province: 'Madrid', image: 'centro-1'},
						{name: 'Javier De Córdoba ', province: 'Madrod', image: 'centro-2'},
						{name: 'Francisco Scrimieri ', province: 'Valladolid', image: 'centro-3'},
					]},
					{zone: 'sur', profiles: [
						{name: 'Martín Cerván', province: 'Sevilla', image: 'sur-1'},
						{name: 'Juan M. Muñoz', province: 'Málaga', image: 'sur-2'},
						{name: 'Bosco Rite', province: 'Barcelona', image: 'sur-3'},
					]},
					{zone: 'canarias', profiles: [
						{name: 'Manuel Gómez', province: 'Tarragona', image: 'canarias-1'},
						{name: 'Manuel Fraga', province: 'A Coruña', image: 'canarias-2'},
					]}
				]
			}
		},


		methods: {
			imagePath (image) {
			  return require('../../assets/responsables/'+image+'.jpg')
			},
		}
	}
</script>
