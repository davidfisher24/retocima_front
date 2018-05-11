<template>
<v-layout wrap row class="text-xs-left primary--text body-2 mx-2">
  <v-flex xs12 md4 class="px-2">
  	<v-layout row v-for="paragraph,i in paragraphsA" class="py-2">
  		<v-flex> <strong>1.{{i+1}}</strong></v-flex>
  		<v-flex class="pl-1"v-html="paragraph" style="text-indent:12px;"></v-flex>
  	</v-layout>
  </v-flex>
  <v-flex xs12 md4 class="px-2">
  	<v-layout row v-for="paragraph,i in paragraphsB" class="py-2">
  		<v-flex> <strong>1.{{i+5}}</strong></v-flex>
  		<v-flex v-html="paragraph" class="pl-1" style="text-indent:12px;"></v-flex>
  	</v-layout>
  </v-flex>
  <FlexImage :image="image"></FlexImage>
  <!--<v-flex xs12 md4 class="px-2 py-2">
  	<img src="@/assets/stock-1.jpg" alt="bases" style="max-width:100%;max-height:100%;">
  </v-flex>-->
</v-layout>
</template>

<script>
	import image from '../../assets/stock-1.jpg';
	import FlexImage from './FlexImage'
	export default {
		components: {
        	'FlexImage' : FlexImage,
        },
		data () {
			return {
				image: image,
				paragraphsA: [
					'El <strong>desafío cicloturista CIMA</strong> está basado en una lista con un número determinado de cumbres ciclistas (aunque ésta puede cambiar), integradas en los tres países que conforman la Península Ibérica, divididos en 17 regiones que conforman las diferentes comunidades autónomas, más Ceuta, Andorra y Portugal, incluídas sus islas.',
					'El fin básico del <strong>CIMA</strong> es el <strong>fomento de la práctica lúdica, deportiva y turística en el ámbito ciclista</strong>, excluyendo el carácter competitivo.',
					'El número de miembros es ilimitado. Para poder ser integrante del desafío <strong>CIMA</strong> hay que rellenar el formulario de inscripción y enviar el formulario de puertos ascendidos con al menos un puerto de los incluidos en la lista, <strong>convirtiéndose instantáneamente en miembro suscrito al CIMA</strong>. Si pasados 6 meses desde la fecha de Alta, no hubiera enviado ningún puerto <strong>CIMA</strong>, será dado de baja y deberá formalizar de nuevo el alta.<br>El CIMA tiene la posibilidad de rechazar a un miembro en un caso extremo.',
					'Cuando un miembro logra la consecución de un puerto, es <strong>para toda la vida</strong> y su código aparecerá en su ficha del ranking. Si un puerto desapareciera de la lista, el miembro conservaría esa ascensión. Si un puerto fuera sustituído por otro, quien tenga ascendido el puerto saliente tiene automáticamente como logrado el puerto entrante, aunque no lo huebiera subido realmente.',
				],
				paragraphsB: [
					'Para que un puerto se considere conseguido, éste ha de ser ascendido <strong>como mínimo por una de las vertientes indicadas</strong>, no teniendo significación para el reto que posteriormente se acienda por otras vertientes. Los <strong>puertos que comparten provincias, habrán de subirse por cada vertiente</strong>, ya que tendrán un código en cada provincia. En el listado están marcados con un asterisco (*).',
					'Los logros de los miembros del desafío <strong>CIMA</strong> no serán verificados. Confiamos en la <strong>honestidad deportiva</strong> de los ciclistas, quienes disfrutan con el ciclismo y con las montañas solamente por puro placer. Cada puerto declarado ascendido por un miembro del <strong>CIMA</strong> será considerado como realmente alcanzado.',
					'Las ascensiones logradas serán remitidas mediante un formulario que se encuentra en la web, para así confeccionar el ranking individual, y en el que se podrá consultar la clasificación de cada uno de los miembros. Se aconseja, si se preveen varias ascensiones en un corto plazo de tiempo, mandarlas todas juntas, hasta un <strong>máximo de 10 que admite el formulario.</strong>'
				] 
			}
		}
	}
</script>
