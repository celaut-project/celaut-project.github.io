# Function goods and competitive goods: why abundance is not enough to eliminate inequality

## The premise

You often hear that once AI is capable enough, software and any automatable service will be practically free, and that this will do away with much of economic inequality. We think that holds for some goods and not for others, and that the line between them can be drawn.

What separates them is how their success is measured. There are two ways:

- against a **fixed threshold**: does it work?
- against **everyone else**: is it better than the rival's?

Hardly any good is purely one kind; most are a mix. To see where one falls, ask: if all my rivals got the same improvement I did, how much of its value would I keep? For a function good, nearly all of it. For a competitive good, almost none. We will call the part that is lost *positional dependence*.

The hypothesis is that, with abundant AI, the price of function goods tends to fall to what it costs to produce them, and the price of competitive goods does not, because there what people pay for is the edge over everyone else.

The distinction is not new. Fred Hirsch called goods whose value depends on relative position *positional goods* (1976). Lazear and Rosen studied contests where the prize goes by rank and not by output, which they called tournaments (1981). Frank and Cook described how markets where small differences in ability bring huge differences in reward spread across the economy (1995). What we add is applying that to AI compute, and two curves that say when abundance levels the field and when it doesn't.

## Function goods

These only have to do their job: a booking form, an internal inventory tool, an administrative procedure, an association's accounting software, a script that sorts files.

Either they work or they don't. The booking gets recorded or it doesn't, and once it works, making it better adds little: a booking app twice as good doesn't bring twice the customers, because that depends on how many people want to eat there.

Three things follow:

1. **Any solution that works will do.** Nobody pays more for a better version when the one they have already does the job.
2. **Making another custom one costs little more than the inference.** Integration with other systems, maintenance and someone to answer when it breaks are still there, but development work, which is most of the price today, is exactly what gets cheaper.
3. **Charging much more than that is hard**, because the customer can have an alternative made for very little.

Here abundance delivers what it promises. What costs tens of thousands of euros in development today comes within reach of almost anyone, and the savings go to the people who used to be the customers.

The price won't reach the bare cost of inference, though. Some things remain that compute doesn't produce: someone who answers for the tool when it fails, keeps the data safe and meets the rules of the sector, and the cost of moving from one tool to another. More likely the price falls to the cost of production plus the cost of trust. And the price may not even be the biggest change. Jevons saw in 1865 that more efficient steam engines didn't save coal: Britain burned more, because coal became worth using for more things. If function goods get cheap, many more of them will be made, for people and problems that could never pay for one before.

That said, there are fewer pure function goods than it seems. A restaurant's website shows the menu and takes bookings, but it also competes with other restaurants' sites for the attention of someone deciding where to eat. The first part gets cheaper; the second doesn't. Most real goods mix the two, and what is worth knowing about each one is how much of its value depends on position.

### Finding them

Even a pure function good has to be found. If anyone can have a booking tool made for very little, there will be thousands of them, and nobody who needs one is going to compare them all. They will take what the app store, the search engine or the marketplace shows first.

Those intermediaries are among the most winner-take-all markets there are: the one with the most users draws the most providers, and the one with the most providers draws the most users. So the good itself can become almost free while the rent moves to whoever controls the shop window. That is where concentration happens on the functional side, not in making the good.

## Competitive goods

These compete against other people's and are worth whatever they are worth against them: a trading bot, a dynamic pricing system, an ad-bidding algorithm, a fraud detector, a logistics engine, a drug-discovery tool.

There is no threshold to reach, because the reference point is what everyone else does. A trading bot is good against the bots on the other side of the trade, and stops being good as soon as a better one shows up.

Picture someone who asks an AI to "build me a trading bot to make money" and spends $200 on compute. Their bot will trade against those of people who spent $10 and people who spent $20,000. That it works is taken for granted; what matters is where in that distribution it lands.

### Where the edge comes from

Compute is one of the things that decide that position. In trading, latency and physical proximity to the exchange also count; in fraud detection, years of in-house transaction data; in logistics, the fleet and the warehouses; in drug discovery, regulatory access and clinical trials; and in nearly all of them, distribution and brand.

Most of these factors reinforce concentration, because they tend to sit in the same hands as compute and feed each other: more data improves the model, a better model draws customers, and customers produce more data. A few work in favour of small players: niche data, local relationships, deep knowledge of a field. Cheaper models make none of these advantages go away, and in some markets they leave them as the only thing that tells one competitor from another.

### Zero-sum and positive-sum

In some contests what one side wins the other loses; in others, something gets produced along the way.

