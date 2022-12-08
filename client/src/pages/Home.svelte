<script>
  import { fly } from "svelte/transition";
</script>

<div
  in:fly={{ y: 32, duration: 300, delay: 300 }}
  out:fly={{ y: 32, duration: 300 }}
>
<h1>Welcome!</h1>
</div>
