<script>
  import { fade, fly } from "svelte/transition";
  import CloseIcon from "../Icon/CloseIcon.svelte";

  export let show = false;

  function onKeyDown(e) {
    if (e.code == "Escape") {
      show = false;
    }
  }

  function handleClose(e) {
    show = false;
  }
</script>

<svelte:window on:keydown={onKeyDown} />

{#if show}
  <div
    class="modal-wrapper fixed flex top-0 right-0 left-0 bottom-0 z-50 justify-center items-center"
    transition:fade={{ duration: 200 }}
    on:click={handleClose} on:keydown={handleClose}
  >
    <div class="bg-white relative rounded-lg p-5 w-5/6 md:w-1/2" in:fly={{ y: 32 }} on:click|stopPropagation on:keydown|stopPropagation>
      <button
        on:click={() => (show = false)}
        class="p-1 rounded-full transition hover:bg-slate-100 absolute right-3 top-3"
      >
        <CloseIcon />
      </button>
      <slot name="content" />
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
