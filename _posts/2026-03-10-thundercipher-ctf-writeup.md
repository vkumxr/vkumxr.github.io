---
title: "ThunderCipher CTF Writeup"
date: 2026-03-10
categories: [CTF]
tags: [thundercipher, cryptography, osint, forensics, web, reverse]
---

## Introduction

This post contains my writeups for several challenges from the **ThunderCipher CTF**.  
The challenges covered multiple domains including **Cryptography, OSINT, Web Exploitation, Forensics, Hardware Analysis, and Binary Signal Analysis**.

---

# 1. Easy Cipher

## Challenge Overview

The challenge provided only a ciphertext string without any additional files.

From its structure, it appeared to be an encoded string rather than encrypted data.

## Analysis

The string contained:

- Uppercase and lowercase letters
- Numbers
- A structure typical of encoded text

This pattern suggested **Base64 encoding**, which is commonly used in beginner cryptography challenges.

## Solution

I used **CyberChef** to decode the string using the Base64 decode function.

Steps:

1. Open CyberChef
2. Paste the ciphertext
3. Apply **From Base64**

The decoding immediately revealed the flag.

## Flag
