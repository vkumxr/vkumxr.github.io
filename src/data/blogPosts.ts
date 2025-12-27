export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  substackUrl: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "when-time-breaks-software-from-y2k-to-todays-hidden-bugs",
    title: "When Time Breaks Software: From Y2K to Today's Hidden Bugs",
    description: "A tiny shortcut that almost broke the world. Back in the 1960s, engineers stored only two digits for years to save memory — and that decision nearly caused global chaos when 2000 arrived.",
    date: "December 26, 2025",
    coverImage: "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1781c0d5-b8dd-424f-8f3e-160c0ac6564b_1024x1024.png",
    substackUrl: "https://vkumxr.substack.com/p/when-time-breaks-software-from-y2k",
    content: `
## A tiny shortcut that almost broke the world

Back in the 1960s, computer memory was incredibly expensive. Engineers tried to save every possible byte — so they came up with a shortcut:

Instead of storing a full year like 1975, they stored only the last two digits:

- 1975 → 75
- 1989 → 89
- 1999 → 99

Everything seemed fine… until the calendar moved to:

**2000 → 00**

---

Suddenly, millions of systems thought the year was 1900 again.

That meant software could:

- Calculate ages incorrectly
- Break billing cycles
- Reset licenses
- Cause financial errors
- Schedule things 100 years in the past

Governments and industries feared: Banks failing, power grids collapsing, flights grounded — all because of two missing digits.

So, as the year 2000 approached, teams around the world rewrote and patched old code.

Thanks to that massive effort, midnight came… and the world mostly kept running.

**The big lesson:**

Shortcuts that seem harmless today can become disasters decades later.

And funny enough — a lot of modern software still repeats the same mistake… especially when it comes to time.

---

## ⚠️ Time looks simple — but software gets it wrong

Even today, programmers make assumptions about time that quietly break systems.

Here are a few of the most common ones (and why they cause trouble).

### 1️⃣ "Time is the same everywhere"

It feels obvious: if it's 3:00 PM, then it's 3:00 PM.

But devices and servers often disagree — even by seconds or minutes.

- Clocks drift
- Users change time manually
- Servers sync at different moments

That tiny difference can cause:

- Duplicate transactions
- Failed authentication
- Logs appearing out of order

Computers don't actually "know" the time — they just guess and correct.

### 2️⃣ "We'll store local time — easy!"

Storing whatever time the user sees sounds convenient.

Until the user:

- Travels to another country
- Crosses time zones
- Experiences daylight savings
- Or the government changes the official offset

Suddenly your database is full of mixed, confusing dates.

**Safer rule:**

Store timestamps in UTC internally, convert only when displaying to humans.

### 3️⃣ "Time zones never change"

They absolutely do.

Governments say things like:

- "We're cancelling daylight savings."
- "Our country is shifting 30 minutes ahead."
- "This city will use its own time zone now."

If software assumes time zones are permanent, it starts behaving incorrectly overnight.

### 4️⃣ "A minute always has 60 seconds"

Not always.

Sometimes a minute has 61 seconds — it's called a leap second.

Some systems handle it gracefully.

Others… crash, freeze, or duplicate events.

Distributed systems especially hate it.

### 5️⃣ "Cron jobs will just run at the right time"

Scheduling sounds simple — until the clocks jump.

During daylight savings:

- an hour disappears
- or an hour repeats

That means scheduled tasks might:

- run twice
- not run at all
- run at the wrong moment

And debugging that is painful.

---

## 🧠 Why time bugs matter more than we expect

Time sneaks into everything:

- Authentication tokens
- Banking transactions
- Subscriptions and billing
- Notifications and reminders
- Analytics
- Logging and debugging
- Distributed systems

And when it goes wrong, the bug feels "random" — the worst kind.

Just like Y2K, time issues rarely explode dramatically.

Instead, they silently corrupt data, calculations, and expectations.

---

## ✅ How good systems deal with time

Here's the practical checklist most reliable systems follow:

- ✔ Store time in UTC
- ✔ Convert to local time only for display
- ✔ Assume clocks can be wrong or drift
- ✔ Keep time-zone data updated
- ✔ Test what happens when clocks jump or rewind
- ✔ Use monotonic clocks when order matters (not wall-clock time)

These aren't fancy tricks — they're guardrails.

They exist because history (including Y2K) proved that time is one of the most deceptive parts of software.

---

## 🎯 Final takeaway

The Y2K scare wasn't caused by hackers or viruses.

It happened because people thought:

*"We'll never need this software 40 years from now."*

But we did.

Today, the same mindset still causes trouble: we assume time is simple — and reality keeps proving otherwise.

When developers respect how weird time really is, systems become safer, smarter, and easier to trust.
    `.trim(),
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
