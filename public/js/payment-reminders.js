/**
 * Automated Payment Reminder System
 * Checks rent due dates and sends email reminders
 */

// EmailJS configuration
// To set up EmailJS, visit emailjs-setup.html or follow EMAILJS_SETUP.md
// You can also load from localStorage if configured via the setup page
let EMAILJS_SERVICE_ID = 'service_byzmfbn';
let EMAILJS_TEMPLATE_ID = 'template_tb8069k';
let EMAILJS_PUBLIC_KEY = 'S28nx8TWnsKEpl8vV';

// Try to load from localStorage (if configured via setup page) - will override above if exists
try {
    const savedConfig = localStorage.getItem('emailjs_config');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        EMAILJS_SERVICE_ID = config.serviceId || EMAILJS_SERVICE_ID;
        EMAILJS_TEMPLATE_ID = config.templateId || EMAILJS_TEMPLATE_ID;
        EMAILJS_PUBLIC_KEY = config.publicKey || EMAILJS_PUBLIC_KEY;
    }
} catch (e) {
    console.warn('Could not load EmailJS config from localStorage:', e);
}

// Reminder settings (days before due date)
const REMINDER_DAYS = [7, 3, 1, 0]; // Remind 7 days, 3 days, 1 day before, and on due date

/**
 * Check if reminder should be sent for a given due date
 */
function shouldSendReminder(dueDate, reminderDays) {
    if (!dueDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    if (due < today) return false; // Already past due
    
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    // reminderDays can be a single number or an array
    if (Array.isArray(reminderDays)) {
        return reminderDays.includes(daysUntilDue);
    } else {
        // If it's a single number, check if it matches
        return reminderDays === daysUntilDue;
    }
}

/**
 * Check if reminder was already sent for this due date and day
 */
function wasReminderSent(reminderHistory, reminderKey) {
    if (!reminderHistory) return false;
    
    // Check if reminder exists and was sent
    const reminder = reminderHistory[reminderKey];
    return reminder && reminder.sent === true;
}

/**
 * Mark reminder as sent
 */
function markReminderSent(database, userId, reminderKey, daysBefore) {
    const reminderRef = database.ref(`tenants/${userId}/reminderHistory/${reminderKey}`);
    return reminderRef.set({
        sent: true,
        sentDate: new Date().toISOString(),
        daysBefore: daysBefore
    });
}

/**
 * Send email reminder using EmailJS
 */
function sendEmailReminder(tenantEmail, tenantName, amount, dueDate, daysUntilDue) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded. Please include EmailJS script.');
        return Promise.reject('EmailJS not available');
    }
    
    // Determine message based on days until due
    let urgency = '';
    let message = '';
    
    if (daysUntilDue === 0) {
        urgency = 'URGENT';
        message = `Your rent payment of Ksh ${amount.toLocaleString()} is due TODAY. Please make payment immediately.`;
    } else if (daysUntilDue === 1) {
        urgency = 'HIGH';
        message = `Your rent payment of Ksh ${amount.toLocaleString()} is due TOMORROW. Please ensure payment is made on time.`;
    } else if (daysUntilDue === 3) {
        urgency = 'MEDIUM';
        message = `Reminder: Your rent payment of Ksh ${amount.toLocaleString()} is due in 3 days (${formatDate(dueDate)}).`;
    } else if (daysUntilDue === 7) {
        urgency = 'LOW';
        message = `Friendly reminder: Your rent payment of Ksh ${amount.toLocaleString()} is due in 7 days (${formatDate(dueDate)}).`;
    }
    
    // Ensure EmailJS is initialized
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (initError) {
            console.warn('EmailJS init error:', initError);
        }
    }
    
    const templateParams = {
        to_email: tenantEmail,
        to_name: tenantName,
        from_name: 'Mweshpra Apartments',
        message: message,
        subject: `Rent Payment Reminder - ${urgency}`,
        // Additional variables that might be in the template
        amount: amount.toLocaleString(),
        due_date: formatDate(dueDate),
        days_until: String(daysUntilDue),
        urgency: urgency
    };
    
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Check and send payment reminders for a tenant
 */
