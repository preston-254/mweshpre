/**
 * General Notifications System
 * Handles in-app notifications for tenants
 */

/**
 * Create a notification
 */
function createNotification(database, tenantId, notification) {
    const notificationRef = database.ref(`notifications/${tenantId}`);
    const newNotificationRef = notificationRef.push();
    
    const notificationData = {
        id: newNotificationRef.key,
        type: notification.type || 'info', // 'info', 'success', 'warning', 'error', 'announcement', 'maintenance', 'payment'
        title: notification.title,
        message: notification.message,
        read: false,
        timestamp: new Date().toISOString(),
        link: notification.link || null, // Optional link to navigate to
        actionData: notification.actionData || null // Optional data for actions
    };
    
    return newNotificationRef.set(notificationData);
}

/**
 * Mark notification as read
 */
function markNotificationAsRead(database, tenantId, notificationId) {
    return database.ref(`notifications/${tenantId}/${notificationId}/read`).set(true);
}

/**
 * Mark all notifications as read
 */
function markAllNotificationsAsRead(database, tenantId) {
    const notificationsRef = database.ref(`notifications/${tenantId}`);
    return notificationsRef.once('value').then((snapshot) => {
        const updates = {};
        snapshot.forEach((childSnapshot) => {
            updates[`notifications/${tenantId}/${childSnapshot.key}/read`] = true;
        });
        return database.ref().update(updates);
    });
}

/**
 * Delete a notification
 */
function deleteNotification(database, tenantId, notificationId) {
    return database.ref(`notifications/${tenantId}/${notificationId}`).remove();
}

/**
 * Get unread notification count
 */
function getUnreadCount(database, tenantId) {
    return new Promise((resolve) => {
        const notificationsRef = database.ref(`notifications/${tenantId}`);
        notificationsRef.once('value', (snapshot) => {
            let count = 0;
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const notification = childSnapshot.val();
                    if (!notification.read) {
                        count++;
                    }
                });
            }
            resolve(count);
        });
    });
}

/**
 * Load notifications for a tenant
 */
function loadNotifications(database, tenantId, callback) {
    const notificationsRef = database.ref(`notifications/${tenantId}`);
    
    // Listen for real-time updates
    notificationsRef.orderByChild('timestamp').limitToLast(50).on('value', (snapshot) => {
        const notifications = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const notification = childSnapshot.val();
                notifications.push({
                    id: childSnapshot.key,
                    ...notification
                });
            });
        }
        // Sort by timestamp (newest first)
        notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        callback(notifications);
    });
    
    // Return unsubscribe function
    return () => notificationsRef.off('value');
}

/**
 * Get notification icon based on type
 */
function getNotificationIcon(type) {
    const icons = {
        'info': 'fa-solid fa-circle-info',
        'success': 'fa-solid fa-circle-check',
        'warning': 'fa-solid fa-triangle-exclamation',
        'error': 'fa-solid fa-circle-xmark',
        'announcement': 'fa-solid fa-bullhorn',
        'maintenance': 'fa-solid fa-tools',
        'payment': 'fa-solid fa-money-bill',
        'visitor': 'fa-solid fa-id-badge',
        'default': 'fa-solid fa-bell'
    };
    return icons[type] || icons.default;
}

/**
 * Get notification color based on type
 */
function getNotificationColor(type) {
    const colors = {
        'info': '#17a2b8',
        'success': '#28a745',
        'warning': '#ffc107',
        'error': '#dc3545',
        'announcement': '#667eea',
        'maintenance': '#fd7e14',
        'payment': '#20c997',
        'visitor': '#6f42c1',
        'default': '#6c757d'
    };
    return colors[type] || colors.default;
}

/**
 * Format notification timestamp
 */
function formatNotificationTime(timestamp) {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return time.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Initialize notification system
 */
function initializeNotifications() {
    const auth = window.auth || (window.firebase ? window.firebase.auth() : null);
    const database = window.database || (window.firebase ? window.firebase.database() : null);
    
    if (!auth || !database) {
        console.warn('Firebase not available for notifications');
        return null;
    }
    
    const user = auth.currentUser;
    if (!user) {
        auth.onAuthStateChanged((u) => {
            if (u) initializeNotifications();
        });
        return null;
    }
    
    // Update notification badge
    updateNotificationBadge(database, user.uid);
    
    // Set up real-time listener for badge updates
    const notificationsRef = database.ref(`notifications/${user.uid}`);
    notificationsRef.on('value', () => {
        updateNotificationBadge(database, user.uid);
    });
    
    return () => notificationsRef.off('value');
}

/**
 * Update notification badge count
 */
function updateNotificationBadge(database, tenantId) {
    getUnreadCount(database, tenantId).then((count) => {
        const badge = document.getElementById('notification-badge');
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    });
}

// Make functions globally available
window.createNotification = createNotification;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.deleteNotification = deleteNotification;
window.getUnreadCount = getUnreadCount;
window.loadNotifications = loadNotifications;
window.getNotificationIcon = getNotificationIcon;
window.getNotificationColor = getNotificationColor;
window.formatNotificationTime = formatNotificationTime;
window.initializeNotifications = initializeNotifications;
window.updateNotificationBadge = updateNotificationBadge;

