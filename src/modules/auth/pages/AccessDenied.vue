<script setup lang="ts"></script>
<template>
	<div class="gap-4 flex flex-col items-center">
		<div
			class="flex justify-center items-center border-2 border-orange-500 rounded-full"
			style="width: 3.2rem; height: 3.2rem"
		>
			<i class="text-orange-500 pi pi-fw pi-lock !text-2xl"></i>
		</div>
		<h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1>
		<span class="text-muted-color mb-8">You do not have the necessary permisions. Please contact admins.</span>
		<img src="/images/asset-access.svg" alt="Access denied" class="mb-8" width="80%" />
		<div class="col-span-12 mt-8 text-center">
			<Button as="router-link" label="Go to Dashboard" to="/" severity="warn" />
		</div>
	</div>
</template>
