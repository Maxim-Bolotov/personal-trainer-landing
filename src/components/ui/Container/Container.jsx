import styles from './Container.module.css';

/**
 * Constrains content to the design's max width and applies
 * consistent horizontal padding across all sections.
 */
function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  const classes = [styles.container, className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
