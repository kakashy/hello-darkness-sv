<script>
    export let photoURL;
    export let displayName;
    import { auth } from "../../public/firebase";
</script>

<div class="prof">

<img src={ photoURL } width="100" alt="Hey {displayName}!">

<button on:click={() => auth.signOut()} id="signOutBtn">Logout</button>
</div>
<style>
    .prof {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        padding: 10px;
        background-color: #ffffff10;
        box-shadow: #00000050 4px 4px 18px, #00000030 3px 3px 12px;
    }
    .prof img {
        border-radius: 50%;
    }
</style>