function checkAndSendReminders(database, auth, tenantId, tenantData) {
    return new Promise((resolve, reject) => {
        if (!tenantData || !tenantData.finance) {
            resolve({ sent: 0, skipped: 0 });
            return;
        }
        
        const finance = tenantData.finance;
        const info = tenantData.info || {};
        const rentDue = parseFloat(finance.rentDue) || 0;
        const rentDueDate = finance.rentDueDate;
        const waterBill = parseFloat(finance.waterBill) || 0;
        const waterBillDate = finance.waterBillDate;
        
        // Get user's reminder preferences
        const reminderSettings = tenantData.reminderSettings || {
            days7: true,
            days3: true,
            days1: true,
            days0: true
        };
        
        // Filter reminder days based on user preferences
        const activeReminderDays = REMINDER_DAYS.filter(days => {
            if (days === 7) return reminderSettings.days7 !== false;
            if (days === 3) return reminderSettings.days3 !== false;
            if (days === 1) return reminderSettings.days1 !== false;
            if (days === 0) return reminderSettings.days0 !== false;
            return true;
        });
        
        let remindersSent = 0;
        let remindersSkipped = 0;
        const reminderPromises = [];
        
        // Get reminder history
        const reminderHistoryRef = database.ref(`tenants/${tenantId}/reminderHistory`);
        reminderHistoryRef.once('value', (snapshot) => {
            const reminderHistory = snapshot.val() || {};
            
            // Check rent due reminders
            if (rentDue > 0 && rentDueDate) {
                activeReminderDays.forEach(daysBefore => {
                    if (shouldSendReminder(rentDueDate, daysBefore)) {
                        const reminderKey = `rent_${rentDueDate}_${daysBefore}`;
                        
                        if (!wasReminderSent(reminderHistory, reminderKey)) {
                            const daysUntilDue = daysBefore;
                            
                            // Send email reminder
                            const emailPromise = sendEmailReminder(
                                info.email,
                                info.fullName || 'Tenant',
                                rentDue,
                                rentDueDate,
                                daysUntilDue
                            ).then(() => {
                                // Mark as sent
                                return markReminderSent(database, tenantId, reminderKey, daysBefore);
                            }).then(() => {
                                remindersSent++;
                                console.log(`Rent reminder sent: ${daysBefore} days before due date`);
                            }).catch((error) => {
                                console.error('Error sending rent reminder:', error);
                                remindersSkipped++;
                            });
                            
                            reminderPromises.push(emailPromise);
                        } else {
                            remindersSkipped++;
                            console.log(`Rent reminder already sent: ${daysBefore} days before`);
                        }
                    }
                });
            }
            
            // Check water bill reminders
            if (waterBill > 0 && waterBillDate) {
                activeReminderDays.forEach(daysBefore => {
                    if (shouldSendReminder(waterBillDate, daysBefore)) {
                        const reminderKey = `water_${waterBillDate}_${daysBefore}`;
                        
                        if (!wasReminderSent(reminderHistory, reminderKey)) {
                            const daysUntilDue = daysBefore;
                            
                            // Send email reminder
                            const emailPromise = sendEmailReminder(
                                info.email,
                                info.fullName || 'Tenant',
                                waterBill,
                                waterBillDate,
                                daysUntilDue
                            ).then(() => {
                                // Mark as sent
                                return markReminderSent(database, tenantId, reminderKey, daysBefore);
                            }).then(() => {
                                remindersSent++;
                                console.log(`Water bill reminder sent: ${daysBefore} days before due date`);
                            }).catch((error) => {
                                console.error('Error sending water bill reminder:', error);
                                remindersSkipped++;
                            });
                            
                            reminderPromises.push(emailPromise);
                        } else {
                            remindersSkipped++;
                            console.log(`Water bill reminder already sent: ${daysBefore} days before`);
                        }
                    }
                });
            }
            
            // Wait for all reminders to complete
            Promise.all(reminderPromises).then(() => {
                resolve({ sent: remindersSent, skipped: remindersSkipped });
            }).catch((error) => {
                console.error('Error processing reminders:', error);
                resolve({ sent: remindersSent, skipped: remindersSkipped });
            });
        }).catch((error) => {
            console.error('Error loading reminder history:', error);
            reject(error);
        });
    });
}

/**
 * Initialize payment reminders (call this when portal loads)
 */
function initializePaymentReminders() {
    // Initialize EmailJS if not already initialized
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('EmailJS initialized');
        } catch (error) {
            console.warn('EmailJS initialization error:', error);
        }
    }
    
    const auth = window.auth || (window.firebase ? window.firebase.auth() : null);
    const database = window.database || (window.firebase ? window.firebase.database() : null);
    
    if (!auth || !database) {
        console.warn('Firebase not available for payment reminders');
        return;
    }
    
    const user = auth.currentUser;
    if (!user) {
        // Wait for auth
        auth.onAuthStateChanged((u) => {
            if (u) {
                initializePaymentReminders();
            }
        });
        return;
    }
    
    // Load tenant data and check reminders
    const tenantRef = database.ref('tenants/' + user.uid);
    tenantRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            const tenantData = snapshot.val();
            console.log('Checking payment reminders for tenant:', user.uid);
            
            checkAndSendReminders(database, auth, user.uid, tenantData)
                .then((result) => {
                    console.log(`Reminders processed: ${result.sent} sent, ${result.skipped} skipped`);
                    
                    // Show notification if reminders were sent
                    if (result.sent > 0) {
                        showReminderNotification(result.sent);
                    }
                })
                .catch((error) => {
                    console.error('Error checking reminders:', error);
                });
        }
    });
}

/**
 * Show in-app notification about reminders sent
 */
function showReminderNotification(count) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fa-solid fa-envelope"></i> 
        Payment reminder${count > 1 ? 's' : ''} sent to your email
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS animations
if (!document.getElementById('reminder-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'reminder-notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Make functions globally available
window.checkAndSendReminders = checkAndSendReminders;
window.initializePaymentReminders = initializePaymentReminders;

