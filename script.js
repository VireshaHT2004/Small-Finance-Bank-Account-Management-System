document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", function (e) {
            e.preventDefault();

            let accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            let userData = {
                name: document.getElementById("name").value,
                dob: document.getElementById("dob").value,
                phone: document.getElementById("phone").value,
                fatherName: document.getElementById("fatherName").value,
                motherName: document.getElementById("motherName").value,
                address: document.getElementById("address").value,
                aadhar: document.getElementById("aadhar").value,
                city: document.getElementById("city").value,
                district: document.getElementById("district").value,
                country: document.getElementById("country").value,
                village: document.getElementById("village").value,
                password: document.getElementById("password").value,
                accountNumber: accountNumber,
                balance: 0
            };

            localStorage.setItem(accountNumber, JSON.stringify(userData));
            alert("Account created successfully! Your account number is " + accountNumber);
            window.location.href = "details.html";
        });
    }

    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            let accountNumber = document.getElementById("accountNumber").value;
            let password = document.getElementById("password").value;

            let userData = JSON.parse(localStorage.getItem(accountNumber));

            if (userData && userData.password === password) {
                sessionStorage.setItem("currentAccount", accountNumber);
                window.location.href = "details.html";
            } else {
                alert("Invalid Account Number or Password");
            }
        });
    }

    if (document.getElementById("accountInfo")) {
        let accountNumber = sessionStorage.getItem("currentAccount");
        let userData = JSON.parse(localStorage.getItem(accountNumber));

        if (userData) {
            document.getElementById("accountInfo").innerHTML = `
                Name: ${userData.name} <br>
                Account Number: ${userData.accountNumber} <br>
                Balance: ₹${userData.balance}
            `;
        } else {
            document.getElementById("accountInfo").innerHTML = "No account found!";
        }
    }
});

function goToCreditPage() {
    window.location.href = "credit.html";
}

function goToDebitPage() {
    window.location.href = "debit.html";
}

function creditMoney() {
    let accountNumber = sessionStorage.getItem("currentAccount");
    let userData = JSON.parse(localStorage.getItem(accountNumber));
    let amount = document.getElementById("creditAmount").value.trim(); // Trim spaces

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    amount = parseFloat(amount);
    userData.balance += amount;
    localStorage.setItem(accountNumber, JSON.stringify(userData));
    alert(`₹${amount} credited! New Balance: ₹${userData.balance}`);
    window.location.href = "details.html";
}


function debitMoney() {
    let accountNumber = sessionStorage.getItem("currentAccount");
    let userData = JSON.parse(localStorage.getItem(accountNumber));
    let amount = document.getElementById("debitAmount").value.trim(); // Trim spaces

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    amount = parseFloat(amount);

    if (userData.balance >= amount) {
        userData.balance -= amount;
        localStorage.setItem(accountNumber, JSON.stringify(userData));
        alert(`₹${amount} debited! New Balance: ₹${userData.balance}`);
        window.location.href = "details.html";
    } else {
        alert("Insufficient balance!");
    }
}

