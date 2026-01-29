"use client";

import { useMemo, useState } from "react";

const suggestions = [
  {
    name: "Goa",
    reason: "Beach and nightlife fit in Dec. Budget range matches 8k.",
    window: "Dec 15-28",
    budget: "6k-9k per person per day",
    highlights: "Beaches; nightlife; water sports",
    plan: "Day 1: Beach + sunset walk. Day 2: Water sports. Day 3: Old Goa."
  },
  {
    name: "Gokarna",
    reason: "Quieter beach option with lower costs and short travel time.",
    window: "Dec 10-25",
    budget: "4k-7k per person per day",
    highlights: "Peaceful beaches; short treks; sunsets",
    plan: "Day 1: Om Beach. Day 2: Short trek. Day 3: Cafe crawl."
  },
  {
    name: "Varkala",
    reason: "Cliff beaches in winter with relaxed pace and good cafes.",
    window: "Dec 05-22",
    budget: "5k-8k per person per day",
    highlights: "Cliff views; cafes; yoga",
    plan: "Day 1: Cliff walk. Day 2: Beach day. Day 3: Cafe and market."
  }
];

const totalMembers = 8;

const pillOptions = {
  month: ["Nov", "Dec", "Jan", "Feb"],
  budget: ["4k", "6k", "8k", "10k"],
  length: ["2 days", "3 days", "4 days", "5 days"],
  interest: ["Beach", "Mountains", "Food", "Culture", "Nature"]
};

function PillGroup({ title, options, value, onChange }) {
  return (
    <div className="card">
      <div className="muted">{title}</div>
      <div className="pill-row">
        {options.map((option) => (
          <div
            key={option}
            className={`pill ${value === option ? "active" : ""}`}
            onClick={() => onChange(option)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onChange(option);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [showSections, setShowSections] = useState({
    clarify: false,
    results: false,
    vote: false,
    summary: false
  });
  const [month, setMonth] = useState(null);
  const [budget, setBudget] = useState(null);
  const [length, setLength] = useState(null);
  const [interest, setInterest] = useState(null);
  const [votes, setVotes] = useState({
    Goa: 0,
    Gokarna: 0,
    Varkala: 0
  });
  const [selected, setSelected] = useState(null);
  const [summary, setSummary] = useState(null);

  const totalVotes = votes.Goa + votes.Gokarna + votes.Varkala;
  const topMatch = useMemo(() => {
    const entries = Object.entries(votes);
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][1] > 0 ? entries[0][0] : null;
  }, [votes]);

  const onSuggest = () => {
    setShowSections({ clarify: true, results: true, vote: true, summary: false });
    setVotes({ Goa: 0, Gokarna: 0, Varkala: 0 });
    setSelected(null);
    setSummary(null);
  };

  const onClear = () => {
    setPrompt("");
    setShowSections({ clarify: false, results: false, vote: false, summary: false });
    setMonth(null);
    setBudget(null);
    setLength(null);
    setInterest(null);
    setVotes({ Goa: 0, Gokarna: 0, Varkala: 0 });
    setSelected(null);
    setSummary(null);
  };

  const castVote = (name) => {
    setVotes((prev) => ({
      ...prev,
      [name]: prev[name] + 1
    }));
    setSelected(name);
  };

  const finalize = () => {
    const entries = Object.entries(votes);
    entries.sort((a, b) => b[1] - a[1]);
    const winner = entries[0][1] === 0 ? suggestions[0].name : entries[0][0];
    const data = suggestions.find((item) => item.name === winner);
    const dates = "Dec 20-23";
    const summaryText = `Destination: ${data.name}\nDates: ${dates}\nBudget: ${data.budget}\nHighlights: ${data.highlights}`;
    setSummary({
      text: summaryText,
      shareText: `Trip summary: ${data.name} | Dates: ${dates} | Budget: ${data.budget} | Highlights: ${data.highlights}`,
      display: {
        destination: data.name,
        dates,
        budget: data.budget,
        highlights: data.highlights
      }
    });
    setShowSections((prev) => ({ ...prev, summary: true }));
  };

  const simulateVote = () => {
    const names = suggestions.map((item) => item.name);
    const pick = names[Math.floor(Math.random() * names.length)];
    castVote(pick);
  };

  const copySummary = async () => {
    if (!summary) {
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(summary.text);
    }
  };

  const whatsappUrl = summary
    ? `https://wa.me/?text=${encodeURIComponent(summary.shareText)}`
    : "#";

  return (
    <div className="container">
      <header>
        <div>
          <div className="logo">TripSquad AI</div>
          <div className="tagline">Decide where to go in minutes</div>
        </div>
        <div className="tagline">One page prototype</div>
      </header>

      <section className="card">
        <h2 className="section-title">What kind of trip do you want?</h2>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="We want beaches in December, 4 days, 8k per person, from Bangalore"
        />
        <div className="buttons">
          <button onClick={onSuggest}>Suggest</button>
          <button className="secondary" onClick={onClear}>Clear</button>
        </div>
      </section>

      {showSections.clarify && (
        <section className="card">
          <h2 className="section-title">Quick clarifications</h2>
          <div className="muted">Tap to set or change your preferences.</div>
          <PillGroup
            title="When do you want to travel?"
            options={pillOptions.month}
            value={month}
            onChange={setMonth}
          />
          <PillGroup
            title="Budget per person per day?"
            options={pillOptions.budget}
            value={budget}
            onChange={setBudget}
          />
          <PillGroup
            title="Trip length?"
            options={pillOptions.length}
            value={length}
            onChange={setLength}
          />
          <PillGroup
            title="Interests?"
            options={pillOptions.interest}
            value={interest}
            onChange={setInterest}
          />
        </section>
      )}

      {showSections.results && (
        <section className="card">
          <h2 className="section-title">Top 3 matches for your group</h2>
          <div className="grid">
            {suggestions.map((item) => (
              <div className="card" key={item.name}>
                <strong>{item.name}</strong>
                <div className="muted">Why it fits: {item.reason}</div>
                <div className="muted">Best window: {item.window}</div>
                <div className="muted">Budget: {item.budget}</div>
                <details>
                  <summary className="muted">View plan</summary>
                  <div className="muted">{item.plan}</div>
                </details>
                <div className="buttons">
                  <button className="ghost" onClick={() => castVote(item.name)}>
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showSections.vote && (
        <section className="card">
          <h2 className="section-title">Group vote</h2>
          <div className="pill-row">
            {suggestions.map((item) => (
              <div
                key={item.name}
                className={`pill ${selected === item.name ? "active" : ""}`}
                onClick={() => castVote(item.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    castVote(item.name);
                  }
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="muted">
            {totalVotes} of {totalMembers} voted
            {topMatch ? ` | Top match: ${topMatch}` : ""}
          </div>
          <div className="buttons">
            <button onClick={finalize}>Finalize destination</button>
            <button className="ghost" onClick={simulateVote}>
              Simulate another vote
            </button>
          </div>
        </section>
      )}

      {showSections.summary && summary && (
        <section className="card">
          <h2 className="section-title">Trip summary</h2>
          <div className="summary-box">
            Destination: {summary.display.destination}
            <br />
            Dates: {summary.display.dates}
            <br />
            Budget: {summary.display.budget}
            <br />
            Highlights: {summary.display.highlights}
          </div>
          <div className="buttons">
            <a className="link" href={whatsappUrl} target="_blank" rel="noreferrer">
              Share to WhatsApp
            </a>
            <button className="secondary" onClick={copySummary}>
              Copy summary
            </button>
          </div>
        </section>
      )}

      <footer>About | Privacy | Contact</footer>
    </div>
  );
}
