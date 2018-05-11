<template>
<v-layout wrap row class="text-xs-left primary--text body-2 mx-2">
  <v-flex xs12 md4 class="px-2">

  	<v-layout row class="py-2">
  		<v-flex> <strong>3.1</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Un miembro llega a ser <strong>“Gran Escalador Ibérico”</strong> cuando ha alcanzado <strong>todas las cumbres</strong> (640) del listado general. Recibe el <strong>“Certificado Ibérico de Montañas Ascendidas”</strong>.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex> <strong>3.2</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Además, tenemos otros dos subtipos de certificados: Zonal y porcentual.</v-flex>
  	</v-layout>

 	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;opacity:0;"><strong>3.2</strong></v-flex>
  		<v-flex class="pl-1">
  			<ol style="list-style-type:lower-alpha" class="pl-3">
  				<li class="pt-2"><span class="accent--text title">ZONAL</span> : <span>Se consigue después de haber completado alguna de las cuatro áreas de parcelación territorial, llamadas Iberias.</span></li>
  			</ol>
  			<ol class="pl-5 A">
  				<li v-for="zone in zones" class="pt-2"><span v-html="zone"></span></li>
  			</ol>
  		</v-flex>
  	</v-layout>

  </v-flex>

  <v-flex xs12 md4 class="px-2">

  	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;opacity:0;"><strong>3.2</strong></v-flex>
  		<v-flex class="pl-2">
  			<ol style="list-style-type:lower-alpha" start="2" class="pl-3">
  				<li class="pt-2"><span class="accent--text title">PORCENTAL</span> : <span>Se consigue después de alcanzar un determinado tanto por ciento del total de puertos del listado.</span></li>
  			</ol>
  		</v-flex>
  	</v-layout>

  	<v-layout row wrap class="py-1">
  		<v-flex xs2><img src="@/assets/icons/gold.png" alt="gold" class="pa-2" style="max-height:100%;max-width:100%;"></v-flex>
  		<v-flex xs10>Un miembro llega a ser <strong>“Escalador de Oro”</strong> cuando ha alcanzado el 75% del número de puertos de la lista. (480)</v-flex>
  	</v-layout>
  	<v-layout row wrap class="py-1">
  		<v-flex xs2><img src="@/assets/icons/silver.png" alt="silver" class="pa-2" style="max-height:100%;max-width:100%;"></v-flex>
  		<v-flex xs10>Un miembro llega a ser <strong>“Escalador de Plata”</strong> cuando ha alcanzado el 50% del número de puertos de la lista. (320)</v-flex>
  	</v-layout>
  	<v-layout row wrap class="py-1">
  		<v-flex xs2><img src="@/assets/icons/bronze.png" alt="bronze" class="pa-2" style="max-height:100%;max-width:100%;"></v-flex>
  		<v-flex xs10>Un miembro llega a ser <strong>“Escalador de Bronce”</strong> cuando ha alcanzado el 25% del número de puertos de la lista. (160)</v-flex>
  	</v-layout>
  	

  	<v-layout row class="py-1">
  		<v-flex style="max-width:24px;opacity:0;"><strong>3.2</strong></v-flex>
  		<v-flex class="pl-2">(En el ranking de logros estas categorías van distinguidas con una medalla correspondiente junto a cada usuario)</v-flex>
  	</v-layout>

  	<v-layout row class="py-1">
		<v-flex><img src="@/assets/mapa-iberias.png" alt="iberias-map" style="max-width:100%;height:auto;"></v-flex>
	</v-layout>


  </v-flex>
  <v-flex xs12 md4 class="px-2 py-2">
  	<img src="@/assets/stock-3.jpg" alt="bases" style="max-width:100%;max-height:100%;">
  </v-flex>
</v-layout>
</template>

<style>
	ol.A {list-style: none; counter-reset: chapter 1;}
	ol.A li+li {counter-increment: chapter 1; list-style: none;}
	ol.A li:before {content: "a " counter(chapter) " . ";}
	ol.B {list-style: none; counter-reset: chapter 1;}
	ol.B li+li {counter-increment: chapter 1; list-style: none;}
	ol.B li:before {content: "b " counter(chapter) " . ";}
</style>

<script>
	export default {
		data() {
			return {
				zones: [
					'Un miembro llega a ser “Escalador del Norte” cuando ha alcanzado todas las cumbres de la IBERIA VERDE (Galicia, Asturias, Cantabria, Euskadi, Navarra y La Rioja). Recibe el diploma “Iberia Verde”.',
					'Un miembro llega a ser “Escalador del Este” cuando ha alcanzado todas las cumbres de la IBERIA MED (Catalunya, C. Valenciana, Murcia, Baleares y Andorra). Recibe el diploma “Iberia Mediterránea”.',
					'Un miembro llega a ser “Escalador del Centro” cuando ha alcanzado todas las cumbres de la IBERIA PARDA (Aragón, Castilla La Mancha, Madrid y Andalucía Oriental). Recibe el diploma “Iberia Parda”.',
					'Un miembro llega a ser “Escalador del Oeste” cuando ha alcanzado todas las cumbres de la IBERIA ATLANTIS (Extremadura, Castilla y León, Portugal, Andalucía Occidental, Canarias y Ceuta). Recibe el diploma “Iberia Atlántica”',
				],
			}
		},
	}
</script>

