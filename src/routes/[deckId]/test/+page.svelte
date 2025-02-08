<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import type { Word, TestItem, TestResult } from "../../../types/deck";

    const deckId = $page.params.deckId;
    let words: Word[] = [];
    let testItems: TestItem[] = [];

    onMount(async () => {
        words = await fetch(`http://localhost:3000/words?deckId=${deckId}`).then(
            (res) => res.json()
        );
        testItems = words.map((word) => {
            return {
                expected: word.word,
                entered: "",
                definition: word.definition,
            };
        });
    });

    const onSubmit = () => {
        const testResult = {
            date: `${new Date().toUTCString()}`,
            testItems: testItems,
            deckId: parseInt(deckId)
        };
        fetch("http://localhost:3000/results/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testResult),
        });
    };
</script>

<div class="test-list">
    {#each testItems as testItem}
        <div class="test-item">
            <h1 class="test-term">{testItem.definition}</h1>
            <input
                class="test-input"
                type="text"
                bind:value={testItem.entered}
            />
        </div>
    {/each}
</div>

<button class="test-submit" on:click={onSubmit}> <h1>Submit</h1> </button>

<style>
    .test-item {
        display: flex;
        padding: 20px;
        margin: 20px;
        flex-direction: column;
    }
    .test-item {
        border: 3px solid black;
        border-radius: 5px;
    }
    .test-input {
        height: 45px;
        border: 3px solid black;
        border-radius: 5px;
        font-size: 32px;
        font-weight: 700;
    }
    .test-submit {
        background-color: #ffffff;
        border-radius: 5px;
        border: 3px solid black;
        margin: 20px;
        padding: 0 20px 0 20px;
    }
    .test-submit:hover {
        background-color: #000000;
        color: #ffffff;
        cursor: pointer;
    }
</style>
