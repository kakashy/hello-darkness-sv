<script>
  import { onMount } from "svelte";
  function showModal() {
    const modal = document.getElementById("add-modal");
    modal.style.display = "block";
  }

  async function addThought() {
    const tdb = new PouchDB("thoughts");
    const validity = document.getElementById("thought-validity");
    const thought = document.getElementById("thoughts");

    var validityValue = validity.value;
    var thoughtValue = thought.value;
    var time = Date.now();
    var thoughtDoc = {
      _id: time.toString(),
      validity: validityValue,
      thoughts: thoughtValue,
    };
    var thoughtRes = await tdb.put(thoughtDoc);
  }
  let thoughtys = [];
  onMount(async () => {
    const tdb = new PouchDB("thoughts");
    
    const sniffRes = await tdb.allDocs({ include_docs: true });
    const { rows } = sniffRes;
    thoughtys = rows;
    thoughtys = thoughtys;
});

async function handleDelete(event){
    const tdb = new PouchDB("thoughts");
    const {parentNode, id} = this;
    var thoughtID = id;

    var thoughtDoc = await tdb.get(thoughtID);
    var finisher = await tdb.remove(thoughtDoc);
    parentNode.style.display = "none";
}
</script>

<div class="main">
  <div class="add-thought">
    <label for="add-thought">
      <p>Add a thought</p>
      <button type="submit" id="add-thought" on:click={showModal}>Add</button>
    </label>
    <div class="add-modal" id="add-modal">
      <div class="modal-cont">
        <form class="add-th" on:submit={addThought}>
          <span
            class="close"
            onclick="this.parentNode.parentNode.parentNode.style.display='none';"
            >&times;</span
          >
          <select name="validity" id="thought-validity">
            <option value="1">1 Hour</option>
            <option value="5">5 Hours</option>
            <option value="24">1 Day</option>
          </select>
          <textarea type="textarea" placeholder="thoughts" id="thoughts" />
          <button type="submit" id="save-thoughts">Save Thoughts</button>
        </form>
      </div>
    </div>
  </div>
  <div id="show-thought" on:loadstart={console.log("fck")}>
    {#each thoughtys as thoughty}
    <figure>
        <p>{thoughty.doc.thoughts}</p>
        <button id={thoughty.doc._id.toString()} on:click={handleDelete}>Delete</button>
    </figure>
    {:else}
      <p>It's dry out here...</p>
    {/each}
  </div>
</div>

<style>
    figure {
        width: inherit;
        border-radius: 10px;
        padding: 5px;
        background-color: #ffffff33;
        box-shadow: #00000030 8px 8px 15px, #00000030 -5px -5px 15px;
        transition: 200ms ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 400px;
        overflow-x: hidden;
    }
    figure::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.2rem;
    }
    figure::-webkit-scrollbar-thumb {
        background-color: rgb(255, 85, 23);
    }
    figure::-webkit-scrollbar-track {
        background-color: transparent;
    }
    figure:hover {
        box-shadow: #00000030 5px 5px 10px, #00000030 -2px -2px 10px;
        transform: scale(0.97);
    }
    figure button {
        position: relative;
        bottom: 0;
        width: inherit;
        background-color: rgb(238, 160, 132);
        color: white;
    }
    figure button:hover {
        background-color: rgb(255, 85, 23);

    }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main {
    background-color: #fff;
    background-color: #ffffff10;
    margin: 15px;
    padding: 10px;
    border-radius: 7px;
  }
  #thoughts {
    width: 80%;
    height: 100px;
  }
  #show-thought {
    border: rgb(255, 97, 40) solid 1px;
    border: rgba(255, 97, 40, 0.37) solid 1px;
    border-radius: 5px;
    margin: 10px;
    background-color: #ffffff20;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .add-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-color: #00000050;
  }
  .modal-cont {
    margin: 15% auto;
    padding: 15px;
    border-radius: 10px;
    box-shadow: #00000020 4px 5px 20px, #00000020 -4px -5px 20px;
    background-color: rgb(32, 30, 30);
  }
  /* The Close Button */
  .close {
    position: relative;
    color: rgb(223, 172, 78);
    float: right;
    font-size: 28px;
    font-weight: bold;
    justify-self: end;
    align-self: flex-end;
  }

  .close:hover,
  .close:focus {
    color: rgb(255, 97, 40);
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (min-width: 650px) {
    .modal-cont {
      width: 50%;
    }
  }
</style>
