<script>
  import Nav from "./components/nav.svelte";
  import Prof from "./components/prof.svelte";
  import Main from "./components/main.svelte";
  import pouchdb721Min from "../public/res/pouchdb-7.2.1.min";
  import { onMount } from "svelte";

  import { auth, googleProvider } from "../public/firebase";
  import { authState } from "rxfire/auth";

  let user;

  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }

  onMount(async () => {
    async function synchro() {
      var tdb = new pouchdb721Min("toughts");
      var rdb = new pouchdb721Min(
        "https://e6b140c8-fa3f-4bf4-854a-ce9d2befab62-bluemix.cloudantnosqldb.appdomain.cloud/"
      );
      var sync = pouchdb721Min(tdb, rdb, { live: true })
        .on("change", function (info) {
          // handle change
          console.log("Incoming!");
        })
        .on("paused", function (err) {
          // replication paused (e.g. replication up to date, user went offline)
          console.log("Just Chilling");
        })
        .on("active", function () {
          // replicate resumed (e.g. new changes replicating, user went back online)
        })
        .on("denied", function (err) {
          // a document failed to replicate (e.g. due to permissions)
          console.log("Hating from outside the club");
        })
        .on("complete", function (info) {
          // handle complete
          console.log("All is well");
        })
        .on("error", function (err) {
          // handle error
          console.log(err);
        });
    }
    // synchro();
  });
</script>

<main>
  <Nav />
  <div class="bod">
    {#if user}
    <Prof {...user} />
      <hr />
      <Main />
    {:else}
      <button on:click={login} id="signInBtn"> Signin with Google </button>
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    margin: 0;
    background-color: #0d0f12;
    color: #fffcc4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #signInBtn {
    padding: 10px;
    margin: 40% auto;
    background-color: rgb(255, 231, 217);
  }
  hr {
    color: #0d0f12;
  }

  @media screen and (min-width: 550px) {
    .bod {
      width: 80%;
    }
  }
</style>
