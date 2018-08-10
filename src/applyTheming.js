export default function (pageName,vuetify) {
  if (pageName.indexOf('patanegra') !== -1) {
 	vuetify.theme.theme = vuetify.theme.patanegra
 	vuetify.theme.background = vuetify.theme.patanegraBackground
  } else if (pageName.indexOf('extrema') !== -1) {
  	vuetify.theme.theme = vuetify.theme.extrema
 	vuetify.theme.background = vuetify.theme.extremaBackground
  } else {
    vuetify.theme.theme = vuetify.theme.primary
 	vuetify.theme.background = vuetify.theme.primaryBackground
  }
  return
}
