<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import type { IResult } from "../../../../../server/src/models/TestResult";
    import type {ITest} from "../../../../../server/src/models/TestItem";

    // const deckId = page.params.deckId;
    const resultId = page.params.resultId;

    let items: ITest[] = [];

    onMount(async () => {
        try{        const result:IResult = await fetch(
            `http://localhost:3001/api/result?resultId=${resultId}`
        )
            .then((res) => res.json());
            items= result.testItems ?? [];
            console.log(result.testItems);

    }catch(err:unknown){
        console.error("Failed to load test result:", err);
    };});


</script>

{#each items as item}
    {#if item.entered === item.testWord}
        <div class="item-list item-list-correct">
            <div class="item-list-item">
                <h1 class="item-list-content">{item.testWord}</h1>
                <h1 class="item-list-content">{item.entered}</h1>
            </div>
        </div>
    {:else}
        <div class="item-list item-list-wrong">
            <div class="item-list-item">
                <h1 class="item-list-content">{item.testWord}</h1>
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
