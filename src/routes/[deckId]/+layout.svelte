<script lang="ts">
    import type { Deck } from "../../types/deck";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    
    let deckId: number;
    let deckTitle = "";

    $: deckId= parseInt(page.params.deckId);

    onMount(async () => {
        const deck: Deck = await fetch(
            `http://localhost:3001/api/words?deckId=${deckId}`
        ).then((res) => res.json());
        deckTitle = deck.name;
    });
</script>

<nav class="menu">
    <a class="link-button" href="/"><strong>Back</strong></a>
    <h2>{deckTitle}</h2>
    <div class="nav-links">
        <a class="link-button" href="/{deckId}/study"><strong>Study</strong></a>
        <a class="link-button" href="/{deckId}/test"><strong>Test</strong></a>
        <a class="link-button" href="/{deckId}/results"
            ><strong>Results</strong></a
        >
    </div>
</nav>

<slot />

<style>
    .menu {
        display: flex;
        height: 70px;
        border-bottom: 3px solid black;
        margin-bottom: 50px;
        align-items: baseline;
    }
    .nav-links {
        display: flex;
        margin-left: auto;
        align-items: center;
    }
    .link-button {
        display: block;
        border-radius: 5px;
        background-color: white;
        color: black;
        border: none;
        text-align: center;
        text-decoration: none;
        padding: 10px;
        margin: 10px;
    }
    .link-button:visited {
        color: inherit;
    }
    .link-button:hover {
        background-color: black;
        color: white;
    }
    .link-button:active {
        background-color: black;
        color: white;
    }
</style>
