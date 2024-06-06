export default function Input({
  type,
  text,
  placeholder,
  onChange,
  value,
  className,
  onFocus,
  onBlur,
}: {
  type: string;
  text: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label>{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
