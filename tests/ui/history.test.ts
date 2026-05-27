import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { TrendJackPage } from '../../pages/trendjack-page';

test.describe('TrendJack Campaign History Tests', () => {

    let trendjack: TrendJackPage;

    test.beforeEach(async ({ page }) => {
        trendjack = new TrendJackPage(page);
        await trendjack.navigate();
        await trendjack.goToHistoryTab();
    });

    test('@regression Campaign History tab loads correctly', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Campaign History');
        await allure.story('Campaign History tab loads with correct heading');
        await allure.severity('normal');

        await test.step('Then — history heading is visible', async () => {
            await trendjack.verifyHistoryTabLoaded();
        });
    });

    test('@regression existing campaigns are displayed in history', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Campaign History');
        await allure.story('Previous campaigns are shown as expandable items');
        await allure.severity('normal');

        await test.step('Then — campaign expanders are visible', async () => {
            await trendjack.verifyCampaignsExist();
        });
    });

    test('@regression campaign expander shows correct data fields', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Campaign History');
        await allure.story('Campaign expander shows trend, attempts and human decision');
        await allure.severity('normal');

        await test.step('When — user opens the first campaign expander', async () => {
            await trendjack.openFirstCampaignExpander();
        });
        await test.step('Then — expander shows trend, attempts and decision', async () => {
            await trendjack.verifyCampaignExpanderDetails();
        });
    });

    test('@regression campaign status icons are displayed correctly', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Campaign History');
        await allure.story('Campaigns show correct status icons in history');
        await allure.severity('minor');

        await test.step('Then — campaigns show status icons', async () => {
            await trendjack.verifyStatusIconsPresent();
        });
    });

});