import * as dm from '../index.js';

function initialize() {
    dm.initialize()
}

initialize();


var btn = document.querySelector("button").addEventListener("click", initialize);