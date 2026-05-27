import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { TrendJackPage } from '../../pages/trendjack-page';

test.describe('TrendJack UI Tests', () => {

    let trendjack: TrendJackPage;

    test.beforeEach(async ({ page }) => {
        trendjack = new TrendJackPage(page);
        await trendjack.navigate();
    });

    // ── Smoke ──────────────────────────────────────────────────────────────────

    test('@smoke page loads with correct title and caption', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('Page loads with correct title and caption');
        await allure.severity('critical');

        await test.step('Then — title contains TrendJack', async () => {
            await trendjack.verifyTitleText();
        });
        await test.step('Then — caption is AI-Powered Ad Campaign Generator', async () => {
            await trendjack.verifyCaptionText();
        });
    });

    test('@smoke both tabs are visible on load', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('Both navigation tabs are visible on load');
        await allure.severity('critical');

        await test.step('Then — page loads with header and both tabs', async () => {
            await trendjack.verifyPageLoaded();
        });
    });

    test('@smoke Generate Campaign tab has correct elements', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('Generate Campaign tab shows input and run button');
        await allure.severity('critical');

        await test.step('Then — keyword input and run button are visible', async () => {
            await trendjack.verifyGenerateTabElements();
        });
    });

    // ── Regression ────────────────────────────────────────────────────────────

    test('@regression Campaign History tab navigates correctly', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('User can navigate to Campaign History tab');
        await allure.severity('normal');

        await test.step('When — user clicks Campaign History tab', async () => {
            await trendjack.goToHistoryTab();
        });
        await test.step('Then — Campaign History heading is visible', async () => {
            await trendjack.verifyHistoryTabLoaded();
        });
    });

    test('@regression user can switch back to Generate tab', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('User can switch between tabs freely');
        await allure.severity('normal');

        await test.step('When — user clicks Campaign History tab', async () => {
            await trendjack.goToHistoryTab();
        });
        await test.step('And — user clicks Generate Campaign tab', async () => {
            await trendjack.goToGenerateTab();
        });
        await test.step('Then — keyword input is visible again', async () => {
            await trendjack.verifyGenerateTabElements();
        });
    });

    test('@regression empty keyword shows warning message', async () => {
        await allure.epic('TrendJack');
        await allure.feature('UI');
        await allure.story('Empty keyword input shows warning on run');
        await allure.severity('normal');

        await test.step('When — user clicks Run without entering a keyword', async () => {
            await trendjack.clickRunWithoutKeyword();
        });
        await test.step('Then — warning message is displayed', async () => {
            await trendjack.verifyEmptyKeywordWarning();
        });
    });

});