- **Zero-sum or close to it.** Speculative trading and ad auctions are like this. Here the **Red Queen effect** shows up: everyone spends more and more while positions barely move. (The name comes from biology: Van Valen used it in 1973 for species that have to keep evolving just to stay where they are.) And the surplus is **dissipated**: the compute everyone burns only moves existing rents from one pocket to another, using up energy and silicon on the way.
- **Positive-sum.** In drug discovery, fraud detection or logistics, competition leaves something behind: a treatment, less fraud, cheaper shipping. Some of the spending is wasted because several rivals do the same work, but the net result for society can be positive even if the race is expensive.

Inequality can grow in both cases, but waste belongs mostly to the first.

## The two curves

Everything above depends on two relationships that can be measured:

> **Curve 1: how much quality each extra unit of compute buys.**
>
> **Curve 2: how much market share or profit each extra unit of quality buys.**

Curve 1 may flatten early, in which case spending a hundred times more gives a barely better result and the $200 bot ends up close to the $20,000 one. Or it may keep rising: each order of magnitude of compute buys a noticeable improvement, even if only at a logarithmic pace.

An example, with made-up numbers that only show the shape. Take the trading bots from earlier and score them from 0 to 100.

- If curve 1 flattens, the $200 bot scores about 85 and the $20,000 one about 91. A hundred times the spend buys six points, and who wins is decided by the rest: data, latency, distribution.
- If curve 1 keeps rising, say twelve points for every tenfold increase in compute, the $200 bot scores about 56 and the $20,000 one about 80. The gap is 24 points, and each further tenfold in spending widens it.

