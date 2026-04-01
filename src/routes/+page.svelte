<script lang="ts">
	let { data } = $props();
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">SvelteKit Multi-Deploy</h1>
		<p class="text-lg text-gray-600 mb-8">
			Deploy to Vercel or Cloudflare Pages
		</p>
		<div class="flex gap-4 justify-center">
			<a
				href="https://vercel.com"
				class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
			>
				Deploy to Vercel
			</a>
			<a
				href="https://pages.cloudflare.com"
				class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
			>
				Deploy to Cloudflare
			</a>
		</div>
	</div>
</main>