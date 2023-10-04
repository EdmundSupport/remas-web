const date = new Date();
const timeMs = `${date.getTime()}`;
console.log("🚀 ~ file: test.js:2 ~ date:", date);
console.log("🚀 ~ file: test.js:2 ~ date:", timeMs.substring(timeMs.length - 4));
