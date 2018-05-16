<template>
<v-container fluid>
	<v-layout row wrap class="text-xs-center primary--text">
		<v-flex xs12 md6 v-for="region in regions">
			<p :class="['headline', 'responsables-border-title', 'mb-1', 'cbt-' + region.zone]">{{region.zone.toUpperCase()}}</p>
			<v-layout row justify-center>
				<v-flex xs3 v-for="profile,i in region.profiles">
		  			<img :src="imagePath(profile.image)"  :alt="profile.name" class="cip-small-image">
		  			<p class="subheading py-0"><strong>{{profile.name}}</strong></p>
		  			<p class="body-2 pt-0">({{profile.province}})</p>
		  		</v-flex>
			</v-layout>
		</v-flex>

				
	
						
	
	
		
	</v-layout>
</v-container>
</template>

<style>
.responsables-border-title:after {
	    height: 3px;
	    display: block;
	    width: 95%;
	    margin-left: 2.5%;
	    content: '';
	}

	.cbmt-norte {color:#7F4519;} .cbt-norte:after {background: #7F4519;}
	.cbmt-oeste {color:#00E5C4;} .cbt-oeste:after {background: #00E5C4;}
	.cbmt-este {color:#118C7A;} .cbt-este:after {background: #118C7A;}
	.cbmt-sur {color:#F2791E;} .cbt-sur:after {background: #F2791E;}
	.cbmt-centro {color:#45618C;} .cbt-centro:after {background: #45618C;}
	.cbmt-canarias {color:#F8BC8E;} .cbt-canarias:after {background: #F8BC8E;}

	.cip-small-image {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
		padding: 10px 20px;
		width:90%;
	}
</style>

<script>

	export default {
		props: ["regions"],
		data () {
			return {
			}
		},


		methods: {
			imagePath (image) {
			  return require('../../assets/responsables/'+image+'.jpg')
			},
		}
	}
</script>
