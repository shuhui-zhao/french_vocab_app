<script lang="ts">
    import { onMount } from "svelte";
    import type { IDeck } from "../../server/src/models/Deck";

    let decks: IDeck[] = [];

    onMount(async () => {
        decks = await fetch("http://localhost:3001/api/decks").then((res) =>
            res.json()
        );
    });
</script>

{#each decks as deck}
    <div class="deck-list">
        <div class="deck-list-item">
            <h3 class="deck-title">{deck.name}</h3>
            <a class="link-button" href="/{deck.id}/study"
                ><strong>Study</strong></a
            >
        </div>
    </div>
{/each}

<style>
    .deck-list {
        display: flex;
        width: auto;
        margin: 20px 0 20px 0;
        padding: 5px;
        border-radius: 5px;
        border: 3px solid black;
    }
    .deck-list-item {
        padding: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
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
        margin-left: auto;
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
