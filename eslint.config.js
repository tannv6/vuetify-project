import vuetify from 'eslint-config-vuetify'
import eslintPluginPrettier from 'eslint-plugin-prettier'
export default vuetify({
	plugins: {
		prettier: eslintPluginPrettier,
	},
})
