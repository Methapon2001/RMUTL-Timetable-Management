<script>
  import router from "page";

  import Navbar from "./components/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Room from "./pages/Room.svelte";

  let page;

  router("/", () => (page = Home));
  router("/room", () => (page = Room));

  router.start();
</script>

<main>
  <Navbar />
  <div class="p-5">
    <svelte:component this={page}/>
  </div>
</main>