<figure class="chart">
<svg viewBox="0 0 480 300" role="img" aria-labelledby="curve1-title curve1-desc">
<title id="curve1-title">Curve 1: two possible shapes</title>
<desc id="curve1-desc">Illustrative sketch, not data. Quality against compute spent, on a log scale. If the curve flattens, a $200 bot scores about 85 and a $20,000 bot about 91. If it keeps rising, they score about 56 and 80.</desc>
<line class="grid" x1="56" y1="135.0" x2="464" y2="135.0"/>
<line class="grid" x1="56" y1="20.0" x2="464" y2="20.0"/>
<line class="guide" x1="243.8" y1="20" x2="243.8" y2="250"/>
<line class="guide" x1="407.0" y1="20" x2="407.0" y2="250"/>
<line class="axis" x1="56" y1="250" x2="464" y2="250"/>
<line class="axis" x1="56" y1="20" x2="56" y2="250"/>
<text class="tick" x="48" y="255.0" text-anchor="end">0</text>
<text class="tick" x="48" y="140.0" text-anchor="end">50</text>
<text class="tick" x="48" y="25.0" text-anchor="end">100</text>
<text class="tick" x="137.6" y="270" text-anchor="middle">$10</text>
<text class="tick" x="243.8" y="270" text-anchor="middle">$200</text>
<text class="tick" x="407.0" y="270" text-anchor="middle">$20,000</text>
<text class="axis-label" x="260" y="294" text-anchor="middle">Compute spent (log scale)</text>
<text class="axis-label" transform="translate(21 135) rotate(-90)" text-anchor="middle">Quality</text>
<path class="curve flat" d="M56.0 188.2 L60.1 184.8 L64.2 181.4 L68.2 177.8 L72.3 174.1 L76.4 170.4 L80.5 166.6 L84.6 162.7 L88.6 158.8 L92.7 154.9 L96.8 150.9 L100.9 146.9 L105.0 142.9 L109.0 138.9 L113.1 134.9 L117.2 131.0 L121.3 127.0 L125.4 123.2 L129.4 119.4 L133.5 115.7 L137.6 112.0 L141.7 108.5 L145.8 105.0 L149.8 101.7 L153.9 98.4 L158.0 95.3 L162.1 92.3 L166.2 89.3 L170.2 86.5 L174.3 83.9 L178.4 81.3 L182.5 78.9 L186.6 76.5 L190.6 74.3 L194.7 72.2 L198.8 70.2 L202.9 68.3 L207.0 66.5 L211.0 64.9 L215.1 63.3 L219.2 61.8 L223.3 60.4 L227.4 59.0 L231.4 57.8 L235.5 56.6 L239.6 55.6 L243.7 54.5 L247.8 53.6 L251.8 52.7 L255.9 51.8 L260.0 51.1 L264.1 50.3 L268.2 49.7 L272.2 49.0 L276.3 48.4 L280.4 47.9 L284.5 47.4 L288.6 46.9 L292.6 46.5 L296.7 46.0 L300.8 45.7 L304.9 45.3 L309.0 45.0 L313.0 44.7 L317.1 44.4 L321.2 44.1 L325.3 43.9 L329.4 43.6 L333.4 43.4 L337.5 43.2 L341.6 43.0 L345.7 42.9 L349.8 42.7 L353.8 42.6 L357.9 42.4 L362.0 42.3 L366.1 42.2 L370.2 42.1 L374.2 42.0 L378.3 41.9 L382.4 41.8 L386.5 41.7 L390.6 41.6 L394.6 41.6 L398.7 41.5 L402.8 41.4 L406.9 41.4 L411.0 41.3 L415.0 41.3 L419.1 41.3 L423.2 41.2 L427.3 41.2 L431.4 41.1 L435.4 41.1 L439.5 41.1 L443.6 41.0 L447.7 41.0 L451.8 41.0 L455.8 41.0 L459.9 41.0 L464.0 40.9"/>
<path class="curve rise" d="M56.0 185.6 L60.1 184.2 L64.2 182.8 L68.2 181.5 L72.3 180.1 L76.4 178.7 L80.5 177.3 L84.6 175.9 L88.6 174.6 L92.7 173.2 L96.8 171.8 L100.9 170.4 L105.0 169.0 L109.0 167.7 L113.1 166.3 L117.2 164.9 L121.3 163.5 L125.4 162.1 L129.4 160.8 L133.5 159.4 L137.6 158.0 L141.7 156.6 L145.8 155.2 L149.8 153.9 L153.9 152.5 L158.0 151.1 L162.1 149.7 L166.2 148.3 L170.2 147.0 L174.3 145.6 L178.4 144.2 L182.5 142.8 L186.6 141.4 L190.6 140.1 L194.7 138.7 L198.8 137.3 L202.9 135.9 L207.0 134.5 L211.0 133.2 L215.1 131.8 L219.2 130.4 L223.3 129.0 L227.4 127.6 L231.4 126.3 L235.5 124.9 L239.6 123.5 L243.7 122.1 L247.8 120.7 L251.8 119.4 L255.9 118.0 L260.0 116.6 L264.1 115.2 L268.2 113.8 L272.2 112.5 L276.3 111.1 L280.4 109.7 L284.5 108.3 L288.6 106.9 L292.6 105.6 L296.7 104.2 L300.8 102.8 L304.9 101.4 L309.0 100.0 L313.0 98.7 L317.1 97.3 L321.2 95.9 L325.3 94.5 L329.4 93.1 L333.4 91.8 L337.5 90.4 L341.6 89.0 L345.7 87.6 L349.8 86.2 L353.8 84.9 L357.9 83.5 L362.0 82.1 L366.1 80.7 L370.2 79.3 L374.2 78.0 L378.3 76.6 L382.4 75.2 L386.5 73.8 L390.6 72.4 L394.6 71.1 L398.7 69.7 L402.8 68.3 L406.9 66.9 L411.0 65.5 L415.0 64.2 L419.1 62.8 L423.2 61.4 L427.3 60.0 L431.4 58.6 L435.4 57.3 L439.5 55.9 L443.6 54.5 L447.7 53.1 L451.8 51.7 L455.8 50.4 L459.9 49.0 L464.0 47.6"/>
<circle class="dot flat" cx="243.8" cy="54.5" r="5"/>
<circle class="dot rise" cx="243.8" cy="122.1" r="5"/>
<circle class="dot flat" cx="407.0" cy="41.4" r="5"/>
<circle class="dot rise" cx="407.0" cy="66.9" r="5"/>
<text class="value" x="234.8" y="45.5" text-anchor="end">85</text>
<text class="value" x="398.0" y="32.4" text-anchor="end">91</text>
<text class="value" x="253.8" y="142.1">56</text>
<text class="value" x="417.0" y="86.9">80</text>
<text class="series flat" x="309.0" y="33.0" text-anchor="middle">Flattens</text>
<text class="series rise" x="323.1" y="131.3">Keeps rising</text>
</svg>
<figcaption>Curve 1, two possible shapes. An illustrative sketch with made-up numbers, not data.</figcaption>
</figure>

Curve 2 depends on what the market looks like. Where the winner takes nearly everything (search, platforms with network effects, the lowest price in a transparent market), a small edge is enough to concentrate it. Where the market is split by geography, niche or taste, being better earns a bit more share, but not much. In the example, being six points behind costs a few customers in a split market, and can cost the whole market where the winner takes nearly all.

Putting the two together gives this table:

