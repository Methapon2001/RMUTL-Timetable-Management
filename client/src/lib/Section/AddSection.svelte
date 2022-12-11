<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { sectionStore } from "../../store";

  let subject;

  // let state = {
  //   name: undefined,
  //   type: undefined,
  // };

  // let list = [
  //   {
  //     value: "lecture",
  //     text: "Lecture",
  //   },
  //   {
  //     value: "lab",
  //     text: "Lab",
  //   },
  //   {
  //     value: "both",
  //     text: "Lecture & Lab",
  //   },
  // ];

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/subject?limit=999")
        .then((res) => res.data);
      subject = res.data;
    } catch (e) {
      console.log(e.response.data);
    }

    console.log(subject);
  });

  async function handleSubmit(e) {
    try {
      const res = await axios.post("http://localhost:3000/api/section", {
        ...state,
      });

      const { data } = res.data;

      if ($sectionStore.data.length < $sectionStore.limit) {
        $sectionStore.data = [...$sectionStore.data, data];
      }

      $sectionStore.total = $sectionStore.total + 1;

      state.name = undefined;
      state.type = "lecture";
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-5 gap-5 mb-5">
      <div>
        <label claas="block" for="subject_code">Select Subject: </label>
        <!-- Selectable Subject (Later will be an input with auto complete) -->
      </div>
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
