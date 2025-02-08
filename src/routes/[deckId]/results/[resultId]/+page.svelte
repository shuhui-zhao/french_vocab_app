<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import type { TestItem, TestResult } from "../../../../types/deck";

    const deckId = page.params.deckId;
    const resultId = page.params.resultId;

    let items: TestItem[] = [];

    onMount(async () => {
        const result: TestResult[] = await fetch(
            `http://localhost:3000/results?deckId=${deckId}`
        )
            .then((res) => res.json())
            .then((results: TestResult[]) =>
                results.filter((result) => result.id.toString() === resultId)
            );
        items = result[0].testItems;
    });
</script>

{#each items as item}
    {#if item.entered === item.expected}
        <div class="item-list item-list-correct">
            <div class="item-list-item">
                <h1 class="item-list-content">{item.expected}</h1>
                <h1 class="item-list-content">{item.entered}</h1>
            </div>
        </div>
    {:else}
        <div class="item-list item-list-wrong">
            <div class="item-list-item">
                <h1 class="item-list-content">{item.expected}</h1>
                <h1 class="item-list-content">{item.entered}</h1>
            </div>
        </div>
    {/if}
{/each}

<style>
    .item-list {
        display: flex;
        width: auto;
        margin: 20px 0 20px 0;
        padding: 5px;
        border-radius: 5px;
        border: 3px solid black;
    }
    .item-list-correct {
        background-color: rgba(0, 255, 0, 0.3);
    }
    .item-list-wrong {
        background-color: rgba(255, 0, 0, 0.3);
    }
    .item-list-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .item-list-content {
        width: 50%;
        display: block;
        text-align: center;
    }
</style>