| | **Split market** | **Winner takes nearly all** |
| :--- | :--- | :--- |
| **Curve 1 flattens** | Open competition. Competitive goods behave almost like function goods. | Concentration driven by data, distribution or brand. |
| **Curve 1 keeps rising** | Capital gives an edge, but several large players fit. | Strong concentration: whoever spends most wins most, and whoever wins most can spend most. |

The picture of a spiral toward **centralised control**, what some call **technofeudalism**, belongs to the bottom-right cell. The top-left one leads to **decentralised competition**, and the other two sit in between. Most likely each sector ends up in a different cell.

This means the distribution of power may depend a lot on technical facts and on how each market is organised, on top of political decisions. In a sector where curve 1 keeps rising and the winner takes everything, regulating access to models does little, because what is scarce lies elsewhere. Where policy can act is on curve 2, which is easier to move: data portability, interoperability, competition enforcement.

## What if compute keeps getting cheaper?

The price of compute has been falling for decades, and that can have two opposite effects.

- **Levelling.** If the point where curve 1 flattens soon comes within anyone's reach, the edge that $20,000 buys today will be available tomorrow for $200.
- **Red Queen.** If the curve doesn't flatten, cheaper compute only raises the bids: everyone buys more with the same money and everyone stays where they were.

Which one weighs more again comes down to the shape of curve 1, so the price of compute on its own settles nothing.

## Two second-order effects

**1. The functional ends up competitive.** When a function good becomes free and everyone has it, it no longer sets anyone apart, and competition moves elsewhere. A restaurant that stands out today for having a decent website won't stand out for it tomorrow; it will compete on dynamic pricing, on how it buys supplies, or on its reputation. Each time the price of something functional collapses, competition moves to the next ground that isn't saturated yet.

**2. Inequality becomes a matter of position more than of resources.** The result could be a world where almost everyone has their functional needs met at very low cost and where, at the same time, competition for rank is harder and more expensive than ever. Against this kind of inequality there is a limit that depends on no data at all: if everyone is given the same, relative positions don't change. A universal basic income works against scarcity, but if everyone gets the same amount, everyone can spend the same on compute and everyone stays in their percentile. More people may join the contest, but the same ones will win.

## Objections

These are the two most serious objections we know of.

**A tech optimist** would say AI makes everything else cheaper too: generating synthetic data, getting distribution, building a brand. And that every market that saturates opens new ones, with niches where a small player can win. That could happen, and it would be the top-left cell. But it follows from the shape of the two curves, not from how capable AI is. Also, some factors don't get cheaper with software: latency, physical infrastructure, regulatory access.

**A concentration sceptic** would point out that technological advantages have always worn away: monopolies weaken, rivals copy, competition authorities step in, and history is full of toppled leaders. That could happen too, and it would push toward the left-hand cells. But that erosion worked because copying was cheaper than innovating. If the edge lies in accumulated compute and data, copying may cost as much as competing. We don't know, and the indicators in the next section are there to find out.

## How to tell where we are heading

The hypothesis can be tested. To know which cell each sector is in, these are the numbers to watch:

- **Margins on custom software and standardised management services.** If they fall steadily, function goods are behaving as the hypothesis predicts.
- **Concentration of compute spending:** what share of global training and inference spending comes from the largest buyers, and how it changes over time.
- **Marginal returns on competitive benchmarks:** how much the result improves when compute doubles, in tasks where one system plays against others. This measures curve 1 directly.
- **Relationship between spending (on compute and R&D) and market share.** If share tracks spending closely, curve 2 is steep.
- **Leader turnover:** how often the top positions change in the sectors that use AI most.

## Summary

| | **Function** | **Competitive, positive-sum** | **Competitive, zero-sum** |
| :--- | :--- | :--- | :--- |
| **Success criterion** | Does it work? | Better than the rival, and creates value | Better than the rival |
| **Saturates?** | Yes, at the threshold | Depends on curve 1 | Depends on curve 1 |
| **Cost** | Approaches inference plus integration | Rising spend, partly productive | Rising spend, largely wasted |
| **Sources of advantage** | Almost none past the threshold | Compute, data, infrastructure, regulatory access | Compute, latency, data, distribution |
| **Who keeps the surplus** | Users | Users and winners | Whoever wins the race |
| **Inequality** | Tends to fall | Depends on curve 2 | Tends to reproduce itself |
| **Where power goes** | Decentralisation | Depends on the cell | Centralisation, if curve 1 keeps rising |

## Conclusion

With advanced AI, two logics live side by side, often inside the same good.

In the functional part, abundance delivers: the price falls toward the cost of production and overspending buys no edge. For that part of consumption, post-scarcity is real.

