import Footer from "./Footer";

interface Ref {
  label: string;
  cite: string;
  url: string;
  excerpt: string;
  linkLabel?: string;
}

const creatorRefs: Ref[] = [
  {
    label: "Berne Convention for the Protection of Literary and Artistic Works",
    cite: "WIPO, 1886 (as amended 1979)",
    url: "https://www.wipo.int/treaties/en/ip/berne/",
    excerpt:
      '"Authors of literary and artistic works shall enjoy, in respect of works for which they are protected under this Convention, in countries of the Union other than the country of origin, the rights which their respective laws do now or may hereafter grant to their nationals, as well as the rights specially granted by this Convention." Copyright subsists automatically from the moment of creation — no registration required.',
    linkLabel: "View at WIPO",
  },
  {
    label: "WIPO Copyright Treaty (WCT)",
    cite: "WIPO, 1996",
    url: "https://www.wipo.int/treaties/en/ip/wct/",
    excerpt:
      '"Authors of literary and artistic works shall enjoy the exclusive right of authorizing any communication to the public of their works, by wire or wireless means, including the making available to the public of their works in such a way that members of the public may access these works from a place and at a time individually chosen by them." — Applies directly to digital and online works.',
    linkLabel: "View at WIPO",
  },
  {
    label: "EU Directive on Copyright in the Digital Single Market — Articles 17–22",
    cite: "Directive 2019/790/EU",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0790",
    excerpt:
      '"Member States shall provide that users… are entitled to use works and other subject matter for the purpose of quotation, criticism, review, caricature, parody or pastiche." Moral rights of creators are affirmed and online platforms must respect creator attribution and artistic integrity.',
    linkLabel: "View at EUR-Lex",
  },
  {
    label: "UK Copyright, Designs and Patents Act 1988 — Sections 1, 77–85 (Moral Rights)",
    cite: "1988 c. 48",
    url: "https://www.legislation.gov.uk/ukpga/1988/48/contents",
    excerpt:
      '"The author of a copyright literary, dramatic, musical or artistic work, and the director of a copyright film, has the right to be identified as the author or director of the work." Moral rights protect the creator\'s identity and integrity of the work independently of commercial ownership.',
    linkLabel: "View at legislation.gov.uk",
  },
  {
    label: "India Copyright Act 1957 — Section 57 (Moral Rights) & Section 13",
    cite: "Act No. 14 of 1957",
    url: "https://indiankanoon.org/doc/1136195/",
    excerpt:
      '"Independently of the author\'s copyright and even after the assignment either wholly or partially of the said copyright, the author of a work shall have the right to claim authorship of the work as well as the right to restrain or claim damages in respect of any distortion, mutilation, modification or other act in relation to the said work done before the expiration of the term of copyright."',
    linkLabel: "View at Indian Kanoon",
  },
  {
    label: "US Digital Millennium Copyright Act — Section 512 & Fair Use (17 U.S.C. § 107)",
    cite: "17 U.S.C. §§ 107, 512",
    url: "https://www.copyright.gov/title17/92chap1.html#107",
    excerpt:
      '"The fair use of a copyrighted work… for purposes such as criticism, comment, news reporting, teaching… scholarship, or research, is not an infringement of copyright. In determining whether the use made of a work in any particular case is a fair use the factors to be considered shall include… the purpose and character of the use, including whether such use is of a commercial nature or is for nonprofit educational purposes [and] the effect of the use upon the potential market…"',
    linkLabel: "View at copyright.gov",
  },
];

