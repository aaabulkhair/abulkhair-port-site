import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import Reveal from '../../ui/reveal';
import { formatDate } from '../../../utils/time-converter';

function CardBody({ title, desc, date, image }) {
    return (
        <>
            <div className="relative aspect-video overflow-hidden bg-bg">
                {image ? (
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                    />
                ) : (
                    // Intentional monogram tile for posts without a cover image
                    <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/[0.07] via-bg to-bg"
                        aria-hidden="true"
                    >
                        <span className="text-4xl font-serif italic text-primary/40 leading-none">Aa</span>
                        <span className="text-[0.55rem] uppercase tracking-[3px] text-text-muted">abulkhair.ai</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                {date && <p className="text-[0.6rem] uppercase tracking-[2px] text-text-muted mb-1">{formatDate(date)}</p>}
                <h3 className="text-[0.8rem] font-medium text-text-primary leading-snug">{title}</h3>
                {desc && <p className="text-[0.7rem] text-text-secondary leading-relaxed mt-1 line-clamp-2">{desc}</p>}
            </div>
        </>
    );
}

function SingleBlog({ title, desc, date, image, url, internal }) {
    const cardClass =
        'block bg-bg-surface rounded overflow-hidden border border-rule hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200';

    return (
        <Reveal>
            {internal ? (
                <NextLink href={url} className={cardClass}>
                    <CardBody title={title} desc={desc} date={date} image={image} />
                </NextLink>
            ) : (
                <a href={url} target="_blank" rel="noreferrer" className={cardClass}>
                    <CardBody title={title} desc={desc} date={date} image={image} />
                </a>
            )}
        </Reveal>
    );
}

export default SingleBlog;
