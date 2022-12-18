<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { roomStore } from "../../store";

  let state = {
    name: undefined,
    subjectId: undefined,
  };

  let listSubject = [];

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/subject?limit=999")
        .then((res) => res.data);

      listSubject = res.data;
    } catch (e) {
      console.log(e.response.data);
    }
  });

  async function handleSubmit(e) {
    try {
      const res = await axios.post("http://localhost:3000/api/group", {
        ...state,
      });

      const { data } = res.data;

      if ($roomStore.data.length < $roomStore.limit) {
        $roomStore.data = [...$roomStore.data, data];
      }

      $roomStore.total = $roomStore.total + 1;

      state.name = undefined;
      state.subjectId = undefined;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
      <div class="md:col-span-2">
        <label class="block" for="room_name">Room Name: </label>
        <input
          id="room_name"
          type="text"
          class="form-input"
          placeholder="Enter Room Name"
          bind:value={state.name}
        />
      </div>
      <div class="md:col-span-3">
        <label class="block" for="subject_name">Subject: </label>
        <select
          bind:value={state.subjectId}
          class="form-input"
          id="subject_name"
        >
          <option value="" disabled>Select Subject</option>
          {#each listSubject as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="mb-5">
      <input type="submit" class="btn-primary w-full" value="Add Group" />
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