const expressionRefs: Ref[] = [
  {
    label: "EU Charter of Fundamental Rights — Article 11 (Expression) & Article 13 (Arts)",
    cite: "2012/C 326/02",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:12012P/TXT",
    excerpt:
      '"Everyone has the right to freedom of expression… The arts and scientific research shall be free of constraint. Academic freedom shall be respected." These two articles together give the broadest possible protection to digital artistic works.',
    linkLabel: "View at EUR-Lex",
  },
  {
    label: "European Convention on Human Rights — Article 10",
    cite: "ECHR, ETS No. 005",
    url: "https://www.echr.coe.int/documents/d/echr/convention_ENG",
    excerpt:
      '"Everyone has the right to freedom of expression. This right shall include freedom to hold opinions and to receive and impart information and ideas without interference by public authority and regardless of frontiers."',
    linkLabel: "View at ECHR",
  },
  {
    label: "UK Human Rights Act 1998 — Schedule 1, Article 10",
    cite: "1998 c. 42",
    url: "https://www.legislation.gov.uk/ukpga/1998/42/schedule/1",
    excerpt:
      '"Everyone has the right to freedom of expression… The exercise of these freedoms… carries with it duties and responsibilities [but] may be subject only to such… restrictions or penalties as are prescribed by law and are necessary in a democratic society."',
    linkLabel: "View at legislation.gov.uk",
  },
  {
    label: "Constitution of India — Article 19(1)(a) & Shreya Singhal v. Union of India",
    cite: "AIR 2015 SC 1523",
    url: "https://indiankanoon.org/doc/110813550/",
    excerpt:
      '"All citizens shall have the right to freedom of speech and expression." The Supreme Court of India struck down sweeping restrictions on online expression, affirming that digital creative content carries the full protection of Article 19(1)(a) — restrictions are permissible only for a narrow set of enumerated grounds.',
    linkLabel: "View judgment at Indian Kanoon",
  },
  {
    label: "United States Constitution — First Amendment",
    cite: "U.S. Const. amend. I",
    url: "https://constitution.congress.gov/constitution/amendment-1/",
    excerpt:
      '"Congress shall make no law… abridging the freedom of speech, or of the press…" Extended by case law to cover all artistic, digital, and expressive works regardless of medium.',
    linkLabel: "View at congress.gov",
  },
  {
    label: "UNESCO Convention on Cultural Diversity — Articles 6 & 7",
    cite: "UNESCO, October 2005",
    url: "https://en.unesco.org/creativity/convention",
    excerpt:
      '"Parties shall endeavour to create in their territory an environment which encourages individuals and social groups to create, produce, disseminate, distribute and have access to their own cultural expressions." Covers digital creation and distribution explicitly.',
    linkLabel: "View Convention at UNESCO",
  },
];

const caseRefs: Ref[] = [
  {
    label: "Hurley v. Irish-American Gay Group — Expressive Works",
    cite: "515 U.S. 557 (1995)",
    url: "https://www.oyez.org/cases/1994/94-749",
    excerpt:
      '"The Constitution looks beyond written or spoken words as mediums of expression… painting, music, and poetry are unquestionably shielded. Symbolic or expressive conduct qualifies as speech."',
    linkLabel: "View at Oyez",
  },
  {
    label: "Campbell v. Acuff-Rose Music — Transformative Creative Expression",
    cite: "510 U.S. 569 (1994)",
    url: "https://www.oyez.org/cases/1993/92-1292",
    excerpt:
      '"Transformative works — those that add something new, altering the original with new expression, meaning, or message — lie at the heart of the copyright law\'s protective purpose."',
    linkLabel: "View at Oyez",
  },
  {
    label: "Milkovich v. Lorain Journal Co. — Opinion & Artistic Expression",
    cite: "497 U.S. 1 (1990)",
    url: "https://www.oyez.org/cases/1989/88-1945",
    excerpt:
      '"A statement of opinion on matters of public concern which does not contain a provably false factual connotation will receive full constitutional protection." Artistic and philosophical statements are opinion, not actionable fact.',
    linkLabel: "View at Oyez",
  },
  {
    label: "S. Rangarajan v. P. Jagjivan Ram — Artistic Freedom, India",
    cite: "(1989) 2 SCC 574",
    url: "https://indiankanoon.org/doc/1137368/",
    excerpt:
      '"Freedom of expression cannot be suppressed unless the situation created by allowing the freedom is pressing and the community interest is endangered. The anticipated danger should not be remote, conjectural or far-fetched."',
    linkLabel: "View at Indian Kanoon",
  },
  {
    label: "Gonzales v. O Centro Espírita — Cultural & Spiritual Language",
    cite: "546 U.S. 418 (2006)",
    url: "https://www.oyez.org/cases/2005/04-1084",
    excerpt:
      '"The Government bears the burden of demonstrating a compelling interest in restricting religious and cultural expression… The Court found that burden was not met." The artistic and philosophical use of culturally embedded language carries the same protection.',
    linkLabel: "View at Oyez",
  },
];

