import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import classnames from 'classnames';

interface UrlAwareLinkProps extends LinkProps {
	activeClass: string;
}

function UrlAwareLink({ children, to, className, activeClass, ...props }: UrlAwareLinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: false });

	return (
		<Link className={classnames(className, { [activeClass]: match })} to={to} {...props}>
			{children}
		</Link>
	);
}

export { UrlAwareLink };
