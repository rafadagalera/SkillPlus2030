import { StyleSheet, Platform } from 'react-native';

// Modern Theme constants
export const colors = {
  primary: '#2563EB', // Modern blue
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',
  secondary: '#8B5CF6', // Purple accent
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const fonts = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: colors.shadowDark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
};

// Unified Stylesheet
export const stylesheet = StyleSheet.create({
  // Layouts
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContainer: {
    padding: spacing.lg,
    flexGrow: 1,
    backgroundColor: colors.backgroundSecondary,
  },

  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardElevated: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  trailCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  trailCardImage: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    marginRight: spacing.md,
    backgroundColor: colors.backgroundSecondary,
  },
  trailCardContent: {
    flex: 1,
    justifyContent: 'center',
  },

  // Text
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.bold,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    letterSpacing: -0.5,
  },
  titleLarge: {
    fontSize: fonts.size.xxl,
    fontFamily: fonts.bold,
    fontWeight: '700',
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  text: {
    fontSize: fonts.size.md,
    fontFamily: fonts.regular,
    color: colors.text,
    lineHeight: 24,
  },
  textBold: {
    fontSize: fonts.size.md,
    fontFamily: fonts.bold,
    fontWeight: '600',
    color: colors.text,
  },
  textLight: {
    fontSize: fonts.size.md,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  linkText: {
    color: colors.primary,
    fontSize: fonts.size.sm,
    fontFamily: fonts.medium,
    fontWeight: '600',
  },
  metaText: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: fonts.size.sm,
    fontFamily: fonts.regular,
    lineHeight: 18,
  },
  caption: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.regular,
    color: colors.textLight,
    lineHeight: 16,
  },

  // Inputs
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.regular,
    color: colors.text,
    ...shadows.sm,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  label: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.medium,
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    color: colors.text,
    letterSpacing: 0.3,
  },

  // Buttons
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
    opacity: 0.9,
  },
  buttonText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.bold,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonSecondary: {
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  buttonSecondaryText: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  buttonDangerText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  link: {
    marginTop: spacing.sm,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  linkButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  // Badge/Pill styles
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  badgePrimary: {
    backgroundColor: colors.infoLight,
  },
  badgeSuccess: {
    backgroundColor: colors.successLight,
  },
  badgeWarning: {
    backgroundColor: colors.warningLight,
  },
  badgeDanger: {
    backgroundColor: colors.dangerLight,
  },
  badgeText: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: colors.text,
  },

  // Progress bar
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: radius.full,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },

  // Row layouts
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Auth screens
  authContainer: {
    width: '100%',
    maxWidth: 400,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  authSubtitle: {
    textAlign: 'center',
  },
  linkBold: {
    fontWeight: '700',
  },

  // Trails screen
  trailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleButton: {
    padding: spacing.sm,
  },
  recommendationCard: {
    backgroundColor: colors.successLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    marginBottom: spacing.lg,
  },

  // Profile screen
  assessmentCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  assessmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assessmentInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  ratingBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    minWidth: 64,
    alignItems: 'center',
    ...shadows.sm,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: fonts.size.lg,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  // Progress screen
  pointsCard: {
    backgroundColor: colors.infoLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  pointsIcon: {
    fontSize: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerSuccess: {
    backgroundColor: colors.successLight,
  },
  iconContainerInfo: {
    backgroundColor: colors.infoLight,
  },
  iconContainerWarning: {
    backgroundColor: colors.warningLight,
  },
  iconEmoji: {
    fontSize: 20,
  },
  statsValue: {
    color: colors.success,
    fontSize: fonts.size.lg,
  },
  statsValuePrimary: {
    color: colors.primary,
    fontSize: fonts.size.lg,
  },
  statsValueSecondary: {
    color: colors.secondary,
    fontSize: fonts.size.lg,
  },
  emptyBadgesContainer: {
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  emptyBadgesIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  badgeCard: {
    backgroundColor: colors.warningLight,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    minWidth: 110,
    flex: 1,
    maxWidth: '48%',
    ...shadows.sm,
  },
  badgeEmoji: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // Trail details
  trailMetaRow: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  trailMetaItem: {
    marginRight: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  lessonIconCompleted: {
    backgroundColor: colors.success,
  },
  lessonIconLocked: {
    backgroundColor: colors.borderLight,
  },
  lessonIconDefault: {
    backgroundColor: colors.infoLight,
  },
  lessonEmoji: {
    fontSize: 24,
  },
  lessonContent: {
    flex: 1,
  },
  lessonCompleted: {
    backgroundColor: colors.successLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  lessonLocked: {
    opacity: 0.6,
  },
  completionCard: {
    backgroundColor: colors.warningLight,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  completionText: {
    textAlign: 'center',
    fontSize: fonts.size.lg,
  },

  // Settings screen
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsChevron: {
    fontSize: 20,
  },

  // Assessment screen
  lastAssessmentCard: {
    backgroundColor: colors.infoLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: 24,
  },
  subtitleCentered: {
    marginBottom: 24,
    textAlign: 'center',
  },
  titleMarginBottom: {
    marginBottom: 8,
  },
  captionMarginTop: {
    marginTop: 2,
  },

  // Spacing helpers
  spacingXS: { marginTop: spacing.xs },
  spacingSM: { marginTop: spacing.sm },
  spacingMD: { marginTop: spacing.md },
  spacingLG: { marginTop: spacing.lg },
  spacingXL: { marginTop: spacing.xl },
  marginBottom: { marginBottom: spacing.md },
  marginTop: { marginTop: spacing.md },
  marginLeft: { marginLeft: spacing.md },
  marginRight: { marginRight: spacing.md },
  paddingHorizontal: { paddingHorizontal: spacing.md },
  paddingVertical: { paddingVertical: spacing.md },
});

