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
                        <div className="flex items-center gap-3 mb-8">
                            <img
                                src="/images/medium-logo.webp"
                                alt="Medium logo"
                                className="w-8 h-8 rounded-full"
                            />
                            <div>
                                <h3 className="text-base font-semibold text-text-primary">Medium</h3>
                                <p className="text-[0.75rem] text-text-secondary">Technical Content &amp; Insights</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {blogs.slice(0, 3).reverse().map(blog => (
                                <SingleBlog
                                    theme={theme}
                                    title={blog.title}
                                    desc={blog.description}
                                    date={blog.published_at}
                                    image={blog.cover_image}
                                    url={blog.canonical_url}
                                    key={blog.id}
                                    id={blog.id}
                                />
                            ))}
                        </div>

                        {blogs.length > 3 && (
                            <div className="mt-6">
                                <Link href="/blog">
                                    <span className="text-[0.7rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors cursor-pointer">
                                        View All Articles &rarr;
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default Blog;
