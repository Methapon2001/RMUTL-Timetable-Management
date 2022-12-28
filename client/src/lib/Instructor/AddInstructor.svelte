<script>
  import axios from "axios";
  import { instructorStore } from "../../store";

  let errors = {
    name: "",
  };

  let state = {
    name: undefined,
  };

  async function handleSubmit(e) {
    if (!state.name) errors.name = "Please select some options.";

    const values = Object.entries(state);

    for (let i = 0; i < values.length; i++) {
      if (values[i][1] == null || values[i][1] == undefined) return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/instructor", {
        ...state,
      });

      const { data } = res.data;

      if ($instructorStore.data.length < $instructorStore.limit) {
        $instructorStore.data = [...$instructorStore.data, data];
      }

      $instructorStore.total = $instructorStore.total + 1;

      state.name = undefined;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <label class="block" for="instructor_name">Instructor Name: </label>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      <div class="md:col-span-2 lg:col-span-4">
        <input
          id="instructor_name"
          type="text"
          class="form-input"
          placeholder="Enter Instructor Name"
          bind:value={state.name}
        />
        <span class="text-red-600 font-bold"> { errors.name}   </span>
      </div>
      <div>
        <input
          type="submit"
          class="btn-primary w-full"
          value="Add Instructor"
        />
      </div>
    </div>
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
