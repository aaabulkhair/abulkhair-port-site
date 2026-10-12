import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaMediumM } from 'react-icons/fa';
import Toast from '../ui/toast';
import isEmail from 'validator/lib/isEmail';
import { contactsData } from '../../data/contacts-data';
import { socialsData } from '../../data/socials-data';

function Contacts() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [honeypot, setHoneypot] = useState('');
    const form = useRef();

    const emailjsConfig = {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    };

    const handleClose = () => setOpen(false);

    const handleContactForm = (e) => {
        e.preventDefault();
        if (sending) return;

        // Bots fill every field, including the hidden one; pretend it worked.
        if (honeypot) {
            setSuccess(true);
            return;
        }

        const errors = {};
        if (!name) errors.name = 'Please enter your name';
        if (!email) errors.email = 'Please enter your email';
        else if (!isEmail(email)) errors.email = 'Please enter a valid email';
        if (!message) errors.message = 'Please enter a message';
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            setErrMsg('Please fill in all the fields');
            setOpen(true);
            return;
        }

        if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
            setErrMsg(`The contact form isn't configured yet — please email ${contactsData.email} directly.`);
            setOpen(true);
            return;
        }

        setSending(true);
        emailjs.sendForm(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            form.current,
            emailjsConfig.publicKey)
            .then(() => {
                setSuccess(true);
                setErrMsg('');
                setName('');
                setEmail('');
                setMessage('');
                setOpen(false);
            }, () => {
                setErrMsg('Something went wrong — please email me directly.');
                setOpen(true);
            })
            .finally(() => setSending(false));
    };

    return (
        <section className="border-b border-rule py-24" id="contacts">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">09 / Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="display-section font-light mb-4">
                            Let&apos;s work <strong className="font-serif italic font-medium text-primary">together</strong>
                        </h2>
                        <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-6">
                            Whether you need a consultation, project development, or just want to connect — I&apos;m here to help.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a href={`mailto:${contactsData.email}`} className="text-[0.8rem] text-primary hover:text-primary/80 transition-colors">
                                {contactsData.email}
                            </a>
                            <span className="text-[0.8rem] text-text-secondary">{contactsData.address}</span>
                            <a href={contactsData.topmate} target="_blank" rel="noreferrer" className="text-[0.8rem] text-primary hover:text-primary/80 transition-colors">
                                topmate.io/abulkhair
                            </a>
                        </div>
                        <div className="flex gap-3 mt-6">
                            {socialsData.linkedIn && (
                                <a href={socialsData.linkedIn} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="LinkedIn">
                                    <FaLinkedinIn size={14} />
                                </a>
                            )}
                            {socialsData.github && (
                                <a href={socialsData.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="GitHub">
                                    <FaGithub size={14} />
                                </a>
                            )}
                            {socialsData.medium && (
                                <a href={socialsData.medium} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="Medium">
                                    <FaMediumM size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                    <div>
                        <form ref={form} onSubmit={handleContactForm} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="contact-name" className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Name</label>
                                <input id="contact-name" autoComplete="name" aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} type="text" name="user_name" aria-invalid={!!fieldErrors.name} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors" />
                                {fieldErrors.name && <p id="contact-name-error" className="text-[0.7rem] text-primary mt-1">{fieldErrors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Email</label>
                                <input id="contact-email" autoComplete="email" aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined} placeholder="john@doe.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="user_email" aria-invalid={!!fieldErrors.email} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors" />
                                {fieldErrors.email && <p id="contact-email-error" className="text-[0.7rem] text-primary mt-1">{fieldErrors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Message</label>
                                <textarea id="contact-message" aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined} placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={5} aria-invalid={!!fieldErrors.message} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors resize-none" />
                                {fieldErrors.message && <p id="contact-message-error" className="text-[0.7rem] text-primary mt-1">{fieldErrors.message}</p>}
                            </div>
                            {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
                            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                                <label htmlFor="contact-website">Website</label>
                                <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                            </div>
                            <button type="submit" disabled={sending} className="self-start px-6 py-2.5 bg-primary text-bg rounded text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait">
                                {sending ? 'Sending…' : !success ? 'Send' : 'Sent'}
                                {success && !sending && <FiCheck aria-hidden="true" />}
                            </button>
                        </form>
                        <Toast open={open} message={errMsg} onClose={handleClose} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;
