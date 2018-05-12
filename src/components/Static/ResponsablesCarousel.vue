<template>


	<v-container style="position:relative">
		<v-icon x-large style="position:absolute;left:-20px;top:30%;" @click="slide(-1)">arrow_back_ios</v-icon>
		<v-icon x-large style="position:absolute;right:-40px;top:30%;" @click="slide(1)">arrow_forward_ios</v-icon>
		<v-flex>
			
			<div style="position:relative;">
				<div style="display:block;overflow:hidden;position:relative;width:100%;">
					<div style="width:20000px" id="wrapper">
						<div v-for="region in regions" class="slide text-xs-center" style="float:left">
							<p class="headline">{{region.zone.toUpperCase()}}</p>
							<div v-for="profile in region.profiles" class="profile" style="display:inline-block" >
					  			<img :src="imagePath(profile.image)"  :alt="profile.name" class="cip-image">
					  			<p class="subheading pt-2">{{profile.name}}</p>
					  			<p class="body-2">({{profile.province}})</p>
					  		</div>
					  	</div>
					</div>
				</div>
			</div>
			
		</v-flex>
	</v-container>
</template>

<style>
	.cip-image {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
		padding: 20px;
		width:100%;
	}

	#wrapper {
		transform: translateX(0px);
		-webkit-transition: transform 0.5s; /* Safari */
    	transition: transform 0.5s;
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
