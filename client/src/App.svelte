<script>
  import router from "page";

  import Navbar from "./lib/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Instructor from "./pages/Instructor.svelte";
  import MenuIcon from "./lib/Icons/MenuIcon.svelte";

  let page;

  router("/", () => (page = Home));
  router("/instructor", () => (page = Instructor));

  let show = true;

  let innerWidth = null;
  let innerHeight = null;

  $: if (innerWidth && innerWidth < 768) {
    show = false;
  }

  router.start();
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if innerWidth != null}
  <div class="main">
    <div class="header px-3 py-2 bg-slate-600 text-white flex items-center">
      <button
        class="p-2 rounded-full transition outline-none hover:bg-slate-500"
        on:click={() => (show = !show)}
      >
        <MenuIcon />
      </button>
      <span class="ml-3 font-bold uppercase">Menu</span>
    </div>
    <div class="sidebar bg-slate-500 {show ? 'active' : ''}">
      <Navbar />
    </div>
    <div class="content bg-slate-50">
      <div class="p-3">
        <svelte:component this={page} />
      </div>
    </div>
  </div>
{/if}

<style>
  .main {
    display: grid;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    grid-template-areas: "header header" "sidebar content";
    grid-template-rows: auto 1fr;
    grid-template-columns: auto 4fr;
  }

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
    transition: width 300ms;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    width: 0;
  }

  @media (hover: hover) {
    .sidebar {
      overflow: hidden;
    }
    .sidebar:hover,
    .sidebar:active {
      overflow-y: scroll;
    }
  }

  .sidebar.active {
    width: 16rem;
  }

  .content {
    grid-area: content;
    overflow-y: auto;
    min-width: 300px;
  }
</style>
