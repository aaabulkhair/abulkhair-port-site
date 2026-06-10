import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import Link from '../link';
import SingleBlog from './blog-card/blog-card';

function Blog({ blogs }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            {blogs.length > 0 && (
                <section
                    className="border-b border-rule py-16"
                    id="blog"
                    style={{ backgroundColor: theme.secondary }}
                >
                    <div className="max-w-page mx-auto px-6 md:px-12">
                        <p className="section-label">08 / Blog</p>
                        <h2 className="text-3xl font-light tracking-tight mb-2">
                            Notes from <strong className="font-bold">the field</strong>
                        </h2>
                        <p className="text-sm text-text-secondary mb-8">
                            Technical writing on machine learning, LLMs, and forecasting.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {blogs.slice(0, 3).map(blog => (
                                <SingleBlog
                                    title={blog.title}
                                    desc={blog.description}
                                    date={blog.published_at}
                                    image={blog.cover_image}
                                    url={blog.url}
                                    internal={blog.internal}
                                    key={blog.id}
                                />
                            ))}
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/blog"
                                className="text-[0.7rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors"
                            >
                                View All Articles &rarr;
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Blog;
