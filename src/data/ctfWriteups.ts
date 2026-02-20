export interface CTFChallenge {
  id: number;
  title: string;
  category: string;
  points?: number;
  description: string;
  solution: string;
  flag: string;
}

export interface CTFWriteup {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  challengeCount: number;
  categories: string[];
  pdfUrl: string;
  challenges: CTFChallenge[];
}

export const ctfWriteups: CTFWriteup[] = [
  {
    id: "thundercipher-ctf",
    slug: "thundercipher-ctf",
    title: "ThunderCipher CTF",
    description: "Writeup for the ThunderCipher CTF covering 16 challenges across cryptography, OSINT, forensics, web exploitation, and miscellaneous categories.",
    date: "2025",
    challengeCount: 16,
    categories: ["Crypto", "OSINT", "Forensics", "Web", "Misc", "Hardware"],
    pdfUrl: "/ctf-writeups/thundercipher-ctf.pdf",
    challenges: [
      {
        id: 1,
        title: "Easy Cipher",
        category: "Crypto",
        description: "A cryptography challenge with only a cipher text in the problem statement.",
        solution: "Recognized the string as Base64 encoded. Opened CyberChef and decoded the cipher using the Base64 decode function, which directly revealed the flag.",
        flag: "ThunderCipher{34sy_b4s3}",
      },
      {
        id: 2,
        title: "Hidden in Plain Sight",
        category: "OSINT",
        description: "The flag was hidden somewhere on the official ThunderCipher YouTube channel.",
        solution: "Checked the channel bio, all videos, descriptions, and comments. Revisited the bio and found a hidden encoded string in a blank area. Used a Python script to decode the Base58-encoded string.",
        flag: "ThunderCipher{thund3rc1ph3r_y0utub3!!}",
      },
      {
        id: 3,
        title: "Our Holy Father",
        category: "OSINT",
        points: 400,
        description: "Identify the name of the church shown in the provided image.",
        solution: "Uploaded the image to Google Lens to analyze it and gather related information. Searched for the identified details on Google and used AI mode, which provided a Maps link containing the complete name of the church.",
        flag: "ThunderCipher{Eglise_Notre_Dame_du_Vent}",
      },
      {
        id: 4,
        title: "Good Advice",
        category: "Forensics",
        points: 100,
        description: "A forensics challenge with a corrupted audio file.",
        solution: "Inspected the file using a hex dump and noticed the WAV file signature was missing. Manually repaired the header by restoring the correct WAV signature using a Python script. Listened to the repaired audio which contained spoken characters: \"A one\" → A1, \"W four\" → W4, \"Y S T H three\" → YSTH3, \"R three four U\" → R34U. Combined to form the flag.",
        flag: "ThunderCipher{A1W4YSTH3R34U}",
      },
      {
        id: 5,
        title: "Discord",
        category: "Misc",
        description: "A miscellaneous challenge found on the ThunderCipher Discord server.",
        solution: "Checked the general channel on the official ThunderCipher Discord server and clicked on the \"Hi @everyone\" message where the flag was directly visible.",
        flag: "ThunderCipher{pinged_in_discord}",
      },
      {
        id: 6,
        title: "Directory Discovery",
        category: "Web",
        description: "Find the hidden flag by exploring the web application.",
        solution: "Inspected the page source which had a hint to check robots.txt. It revealed several hidden directories. Explored each one and found the correct directory /txt-of-thunder/ where the flag was hidden in the page source.",
        flag: "ThunderCipher{txt_of_thunder_7681912}",
      },
      {
        id: 7,
        title: "Source of Thunder",
        category: "Web",
        description: "Find the flag hidden across multiple source files.",
        solution: "Inspected the source code of the webpage. The first part of the flag was in the page source, the second part in style.css, and the third part in app.js. Combined all three parts in the correct order.",
        flag: "ThunderCipher{source_code_hidden_in_plain_sight}",
      },
      {
        id: 8,
        title: "DMY1",
        category: "Forensics",
        description: "Analyze a dump file to find the hidden flag.",
        solution: "Downloaded and extracted a ZIP file containing File.DMP. Used foremost to carve files from the dump. Reviewed recovered files, especially JPG and PNG images. The flag was found inside one of the images in the JPG folder.",
        flag: "ThunderCipher{...}",
      },
      {
        id: 9,
        title: "I Hate That Scammer",
        category: "Forensics",
        description: "Decode suspicious content from a text file related to scam techniques.",
        solution: "Found a text file with suspicious encoded content. Discovered a scam-mimic decoder and identified the correct password as \"SCAM\". Using this password to decode the text revealed the flag.",
        flag: "ThunderCipher{h3_us3d_t0_sp4m_w1th0ut_4_p4ssw0rd}",
      },
      {
        id: 10,
        title: "Convo 1 – Morse Code",
        category: "Hardware",
        description: "Decode a signal from a logic analyzer capture.",
        solution: "Extracted Session-Cap.sal and found digital-0.bin with timing data. Calculated transition differences revealing two distinct durations (1T vs 3T) characteristic of Morse Code. Inverted the logic (Active Low) and decoded to ASCII decimal values which converted to text revealing the flag.",
        flag: "ThunderCipher{D0ts4nDd4$h3s}",
      },
      {
        id: 11,
        title: "Convo 2 – UART",
        category: "Hardware",
        points: 200,
        description: "Decode a UART communication from a 3GB data stream.",
        solution: "Identified UART protocol at 230400 baud rate with standard polarity. Implemented a state machine to decode the full stream. Found flag components in hex (ThunderCipher{H3lL0_w), Base64 (0RlD_1n_u), and Base32 (4Rt_#$!) encodings. Concatenated all parts.",
        flag: "ThunderCipher{H3lL0_w0RlD_1n_u4Rt_#$!}",
      },
      {
        id: 12,
        title: "Panel – PCB Gerber",
        category: "Hardware",
        points: 150,
        description: "Find a flag hidden in PCB Gerber files.",
        solution: "Extracted Gerber files from a ZIP archive. Used pygerber to render each PCB layer. The internal layer (Gerber_InnerLayer4.G4) contained an embedded Base32-encoded string in the copper traces. Decoded with proper padding to reveal the flag.",
        flag: "ThunderCipher{!G3rb_V13w^}",
      },
      {
        id: 13,
        title: "Tree – ROT47",
        category: "Crypto",
        description: "Decode a payload hidden using a rotation cipher.",
        solution: "Analyzed the encoded payload and identified characters limited to printable ASCII (33-126), characteristic of ROT47 encoding. Created a Python ROT47 decoder script and successfully decoded the payload.",
        flag: "ThunderCipher{tr33s_4r3_h1dd3n}",
      },
      {
        id: 14,
        title: "Dotsies Font",
        category: "Misc",
        description: "Decode text displayed in an unusual font.",
        solution: "Noticed the displayed text on the website resembled a Dotsies-style font. Decoded the text by interpreting the dot patterns into readable characters.",
        flag: "ThunderCipher{JUST_TAKING_A_DOT_OUT_ON_A_DATE}",
      },
      {
        id: 15,
        title: "Unauthenticated Strike",
        category: "Forensics",
        description: "Extract a flag from a password-protected ZIP and hidden data.",
        solution: "Used zip2john and john to crack the ZIP password (youfoundme1). Extracted .hacker.jpeg and file.cap. Found high-entropy ASCII in the image's strings output. Decoded using ROT47 cipher which revealed a Google Drive link containing the flag.",
        flag: "ThunderCipher{y0u_f0und_m3_n1ce!}",
      },
      {
        id: 16,
        title: "CyberHunt",
        category: "Web",
        description: "Capture the root flag from the target machine.",
        solution: "Ran Nmap scan finding SSH (22) and HTTP (80). Found /cgi-bin/test.sh via gobuster. Exploited Shellshock (CVE-2014-6271) for initial RCE as www-data. Identified outdated kernel 3.2.x vulnerable to Dirty COW (CVE-2016-5195). Transferred and compiled the exploit to overwrite /etc/passwd, gaining root. Used a Python pty script to bypass TTY restrictions and read the root flag.",
        flag: "ThunderCipher{dirty_cow_owned_the_kernel_08918}",
      },
    ],
  },
];
