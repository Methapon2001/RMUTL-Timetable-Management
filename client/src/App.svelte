<script>
  import router from "page";

  import Navbar from "./lib/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Instructor from "./pages/Instructor.svelte";
  import Room from "./pages/Room.svelte";
  import Subject from "./pages/Subject.svelte";
  import Section from "./pages/Section.svelte";

  let page;

  router("/", () => (page = Home));
  router("/room", () => (page = Room));
  router("/subject", () => (page = Subject));
  router("/instructor", () => (page = Instructor));
  router("/section", () => page = Section);

  router.start();
</script>

<main>
  <Navbar />
  <div class="container mx-auto p-5">
    <svelte:component this={page} />
  </div>
</main>