function RefCard({ r }: { r: Ref }) {
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" className="l-ref">
      <div className="l-ref-top">
        <span className="l-ref-label">{r.label}</span>
        <span className="l-ref-cite">{r.cite}</span>
      </div>
      <div className="l-ref-excerpt">{r.excerpt}</div>
      <div className="l-ref-link">↗ {r.linkLabel ?? "View primary source"}</div>
    </a>
  );
}

export default function LegalPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "#040008", color: "#ede0c8", overflowY: "auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400;1,6..96,600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .lw { max-width: 840px; margin: 0 auto; padding: 3rem 1.75rem 7rem; }

        .l-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Bodoni Moda', Georgia, serif; font-style: italic;
          font-size: 0.78rem; letter-spacing: 0.12em;
          color: rgba(180,140,255,0.45); background: none; border: none;
          cursor: pointer; padding: 0; margin-bottom: 2.5rem;
          transition: color 0.2s;
        }
        .l-back:hover { color: rgba(210,180,255,0.85); }

        .l-badge {
          display: inline-flex; align-items: center; gap: 0.55rem;
          border: 1.5px solid rgba(160,100,255,0.4); border-radius: 4px;
          padding: 0.38rem 0.9rem; margin-bottom: 1.8rem;
          font-family: 'Inter', sans-serif; font-size: 0.63rem;
          font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(155,100,255,0.7);
        }
        .l-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(155,100,255,0.7);
          animation: pdot 2.4s ease-in-out infinite;
        }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }

        .l-h1 {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-size: clamp(2.8rem, 7.5vw, 5rem);
          font-weight: 700; line-height: 1.03; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 0.8rem;
        }

        .l-sub {
          font-family: 'Bodoni Moda', Georgia, serif; font-style: italic;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: rgba(190,170,255,0.58); line-height: 1.6; margin-bottom: 2.2rem;
        }

        /* YouTube channel card */
        .yt-card {
          display: inline-flex; align-items: center; gap: 0.85rem;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,80,80,0.2);
          border-radius: 10px; padding: 0.75rem 1.1rem;
          text-decoration: none; margin-bottom: 2.8rem;
          transition: border-color 0.22s, background 0.22s;
        }
        .yt-card:hover {
          border-color: rgba(255,80,80,0.45);
          background: rgba(255,40,40,0.06);
        }
        .yt-icon { width: 26px; height: 18px; flex-shrink: 0; }
        .yt-text { font-family: 'Inter', sans-serif; }
        .yt-handle {
          display: block; font-size: 0.85rem; font-weight: 600;
          color: rgba(255,255,255,0.88); letter-spacing: 0.01em;
        }
        .yt-sub-label {
          display: block; font-size: 0.65rem; color: rgba(200,180,180,0.45);
          letter-spacing: 0.06em; margin-top: 0.1rem;
        }
        .yt-arrow { font-size: 0.7rem; color: rgba(255,80,80,0.5); margin-left: auto; }

        /* Alert box */
        .l-alert {
          background: rgba(110,50,220,0.11);
          border: 1px solid rgba(140,90,255,0.25);
          border-left: 3px solid rgba(150,100,255,0.75);
          border-radius: 0 12px 12px 0;
          padding: 1.4rem 1.6rem; margin-bottom: 3rem;
        }
        .l-alert-head {
          font-family: 'Inter', sans-serif; font-size: 1rem;
          font-weight: 700; color: #fff; margin-bottom: 0.6rem; letter-spacing: 0.01em;
        }
        .l-alert-body {
          font-family: 'Inter', sans-serif; font-size: 0.88rem;
          color: rgba(215,205,255,0.82); line-height: 1.78;
        }

        /* Quick scan */
        .l-summary {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(150,100,255,0.14);
          border-radius: 12px; padding: 1.4rem 1.5rem; margin-bottom: 3rem;
        }
        .l-summary-head {
          font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(148,108,255,0.6); margin-bottom: 1rem;
        }
        .l-summary-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 0.55rem 1.5rem;
        }
        .l-summary-item {
          font-family: 'Inter', sans-serif; font-size: 0.78rem;
          color: rgba(205,190,255,0.62); line-height: 1.5;
          display: flex; align-items: flex-start; gap: 0.45rem;
        }
        .l-summary-item::before { content: '—'; color: rgba(148,108,255,0.45); flex-shrink: 0; }

        .l-sec {
          font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(145,105,255,0.58); margin: 3rem 0 0.9rem;
        }

        .l-body {
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          color: rgba(208,193,182,0.65); line-height: 1.84; margin-bottom: 0.85rem;
        }
        .l-body em { color: rgba(210,195,255,0.8); font-style: italic; }
        .l-body strong { color: rgba(225,215,255,0.85); font-weight: 600; }

        .l-hr { border: none; border-top: 1px solid rgba(150,100,255,0.08); margin: 2.6rem 0; }

        .l-refs { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem; }

        .l-ref {
          background: rgba(255,255,255,0.016);
          border: 1px solid rgba(140,100,255,0.11);
          border-radius: 10px; padding: 1.05rem 1.25rem;
          text-decoration: none; display: block;
          transition: border-color 0.22s, background 0.22s;
        }
        .l-ref:hover {
          border-color: rgba(155,115,255,0.35);
          background: rgba(110,60,220,0.07);
        }
        .l-ref-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem; margin-bottom: 0.45rem;
        }
        .l-ref-label {
          font-family: 'Inter', sans-serif; font-size: 0.79rem; font-weight: 600;
          color: rgba(215,195,255,0.87); line-height: 1.35;
        }
        .l-ref-cite {
          font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 500;
          color: rgba(145,105,255,0.62); white-space: nowrap; flex-shrink: 0; padding-top: 0.1rem;
        }
        .l-ref-excerpt {
          font-family: 'Inter', sans-serif; font-size: 0.77rem; font-style: italic;
          color: rgba(172,157,192,0.5); line-height: 1.62;
        }
        .l-ref-link {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'Inter', sans-serif; font-size: 0.63rem;
          color: rgba(145,105,255,0.52); margin-top: 0.5rem; letter-spacing: 0.04em;
        }

        .l-hl { font-style: italic; color: rgba(205,180,255,0.8); }

        .l-copyright-block {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(150,100,255,0.15);
          border-radius: 10px; padding: 1.2rem 1.4rem; margin-top: 1.2rem;
        }
        .l-copyright-line {
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          color: rgba(210,195,255,0.65); margin-bottom: 0.3rem; line-height: 1.6;
        }
        .l-copyright-line:last-child { margin-bottom: 0; }

        .l-fine {
          font-family: 'Inter', sans-serif; font-size: 0.7rem;
          color: rgba(155,140,175,0.3); line-height: 1.75; margin-top: 2rem;
        }
      `}</style>

      <div className="lw">
        <button className="l-back" onClick={() => history.back()}>
          ← back
        </button>

        <div className="l-badge">
          <span className="l-dot" />
          Legal Notice · 2026
        </div>

        <h1 className="l-h1">This Is Art.<br />Not Reality.</h1>
        <p className="l-sub">
          A declaration of artistic intent, copyright, and freedom of expression
          for all works created by <em>Snieaks</em>.
        </p>

        {/* YouTube channel card */}
        <a
          href="https://www.youtube.com/@snieaks"
          target="_blank"
          rel="noopener noreferrer"
          className="yt-card"
        >
          <svg className="yt-icon" viewBox="0 0 24 16" fill="none">
            <rect width="24" height="16" rx="3.5" fill="#FF0000"/>
            <path d="M9.5 11.5V4.5L16.5 8L9.5 11.5Z" fill="white"/>
          </svg>
          <div className="yt-text">
            <span className="yt-handle">@snieaks</span>
            <span className="yt-sub-label">youtube.com/@snieaks</span>
          </div>
          <span className="yt-arrow">↗</span>
        </a>

        {/* Main alert */}
        <div className="l-alert">
          <div className="l-alert-head">Read this first — clearly and without ambiguity.</div>
          <div className="l-alert-body">
            All content created by <strong>Snieaks</strong> — across YouTube, web, and any other
            medium — is artistic and philosophical expression. It is art. Every visual, word,
            reference, concept, and experience produced under the name Snieaks exists entirely
            within the domain of creative and conceptual work. No content by Snieaks carries,
            asserts, or implies any physical-world grounding — none of it constitutes a statement
            of biographical fact, a verified account of events, or a representation of material
            reality that can be applied under any court of law. All interpretation is solely
            the viewer's own.
          </div>
        </div>

        {/* At a glance */}
        <div className="l-summary">
          <div className="l-summary-head">At a glance</div>
          <div className="l-summary-grid">
            {[
              "All Snieaks works are artistic & philosophical expression",
              "No content carries factual or real-world grounding",
              "No content can be applied as evidence in any court",
              "Snieaks holds copyright across all original works",
              "Protected under EU, UK, US, Indian & international law",
              "Storytelling language carries no physical implication",
              "Viewer interpretation is entirely the viewer's own",
              "No affiliation or endorsement implied by any reference",
            ].map((t) => (
              <div key={t} className="l-summary-item">{t}</div>
            ))}
          </div>
        </div>

        {/* ── I ── */}
        <p className="l-sec">I. Copyright — All Works by Snieaks</p>
        <p className="l-body">
          All original creative works produced by <em className="l-hl">Snieaks</em> — including
          but not limited to YouTube videos, web experiences, music, visual art, digital
          installations, interactive media, writing, and any combination thereof — are the
          exclusive intellectual property of Snieaks, protected by copyright law automatically
          from the moment of creation under the Berne Convention (1886, as amended), the WIPO
          Copyright Treaty (1996), and the domestic copyright laws of all relevant jurisdictions.
          No registration is required for this protection to be in force.
        </p>

        <div className="l-copyright-block">
          <div className="l-copyright-line">© Snieaks, 2026. All rights reserved.</div>
          <div className="l-copyright-line">YouTube: <a href="https://www.youtube.com/@snieaks" target="_blank" rel="noopener noreferrer" style={{color:"rgba(200,170,255,0.7)",textDecoration:"none"}}>youtube.com/@snieaks</a></div>
          <div className="l-copyright-line">Reproduction, redistribution, or commercial use of any Snieaks work without express written permission is prohibited under applicable copyright law across all jurisdictions.</div>
        </div>

        <p className="l-body" style={{marginTop:"1.2rem"}}>
          Moral rights — including the right to be identified as creator and the right to object
          to derogatory treatment of the work — are asserted in full under the UK Copyright,
          Designs and Patents Act 1988 (Sections 77–85), the Indian Copyright Act 1957 (Section 57),
          and equivalent provisions in all applicable jurisdictions. These rights persist
          independently of any commercial arrangement.
        </p>

        <div className="l-refs">
          {creatorRefs.map((r) => <RefCard key={r.url} r={r} />)}
        </div>

        <hr className="l-hr" />

        {/* ── II ── */}
        <p className="l-sec">II. Artistic Freedom — The Legal Frameworks</p>
        <p className="l-body">
          Artistic expression is among the most comprehensively protected categories of speech
          across all democratic jurisdictions. The following primary-source legal instruments —
          covering the European Union, the United Kingdom, the United States, India, and
          internationally — collectively establish Snieaks' works as expressly protected
          creative expression.
        </p>

        <div className="l-refs">
          {expressionRefs.map((r) => <RefCard key={r.url} r={r} />)}
        </div>

        <hr className="l-hr" />

        {/* ── III ── */}
        <p className="l-sec">III. Judicial Precedent</p>
        <p className="l-body">
          Courts across multiple jurisdictions have consistently confirmed that artistic,
          philosophical, and transformative creative works occupy a distinct protected category
          of expression — categorically separate from actionable factual assertion. The following
          cases are settled law.
        </p>

        <div className="l-refs">
          {caseRefs.map((r) => <RefCard key={r.url} r={r} />)}
        </div>

        <hr className="l-hr" />

        {/* ── IV ── */}
        <p className="l-sec">IV. Storytelling, Philosophy & the Language of the Work</p>
        <p className="l-body">
          Works by Snieaks draw on language, imagery, and concepts rooted in philosophical
          traditions, spiritual narratives, and alternative knowledge systems. Terms such as
          <span className="l-hl"> anahuasca</span> appear within the creative work as storytelling
          and philosophical discussion devices — in the tradition of philosophical literature
          that has long used altered states, visionary experience, and consciousness exploration
          as metaphorical and conceptual material, from William James's{" "}
          <em>The Varieties of Religious Experience</em> (1902) to Aldous Huxley's{" "}
          <em>The Doors of Perception</em> (1954) to contemporary philosophy of mind.
        </p>
        <p className="l-body">
          The artistic or philosophical use of a word is not equivalent — in any jurisdiction —
          to the conduct that word may reference. No law criminalises or restricts the literary,
          artistic, or philosophical invocation of culturally embedded language. This protection
          is affirmed by UNESCO's 2005 Convention on Cultural Diversity, EU Charter Article 13,
          ECHR Article 10, Indian Constitution Article 19(1)(a), and US First Amendment
          jurisprudence — all cited with their primary sources in Section II above.
        </p>

        <hr className="l-hr" />

        {/* ── V ── */}
        <p className="l-sec">V. No Real-World Grounding — No Court Application</p>
        <p className="l-body">
          No content produced by Snieaks carries, implies, or asserts any physical-world grounding.
          Nothing within these works constitutes a verified biographical statement, a documentary
          account, a factual record, or a representation of real-world events or conduct. These
          works exist entirely in the domain of artistic and philosophical inquiry. They cannot be
          applied as evidence of, or about, any real-world event, person, or conduct in any court
          of law in any jurisdiction.
        </p>
        <p className="l-body">
          Art that operates in the space of metaphor, philosophical exploration, consciousness,
          and experiential design does not make legal propositions about the world. It makes
          experiences. The two are categorically distinct, and that distinction is the foundation
          of artistic freedom law across every jurisdiction cited in this declaration.
        </p>

        <hr className="l-hr" />

        {/* ── VI ── */}
        <p className="l-sec">VI. Viewer Interpretation</p>
        <p className="l-body">
          All works by Snieaks are intentionally open, abstract, and interpretively unresolved.
          Snieaks makes no claim about what any work means, communicates, represents, or implies.
          All meaning — if any is found — is constructed by the viewer. All interpretations are
          the viewer's own, formed at their own discretion. Snieaks bears no responsibility for
          the conclusions, emotional responses, or personal meaning a viewer derives from
          engagement with any Snieaks work.
        </p>

        <hr className="l-hr" />

        {/* ── VII ── */}
        <p className="l-sec">VII. No Affiliation or Endorsement</p>
        <p className="l-body">
          Works by Snieaks are independently created. They carry no affiliation with, endorsement
          from, or commercial or personal relationship to any third-party individual, brand,
          label, corporation, platform, or institution — unless explicitly documented in a
          separate, signed agreement. No such relationship should be inferred from the presence
          of any reference, image, name, or concept within any Snieaks work.
        </p>

        <hr className="l-hr" />

        {/* ── VIII ── */}
        <p className="l-sec">VIII. Jurisdiction</p>
        <p className="l-body">
          This declaration applies across all jurisdictions in which Snieaks' works are accessed,
          shared, or discussed — including the European Union, the United Kingdom, the United
          States, India, and all other signatory states to the European Convention on Human Rights
          and UNESCO's Convention on Cultural Diversity. In any legal context involving these
          works, the artistic, philosophical, and non-factual nature of the work — as declared
          herein — constitutes the operative interpretive framework.
        </p>

        <p className="l-fine">
          Last updated January 2026. This declaration may be revised to reflect changes in
          Snieaks' works or applicable law. Nothing herein constitutes legal advice. All rights
          not expressly stated are reserved by Snieaks.
        </p>
      </div>

      <Footer />
    </div>
  );
}
