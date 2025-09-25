<script setup lang="ts"></script>
<template>
	<div class="gap-4 flex flex-col items-center">
		<div
			class="flex justify-center items-center border-2 border-pink-500 rounded-full"
			style="height: 3.2rem; width: 3.2rem"
		>
			<i class="pi pi-fw pi-exclamation-circle !text-2xl text-pink-500"></i>
		</div>
		<h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl mb-2">Error Occured</h1>
		<span class="text-muted-color mb-8">Requested resource is not available.</span>
		<img src="/images/asset-error.svg" alt="Error" class="mb-8" width="80%" />
		<div class="col-span-12 mt-8 text-center">
			<Button as="router-link" label="Go to Dashboard" to="/" severity="danger" />
		</div>
	</div>
</template>
