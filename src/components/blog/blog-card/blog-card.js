import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import Reveal from '../../ui/reveal';
import { timeConverter } from '../../../utils/time-converter';

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
                    <div className="w-full h-full flex items-center justify-center text-3xl font-serif italic text-primary/20" aria-hidden="true">
                        Aa
                    </div>
                )}
            </div>
            <div className="p-4">
                {date && <p className="text-[0.6rem] uppercase tracking-[2px] text-text-muted mb-1">{timeConverter(date)}</p>}
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
