<template>
<v-layout wrap row class="text-xs-left primary--text body-2 mx-2">
  <v-flex xs12 md4 class="px-2">

  	<v-layout row class="py-2">
  		<v-flex> <strong>2.1</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Las subidas o puertos se organizan por comunidades autónomas y han sido seleccionadas de acuerdo con <strong>criterios deportivos, mediáticos, turísticos e históricos</strong> con la ayuda de especialistas de las zonas.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex> <strong>2.2</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Las <strong>19 áreas</strong> tienen un número determinado de subidas pudiéndose reducir o aumentar según lo estime el Comité responsable en debate periódico. En 2013 se deja fijado este número en <strong>640</strong>, pudiendo haber cambios puntuales cuando existan razones para ello.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex> <strong>2.3</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Cada lista tiene sus nombres de puertos asignados, cada uno con su código correspondiente, para su correcta identificación. Sin embargo, un grupo interzonal llamado <strong>“CIP” (Comité Interregional de Puertos)</strong> tiene la posibilidad de cambiar algunos nombres cuando se estime necesario en la lista CIMA.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex> <strong>2.4</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Este grupo de responsables (CIP) estará formado de forma permanente por <strong>el precursor de la iniciativa, el coordinador y los dos creadores de APM</strong>; además, contarán con el apoyo de unos miembros renovables cada cierto tiempo que tengan la experiencia necesaria para conocer el RETO, que asesorarán en las distintas regiones que conocen.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex> <strong>2.5</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">Los responsables deben tomar parte en los debates que se produzcan sobre los posibles cambios en la lista de puertos, valorando todas aquellas ascensiones que los distintos usuarios hayan propuesto como candidatos. Además, pueden ser consultados para tomar decisiones importantes que vayan surgiendo.</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;"><strong>2.6</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">
  			<p class="accent--text title">MOTIVOS DE EXCLUSIÓN</p>
  			<p>Cualquier miembro registrado del <strong>CIMA</strong> tiene la potestad de proponer la supresión de alguno de los puertos que se encuentren en la lista por cualquiera de las siguientes razones:</p>
  			<ol style="list-style-type:lower-alpha" class="pl-3">
  				<li v-for="i in 3" class="pt-2"><span v-html="rules[i-1].title" class="accent--text"></span> : <span v-html="rules[i-1].text"></span></li>
  			</ol>
  		</v-flex>
  	</v-layout>

  </v-flex>
  <v-flex xs12 md4 class="px-2">

  	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;opacity:0;"><strong>2.6</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">
  			<ol style="list-style-type:lower-alpha" start="4" class="pl-3">
  				<li v-for="i in 3" class="pb-2"><span v-html="rules[i+2].title" class="accent--text"></span> : <span v-html="rules[i+2].text"></span></li>
  			</ol>
  		</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;"><strong>2.7</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">
  			<p class="accent--text title">CONDICIONES PARA LA ADMISIÓN</p>
  			<p>Serán <strong>aceptados para su estudio todos aquellos puertos propuestos por los usuarios registrados</strong>. Para ello deberán ser presentados de forma individual en el subforo correspondiente del foro APM donde se proporcionarán todos los datos posibles (longitud, altura, desnivel, pendiente media, coeficiente APM, vertiente/s, punto partida, provincia), además de su correspondiente altigrafía, mapa de situación y breve comentario acerca de la ascensión. Si fuera posible se incluirá un mínimo de 3 fotos donde se pueda observar algunas características de la subida. Quien no sea usuario del foro APM remitirá todos estos datos al correo del CIMA, para su exposición a los responsables CIP.</p>
  		</v-flex>
  	</v-layout>

  	<v-layout row class="py-2">
  		<v-flex style="max-width:24px;"><strong>2.8</strong></v-flex>
  		<v-flex class="pl-1" style="text-indent:12px;">
  			<p class="accent--text title">VOTACIONES</p>
  			<p>Recibidas las propuestas, los miembros del CIP de la región correspondiente gozarán de un tiempo prudencial para su deliberación y comunicarán su decisión el CIP permanente.</p>
  			<p>Éste a su vez valorará todas las opiniones recibidas del CIP regional y decidirá su inclusión o será rechazado. En la <strong>web se pueden ir siguiendo los cambios sustanciales en el listado</strong>, y periódicamente se emitirá un boletin con noticias que incluyan las variaciones importantes que afecten al listado.</p>
  		</v-flex>
  	</v-layout>

  </v-flex>
  <v-flex xs12 md4 class="px-2 py-2">
  	<img src="@/assets/stock-2.jpg" alt="bases" style="max-width:100%;max-height:100%;">
  </v-flex>
</v-layout>
</template>

<script>
	export default {
		data () {
			return {
				rules: [
					{title: 'PELIGROSIDAD', text: 'Demasiado tráfico que haga peligroso el circular por esa vía.'},
					{title: 'IMPRACTICABILIDAD', text: 'Imposibilidad de circular por esa calzada con bicicleta de carretera, bien por el deterioro o por falta de asfalto (exceptuadas las obras en curso).'},
					{title: 'DUREZA', text: 'Considerar como única característica de selección el tener un gran porcentaje de dureza (y por tanto alto coeficiente APM), sin contar con ninguna otra cualidad más que le haga estar dentro de la lista.'},
					{title: 'SUAVIDAD', text: 'Aunque posea algunas de las cualidades necesarias para estar en la lista, tener un coeficiente tan escaso que lo haga irrelevante como subida.'},
					{title: 'LONGITUD', text: 'Que su distancia sea demasiado corta y haga que otras particularidades de esa ascensión no sean lo suficientemente interesantes para mantenerlo dentro de la lista.'},
					{title: 'ENLACES', text: 'La existencia de alguna vertiente que, al llegar a la cima o bien sólo con un mínimo descenso, se pueda empezar la ascensión de otro puerto que enlace a ambos, viéndose recortada la dureza del segundo de ellos.'},
				]
			}
		}
	}
</script>

