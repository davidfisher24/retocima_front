<template>
 <v-layout wrap row class="text-xs-left primary--text body-2 mx-2">
  <v-flex xs12 md4 class="px-2">
  	<v-layout row wrap v-for="i in 3" class="py-2">
  		<v-flex xs1 class="text-xs-right pr-1"> <strong>{{i}}</strong></v-flex>
  		<v-flex xs11 class="pl-1 accent--text subheading" v-html="faqs[i - 1].q"></v-flex>
  		<v-flex xs11 offset-xs1 class="pl-1 pt-2" v-html="faqs[i - 1].a"></v-flex>
  	</v-layout>
  </v-flex>

  <v-flex xs12 md4 class="px-2">
  	<v-layout row wrap v-for="i in 1" class="py-2">
  		<v-flex xs1 class="text-xs-right pr-1"> <strong>{{i + 3}}</strong></v-flex>
  		<v-flex xs11 class="pl-1 accent--text subheading" v-html="faqs[i + 2].q"></v-flex>
  		<v-flex xs11 offset-xs1 class="pl-1 pt-2" v-html="faqs[i + 2].a"></v-flex>
  	</v-layout>
  </v-flex>

  <FlexImage :image="image"></FlexImage>
  <!--<v-flex xs12 md4 class="px-2 py-2">
  	<img src="@/assets/stock-4.jpg" alt="bases" style="max-width:100%;max-height:100%;">
  </v-flex>-->
</v-layout>
</template>

<script>
	import image from '../../assets/stock-4.jpg';
	import FlexImage from './FlexImage'
	export default {
		components: {
        	'FlexImage' : FlexImage,
        },
		data () {
			return {
				image: image,
				faqs: [
					{q: '<strong>¿Cuándo puedo decir que he conseguido un CIMA?</strong>', a: 'Cuando lo asciendes al menos por una de las vertientes que figuran en el listado como válidas. Una vez logrado ya no tiene relevancia para el RETO que se ascienda por las otras vertientes válidas, sólo es necesario una de ellas.'},
					{q: '<strong>En el listado hay CIMAs que tienen un asterisco (*) ¿Qué significa?</strong>', a: 'El asterisco indica que el CIMA es fronterizo con otra provincia, y en ambas es válido como CIMA. En estos casos, ascenderlo por las dos vertientes hace que logres dos CIMAs, uno por cada una de las dos provincias. <br> Ejemplo: Navafría, entre Madrid y Segovia, son los MA06 y SE03, respectivamente.'},
					{q: '<strong>He enviado el formulario de ALTA ¿Por qué no recibo el mensaje de confirmación para empezar a enviar mis puertos conseguidos?</strong>', a: 'Puede tardar varios días en llegarte el mensaje de confirmación de ALTA , si el coordinador no pudiera atender el correo, ya que el proceso es manual. También podría deberse a que se haya introducido en el formulario un correo electrónico erróneo con lo que la comunicación no puede llevarse a efecto. Revisa los datos que introduces antes de enviar.'},
					{q: '<strong>¿Cómo puedo ver los CIMA que ya he subido?</strong>', a: 'Tienes que entrar en el enlace “RANKING” donde está la lista de usuarios con el número total de CIMAs que tienen subidos. Están ordenados por el número de CIMAs, de mayor a menor. Puedes variar este orden si haces click en las flechitas del encabezado de la columna “CIMAS” o en la de “APELLIDOS, NOMBRE” para verlos por orden alfabético. <br> Una vez te hayas encontrado, tienes que clicar en la mención “+info” que hay a la derecha de tu número de cimas, se abrirá una página con el detalle de tus logros.'},
				]
			}
		}
	}
</script>

