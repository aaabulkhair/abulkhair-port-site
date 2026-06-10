import NextLink from 'next/link';

const Link = ({ href, children, className, ...props }) => (
  <NextLink href={href || ''} className={className} {...props}>
    {children}
  </NextLink>
);

export default Link;
