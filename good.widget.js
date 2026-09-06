// good.widget.js - Détection des paramètres de sécurité + widget visuel
(function() {
    'use strict';

    // --- 1. Configuration du widget ---
    const WIDGET_CONFIG = {
        position: 'bottom-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        autoShow: true,           // Afficher automatiquement ?
        showDetailsOnHover: true, // Afficher les détails au survol ?
        closeButton: true,        // Bouton pour fermer le widget ?
        animation: true           // Animation d'apparition ?
    };

    // --- 2. Styles CSS pour le widget ---
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .goodwidget-container {
                position: fixed;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.5; /* ✅ Augmenté pour un meilleur centrage */
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                padding: 10px 14px; /* ✅ Réduit légèrement pour éviter l'effet "trop large" */
                color: white;
                cursor: default;
                transition: all 0.3s ease;
                max-width: 220px; /* ✅ Largeur maximale fixée */
                min-height: 50px; /* ✅ Hauteur minimale pour éviter le compactage */
                box-sizing: border-box; /* ✅ Inclut padding et border dans la largeur */
                display: flex;
                flex-direction: column;
                justify-content: center; /* ✅ Centrage vertical */
                ${WIDGET_CONFIG.animation ? 'opacity: 0; transform: translateY(20px);' : ''}
            }

            .goodwidget-container.visible {
                ${WIDGET_CONFIG.animation ? 'opacity: 1; transform: translateY(0);' : ''}
            }

            .goodwidget-container.score-high {
                background: #28a745; /* Vert */
            }

            .goodwidget-container.score-medium {
                background: #ffc107; /* Orange */
            }

            .goodwidget-container.score-low {
                background: #dc3545; /* Rouge */
                animation: pulse 1.5s infinite;
            }

            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
                100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
            }

            .goodwidget-header {
                display: flex;
                justify-content: space-between;
                align-items: center; /* ✅ Centrage vertical pour l'en-tête */
                width: 100%;
                margin: 0; /* ✅ Supprime les marges inutiles */
            }

            .goodwidget-title {
                font-weight: 600;
                font-size: 15px;
                margin: 0;
                line-height: 1.5; /* ✅ Aligné avec le conteneur */
            }

            .goodwidget-score {
                font-weight: 700;
                font-size: 18px;
                margin: 0;
                line-height: 1.5; /* ✅ Aligné avec le conteneur */
            }

            .goodwidget-details {
                display: none;
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                font-size: 13px;
                width: 100%;
            }

            .goodwidget-container:hover .goodwidget-details {
                display: block;
            }

            .goodwidget-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                margin-left: 8px; /* ✅ Espacement entre le score et la croix */
            }

            .goodwidget-close:hover {
                opacity: 0.8;
            }

            .goodwidget-detail-row {
                display: flex;
                justify-content: space-between;
                margin: 4px 0;
                width: 100%;
            }

            .goodwidget-detail-label {
                opacity: 0.9;
            }

            .goodwidget-detail-value {
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    };

    // --- 3. Détection du navigateur, OS, bloqueurs, etc. (inchangé) ---
    const detectBrowser = () => {
        const userAgent = navigator.userAgent;
        let browser = 'Inconnu';
        let version = 'Inconnu';
        let engine = 'Inconnu';

        if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
            version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Inconnu';
            engine = 'Gecko';
        } else if (userAgent.includes('Edg') || userAgent.includes('Edge')) {
            browser = 'Microsoft Edge';
            version = userAgent.match(/(Edg|Edge)\/(\d+)/)?.[2] || 'Inconnu';
            engine = 'Blink';
        } else if (userAgent.includes('Chrome')) {
            browser = 'Chrome';
            version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Inconnu';
            engine = 'Blink';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari';
            version = userAgent.match(/Safari\/(\d+)/)?.[1] || 'Inconnu';
            engine = 'WebKit';
        } else if (userAgent.includes('Brave')) {
            browser = 'Brave';
            version = userAgent.match(/Brave\/(\d+)/)?.[1] || 'Inconnu';
            engine = 'Blink';
        } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
            browser = 'Opera';
            version = userAgent.match(/(Opera|OPR)\/(\d+)/)?.[2] || 'Inconnu';
            engine = 'Blink';
        }

        if (userAgent.includes('Trident') || userAgent.includes('MSIE')) {
            engine = 'Trident';
        }

        return { browser, version, engine };
    };

    const detectOS = () => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;

        if (platform.includes('Win')) return 'Windows';
        if (platform.includes('Mac')) return 'macOS';
        if (platform.includes('Linux')) return 'Linux';
        if (platform.includes('Android')) return 'Android';
        if (platform.includes('iPhone') || platform.includes('iPad') || platform.includes('iPod')) return 'iOS';
        if (userAgent.includes('FreeBSD')) return 'FreeBSD';
        if (userAgent.includes('OpenBSD')) return 'OpenBSD';

        return 'Inconnu';
    };

    const detectAdBlockers = async () => {
        const blockers = {
            uBlockOrigin: false,
            adBlock: false,
            adGuard: false,
            braveShield: false,
            ghostery: false,
            privacyBadger: false,
            adBlockPlus: false,
            duckDuckGoPrivacy: false,
            uBlockDNS: false, // Impossible à détecter directement (DNS)
            unknown: false
        };

        // Méthode 1 : Vérifier les propriétés globales (ancienne méthode)
        if (typeof window.__adblock !== 'undefined') blockers.adBlock = true;
        if (typeof window.__adblockplus !== 'undefined') blockers.adBlockPlus = true;
        if (typeof window.__uBlock !== 'undefined') blockers.uBlockOrigin = true;
        if (typeof window.__adguard !== 'undefined') blockers.adGuard = true;
        if (typeof window.__braveShield !== 'undefined') blockers.braveShield = true;
        if (typeof window.__ghostery !== 'undefined') blockers.ghostery = true;
        if (typeof window.__privacyBadger !== 'undefined') blockers.privacyBadger = true;
        if (typeof window.__ddgPrivacy !== 'undefined') blockers.duckDuckGoPrivacy = true;

        // Méthode 2 : Éléments cachés (plusieurs sélecteurs)
        const testSelectors = [
            'adblock-test',
            'pubads-test',
            'ad-test',
            'adblock',
            'adsbygoogle',
            'fb-pixel',
            'google-analytics'
        ];

        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.width = '1px';
        testElement.style.height = '1px';
        testElement.style.opacity = '0';
        testElement.style.pointerEvents = 'none';
        testElement.id = 'goodwidget-adblock-test';

        // Ajouter tous les sélecteurs connus
        testSelectors.forEach(selector => {
            testElement.classList.add(selector);
        });

        document.body.appendChild(testElement);

        // Vérifier après un délai (certains bloqueurs mettent du temps à agir)
        await new Promise(resolve => setTimeout(resolve, 200));

        const isHidden = (elem) => {
            return elem.offsetParent === null ||
                   elem.style.display === 'none' ||
                   elem.style.visibility === 'hidden' ||
                   elem.offsetHeight === 0 ||
                   elem.offsetWidth === 0 ||
                   window.getComputedStyle(elem).display === 'none';
        };

        if (isHidden(testElement)) {
            blockers.unknown = true;
        }

        testElement.remove();

        // Méthode 3 : Tester le chargement de scripts de pubs (promesses)
        const testScripts = [
            { url: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', name: 'googleAds' },
            { url: 'https://connect.facebook.net/en_US/fbevents.js', name: 'facebookPixel' },
            { url: 'https://www.google-analytics.com/analytics.js', name: 'googleAnalytics' }
        ];

        const scriptTests = testScripts.map(script =>
            new Promise(resolve => {
                const testScript = document.createElement('script');
                testScript.src = script.url;
                testScript.onload = () => resolve({ name: script.name, blocked: false });
                testScript.onerror = () => resolve({ name: script.name, blocked: true });
                document.head.appendChild(testScript);
                setTimeout(() => {
                    testScript.remove();
                    resolve({ name: script.name, blocked: false });
                }, 3000);
            })
        );

        const results = await Promise.all(scriptTests);
        const blockedScripts = results.filter(r => r.blocked).map(r => r.name);

        // Si au moins un script est bloqué, on suppose qu'un bloqueur est actif
        if (blockedScripts.length > 0) {
            blockers.unknown = true;
        }

        /*// Méthode 4 : Détecter DuckDuckGo Privacy Essentials via des requêtes spécifiques
        // (DuckDuckGo bloque certaines requêtes comme les trackers connus)
        try {
            const response = await fetch('https://tracker.example.com/test', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store'
            });
            if (!response.ok) {
                blockers.duckDuckGoPrivacy = true;
            }
        } catch (e) {
            // Si la requête échoue (bloquée), on suppose que DuckDuckGo est actif
            blockers.duckDuckGoPrivacy = true;
        } */

        return blockers;
    };

    const detectSecuritySettings = () => {
        return {
            isPrivateMode: new Promise((resolve) => {
                try {
                    if (window.storage && window.storage.estimate) {
                        window.storage.estimate()
                            .then(() => resolve(false))
                            .catch(() => resolve(true));
                    } else {
                        resolve(false);
                    }
                } catch (e) {
                    resolve(true);
                }
            }),
            doNotTrack: navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes',
            cookiesEnabled: navigator.cookieEnabled,
            javaScriptEnabled: true,
            webRTCEnabled: typeof window.RTCPeerConnection === 'function',
            serviceWorkersEnabled: 'serviceWorker' in navigator,
            fingerprintingProtection: (() => {
                try {
                    return navigator.hardwareConcurrency === undefined ||
                           navigator.deviceMemory === undefined ||
                           navigator.getBattery === undefined;
                } catch (e) {
                    return true;
                }
            })(),
            isHTTPS: window.location.protocol === 'https:'
        };
    };

    const detectOtherIndicators = () => {
        return {
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            colorDepth: window.screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            supportsWebP: (() => {
                const canvas = document.createElement('canvas');
                return canvas.toDataURL('image/webp').indexOf('image/webp') !== -1;
            })(),
            thirdPartyCookies: (() => {
                try {
                    return window.localStorage !== undefined;
                } catch (e) {
                    return false;
                }
            })(),
            geolocationEnabled: 'geolocation' in navigator,
            notificationsEnabled: 'Notification' in window,
            batteryAPIEnabled: 'getBattery' in navigator
        };
    };

    // --- 4. Calcul du score de sécurité (corrigé) ---
    const calculateSecurityScore = (adBlockers, securitySettings) => {
        let score = 50; // Score de base neutre

        // Bonus pour les bloqueurs de pubs
        if (adBlockers.uBlockOrigin || adBlockers.adBlock || adBlockers.adGuard || adBlockers.unknown) {
            score += 10;
        }

        // Bonus si Do Not Track est activé
        if (securitySettings.doNotTrack) {
            score += 5;
        }

        // Bonus si les cookies sont désactivés
        if (!securitySettings.cookiesEnabled) {
            score += 10;
        }

        // Bonus si WebRTC est désactivé
        if (!securitySettings.webRTCEnabled) {
            score += 5;
        }

        // Bonus si le mode privé est détecté
        if (securitySettings.isPrivateMode) {
            score += 15;
        }

        // Bonus si la protection contre le fingerprinting est détectée
        if (securitySettings.fingerprintingProtection) {
            score += 10;
        }

        // Malus si HTTPS n'est pas utilisé
        if (!securitySettings.isHTTPS) {
            score -= 20;
        }

        // Limiter le score entre 0 et 100
        return Math.min(100, Math.max(0, score));
    };

    // --- 5. Génération du rapport ---
    const generateReport = async () => {
        const browser = detectBrowser();
        const os = detectOS();
        const adBlockers = detectAdBlockers();
        const securitySettings = detectSecuritySettings();
        const otherIndicators = detectOtherIndicators();

        // Attendre les détections asynchrones
        const isPrivateMode = await securitySettings.isPrivateMode;
        securitySettings.isPrivateMode = isPrivateMode;

        const report = {
            timestamp: new Date().toISOString(),
            browser,
            os,
            adBlockers,
            securitySettings,
            otherIndicators,
            securityScore: calculateSecurityScore(adBlockers, securitySettings)
        };

        console.log('[GoodWidget] Rapport de sécurité:', report);
        window.goodWidgetReport = report;
        return report;
    };

    // --- 6. Création du widget visuel ---
    const createWidget = (report) => {
        const widget = document.createElement('div');
        widget.className = 'goodwidget-container';

        // Déterminer la classe en fonction du score
        if (report.securityScore >= 75) {
            widget.classList.add('score-high');
        } else if (report.securityScore >= 50) {
            widget.classList.add('score-medium');
        } else {
            widget.classList.add('score-low');
        }

        // Position du widget
        const positions = {
            'top-left': { top: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'bottom-right': { bottom: '20px', right: '20px' }
        };
        Object.assign(widget.style, positions[WIDGET_CONFIG.position]);

        // Contenu du widget
        widget.innerHTML = `
            <div class="goodwidget-header">
                <span class="goodwidget-title">Sécurité des données</span>
                <span class="goodwidget-score">${report.securityScore}/100</span>
                ${WIDGET_CONFIG.closeButton ? '<button class="goodwidget-close" title="Fermer">&times;</button>' : ''}
            </div>
            ${WIDGET_CONFIG.showDetailsOnHover ? `
            <div class="goodwidget-details">
                <div class="goodwidget-detail-row">
                    <span class="goodwidget-detail-label">Navigateur</span>
                    <span class="goodwidget-detail-value">${report.browser.browser} ${report.browser.version}</span>
                </div>
                <div class="goodwidget-detail-row">
                    <span class="goodwidget-detail-label">OS</span>
                    <span class="goodwidget-detail-value">${report.os}</span>
                </div>
                <div class="goodwidget-detail-row">
                    <span class="goodwidget-detail-label">Bloqueur de pubs</span>
                    <span class="goodwidget-detail-value">
                        ${Object.entries(report.adBlockers).filter(([_, detected]) => detected).map(([name]) => name).join(', ') || 'Aucun'}
                    </span>
                </div>
                <div class="goodwidget-detail-row">
                    <span class="goodwidget-detail-label">HTTPS</span>
                    <span class="goodwidget-detail-value">${report.securitySettings.isHTTPS ? '✅' : '❌'}</span>
                </div>
                <div class="goodwidget-detail-row">
                    <span class="goodwidget-detail-label">Mode privé</span>
                    <span class="goodwidget-detail-value">${report.securitySettings.isPrivateMode ? '✅' : '❌'}</span>
                </div>
            </div>
            ` : ''}
        `;

        document.body.appendChild(widget);

        // Animation d'apparition
        if (WIDGET_CONFIG.animation) {
            setTimeout(() => {
                widget.classList.add('visible');
            }, 100);
        }

        // Bouton de fermeture
        if (WIDGET_CONFIG.closeButton) {
            const closeButton = widget.querySelector('.goodwidget-close');
            closeButton.addEventListener('click', () => {
                widget.style.opacity = '0';
                widget.style.transform = 'translateY(20px)';
                setTimeout(() => widget.remove(), 300);
            });
        }

        return widget;
    };

    // --- 7. Initialisation ---
    const init = async () => {
        injectStyles();
        const report = await generateReport();
        if (WIDGET_CONFIG.autoShow) {
            createWidget(report);
        }
    };

    // Démarrer quand la page est prête
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    // Exposé des fonctions pour une utilisation personnalisée
    window.goodWidget = {
        detectBrowser,
        detectOS,
        detectAdBlockers,
        detectSecuritySettings,
        detectOtherIndicators,
        generateReport,
        createWidget,
        getReport: () => window.goodWidgetReport,
        config: WIDGET_CONFIG
    };
})();