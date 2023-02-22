document
  .querySelector('input[type="number"]')
  .addEventListener('input', (e) => {
    const numberError = document.querySelector('.number-error');
    console.log(e.target.value);
    if (document.querySelector('input[type="number"]').validity.valid) {
      console.log('valid');
      numberError.textContent = '';
      document.querySelector('.get-jokes').disabled = false;
      document.querySelector('.get-jokes').style.border = '1px solid blue';
      document.querySelector('.get-jokes').style.color = 'blue';
    } else {
      document.querySelector('.get-jokes').disabled = true;
      document.querySelector('.get-jokes').style.border = '1px solid red';
      document.querySelector('.get-jokes').style.color = 'red';
      numberError.textContent = 'Min: 2, Max: 10';
    }
  });

getJokes = (e) => {
  const xhr = new XMLHttpRequest();

  const numberOfJokes = document.querySelector('input[type="number"]').value;

  document.querySelector('.jokes').textContent = '';

  xhr.open(
    'GET',
    `https://v2.jokeapi.dev/joke/Any?amount=${numberOfJokes}`,
    true
  );

  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        const jokes = JSON.parse(xhr.responseText);
        // console.log(jokes.jokes);
        jokes.jokes.forEach((joke) => {
          for (const [key, value] of Object.entries(joke)) {
            if (joke.hasOwnProperty(key)) {
              if ('joke' in joke) {
                const title = document.createElement('h5');
                const jk = document.createElement('p');
                title.textContent = 'Joke Number ' + joke['id'];
                jk.textContent = joke['joke'];
                const jokeDiv = document.createElement('div');
                jokeDiv.appendChild(title);
                jokeDiv.appendChild(jk);
                document.querySelector('.jokes').appendChild(jokeDiv);
                break;
              } else {
                const title = document.createElement('h5');
                const setup = document.createElement('p');
                const delivery = document.createElement('p');
                title.textContent = 'Joke Number ' + joke['id'];
                setup.textContent = joke['setup'];
                delivery.textContent = joke['delivery'];
                const jokeDiv = document.createElement('div');
                jokeDiv.appendChild(title);
                jokeDiv.appendChild(setup);
                jokeDiv.appendChild(delivery);
                document.querySelector('.jokes').appendChild(jokeDiv);
                break;
              }
            }
          }
        });
      }
    }
  };

  xhr.onerror = (err) => {
    console.log(err);
  };

  xhr.send(null);

  e.preventDefault();
};

document.querySelector('.get-jokes').addEventListener('click', getJokes);
