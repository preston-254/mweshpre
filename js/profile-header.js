// Profile Header Script - Load on all pages
// This script adds profile picture and tenant info to the header

(function() {
    // Firebase config (should match your Firebase project)
    const firebaseConfig = {
        apiKey: "AIzaSyCk7rNj_35-C8zrQB0O2S4c9CORNIsqlxQ",
        authDomain: "mweshpra-apartments.firebaseapp.com",
        databaseURL: "https://mweshpra-apartments-default-rtdb.firebaseio.com/",
        projectId: "mweshpra-apartments",
        storageBucket: "mweshpra-apartments.firebasestorage.app",
        messagingSenderId: "8486695233",
        appId: "1:8486695233:web:fa68793732171d5bfb71c0",
        measurementId: "G-1FM5TXCL1C"
    };

    // Initialize Firebase if not already initialized
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();
    const database = firebase.database();

    // Update header profile
    function updateHeaderProfile(info) {
        const profileHeader = document.getElementById('profile-header');
        const headerName = document.getElementById('header-tenant-name');
        const headerEmail = document.getElementById('header-tenant-email');
        const headerPicture = document.getElementById('header-profile-picture');
        
        if (profileHeader && headerName && headerEmail) {
            headerName.textContent = info.fullName || 'Tenant';
            headerEmail.textContent = info.email || '';
            if (info.profilePicture && headerPicture) {
                headerPicture.src = info.profilePicture;
            }
            profileHeader.style.display = 'block';
        }
    }

    // Check authentication and load profile
    auth.onAuthStateChanged(user => {
        if (user) {
            // Check if user is admin (skip profile for admin)
            const adminEmail = "preston.mwendwa@riarauniversity.ac.ke";
            if (user.email && user.email.toLowerCase() === adminEmail.toLowerCase()) {
                return; // Don't show profile for admin
            }

            // Check if user exists in tenants database
            const tenantRef = database.ref('tenants/' + user.uid);
            tenantRef.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    const tenantData = snapshot.val();
                    if (tenantData && tenantData.info) {
                        updateHeaderProfile(tenantData.info);
                    }
                }
            }).catch((error) => {
                console.error('Error loading tenant profile:', error);
            });
        } else {
            // Hide profile when logged out
            const profileHeader = document.getElementById('profile-header');
            if (profileHeader) {
                profileHeader.style.display = 'none';
            }
        }
    });

    // Make function globally accessible
    window.updateHeaderProfile = updateHeaderProfile;
})();

