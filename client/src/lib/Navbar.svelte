<script>
  import BoardIcon from "./Icons/BoardIcon.svelte";
  import BuildingIcon from "./Icons/BuildingIcon.svelte";
  import PersonIcon from "./Icons/PersonIcon.svelte";
  import TimetableIcon from "./Icons/TimetableIcon.svelte";

  let path = window.location.pathname;

  let list = [
    {
      path: "/",
      text: "Home",
      icon: TimetableIcon,
    },
    {
      path: "/instructor",
      text: "Instructor",
      icon: PersonIcon,
    },
    {
      path: "/building",
      text: "Building",
      icon: BuildingIcon,
    },
    {
      path: "/room",
      text: "Room",
      icon: BoardIcon,
    },
  ];
</script>

<div class="py-3 pl-3 pr-1 uppercase font-bold">
  {#each list as page (page.text)}
    <a
      href={page.path}
      class="nav-link {path == page.path && 'active'}"
      on:click={() => (path = page.path)}
    >
      <div><svelte:component this={page.icon} /></div>
      <span class="ml-2">{page.text}</span>
    </a>
  {/each}
</div>

<style type="text/postcss">
  .nav-link:hover {
    @apply bg-slate-600;
  }
  .active {
    @apply bg-slate-600;
  }
</style>
