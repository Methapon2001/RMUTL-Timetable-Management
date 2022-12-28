<script>
  import axios from "axios";
  import { instructorStore } from "../../store";
  import Modal from "../Components/Modal.svelte";
  import { blurOnEscape } from "../Utilities/inputDirectives";

  export let state = false;

  let form = {
    name: null,
  };

  async function handleSubmit() {
    try {
      const res = await axios.post("http://localhost:3000/api/instructor", {
        ...form,
      });

      const { data } = res.data;

      if ($instructorStore.data.length < $instructorStore.limit) {
        $instructorStore.data = [...$instructorStore.data, data];
      }

      $instructorStore.total = $instructorStore.total + 1;

      form = {
        name: null,
      };
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<Modal bind:show={state}>
  <div slot="content">
    <form on:submit|preventDefault|stopPropagation={handleSubmit}>
      <div class="text-xl font-bold">Add Instructor</div>
      <hr class="mb-3" />
      <label class="block mb-2" for="instructor_name">Instructor Name: </label>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <div class="md:col-span-2 lg:col-span-4">
          <input
            id="instructor_name"
            type="text"
            class="form-input"
            placeholder="Enter Instructor Name"
            bind:value={form.name}
            use:blurOnEscape
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
</Modal>
