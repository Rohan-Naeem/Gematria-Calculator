document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("gematriaForm");
const gematriaInput = document.getElementById("gematriaInput");
const gematriaMethod = document.getElementById("gematriaMethod");
const calculateButton = document.getElementById("calculateButton");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById("errorMessage");
const resultPanel = document.getElementById("resultPanel");
const resultValue = document.getElementById("resultValue");
const resultMethod = document.getElementById("resultMethod");
const resultText = document.getElementById("resultText");


const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNavigation = document.getElementById("mainNavigation");

function englishOrdinal(text) {
    let total = 0;

    for (const char of text.toUpperCase()) {
        if (char >= "A" && char <= "Z") {
            total += char.charCodeAt(0) - 64;
        }
    }

    return total;
}

function reduceNumber(number) {
    while (number > 9) {
        number = number
            .toString()
            .split("")
            .reduce((sum, digit) => sum + Number(digit), 0);
    }

    return number;
}

function englishReduced(text) {
    let total = 0;

    for (const char of text.toUpperCase()) {
        if (char >= "A" && char <= "Z") {
            const value = char.charCodeAt(0) - 64;
            total += reduceNumber(value);
        }
    }

    return total;
}

function englishReverse(text) {
    let total = 0;

    for (const char of text.toUpperCase()) {
        if (char >= "A" && char <= "Z") {
            const value = char.charCodeAt(0) - 64;
            total += 27 - value;
        }
    }

    return total;
}

function englishReverseReduced(text) {
    let total = 0;

    for (const char of text.toUpperCase()) {
        if (char >= "A" && char <= "Z") {
            const value = char.charCodeAt(0) - 64;
            total += reduceNumber(27 - value);
        }
    }

    return total;
}

function calculate(text, method) {
    switch (method) {
        case "english-reduced":
            return englishReduced(text);

        case "english-reverse":
            return englishReverse(text);

        case "english-reverse-reduced":
            return englishReverseReduced(text);

        case "english-ordinal":
        default:
            return englishOrdinal(text);
    }
}

function getMethodName(method) {
    const names = {
        "english-ordinal": "English Ordinal",
        "english-reduced": "English Reduced",
        "english-reverse": "English Reverse Ordinal",
        "english-reverse-reduced": "English Reverse Reduced"
    };

    return names[method] || "English Ordinal";
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    resultPanel.hidden = true;
}

function hideError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
}

function performCalculation() {
    hideError();

    const text = gematriaInput.value.trim();
    const method = gematriaMethod.value;

    if (!text) {
        showError("Please enter a word, name, phrase, or sentence.");
        gematriaInput.focus();
        return;
    }

    const lettersOnly = text.replace(/[^a-zA-Z]/g, "");

    if (!lettersOnly) {
        showError("Please enter at least one English letter.");
        gematriaInput.focus();
        return;
    }

    const value = calculate(text, method);
    const methodName = getMethodName(method);

    resultValue.textContent = value.toLocaleString();
    resultMethod.textContent = methodName;
    resultText.textContent = text;

    resultPanel.hidden = false;
}

function resetCalculator() {
    gematriaInput.value = "";
    gematriaMethod.value = "english-ordinal";

    hideError();

    resultValue.textContent = "0";
    resultMethod.textContent = "English Ordinal";
    resultText.textContent = "—";

    resultPanel.hidden = true;

    gematriaInput.focus();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    performCalculation();
});

calculateButton.addEventListener("click", function () {
    performCalculation();
});

resetButton.addEventListener("click", function () {
    resetCalculator();
});

gematriaInput.addEventListener("input", function () {
    hideError();
});

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", function () {
        const isOpen = mainNavigation.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });

    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNavigation.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", function (event) {
        if (
            mainNavigation.classList.contains("open") &&
            !mainNavigation.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {
            mainNavigation.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        }
    });
}

});
