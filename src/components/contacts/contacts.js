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
    const form = useRef();

    const handleClose = () => setOpen(false);

    const handleContactForm = (e) => {
        e.preventDefault();
        if (sending) return;

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

        setSending(true);
        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
            .then(() => {
                setSuccess(true);
                setErrMsg('');
                setName('');
                setEmail('');
                setMessage('');
                setOpen(false);
            }, (error) => {
                console.log(error.text);
                setErrMsg('Something went wrong — please email me directly.');
                setOpen(true);
            })
            .finally(() => setSending(false));
    };

    return (
        <section className="border-b border-rule py-16" id="contacts">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">09 / Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-light tracking-tight mb-4">
                            Let&apos;s work <strong className="font-bold">together</strong>
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
                                <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Name</label>
                                <input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} type="text" name="user_name" aria-invalid={!!fieldErrors.name} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors" />
                                {fieldErrors.name && <p className="text-[0.7rem] text-primary mt-1">{fieldErrors.name}</p>}
                            </div>
                            <div>
                                <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Email</label>
                                <input placeholder="john@doe.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="user_email" aria-invalid={!!fieldErrors.email} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors" />
                                {fieldErrors.email && <p className="text-[0.7rem] text-primary mt-1">{fieldErrors.email}</p>}
                            </div>
                            <div>
                                <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Message</label>
                                <textarea placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={5} aria-invalid={!!fieldErrors.message} className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors resize-none" />
                                {fieldErrors.message && <p className="text-[0.7rem] text-primary mt-1">{fieldErrors.message}</p>}
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
