    // --- FORCED AUTO-REFRESH SYSTEM ---
    let currentSiteVersion = null;

    async function checkForUpdates() {
        try {
            // The '?t=' + time prevents the browser from caching the old version
            const response = await fetch('version.json?t=' + new Date().getTime());
            const data = await response.json();
            
            if (currentSiteVersion === null) {
                // First load: just remember the current version
                currentSiteVersion = data.version;
                console.log("Current site version is: " + currentSiteVersion);
            } else if (currentSiteVersion !== data.version) {
                // Version changed! Force a reload from the server
                console.log("New version detected! Refreshing page...");
                window.location.reload(true); 
            }
        } catch (error) {
            // Ignore errors (e.g., if their school wifi temporarily blocks the fetch)
            console.warn("Update check failed, skipping this cycle.");
        }
    }

    // Check immediately on load...
    checkForUpdates();
    
    // ...and then check again every 30 seconds (30000 milliseconds)
    setInterval(checkForUpdates, 30000);
