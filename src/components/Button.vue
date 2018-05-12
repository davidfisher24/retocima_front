<template>
	<v-btn :flat="bgColor === undefined ? true : false" :color="bgColor"  @click="trigger()" :class="classes('parent')">
		<a :class="classes('child')">{{text}}</a>
	</v-btn>
</template>

<style>

	.btn-bg-white {
		background-color: white !important;
	}

	.btn-lowercase {
		text-transform:capitalize;
		font-weight:600;
	}
	
	.btn-underline a {
	    transition: 0.6s;
	    text-decoration: none;
	    margin: 0 10px;
	    position:relative;
	}

	.btn-underline a::before	{
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

	.btn-underline:hover a::before {
		visibility: visible;
	    -webkit-transform: scaleX(1);
	    transform: scaleX(1);
	}
	
</style>

<script>

export default {
	props:["text","bgColor","textColor","underline","lowercase","route","action","params"],


	methods: {
		classes (component) {
			if (component == "child") {
				if (this.textColor) return this.textColor + "--text"
			}
			if (component == "parent") {
				var style = ""
				if (this.underline) style += "btn-underline "
				if (this.lowercase) style += "btn-lowercase "
				return style
			}	
		},

		trigger () {
			if (this.route) return this.router()
			if (this.action) return this.act()
		},

		router () {
			var parameters = this.params ? this.params : undefined;
			this.$router.push({name: this.route, params: parameters});
		},

		act () {

		}
	}
}
</script>

