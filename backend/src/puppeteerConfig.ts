import puppeteer, { Browser } from 'puppeteer';

export const launchPuppeteer = async (): Promise<Browser> => {
    try {
        const browser = await puppeteer.launch({
            executablePath: process.env.CHROME_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',  // Default to a path if env is not set
            args: ['--no-sandbox', '--disable-setuid-sandbox'],  // For cloud environments
        });
        return browser;
    } catch (error) {
        console.error('Error launching Puppeteer:', error);
        throw error;
    }
};
