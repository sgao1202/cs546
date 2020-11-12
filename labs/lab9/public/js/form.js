(function () {
    let dict = {};
    function fib(n) {
        if (n in dict) return dict[n];
        if (n === 0) return 0;
        if (n === 1) return 1;
        let result = fib(n-1) + fib(n-2);
        dict[n] = result;
        return result;
    }
    
    function isPrime(n) {
        if (n <= 1) return false;
        for (let i = 2; i < n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    const form = document.getElementById('number-form');
    const results = document.getElementById('results');
    const errorContainer = document.getElementById('error-container');

    if (form) {
        const numberInput = document.getElementById('number-input');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            // Input is a string
            let numberValue = numberInput.value.trim();
            try {
                // Clear out error-container
                errorContainer.textContent = "";

                // Throw an error is the input is empty, not a number, or is a decimal
                if (!numberValue || isNaN(numberValue) || numberValue.includes('.'))  throw 'Input number must be an integer';
                let n = parseInt(numberValue);
                if (n < 0) throw 'Input number must be 0 or a positive integer';
                let fibResult = fib(n);
                let result = `The Fibonacci of ${n} is ${fibResult}.`;

                let li = document.createElement('li');
                li.textContent = result;
                li.classList.add(isPrime(fibResult) ? 'is-prime': 'not-prime');
                li.classList.add('list-item')
                results.appendChild(li);
                form.reset();
                results.classList.add("results-active");
            } catch(e) {
                const message = typeof e === 'string' ? e : e.message;
                errorContainer.textContent = message;
            }
        });
    }
})();