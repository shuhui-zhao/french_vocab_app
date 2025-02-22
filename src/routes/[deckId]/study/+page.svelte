<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import type { Word } from "../../../types/deck";

    const deckId = page.params.deckId;
    let curIndex: number = 0;
    let isFront: boolean = true;
    let words: Word[] = [];

    $: starredWords = words.filter((word) => word.starred);
    $: notStarredWords = words.filter((word) => !word.starred);

    onMount(async () => {
        words = await fetch(`http://localhost:3000/words?deckId=${deckId}`).then(
            (res) => res.json()
        );
    });

    const arrowLeftKeyHandler = () => {
        isFront = true;
        curIndex = curIndex === 0 ? 0 : (curIndex - 1) % words.length;
    };

    const arrowRightKeyHandler = () => {
        isFront = true;
        curIndex =
            curIndex === words.length - 1
                ? curIndex
                : (curIndex + 1) % words.length;
    };

    const spaceKeyHandler = () => {
        isFront = !isFront;
    };

    const starWord = async (wordId: number) => {
        words = words.map((word) => {
            if (word.id == wordId) {
                word.starred = !word.starred;
                return word;
            }
            return word;
        });
        await persistWord(wordId);
    };

    const persistWord = async (wordId: number) => {
        await fetch(`http://localhost:3000/words/${wordId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(words[curIndex]),
        });
    };

    const keyHandlers: Map<String, () => void> = new Map([
        ["ArrowLeft", arrowLeftKeyHandler],
        ["ArrowRight", arrowRightKeyHandler],
        [" ", spaceKeyHandler],
        [
            "s",
            () => {
                starWord(words[curIndex].id);
            },
        ],
    ]);

    const onKeyDown = (e: KeyboardEvent) => {
        const handler = keyHandlers.get(e.key);
        if (handler) {
            e.preventDefault()
            handler()
            return
        }
    };
</script>

{#if words.length === 0}
    <p>Loading...</p>
{:else}
    <div class="word-card-container">
        <div class="word-card">
            <div class="word-card-header">
                {#if words[curIndex].starred}
                    <button
                        class="word-card-action word-card-action-active"
                        on:click={() => {
                            starWord(words[curIndex].id);
                        }}
                    >
                        <h3>Unstar</h3>
                    </button>
                {:else}
                    <button
                        class="word-card-action"
                        on:click={() => {
                            starWord(words[curIndex].id);
                        }}
                    >
                        <h3>Star</h3>
                    </button>
                {/if}
                <button class="word-card-action"> <h3>Speak</h3> </button>
            </div>
            <div
                class="word-card-front"
                class:word-card-inactive-side={!isFront}
            >
                <h1>{words[curIndex].word}</h1>
            </div>
            <div class="word-card-back" class:word-card-inactive-side={isFront}>
                <h1 class="word-detail">{words[curIndex].definition}</h1>
                <h2 class="word-detail"><i>{words[curIndex].type}</i></h2>
                <!-- <h2 class="word-detail">{words[curIndex].example}</h2> -->
                <ul class="word-detail word-example">
                    <li>
                        <h2>
                            {words[curIndex].example}
                        </h2>
                    </li>
                </ul>
            </div>
        </div>
    </div>
{/if}

<svelte:window on:keydown={onKeyDown} />

<h1>Starred:</h1>
{#each starredWords as starredWord}
    <div class="word-list">
        <div class="word-list-item">
            <h1 class="word-list-content">{starredWord.word}</h1>
            <h1 class="word-list-content">{starredWord.definition}</h1>
            <button
                class="word-card-action word-card-action-active"
                on:click={() => {
                    starWord(starredWord.id);
                }}
            >
                <h3>Unstar</h3>
            </button>
        </div>
    </div>
{/each}
<h1>Not Starred:</h1>
{#each notStarredWords as notStarredWord}
    <div class="word-list">
        <div class="word-list-item">
            <h1 class="word-list-content">{notStarredWord.word}</h1>
            <h1 class="word-list-content">{notStarredWord.definition}</h1>
            <button
                class="word-card-action"
                on:click={() => {
                    starWord(notStarredWord.id);
                }}
            >
                <h3>Star</h3>
            </button>
        </div>
    </div>
{/each}

<style>
    .word-card-container {
        display: flex;
        justify-content: center;
    }
    .word-card-header {
        display: flex;
        height: 30px;
        justify-content: space-between;
        align-items: center;
    }
    .word-card-action {
        height: 30px;
        border: 3px solid black;
        border-radius: 5px;
        background-color: #ffffff;
    }
    .word-card-action h3 {
        margin: 0;
    }
    .word-card-action:active {
        background-color: black;
        color: white;
    }
    .word-card-action-active {
        background-color: black;
        color: white;
    }
    .word-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 800px;
        height: 500px;
        padding: 20px;
        border-radius: 5px;
        border: 3px solid black;
    }
    .word-card-front {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 50px);
    }
    .word-card-back {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: calc(100% - 50px);
    }
    .word-detail {
        width: 100%;
        display: block;
    }
    .word-example {
        padding-inline-start: 20px;
    }
    .word-example h2 {
        margin: 5px 0 5px 0;
    }
    .word-card-inactive-side {
        display: none;
    }
    .word-list {
        display: flex;
        width: auto;
        margin: 20px 0 20px 0;
        padding: 5px;
        border-radius: 5px;
        border: 3px solid black;
    }
    .word-list-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .word-list-content {
        width: 50%;
        display: block;
        text-align: center;
    }
</style>
