<script>
  import axios from "axios";
  import { subjectStore } from "../../store";
  import { fade } from "svelte/transition";

  export let state = false;
  export let subject = null;

  let listType = [
    {
      value: "compulsory",
      text: "Compulsory",
    },
    {
      value: "elective",
      text: "Elective",
    },
  ];

  let listCategory = [
    {
      value: "internal",
      text: "Internal",
    },
    {
      value: "external",
      text: "External",
    },
  ];

  function handleClose() {
    state = false;
  }

  async function handleSubmit(e) {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/subject/${subject.id}`,
        {
          ...subject,
        }
      );

      const { data } = res.data;

      const idx = $subjectStore.data.findIndex((item) => item.id == data.id);

      $subjectStore.data[idx] = data;

      state = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }
</script>

<div class="modal_wrapper" transition:fade={{ duration: 200 }}>
  <div class="modal rounded-md w-10/12 md:w-2/3">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="text-xl font-bold">Edit Subject</div>
      <hr class="mb-3" />
      <div class="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
        <div class="md:col-span-1">
          <label class="block" for="subject_code">Subject Code: </label>
          <input
            id="subject_code"
            type="text"
            class="form-input uppercase placeholder:capitalize"
            placeholder="Enter Subject Code"
            bind:value={subject.code}
          />
        </div>
        <div class="md:col-span-3">
          <label class="block" for="subject_name">Subject Name: </label>
          <input
            id="subject_name"
            type="text"
            class="form-input"
            placeholder="Enter Subject Name"
            bind:value={subject.name}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_credit">Credit: </label>
          <input
            id="subject_credit"
            type="number"
            class="form-input"
            placeholder="Enter Subject Credit"
            bind:value={subject.credit}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_lecture">Lecture Hours: </label>
          <input
            id="subject_lecture"
            type="number"
            class="form-input"
            placeholder="Enter Lecture Hours"
            bind:value={subject.lecture}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_lab">Lab Hours: </label>
          <input
            id="subject_lab"
            type="number"
            class="form-input"
            placeholder="Enter Lab Hours"
            bind:value={subject.lab}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_exam">Exam Hours: </label>
          <input
            id="subject_exam"
            type="number"
            class="form-input"
            placeholder="Enter Exam Hours"
            bind:value={subject.exam}
          />
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_type">Type: </label>
          <select bind:value={subject.type} class="form-input" id="subject_type">
            {#each listType as item}
              <option value={item.value}>{item.text}</option>
            {/each}
          </select>
        </div>
        <div class="md:col-span-1">
          <label class="block" for="subject_category">Category: </label>
          <select
            bind:value={subject.category}
            class="form-input"
            id="subject_category"
          >
            {#each listCategory as item}
              <option value={item.value}>{item.text}</option>
            {/each}
          </select>
        </div>
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
