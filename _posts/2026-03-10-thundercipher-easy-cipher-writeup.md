---
title: "ThunderCipher CTF – Easy Cipher Writeup"
date: 2026-03-10
categories: [CTF, Cryptography]
tags: [base64, beginner, thundercipher]
---

## Challenge Overview

This challenge provided only a ciphertext string without any additional files.

From its structure, it appeared to be an encoded string rather than encrypted data.

---

## Analysis

When analyzing the string, the character pattern suggested **Base64 encoding**.

Characteristics observed:

- Only letters and numbers
- Standard Base64 character set
- Structured encoding format

This strongly indicated that the text was encoded using Base64.

---

## Decoding

To decode the string, I used **CyberChef**.

Steps:

1. Open CyberChef
2. Use the **From Base64** operation
3. Paste the encoded string
4. Decode

The decoding process immediately revealed the hidden flag.

---

## Flag
ThunderCipher{34sy_b4s3}


---

## Conclusion

This was a beginner-friendly cryptography challenge that focused on recognizing common encoding techniques. Base64 encoding is frequently used in CTF challenges and can usually be identified by its character patterns.
