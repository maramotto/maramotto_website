---
title: "Back to data, one floor up"
date: 2026-09-22
lang: en
translationKey: vuelvo-a-los-datos
category: engineering
tags: ["career", "ai", "aforo"]
imageFile: "cover.svg"
imageRatio: square
excerpt: "I'm going back to data five years after I left it, and the job isn't the same one I left. On what's changed, why knowing how to code stopped being enough, and Aforo — the project where I'm learning data architecture in public."
---

For seven years my job was moving data from one place to another without it breaking along the way. My day-to-day was pipelines, ETLs, and schemas that changed without warning. That's where I learned almost everything I know about building software that actually has to work, every day, with data that never arrives the way you were promised it would.

Then I moved on to other things. Now I'm going back — but not to the same place, because that place doesn't exist anymore.

## What's changed in five years

In 2021, "data engineer" was one of those labels that opened doors on its own. Everyone was building their modern data stack: a cloud warehouse, an ingestion tool, dbt for transformations, and BI on top. New tools shipped every week, there was money to try them all, and it felt like anyone who could write a DAG got hired. The analytics engineer debuted as a role of its own. It felt like demand would never hit a ceiling.

Then came rate hikes, layoffs, and the uncomfortable question nobody had asked during the boom: how much is all this costing us, and what value is it actually giving back? Many data teams stopped being the bet on the future and started having to justify every warehouse invoice. Tools began consolidating. The conversation shifted from "add another piece to the stack" to "do we actually need all these pieces?"

And in the middle of all that came generative AI. At first it was a curiosity. Then it became the reason companies started looking at their data again, because for a model to be worth anything you need data that's clean (a bit of a mirage, honestly), governed, traceable, and owned by someone who answers for its quality. For years, lineage, data contracts, permissions, and quality were the boring part of the job. Today they're what separates a flashy pilot from something that actually runs in production. On top of that, open table formats like Iceberg are changing how platforms get designed, and regulation like the AI Act has put governance on leadership's agenda.

The result is that the data market of 2026 doesn't look like the one from 2021. There's less room for people who can only execute, and more need for people who can decide which architecture to use, what it will cost, what risks it carries, and what's actually worth building versus what isn't.

## The part I find hard to admit

For years I was clear on my strengths: SQL and programming, Python specifically. I've been writing it for more than ten years. It's where I felt most comfortable and added the most value. Moving data, cleaning data, pulling insight out of complex queries, knowing the data model by heart.

Today an AI writes in seconds what used to take me an afternoon: a reasonable pipeline, a dbt model, an endpoint, a test. It doesn't always get it right, but it keeps getting better. That changes the rules, because if a machine can do something in seconds, that thing stops setting you apart.

I'm not going to pretend it doesn't sting a little, or that it hasn't left me knocked out for a while. Even so, I think the right read isn't "knowing how to code no longer matters" — it's "knowing how to code is no longer enough." My years with Python haven't evaporated. They're exactly what lets me spot when the code an AI suggests is subtly wrong, when something that works locally is about to break under ten times the volume, and when the problem isn't in the code but in the design. AI has raised the floor for everyone, but it hasn't raised the ceiling of judgment the same way.

So I asked myself a question: if writing code is no longer my edge, what do I want it to be?

## Where I'm headed

My answer is architecture. I want to grow into platform and data architecture roles — the ones that decide how the pieces fit together, what they cost, how they're governed, and how they evolve as needs change. It's work that AI amplifies rather than replaces. It's also what's always connected most with what I've loved about data: understanding the whole system, not just my slice of it.

To get there, I'm doing two things.

The first is studying. Finishing my Software Engineering degree while working made it clear that learning isn't a phase — it's part of the job. Now it's time to go deeper on orchestration, streaming, open table formats, data governance, and platform design.

The second is building, because whatever I study without building I forget within two weeks (being generous). That's why I started **Aforo**, a personal, public project where I'm going to build a data platform from scratch over the next year or so (with AI in the mix, estimating timelines has gotten harder, not easier). The first domain is cultural heritage. The idea is to cross Wikimedia's real-time stream (EventStreams and Wikipedia pageviews) with slow, heterogeneous catalogs like Europeana, the Met, or the Rijksmuseum. I want to answer one question: how much of European heritage is actually visible in the open knowledge infrastructure, broken down by institution, country, and object type.

It looks like a small problem, but the moment you scratch the surface, everything shows up. There's entity resolution to solve, and data arriving at very different rhythms with schemas that don't look anything like each other. Costs need watching too, because all of it runs on a modest VPS, not an unlimited cloud account. Those are exactly the decisions I want to learn to make well. On top of that, the platform is designed to be domain-agnostic, so it should hold up (it will hold up) if I add another domain down the line.

The code is on [GitHub](https://github.com/maramotto/aforo) under an Apache 2.0 license. I'll write here about what I learn along the way: what works, what doesn't, and what I'd change if I started over.

## Reinvent or fall behind

If these five years have taught me anything, it's that there are no safe positions in tech. What was a highly sought-after profile in 2021 is, today, a skill everyone's expected to have already — or something a machine does instead. I don't say that with pessimism. It's what's always happened in this trade, just faster now. Much faster.

For me, reinventing myself isn't about chasing every new tool. It's about asking, every so often, which part of what you do still holds value, which part is turning into something anyone — or anything — can do, and where you want to be once that shift finishes playing out. I asked myself that, and the answer brought me back to where I started — just one floor up.

See you around.
