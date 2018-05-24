export default function (to,app) {
  if (to.name.indexOf('patanegra') !== -1) {
 	app.$vuetify.theme.theme = app.$vuetify.theme.patanegra
 	app.$vuetify.theme.background = app.$vuetify.theme.patanegraBackground
  } else if (to.name.indexOf('extrema') !== -1) {
  	app.$vuetify.theme.theme = app.$vuetify.theme.extrema
 	app.$vuetify.theme.background = app.$vuetify.theme.extremaBackground
  } else {
    app.$vuetify.theme.theme = app.$vuetify.theme.primary
 	app.$vuetify.theme.background = app.$vuetify.theme.primaryBackground
  }
  return
}
