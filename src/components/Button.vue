<template>
	<v-btn flat dark @click="router()" class="hover"><a class="white--text">{{text}}</a></v-btn>
</template>

<style>
	
	.hover a {
	    transition: 0.6s;
	    text-decoration: none;
	    margin: 0 10px;
	    position:relative;
	}

	.hover a::before	{
		content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: #E65100;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
	}

	.hover a:hover::before {
		visibility: visible;
	    -webkit-transform: scaleX(1);
	    transform: scaleX(1);
	}
	
</style>

<script>

export default {
	props:["text","route","params"],
	methods: {
		router () {
			var parameters = this.params ? JSON.parse(this.params) : undefined;
			this.$router.push({name: this.route, params: parameters});
		},
	}
}
</script>

