<template>
  <v-flex xs12 md4 row class="py-1 px-2" :style="style"></v-flex>
</template>

<script>
	export default {
		props: ['image'],
		data () {
			return {
				style: {
					minHeight: '500px',
					backgroundImage: 'url(\'' + this.image + '\' )',
					backgroundSize:'cover',
					backgroundPosition:'center',
					backgroundClip: 'padding-box',
					borderLeft : '16px solid transparent',
					borderRight: '16px solid transparent',
					borderBottom: '12px solid transparent',
				}
			}
		},
		mounted () {
			const clientHeight = document.getElementsByClassName('content--wrap')[0].clientHeight - document.getElementsByClassName('footer')[0].clientHeight * 2;
			if (clientHeight >= 500 && window.innerWidth > 800 && window.innerHeight > 600) this.style.minHeight = clientHeight + "px";
		},
	}
</script>

