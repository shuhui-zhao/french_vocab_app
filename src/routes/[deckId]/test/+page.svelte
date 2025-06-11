<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type {IWord} from "../../../../server/src/models/Word";
    import type {ITest} from "../../../../server/src/models/TestItem";
    import type {IResult} from "../../../../server/src/models/TestResult";

    // import type { Word, TestItem, TestResult } from "../../../types/deck";
    import {goto} from '$app/navigation';

    // const deckId = $page.params.deckId;


    let words: IWord[] = [];
    let testItems: ITest[] = $state([]);
    let loading = $state(true);
    let testResult: IResult[] = $state([]);

    const deckId = $derived(page.params.deckId);
    

    onMount(async () => {
        words = await fetch(`http://localhost:3001/api/words?deckId=${deckId}`).then(res => res.json());
        testItems = words.map(word => ({
            id: word.id,
            testWord: word.word,
            definition: word.definition,
            entered:"",
            starred:word.starred
        }));
        loading = false;
    });

//   async function onSubmit(){
//         const testResult = {
//             date: `${new Date().toUTCString()}`,
//             testItems: testItems,
//             deckId: parseInt(deckId)
//         };
            
//             const response = await fetch("http://localhost:3001/testResults/", {
//             method: "POST",
//             headers: {"Content-Type": "application/json" },
//             body: JSON.stringify(testResult),
//         });
//         const result = await response.json()
//         // console.log(result.id)
//         goto(`/${deckId}/results/${result.id}`);
//     }

async function onSubmit() {

//if entered is not expected, then force the starred to be true
    const updatedItems = testItems.map((item) => {
  return {
    ...item,
    starred: item.testWord === item.entered ? item.starred : true
  };
});
//test jf updatedItems saved correctly
// console.log(updatedItems);
//update the test Result
  const testResult = {
    date: new Date().toUTCString(),
    testItems: updatedItems,
    deckId: parseInt(deckId)
  };
//   console.log(testResult);
//submit the test result
  try {
    const response = await fetch("http://localhost:3001/api/testResults", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testResult)
    });

    if (!response.ok) {
      throw new Error("Failed to submit result");
    }

    const result = await response.json();
    //update original word.starred based on test results
    console.log(result);

    const wordUpdates = updatedItems.map((item)=>({
        id:item.id,
        starred:item.starred
    }));

    const updateResponse = await fetch("http://localhost:3001/api/words/updateStarred", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordUpdates)
    });

    if (!updateResponse.ok) {
      console.warn("Starred word updates failed");
    }


    goto(`/${deckId}/results/${result.deckId}`);
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Something went wrong. Please try again.");
  }
}



</script>

{#if loading}
    <p>Loading...</p>
{:else}
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
{/if}

<!-- <button class="test-submit" > <h1>Submit</h1> </button> -->

<button class="test-submit" onclick={onSubmit}> <h1>Submit</h1> </button>


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
