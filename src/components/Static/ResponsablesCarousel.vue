<template>
	<v-container style="position:relative">
		<v-icon x-large class="carousel-arrow" @click="slide(-1)" style="left:0;">arrow_back_ios</v-icon>
		<v-icon x-large class="carousel-arrow" @click="slide(1)"
		:style="{right: $vuetify.breakpoint.smAndDown ? '0' : '-40px' }"
		>arrow_forward_ios</v-icon>
		<v-flex>
			<div style="position:relative;">
				<div style="display:block;overflow:hidden;position:relative;width:100%;">
					<div style="width:20000px" id="wrapper">
						<div v-for="region,i in regions" class="slide text-xs-center primary--text" style="float:left">
							<p :class="['hidden-sm-and-down', 'headline', 'carousel-border-title', 'mb-1', 'cbt-' + region.zone]">{{region.zone.toUpperCase()}}</p>
							<div v-for="profile in region.profiles" class="profile" style="display:inline-block;">
					  			<img :src="imagePath(profile.image)"  :alt="profile.name" class="cip-small-image">
					  			<p class="subheading py-0"><strong>{{profile.name}}</strong></p>
					  			<p class="body-2 pt-0">({{profile.province}})</p>
					  			<p :class="['hidden-md-and-up', 'subheading', 'pt-0', 'cbmt-' + region.zone]"><strong>{{region.zone.toUpperCase()}}</strong></p>
					  		</div>
					  	</div>
					</div>
				</div>
			</div>
			
		</v-flex>
	</v-container>
</template>

<style>
	.carousel-border-title:after {
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

	#wrapper {
		transform: translateX(0px);
		-webkit-transition: transform 0.5s; 
    	transition: transform 0.5s;
	}

	.carousel-arrow {
		position: absolute;
		top: 30%;
	}

	.carousel-arrow:hover {
		cursor:pointer;
	}

</style>

<script>
	import Vue from 'vue'
    import VueAgile from 'vue-agile'
    Vue.use(VueAgile)
	export default {
		props: ["regions"],
		data () {
			return {
				scrollWidth: null,
				scrollPosition: 0,
				mimumumToShow: null,
			}
		},


		methods: {
			imagePath (image) {
			  return require('../../assets/responsables/'+image+'.jpg')
			},

			slide (direction) {
				if (!this.scrollWidth) this.scrollWidth = document.getElementsByClassName('profile')[0].offsetWidth // Calculate the width of one
				if (!this.mimumumToShow) {
					var containterWidth = document.getElementById('wrapper').parentElement.offsetWidth
					var picturesLength = document.getElementsByClassName('profile').length
					var minimumToShow = 1;
					while (minimumToShow * this.scrollWidth <= containterWidth) {
					    minimumToShow++;
					}
					this.mimumumToShow = minimumToShow
				}

				if (this.scrollPosition === 0 && direction === -1) return // AT the beginning
				if (direction === 1 && this.scrollPosition -1 + this.mimumumToShow === document.getElementsByClassName('profile').length) return // At the end

				var scroll =  this.scrollWidth * this.scrollPosition 
				var change = direction === 1 ? scroll + this.scrollWidth : scroll - this.scrollWidth
				var transform = 'translateX(-'+change+'px)'
				this.scrollPosition = direction === 1 ? this.scrollPosition + 1 : this.scrollPosition - 1
				document.getElementById('wrapper').style.transform = transform;
			}
		}
	}
</script>
