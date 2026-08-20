import styles from './Button.module.css';

/**
 * @param {'primary' | 'outline' | 'ghost'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {'button' | 'a'} as - render as <button> or <a>
 */
function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Button;
