import React, { useState } from 'react';
import { profile, about, researchInterests, career, awards, papers, projects, social } from '../data';
import { Github, Linkedin, Globe, Mail, X, Languages } from 'lucide-react';

export default function PortfolioPanel({ isOpen, onClose }) {
    const [lang, setLang] = useState('en');

    return (
        <>
            {/* Overlay behind panel */}
            {isOpen && <div className="portfolio-overlay" onClick={onClose} />}

            <div className={`portfolio-panel glass ${isOpen ? 'open' : ''}`}>
                {/* Close button inside panel */}
                <button className="portfolio-close-btn" onClick={onClose} aria-label="Close portfolio">
                    <X size={18} />
                </button>

                <div className="portfolio-scroll">
                    {/* Profile */}
                    <section className="portfolio-section">
                        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>{profile.name}</h1>
                        <p style={{ color: 'var(--accent-color)', fontSize: '0.95rem', marginBottom: '0.6rem' }}>{profile.title}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{profile.bio}</p>
                        <div className="portfolio-social">
                            {social.github && <a href={social.github} target="_blank" rel="noreferrer"><Github size={18} /></a>}
                            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>}
                            {social.blog && <a href={social.blog} target="_blank" rel="noreferrer"><Globe size={18} /></a>}
                            {profile.email && <a href={`mailto:${profile.email}`}><Mail size={18} /></a>}
                        </div>
                    </section>

                    {/* About */}
                    <section className="portfolio-section">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <h2>About Me</h2>
                            <button
                                onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                            >
                                <Languages size={14} /> {lang === 'en' ? '한국어' : 'English'}
                            </button>
                        </div>
                        <p style={{ color: 'var(--text-color)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            {about[lang]}
                        </p>
                    </section>

                    {/* Research Interests */}
                    <section className="portfolio-section">
                        <h2>Research Interests</h2>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {researchInterests.map(interest => (
                                <span key={interest} className="portfolio-tag" style={{ background: 'var(--accent-color)', color: 'white', border: 'none' }}>
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Career */}
                    <section className="portfolio-section">
                        <h2>Career</h2>
                        {career.map((c, i) => (
                            <div key={i} className="portfolio-item">
                                <h3>{c.role}</h3>
                                <p className="portfolio-meta">{c.company} · {c.duration}</p>
                                {c.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.description}</p>}
                            </div>
                        ))}
                    </section>

                    {/* Awards */}
                    <section className="portfolio-section">
                        <h2>Awards</h2>
                        {awards.map((a, i) => (
                            <div key={i} className="portfolio-item">
                                <h3>🏆 {a.title}</h3>
                                <p className="portfolio-meta">{a.organization} · {a.date}</p>
                                {a.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{a.description}</p>}
                            </div>
                        ))}
                    </section>

                    {/* Papers */}
                    {/* <section className="portfolio-section">
                        <h2>Publications</h2>
                        {papers.map((p, i) => (
                            <div key={i} className="portfolio-item">
                                <h3><a href={p.link}>{p.title}</a></h3>
                                <p className="portfolio-meta">{p.conference} · {p.year}</p>
                            </div>
                        ))}
                    </section> */}

                    {/* Projects */}
                    <section className="portfolio-section">
                        <h2>Projects</h2>
                        {projects.map((p, i) => (
                            <div key={i} className="portfolio-item">
                                <h3><a href={p.link}>{p.title}</a></h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{p.description}</p>
                                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                                    {p.techStack.map(t => (
                                        <span key={t} className="portfolio-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}
