<template>
	<div>
		<v-layout wrap row class="text-xs-center primary--text body-2 mx-2">
		  <v-flex xs12 md8 class="px-2">
		  	<p class="headline accent--text">COMITE PERMANENTE</p>
		  	<v-layout row class="px-5">
		  		<v-flex xs3>
		  			<img src="@/assets/responsables/cip1.jpg"  alt="Diego Aguero" class="cip-image">
		  			<p class="title pt-2">Diego Agüero</p>
		  			<p class="subheading">(Girona)</p>
		  		</v-flex>
		  		<v-flex xs3>
		  			<img src="@/assets/responsables/cip2.jpg"  alt="Juanto Uribarri" class="cip-image">
		  			<p class="title pt-2">Juanto Uribarri</p>
		  			<p class="subheading">(Bizkaia)</p>
		  		</v-flex>
		  		<v-flex xs3>
		  			<img src="@/assets/responsables/cip3.jpg"  alt="Ander Guaza" class="cip-image">
		  			<p class="title pt-2">Ander Guaza</p>
		  			<p class="subheading">(Bizkaia)</p>
		  		</v-flex>
		  		<v-flex xs3>
		  			<img src="@/assets/responsables/cip4.jpg"  alt="Miguel Bernabe" class="cip-image">
		  			<p class="title pt-2">Miguel Bernabe</p>
		  			<p class="subheading">(Zaragoza)</p>
		  		</v-flex>
		  	</v-layout>
		  </v-flex>
		  <v-flex xs12 md4 class="px-2">
		  	<v-flex><img src="@/assets/mapa-zonas.png" alt="iberias-map" style="max-width:100%;height:auto;"></v-flex>
		  </v-flex>
		</v-layout>
	</div>
  
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
	export default {
		data () {
			return {
		
			}
		}
	}
</script>

