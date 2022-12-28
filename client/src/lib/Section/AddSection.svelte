<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { sectionStore } from "../../store";

  let errors = {
    subjectId: "",
    groupId: "",
  };

  let state = {
    subjectId: null,
    groupId: null,
    sections: [],
    lecture: false,
    lab: false,
  };

  let listSubject = [];
  let listInstructor = [];
  let listRoom = [];
  let listGroup = [];

  onMount(async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/api/subject?limit=999")
        .then((res) => res.data);

      listSubject = res.data;
    } catch (e) {
      console.log(e.response.data);
    }

    try {
      const res = await axios
        .get("http://localhost:3000/api/instructor?limit=999")
        .then((res) => res.data);

      listInstructor = res.data;
    } catch (e) {
      console.log(e.response.data);
    }

    try {
      const res = await axios
        .get("http://localhost:3000/api/room?limit=999")
        .then((res) => res.data);

      listRoom = res.data;
    } catch (e) {
      console.log(e.response.data);
    }

    try {
      const res = await axios
        .get("http://localhost:3000/api/gruop?limit=999")
        .then((res) => res.data);

      listGroup = res.data;
    } catch (e) {
      console.log(e.response.data);
    }
  });

  async function handleSubmit(e) {
    try {
      const res = await axios.post("http://localhost:3000/api/section", {
        subjectId: state.subjectId,
        groupId: state.groupId,
        sections: state.sections,
      });

      const { data } = res.data;

      if ($sectionStore.data.length < $sectionStore.limit) {
        $sectionStore.data = [...$sectionStore.data, data];
      }

      $sectionStore.total = $sectionStore.total + 1;

      state.subjectId = null;
      state.groupId = null;
      state.sections = [];
      state.lecture = false;
      state.lab = false;
    } catch (err) {
      console.log(err.response.data);
    }
  }

  function handleChange() {
    const subject = listSubject.find(({ id }) => id == state.subjectId);

    state.sections = [];

    state.lecture = subject.lecture ? true : false;
    state.lab = subject.lab ? true : false;

    if (state.lecture) {
      state.sections = [
        ...state.sections,
        {
          type: "lecture",
          roomId: null,
          instructorId: [undefined],
        },
      ];
    }

    if (state.lab) {
      state.sections = [
        ...state.sections,
        {
          type: "lab",
          roomId: null,
          instructorId: [undefined],
        },
      ];
    }
  }

  function addInstructor(idx) {
    state.sections[idx].instructorId = [
      ...state.sections[idx].instructorId,
      undefined,
    ];
  }

  function addLabSec() {
    state.sections = [
      ...state.sections,
      {
        type: "lab",
        roomId: null,
        instructorId: [undefined],
      },
    ];

    console.log(state);
  }
</script>

<div class="border border-slate-300 rounded p-5">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-5 gap-5 mb-5">
      <div class="col-span-5">
        <label class="block" for="group_name">Group: </label>
        <select
          bind:value={state.groupId}
          on:change={handleChange}
          class="form-input"
          id="group_name"
        >
          <option value={null} disabled>Any</option>
          {#each listGroup as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
        <span class="text-red-600 font-bold"> { errors.groupId}   </span> 

        <div class="col-span-5">
          <label class="block" for="subject_name">Subject: </label>
          <select
            bind:value={state.subjectId}
            on:change={handleChange}
            class="form-input"
            id="subject_name"
          >
            <option value={null} disabled>Select Subject</option>
            {#each listSubject as item}
              <option value={item.id}>{item.name}</option>
            {/each}
          </select>
          <span class="text-red-600 font-bold"> { errors.subjectId}   </span> 
        </div>
      </div>

      {#if state.lecture}
        <span class="text-md font-bold">Lecture Section</span>
        <div class="border border-slate-300 rounded p-5 col-span-5">
          {#each state.sections[0].instructorId as _, idx}
            <div class="col-span-5">
              <label class="block" for="instructor_{idx}"
                >Instructor {idx + 1}:
              </label>
              <select
                bind:value={state.sections[0].instructorId[idx]}
                class="form-input"
                id="instructor_{idx}"
              >
                <option value="" disabled>Select Instructor</option>
                {#each listInstructor as item}
                  <option value={item.id}>{item.name}</option>
                {/each}
              </select>
            </div>
          {/each}

          <div class="col-span-5">
            <button class="btn-primary" type="button" on:click={() => addInstructor(0)}>
              Add Instructor
            </button>
          </div>

          <div class="col-span-5">
            <label class="block" for="room_name">Room: </label>
            <select
              bind:value={state.sections[0].roomId}
              class="form-input"
              id="room_name"
            >
              <option value="" disabled>Select Room</option>
              {#each listRoom as item}
                <option value={item.id}>{item.name}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      {#if state.lab}
        <span class="text-md font-bold">Lab Section</span>
        {#each state.sections as sec, i}
          {#if sec.type == "lab"}
            <div class="border border-slate-300 rounded p-5 col-span-5">
              {#each state.sections[i].instructorId as _, j}
                <div class="col-span-5">
                  <label class="block" for="instructor_{j}"
                    >Instructor {j + 1}:
                  </label>
                  <select
                    bind:value={state.sections[i].instructorId[j]}
                    class="form-input"
                    id="instructor_{j}"
                  >
                    <option value="" disabled>Select Instructor</option>
                    {#each listInstructor as item}
                      <option value={item.id}>{item.name}</option>
                    {/each}
                  </select>
                </div>
              {/each}

              <div class="col-span-5">
                <button class="btn-primary" type="button" on:click={() => addInstructor(i)}>
                  Add Instructor
                </button>
              </div>

              <div class="col-span-5">
                <label class="block" for="room_name">Room: </label>
                <select
                  bind:value={state.sections[i].roomId}
                  class="form-input"
                  id="room_name"
                >
                  <option value="" disabled>Select Room</option>
                  {#each listRoom as item}
                    <option value={item.id}>{item.name}</option>
                  {/each}
                </select>
              </div>
            </div>
          {/if}
        {/each}

        <div class="col-span-5">
          <button class="btn-primary" type="button" on:click={() => addLabSec()}>
            Add Lab section
          </button>
        </div>
      {/if}
    </div>
    <input
          type="submit"
          class="btn-primary w-full"
          value="Add Section"
        />
  </form>
</div>

<style>
  label {
    @apply font-bold;
  }
</style>
