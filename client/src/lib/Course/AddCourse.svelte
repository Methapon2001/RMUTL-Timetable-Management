<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { courseStore } from "../../store";

  let errors = {
    name: "",
    subjectId: "",
  };

  let state = {
    name: undefined,
    subjectId: [undefined],
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

  async function handleSubmit() {
    if (!state.name) errors.name = "Please fill out this field.";
    if (!state.subjectId) errors.subjectId = "Please select some options.";

    for (const value in Object.values(state)) {
      if (value == null || value == undefined) return;
    }

  try {
      const res = await axios.post("http://localhost:3000/api/course", {
        ...state,
      });

      const { data } = res.data;

      if ($courseStore.data.length < $courseStore.limit) {
        $courseStore.data = [...$courseStore.data, data];
      }

      $courseStore.total = $courseStore.total + 1;

      state = {
        name: undefined,
        subjectId: [undefined],
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
  
  function addSubject() {
    state.subjectId = [...state.subjectId, undefined];

    console.log(state);
  }

  function removeSubject(i) {
    state.subjectId = state.subjectId.filter((subject, idx) => idx != i);
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
      <div class="md:col-span-3">
        <label class="block" for="course_name">Course Name: </label>
        <input
          id="course_name"
          type="text"
          class="form-input"
          placeholder="Enter Course Name"
          bind:value={state.name}
        />
        <span class="text-red-600 font-bold"> { errors.name}   </span> 
      </div>
      <div class="md:col-span-2">
        {#each state.subjectId as _, idx}
          <label class="block" for="subject_name">Subject: </label>
          <select
            bind:value={state.subjectId[idx]}
            class="form-input"
            id="subject_name"
          >
            <option value={undefined} disabled>Select Subject</option>
            {#each listSubject as item}
              <option value={item.id}>{item.name}</option>
            {/each}
          </select>
        {/each}
        <button class="btn-primary" type="button" on:click={addSubject}>Add Subject</button> 
      </div>
    </div>
    <div class="mb-5">
      <input type="submit" class="btn-primary w-full" value="Add Course" />
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
