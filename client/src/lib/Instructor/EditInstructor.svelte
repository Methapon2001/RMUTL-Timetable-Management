<script>
  import axios from "axios";
  import { instructorStore } from "../../store";
  import Modal from "../Components/Modal.svelte";

  export let state = false;
  export let instructor = null;

  let reset = { ...instructor };

  async function handleSubmit(e) {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/instructor/${instructor.id}`,
        {
          ...instructor,
        }
      );

      const { data } = res.data;

      const idx = $instructorStore.data.findIndex((item) => item.id == data.id);

      $instructorStore.data[idx] = data;

      state = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="text-xl font-bold">Edit Instructor</div>
      <hr class="mb-3" />
      <div class="mb-5">
        <label class="block" for="instructor_name">Instructor Name: </label>
        <input
          id="instructor_name"
          type="text"
          class="form-input"
          placeholder="Enter Instructor Name"
          bind:value={instructor.name}
        />
      </div>
      <div>
        <input
          type="reset"
          class="btn-primary w-full mb-3"
          value="Reset"
          on:click|preventDefault={() => (instructor = { ...reset })}
        />
        <input type="submit" class="btn-primary w-full" value="Save" />
      </div>
    </form>
  </div>
</Modal>