In the competitive part it doesn't happen by itself. When you are measured against others there is no ceiling, and compute joins data, infrastructure and distribution as a source of advantage. Whether that reproduces inequality, and how much, depends on two curves we know poorly today and that may differ from sector to sector.

The most common mistake is to take one of the two logics for the whole. Whoever looks at the first announces the end of scarcity; whoever looks at the second, a permanent feudalism. Each is right about their part.

The functional side seems to have a fairly clear path. What is still undecided is how compute and the other factors that competitive goods live on get distributed, and what shape the two curves take in each sector.

## Where Celaut comes in

Celaut is our project, so what follows is how we see it fitting into this argument, with the bias that implies.

Celaut is a *peer-to-peer* architecture for designing and distributing software: reproducible services that any node can run, advertise or pay for, with no central authority. It meets the argument above in four places.

**1. It distributes the functional part, and the way to find it.** A service is a reproducible, content-addressed unit, and once published any node can run it. But, as we saw, running it is the easy part; the concentration is in finding it. The Celaut Registry is on-chain and has no owner, and it lets you search by the problem you want solved instead of by provider, with *benchmarks* and reputation. There is still a ranking, and a service with a good track record will be seen more than a new one, but that place is earned with measurements and nobody owns the shop window. If all that matters is that something works, finding it and running it is enough.

**2. It is a compute market.** Anyone can [rent out their machine](/depin) when they aren't using it, at whatever price makes sense given their electricity bill; nodes negotiate among themselves and settle in Ergo or Bitcoin. An open market, which anyone can enter without asking permission, reduces dependence on a handful of providers, and renting capacity in bursts lets a small player compete without owning hardware. Celaut acts on compute and nothing else: it brings no proprietary data, no latency, no distribution.

**3. Game of Prompts is a way to measure curve 1.** On this platform, built with Celaut services, some people design game services that score bots and others write solver services that try to get the top score; results and prizes are recorded on Ergo. It is a competitive, measurable case: you can see how far a solver climbs the ranking when it gets more compute, which is one of the indicators above.

A game is closed, though: its rules don't change while it runs, and a trading game's simulated market doesn't react to the bots. Real competitive markets do, and an edge fades as soon as others copy it. Game of Prompts could also measure that, the Red Queen itself: by re-running the winning solvers of earlier games against the newer ones (they are content-addressed services, so they run exactly as they did), or with games whose opponents are the best solvers already submitted. How fast an old winner falls down the ranking would say how fast an edge wears off.

**4. Reputation matters more on the competitive side.** If a good is functional, you check for yourself whether it works. If it is competitive, knowing whether one service is better than another takes comparable measurements and a track record that is hard to fake. Celaut has a reputation layer where spamming costs something. It is one piece of the problem, nothing more.

### What Celaut does not solve

Celaut does not change the shape of either curve. If curve 1 keeps rising and the market rewards the winner, whoever has more capital will buy more compute, open market or not. Nor does it beat the large providers on price: commodity compute has strong economies of scale, and a hyperscaler's cost for a unit of compute can be lower than what a home PC spends on electricity alone to do the same work. Where an open market between peers has room is in bursts of capacity, inference close to the user and niches the big providers don't serve, not in competing at the frontier. Nor does it touch positional inequality. What it can do is push toward decentralisation where it has a say: that compute infrastructure has no owner, that the functional part of goods circulates as a commons, that finding it doesn't depend on one shop window, and that competing doesn't require anyone's permission.

If the outcome depends largely on how compute is distributed, building an open network where it is offered, paid for and verified between peers is a bet on one of the cells in the table.

## Further reading

- The [Celaut paradigm](/paradigm), with the formal specification.
- [Rent your PC](/depin), for the supply side of compute.
- Fred Hirsch, *Social Limits to Growth*, Harvard University Press, 1976, where the idea of positional goods comes from.
- Edward P. Lazear and Sherwin Rosen, "[Rank-Order Tournaments as Optimum Labor Contracts](https://doi.org/10.1086/261010)", *Journal of Political Economy* 89(5), 1981, for tournament theory.
- Robert H. Frank and Philip J. Cook, *The Winner-Take-All Society*, Free Press, 1995.
- Leigh Van Valen, "[A New Evolutionary Law](https://www.mn.uio.no/cees/english/services/van-valen/evolutionary-theory/volume-1/)", *Evolutionary Theory* 1, 1973, for the Red Queen.
- William Stanley Jevons, *The Coal Question*, Macmillan, 1865, for why cheaper often means more.
