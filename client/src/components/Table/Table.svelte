<script>
  export let select = false;
  export let data = [];
  export let state = {
    section: {},
    weekday: null,
    period: null,
    size: 3,
    status: null,
  };

  let weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  $: console.log(data);

  function handleClick(e) {
    const { weekday, period } = e.target.dataset;

    if (select) {
      state.weekday = weekday;
      state.period = parseInt(period);
      state.status = true;
    }
  }

  function handleSubmit(e) {
        if (!state.weekday || !state.period) {
            alert("Please select day and period");
            return;
        }

        data = [
            ...data,
            {
                // on submit, this will send to backend and then get the id from there instead.
                id: data.length + 1,
                table: name,
                weekday: state.weekday,
                period: state.period,
                section: state.section,
            },
        ];
    }

    function convertPeriod(period, size) {
        return `${state.period}/${state.period + state.size}`;
    }

  function convertWeekday(weekday) {
    return weekday == "mon"
      ? "1/2"
      : weekday == "tue"
      ? "2/3"
      : weekday == "wed"
      ? "3/4"
      : weekday == "thu"
      ? "4/5"
      : weekday == "fri"
      ? "5/6"
      : weekday == "sat"
      ? "6/7"
      : "7/8";
  }
</script>

<div class="col-span-11">
  <div class="grid grid-cols-25 relative">
    {#each weekday as day}
      {#each Array(25) as _, period}
        <button
          on:click={handleClick}
          data-weekday={day.toLowerCase().slice(0, 3)}
          data-period={period + 1}
        />
      {/each}
    {/each}

    {#if select && state.weekday && state.period && state.size}
      <div
        class="bg-green-600 opacity-20 absolute w-full"
        style="grid-column: {state.period}/{state.period + state.size}; 
        grid-row: {convertWeekday(state.weekday)};"
      />
    {/if}

    {#each data as sec (sec.id)}
            <div
                class="cell bg-blue-600 absolute"
                style="grid-column: {convertPeriod(
                    sec.period,5
                )}; grid-row: {convertWeekday(sec.weekday)}; width: 100%"
            />
      {/each}
  </div>
  <button on:click={handleSubmit} class="btn-primary"
        >Submit</button
    >
</div>

<style>
  .grid {
    border-color: #333;
    border-width: 1px 0 0 1px;
  }

  .grid > * {
    border-color: #333;
    border-width: 0 1px 1px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    height: 50px;
  }
</style>
