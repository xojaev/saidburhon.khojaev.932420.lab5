let userName = prompt("Как вас зовут?");

if (!userName) {
    userName = "Гость";
}

alert(`Привет, ${userName}! Сейчас посчитаем время автономной работы гаджетов.`);

console.log(`Пользователь: ${userName}`);
console.log("--- Анализ времени автономной работы ---");

const batteryHours = [12, 5, 3, 9, 4, 15, 7];

console.log("Время автономной работы (часы):", batteryHours);

function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function filterLongLasting(arr, threshold = 8) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > threshold) {
            result.push(arr[i]);
        }
    }
    return result;
}

function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function average(arr) {
    if (arr.length === 0) return 0;
    return sumArray(arr) / arr.length;
}

let lowBatteryCount = 0;
const lowBatteryDevices = [];

for (let i = 0; i < batteryHours.length; i++) {
    if (batteryHours[i] <= 4) {
        lowBatteryCount++;
        lowBatteryDevices.push(batteryHours[i]);
    }
}

const lowBatteryShare = (lowBatteryCount / batteryHours.length) * 100;

const maxHours = findMax(batteryHours);
const longLasting = filterLongLasting(batteryHours, 8);
const totalHours = sumArray(batteryHours);
const avgHours = average(batteryHours);

console.log("Максимум (часов):", maxHours);
console.log("Долгожители (>8 ч):", longLasting, "— количество:", longLasting.length);
console.log("Сумма всех часов:", totalHours);
console.log("Среднее время работы:", avgHours.toFixed(2), "часов");

console.log("--- Устройства с малым временем (≤ 4 ч) ---");
console.log("Количество:", lowBatteryCount);
console.log("Их значения (часы):", lowBatteryDevices);
console.log("Доля от всех устройств:", lowBatteryShare.toFixed(1) + "%");

if (avgHours < 6) {
    console.log("Стоит обратить внимание на энергоэффективность");
} else {
    console.log("Энергоэффективность в норме");
}

alert(
    `Среднее время работы – ${avgHours.toFixed(2)} часов, ` +
    `${longLasting.length} устройств – долгожители`
);

const resultBlock = document.getElementById("js-result");
if (resultBlock) {
    resultBlock.innerHTML = `
        <h3>Результаты анализа (JS)</h3>
        <p><strong>Среднее время работы:</strong> ${avgHours.toFixed(2)} ч</p>
        <p><strong>Долгожители (&gt; 8 ч):</strong> ${longBatteryList(longLasting)}</p>
        <p><strong>Максимум:</strong> ${maxHours} ч</p>
        <p><strong>Сумма:</strong> ${totalHours} ч</p>
        <p><strong>Устройств с малым временем (≤ 4 ч):</strong> ${lowBatteryCount}
           (${lowBatteryShare.toFixed(1)}%)</p>
        <p><strong>Среднее &lt; 6 ч?</strong> ${avgHours < 6 ? "Да — обратите внимание на энергоэффективность ⚠️" : "Нет "}</p>
    `;
}

function longBatteryList(arr) {
    if (arr.length === 0) return "нет";
    return arr.join(" ч, ") + " ч";
}