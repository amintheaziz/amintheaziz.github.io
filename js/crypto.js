class AdvancedCryptoUtils {
    static stringToBuffer(str) {
        return new TextEncoder().encode(str);
    }

    static bufferToString(buffer) {
        return new TextDecoder().decode(buffer);
    }

    static base64Encode(buffer) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }

    static base64Decode(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Enhanced quantum entropy generation
    static quantumEntropy() {
        const crypto = window.crypto || window.msCrypto;
        const randomValues = crypto.getRandomValues(new Uint32Array(4));
        const timeEntropy = new Uint32Array([
            Date.now(), 
            performance.now() * 1000, 
            Math.floor(Math.random() * 0xFFFFFFFF)
        ]);
        return new Uint8Array([...randomValues, ...timeEntropy]).buffer;
    }
}

class AdvancedEncryptor {
    // Improved key derivation with more iterations and larger salt
    static async deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        
        const importedKey = await crypto.subtle.importKey(
            'raw', 
            passwordBuffer, 
            { name: 'PBKDF2' }, 
            false, 
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 750000, // Increased iterations for more security
                hash: 'SHA-512'
            },
            importedKey,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    // More robust salt generation
    static generateAdaptiveSalt() {
        return crypto.getRandomValues(new Uint8Array(32)); // Increased salt size
    }

    // Compact hybrid encryption
    static async hybridEncrypt(message, password) {
        try {
            // Generate adaptive salt
            const salt = this.generateAdaptiveSalt();
            
            // Derive key using salt
            const derivedKey = await this.deriveKey(password, salt);
            
            // Generate initialization vector
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            // Primary encryption
            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                derivedKey,
                AdvancedCryptoUtils.stringToBuffer(message)
            );
            
            // Combine salt, iv, and encrypted data
            const combinedData = new Uint8Array(
                salt.length + iv.length + encryptedData.byteLength
            );
            
            let offset = 0;
            combinedData.set(salt, offset); 
            offset += salt.length;
            combinedData.set(iv, offset); 
            offset += iv.length;
            combinedData.set(new Uint8Array(encryptedData), offset);
            
            // Base64 encode the final package
            return AdvancedCryptoUtils.base64Encode(combinedData);
        } catch (error) {
            console.error('Encryption Error:', error);
            throw new Error('Encryption failed');
        }
    }

    // Corresponding decryption method
    static async hybridDecrypt(encryptedMessage, password) {
        try {
            // Decode the base64 encrypted message
            const combinedData = new Uint8Array(
                AdvancedCryptoUtils.base64Decode(encryptedMessage)
            );
            
            // Extract salt (32 bytes) and IV (12 bytes)
            const salt = combinedData.slice(0, 32);
            const iv = combinedData.slice(32, 44);
            const encryptedData = combinedData.slice(44);
            
            // Derive key using original salt
            const derivedKey = await this.deriveKey(password, salt);
            
            // Decrypt
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                derivedKey,
                encryptedData
            );
            
            // Convert decrypted buffer to string
            return AdvancedCryptoUtils.bufferToString(decryptedBuffer);
        } catch (error) {
            console.error('Decryption Error:', error);
            throw new Error('Decryption failed. Check your password.');
        }
    }
}

// Event Listeners and UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(tab.dataset.panel).classList.add('active');
        });
    });

    // Encryption functionality
    const encryptButton = document.querySelector('#encrypt .button');
    encryptButton.addEventListener('click', async () => {
        const messageInput = document.getElementById('encryptInput');
        const passwordInput = document.getElementById('encryptPassword');
        const outputArea = document.getElementById('encryptedOutput');
        const errorMessage = document.getElementById('errorMessage');

        // Reset previous states
        errorMessage.style.display = 'none';
        outputArea.classList.remove('show');
        outputArea.textContent = ''; // Clear previous output
        encryptButton.classList.add('loading');

        try {
            const message = messageInput.value.trim();
            const password = passwordInput.value.trim();

            if (!message || !password) {
                throw new Error('Please enter both a message and a password');
            }

            if (password.length < 12) {
                throw new Error('Password must be at least 12 characters long');
            }

            const encryptedMessage = await AdvancedEncryptor.hybridEncrypt(message, password);
            
            outputArea.textContent = encryptedMessage;
            outputArea.classList.add('show');
        } catch (error) {
            errorMessage.textContent = `⚠️ ${error.message}`;
            errorMessage.style.display = 'flex';
        } finally {
            encryptButton.classList.remove('loading');
        }
    });

    // Decryption functionality
    const decryptButton = document.querySelector('#decrypt .button');
    decryptButton.addEventListener('click', async () => {
        const messageInput = document.getElementById('decryptInput');
        const passwordInput = document.getElementById('decryptPassword');
        const outputArea = document.getElementById('decryptedOutput');
        const errorMessage = document.getElementById('errorMessage');

        // Reset previous states
        errorMessage.style.display = 'none';
        outputArea.classList.remove('show');
        outputArea.textContent = ''; // Clear previous output
        decryptButton.classList.add('loading');

        try {
            const encryptedMessage = messageInput.value.trim();
            const password = passwordInput.value.trim();

            if (!encryptedMessage || !password) {
                throw new Error('Please enter both encrypted message and password');
            }

            const decryptedMessage = await AdvancedEncryptor.hybridDecrypt(encryptedMessage, password);
            
            outputArea.textContent = decryptedMessage;
            outputArea.classList.add('show');
        } catch (error) {
            errorMessage.textContent = `⚠️ ${error.message}`;
            errorMessage.style.display = 'flex';
        } finally {
            decryptButton.classList.remove('loading');
        }
    });

    // Copy functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const outputElement = btn.closest('.output');
            navigator.clipboard.writeText(outputElement.textContent.trim()).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
            });
        });
    });

    // Password toggle visibility
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        });
    });

    // Password strength meter
    const strengthMeter = document.getElementById('strengthIndicator');
    const passwordStrengthInput = document.getElementById('encryptPassword');
    
    if (strengthMeter && passwordStrengthInput) {
        passwordStrengthInput.addEventListener('input', () => {
            const password = passwordStrengthInput.value;
            let strength = 0;

            // Check password length
            if (password.length >= 12) strength += 25;
            if (password.length >= 16) strength += 25;

            // Check for uppercase
            if (/[A-Z]/.test(password)) strength += 25;

            // Check for numbers and special characters
            if (/[0-9]/.test(password)) strength += 12.5;
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 12.5;

            strengthMeter.style.width = `${Math.min(strength, 100)}%`;
            strengthMeter.style.backgroundColor = 
                strength < 25 ? 'light green' : 
                strength < 50 ? 'green' : 
                strength < 75 ? 'dark green' : 
                'green';
        });
    }
});
