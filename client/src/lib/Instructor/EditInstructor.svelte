<script>
  import axios from "axios";
  import { instructorStore } from "../../store";
  import { fade } from "svelte/transition";

  export let state = false;
  export let instructor = null;

  function handleClose() {
    state = false;
  }

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

<div class="modal_wrapper" transition:fade={{ duration: 200 }}>
  <div class="modal rounded-md w-10/12 md:w-1/3">
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
      <div class="mb-5">
        <input type="submit" class="btn-primary w-full" value="Submit" />
      </div>
    </form>

    <button on:click={handleClose} class="btn-primary w-full">Close</button>
  </div>
</div>

<style>
  .modal_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }

  .modal {
    background: #fff;
    padding: 1rem;
  }
</style>
