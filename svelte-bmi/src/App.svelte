<script lang="ts">
  let name: string = "";
  let weight: number;
  let height: number;
  let answer: string = "";

  const calculateBmi = () => {
    let bmi: number = weight / (height * height);
    answer = `${name}, seu bmi é ${bmi.toFixed(2)}`;
  };
</script>

<div class="App">
  <div class="form">
    <header>BMI APP</header>
    <input type="text" placeholder="nome..." bind:value={name} />
    <input type="text" placeholder="peso..." bind:value={weight} />
    <input type="text" placeholder="altura..." bind:value={height} />
    <button on:click={calculateBmi}> calculate</button>
    <p>{answer || ""}</p>
    <footer>by Weslley</footer>
  </div>
</div>

<style>
  .App {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rebeccapurple;
    height: 100vh;
  }

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(50, 56, 56);
    border-radius: 50px;
  }

  .form header {
    font-size: 3rem;
    font-family: "Courier New", Courier, monospace;
    margin: 2rem;
  }

  .form input {
    align-items: center;
    max-width: 50rem;
    height: 5rem;
    font-size: 2rem;
    font-family: "Courier New", Courier, monospace;
    padding: 2rem;
    text-align: center;
    background-color: rgb(48, 48, 48);
    border: none;
    outline: none;
    color: grey;
  }

  .form button {
    width: 30rem;
    height: 5rem;
    font-size: 2rem;
    margin: 2rem;
    font-family: "Courier New", Courier, monospace;
    border: none;
    background-color: rgb(48, 48, 48);
    color: gray;
  }

  .form p {
    font-size: 3rem;
    font-family: "Courier New", Courier, monospace;
    margin: 3rem;
  }

  .form footer {
    margin: 5px;
  }
</style>
