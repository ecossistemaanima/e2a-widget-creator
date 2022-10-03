
import CryptoJS from "crypto-js"
import AES from "crypto-js/aes.js"

export default function() {
    const key = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const iv1 = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const plainText = CryptoJS.AES.decrypt('nQcXOmRHFeJxZtK8z0vg6mw+56NosLs/8I9POQWFEBs5ZJzqraJEe+9S6xaW8eHpNubzsmX+5qvFciisOtgvu57msPSmcPy3wnRYPzRbKDen30JgAaY6uzufSp+tZBeeMEDLVBJwPu/vSLd7qJdw3ofJ4uiIACAPiuKcg5k//ox3n1elzqwdMpBgsLkIhvo8YFnGWVGHr52t8inxEY28w6JV6RLOe95+6lwQoy94998FQNKyHg08GHCxaDXLb2gPwpgIHj8fS/SJAjxE8UTPBS8r+4IL3RH3HseQLHW4pkFW0aCtlwjPtKsziGIMTFcjQhIVxw648OC7MCaXTfuvUszpdboCWEH6SYCa1xgluKzgASnhDZJbU65mV0sqnGh8NFRxcrzU6eCGNKIyfS61b+6vfJD1NnsBhHXnwiCHewqavymbBWyl3Wt31UptpM4kVH7WLoZohbH509x5KMqJtg==', key, {
        keySize: 16,
        iv: iv1,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return JSON.parse(plainText.toString(CryptoJS.enc.Utf8));
}