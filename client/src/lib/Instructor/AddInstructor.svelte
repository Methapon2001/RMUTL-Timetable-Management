<script>
  import axios from "axios";
  import { instructorStore } from "../../store";

  let state = {
    name: undefined,
  };

  async function handleSubmit(e) {
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

<div class="rounded-lg p-3 bg-white drop-shadow">
  <form on:submit|preventDefault={handleSubmit}>
    <label class="block font-bold" for="instructor_name">Instructor Name: </label>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      <div class="md:col-span-2 lg:col-span-4">
        <input
          id="instructor_name"
          type="text"
          class="form-input"
          placeholder="Enter Instructor Name"
          bind:value={state.name}
        />
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
