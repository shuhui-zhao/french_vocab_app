<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import type { TestResult } from "../../../types/deck";

    const deckId = page.params.deckId;

    let results: TestResult[] = [];

    onMount(async () => {
        results = (await fetch(
            `http://localhost:3000/results?deckId=${deckId}`
        ).then((res) => res.json())) ?? [];
        console.log(results)
    });
</script>

{#each results as result}
    <div class="result-list">
        <div class="result-list-item">
            <h3 class="result-title">{result.date}</h3>
            <a class="link-button" href="/{deckId}/results/{result.id}"
                ><strong>View</strong></a
            >
        </div>
    </div>
{/each}

<style>
    .result-list {
        display: flex;
        width: auto;
        margin: 20px 0 20px 0;
        padding: 5px;
        border-radius: 5px;
        border: 3px solid black;
    }
    .result-list-item {
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
