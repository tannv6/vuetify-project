<script setup lang="ts">
const headers = [
	{ title: 'Name', key: 'name' },
	{ title: 'Species', key: 'species' },
	{ title: 'Diet', key: 'diet' },
	{ title: 'Habitat', key: 'habitat' },
	{ title: 'Actions', key: 'actions' },
]
const items = [
	{
		name: 'African Elephant',
		species: 'Loxodonta africana',
		diet: 'Herbivore',
		habitat: 'Savanna, Forests',
	},
]
const handleViewDetails = (item: any) => {
	alert(`View details for ${item.name}`)
}
</script>
<template>
	<v-data-table :items="items" :disable-sort="true" :headers="headers">
		<template #item.actions="{ item }">
			<v-btn @click="handleViewDetails(item)" icon="mdi-eye" color="primary" variant="text"></v-btn>
		</template>
		<template #no-data>
			<v-alert :value="true" color="error" icon="mdi-alert"> No data available </v-alert>
		</template>
	</v-data-table>
</template>
