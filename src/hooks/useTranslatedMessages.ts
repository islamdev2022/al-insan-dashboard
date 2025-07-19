import { useIntl } from 'react-intl';

export const useTranslatedMessages = () => {
  const intl = useIntl();

  return {
    // Common messages
    loading: intl.formatMessage({ id: 'common.loading' }),
    error: intl.formatMessage({ id: 'common.error' }),
    save: intl.formatMessage({ id: 'common.save' }),
    cancel: intl.formatMessage({ id: 'common.cancel' }),
    delete: intl.formatMessage({ id: 'common.delete' }),
    edit: intl.formatMessage({ id: 'common.edit' }),
    add: intl.formatMessage({ id: 'common.add' }),
    search: intl.formatMessage({ id: 'common.search' }),
    filter: intl.formatMessage({ id: 'common.filter' }),
    actions: intl.formatMessage({ id: 'common.actions' }),
    yes: intl.formatMessage({ id: 'common.yes' }),
    no: intl.formatMessage({ id: 'common.no' }),
    close: intl.formatMessage({ id: 'common.close' }),
    next: intl.formatMessage({ id: 'common.next' }),
    previous: intl.formatMessage({ id: 'common.previous' }),
    submit: intl.formatMessage({ id: 'common.submit' }),

    // Navigation
    home: intl.formatMessage({ id: 'navigation.home' }),
    dashboard: intl.formatMessage({ id: 'navigation.dashboard' }),
    list: intl.formatMessage({ id: 'navigation.list' }),
    user: intl.formatMessage({ id: 'navigation.user' }),
    donations: intl.formatMessage({ id: 'navigation.donations' }),
    users: intl.formatMessage({ id: 'navigation.users' }),

    // Homepage
    welcome: intl.formatMessage({ id: 'homepage.welcome' }),
    title: intl.formatMessage({ id: 'homepage.title' }),
    description: intl.formatMessage({ id: 'homepage.description' }),
    goToDashboard: intl.formatMessage({ id: 'homepage.goToDashboard' }),
    startMakingDifference: intl.formatMessage({ id: 'homepage.startMakingDifference' }),

    // Dashboard
    totalUsers: intl.formatMessage({ id: 'dashboard.stats.totalUsers' }),
    totalDonations: intl.formatMessage({ id: 'dashboard.stats.totalDonations' }),
    activeCampaigns: intl.formatMessage({ id: 'dashboard.stats.activeCampaigns' }),
    completedDonations: intl.formatMessage({ id: 'dashboard.stats.completedDonations' }),
    recentActivity: intl.formatMessage({ id: 'dashboard.recentActivity' }),
    userManagement: intl.formatMessage({ id: 'dashboard.userManagement' }),
    donationsTable: intl.formatMessage({ id: 'dashboard.donationsTable' }),

    // User
    firstName: intl.formatMessage({ id: 'user.firstName' }),
    lastName: intl.formatMessage({ id: 'user.lastName' }),
    email: intl.formatMessage({ id: 'user.email' }),
    phone: intl.formatMessage({ id: 'user.phone' }),
    language: intl.formatMessage({ id: 'user.language' }),
    createdAt: intl.formatMessage({ id: 'user.createdAt' }),
    updatedAt: intl.formatMessage({ id: 'user.updatedAt' }),
    status: intl.formatMessage({ id: 'user.status' }),
    active: intl.formatMessage({ id: 'user.active' }),
    inactive: intl.formatMessage({ id: 'user.inactive' }),
    addUser: intl.formatMessage({ id: 'user.addUser' }),
    editUser: intl.formatMessage({ id: 'user.editUser' }),
    deleteUser: intl.formatMessage({ id: 'user.deleteUser' }),
    userDetails: intl.formatMessage({ id: 'user.userDetails' }),
    confirmDelete: intl.formatMessage({ id: 'user.confirmDelete' }),

    // Donations
    trackingCode: intl.formatMessage({ id: 'donations.trackingCode' }),
    animalType: intl.formatMessage({ id: 'donations.animalType' }),
    assignedTo: intl.formatMessage({ id: 'donations.assignedTo' }),
    donorDetails: intl.formatMessage({ id: 'donations.donorDetails' }),
    pending: intl.formatMessage({ id: 'donations.pending' }),
    approved: intl.formatMessage({ id: 'donations.approved' }),
    completed: intl.formatMessage({ id: 'donations.completed' }),
    cancelled: intl.formatMessage({ id: 'donations.cancelled' }),
    donationRecord: intl.formatMessage({ id: 'donations.donationRecord' }),
    noDonationsFound: intl.formatMessage({ id: 'donations.noDonationsFound' }),

    // Auth
    login: intl.formatMessage({ id: 'auth.login' }),
    logout: intl.formatMessage({ id: 'auth.logout' }),
    password: intl.formatMessage({ id: 'auth.password' }),
    loginButton: intl.formatMessage({ id: 'auth.loginButton' }),
    loginError: intl.formatMessage({ id: 'auth.loginError' }),
    logoutConfirm: intl.formatMessage({ id: 'auth.logoutConfirm' }),

    // Notifications
    notificationsTitle: intl.formatMessage({ id: 'notifications.title' }),
    noNotifications: intl.formatMessage({ id: 'notifications.noNotifications' }),
    markAsRead: intl.formatMessage({ id: 'notifications.markAsRead' }),

    // Raw intl object for custom messages
    intl,
  };
};
