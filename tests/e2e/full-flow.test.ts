import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { TrendJackPage } from '../../pages/trendjack-page';

// NOTE: These tests call real APIs (Tavily + Gemini + Groq)
// Requires TrendJack running: py -m streamlit run app.py
// Run with: npx playwright test --grep @e2e

test.describe('TrendJack Flow Tests', () => {

    let trendjack: TrendJackPage;

    test.beforeEach(async ({ page }) => {
        trendjack = new TrendJackPage(page);
        await trendjack.navigate();
    });

    test('@e2e full pipeline runs and shows all sections', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Pipeline');
        await allure.story('Full pipeline generates trend, ad copy, and validation scores');
        await allure.severity('critical');

        await test.step('When — user enters keyword and runs pipeline', async () => {
            await trendjack.runPipeline('electric vehicles');
        });
        await test.step('Then — all pipeline sections are visible', async () => {
            await trendjack.verifyPipelineCompleted();
        });
        await test.step('Then — ad copy is displayed for all 3 platforms', async () => {
            await trendjack.verifyAdCopyDisplayed();
        });
        await test.step('Then — all 5 validation scores are displayed', async () => {
            await trendjack.verifyValidationScoresDisplayed();
        });
    });

    test('@e2e attempts counter is visible after pipeline run', async () => {
        await allure.epic('TrendJack');
        await allure.feature('Pipeline');
        await allure.story('Attempts counter shows number of validation attempts');
        await allure.severity('normal');

        await test.step('When — pipeline runs', async () => {
            await trendjack.runPipeline('fitness');
        });
        await test.step('Then — attempts counter is visible', async () => {
            await trendjack.verifyAttemptsVisible();
        });
    });

    test('@e2e approve flow shows success message and download button', async () => {
        await allure.epic('TrendJack');
        await allure.feature('HITL');
        await allure.story('Approving campaign shows success and PDF download button');
        await allure.severity('critical');

        await test.step('Given — pipeline has completed', async () => {
            await trendjack.runPipeline('skincare');
        });
        await test.step('When — user clicks Approve and Export PDF', async () => {
            await trendjack.approve();
        });
        await test.step('Then — success message and download button appear', async () => {
            await trendjack.verifyApproveSuccess();
        });
    });

    test('@e2e reject without notes shows warning message', async () => {
        await allure.epic('TrendJack');
        await allure.feature('HITL');
        await allure.story('Rejecting without notes shows warning');
        await allure.severity('normal');

        await test.step('Given — pipeline has completed', async () => {
            await trendjack.runPipeline('coffee');
        });
        await test.step('When — user clicks Reject without adding notes', async () => {
            await trendjack.rejectWithoutNotes();
        });
        await test.step('Then — warning message is displayed', async () => {
            await trendjack.verifyRejectWithoutNotesWarning();
        });
    });

    test('@e2e reject with notes shows rejection confirmation', async () => {
        await allure.epic('TrendJack');
        await allure.feature('HITL');
        await allure.story('Rejecting with notes shows rejection confirmation');
        await allure.severity('normal');

        await test.step('Given — pipeline has completed', async () => {
            await trendjack.runPipeline('yoga');
        });
        await test.step('When — user adds notes and clicks Reject', async () => {
            await trendjack.reject('Tone too casual for this brand');
        });
        await test.step('Then — rejection confirmation is displayed', async () => {
            await trendjack.verifyRejectSuccess();
        });
    });

});