/**
 * Returns the factorial of n.
 * 
 * Uses recursion to compute the factorial of a number.
 * 
 * @link https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/
 * @param {Number} n The integer to calculate the factorial of.
 * @return {Number} The factorial of n.
 */
function factorial(n) {
    if (n < 0) return -1;
    else if (n == 0) return 1;
    else return n * factorial(n - 1);
}

/**
 * Returns all prime numbers less than or equal to n.
 * 
 * Implements Wilson's theorem to find all prime numbers from 2 to n inclusive.
 * It can only print until 23. It is not efficient in terms of complexity.
 * 
 * @deprecated Use get_primes_with_eratosthenis() instead.
 * @see factorial
 * @link https://en.wikipedia.org/wiki/Wilson's_theorem
 * @param {Number} n The integer given by the user.
 * @return {Array} A list of all prime numbers from 2 to n inclusive.
 */
function get_primes_with_wilson(n) {
    var primes = [];
    var i_is_prime;
    for (var i = 2; i <= n; i++) {
        i_is_prime = factorial(i - 1) % i == 1 || factorial(i - 1) % i == i - 1;
        if (i_is_prime) primes.push(i);
    }
    return primes;
}

/**
 * Returns all prime numbers less than or equal to n.
 * 
 * Implements the sieve of Eratosthenis to find all prime numbers from 2 to n inclusive.
 * 
 * @link https://www.geeksforgeeks.org/sieve-of-eratosthenes/
 * @param {Number} n The integer given by the user.
 * @return {Array} A list of all prime numbers from 2 to n inclusive.
 */
function get_primes_with_eratosthenis(n) {
    var primes = [];
    var flags = Array.from({length: n+1}, (_, i) => true);

    // the square of a number is not a prime
    for (var p = 2; p * p <= n; p++)
        if (flags[p] == true)
            // any number in the form p^2 + p, p^2 + 2p, p^2 + 3p, ... are not primes
            for (var i = p * p; i <= n; i += p)
                flags[i] = false;

    // the indexes of 'true' values are prime numbers
    for (i = 2; i <= n; i++)
        if (flags[i] == true)
            primes.push(i);
    return primes;
}

/**
 * Adds a row to the table.
 * 
 * Adds an index along with its respective prime number.
 * 
 * @param {Number} index The index of the prime number to be added to the table.
 * @param {Number} prime The ith prime number to be added to the row.
 *  */
function create_row(index, prime) {
    var table_prime_numbers = document.getElementById("table_prime_numbers"); // Why can't I have this as a global var? 
    var row = table_prime_numbers.insertRow();
    var index_cell = row.insertCell(0);
    var prime_cell = row.insertCell(1);
    index_cell.innerText = index;
    prime_cell.innerText = prime;
}

/**
 * Populates the table with all the prime numbers.
 * 
 * @see get_primes_with_eratosthenis
 * @see create_row()
 * @listens onclick
 * @param {Number} n The integer given by the user.
 */
function display_primes(n) {
    if (n == "" || n < 2) return;
    var table_prime_numbers = document.getElementById("table_prime_numbers");
    var rows = table_prime_numbers.rows.length;
    var primes = get_primes_with_eratosthenis(n);

    for (var i = rows; i > primes.length + 1; i--) { // plus one because otherwise the last row is deleted
        table_prime_numbers.deleteRow(i - 1);
    }  

    // 'i' starts from the table's row count so as not to repeat entries upon multiple button clicks
    // set i = 1 to see what happens
    for (var i = rows; i <= primes.length; i++) {
        create_row(i, primes[i - 1]);
    }
    table_prime_numbers.style.visibility = "visible";
}
