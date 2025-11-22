import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, radius } from './theme';

export const globalStyles = StyleSheet.create({
  // Layouts
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  // Text
  title: {
    fontSize: fonts.size.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: fonts.size.md,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: '#fff',
    fontSize: fonts.size.md,
  },

  // Buttons (for TouchableOpacity)
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  buttonText: {
    color: '#fff',
    fontSize: fonts.size.md,
    fontWeight: '600',
  },

  // Spacing helpers
  mt: { marginTop: spacing.md },
  mb: { marginBottom: spacing.md },
  ml: { marginLeft: spacing.md },
  mr: { marginRight: spacing.md },
});
