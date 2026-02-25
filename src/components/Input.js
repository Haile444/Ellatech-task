import { TextInput, Platform } from 'react-native';

// simple wrapper to apply consistent styling to text inputs
export const Input = ({ style, error = false, ...props }) => {
  const webFallback = Platform.OS === 'web' ? {
    borderWidth: 1,
    borderColor: error ? '#dc2626' : '#e2e8f0',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    color: '#0f172a'
  } : {};

  const classNames = error
    ? 'border border-red-600 p-4 rounded-xl mb-4 bg-white shadow-sm text-slate-900'
    : 'border border-slate-200 p-4 rounded-xl mb-4 bg-white shadow-sm text-slate-900';

  return (
    <TextInput 
      className={classNames}
      placeholderTextColor="#94a3b8"
      style={[webFallback, style]}
      {...props}
    />
  );
};