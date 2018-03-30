<template>
	<v-card class="ma-3">
		<!--<v-card-media :style="{ backgroundImage: 'url(\'' + apm+ '\')' }"></v-card-media>-->
		<a href="http://www.altimetrias.net/" target="blank"><v-card-media><img src="@/assets/APM1.png" alt="APM" class="mb-5"></v-card-media></a>
		<a href="http://www.ziklo.es/la-revista/" target="blank"><v-card-media><img src="@/assets/ziklo.jpg" alt="APM" class="mb-5"></v-card-media></a>
	</v-card>

</template>

<style>
	.card .card {
		background-repeat:no-repeat;
		background-attachment: fixed;
		background-position:50% 50%;
		background-size:cover;
	}
</style>
<script>
    import apm from '../assets/APM1.png';
    import ziklo from '../assets/ziklo.jpg';

    export default {
        data: function() {
            return {
                apm: apm,
                ziklo: ziklo,
            };
        },
    }
</script>