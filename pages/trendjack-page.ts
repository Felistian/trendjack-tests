import { Page, Locator, expect } from '@playwright/test';

export class TrendJackPage {

    // ── Fields ─────────────────────────────────────────────────────────────────
    private page: Page;

    // ── Locators ───────────────────────────────────────────────────────────────

    // Header
    readonly title: Locator;
    readonly caption: Locator;

    // Tabs
    readonly generateTab: Locator;
    readonly historyTab: Locator;

    // Generate Campaign form
    readonly keywordInput: Locator;
    readonly runButton: Locator;
    readonly generateHeading: Locator;

    // Pipeline results
    readonly trendSection: Locator;
    readonly attemptsText: Locator;
    readonly adCopyHeading: Locator;
    readonly instagramLabel: Locator;
    readonly tiktokLabel: Locator;
    readonly linkedinLabel: Locator;

    // Validation scores
    readonly validationHeading: Locator;
    readonly toneMetric: Locator;
    readonly brandFitMetric: Locator;
    readonly accuracyMetric: Locator;
    readonly trendRelevanceMetric: Locator;
    readonly overallMetric: Locator;
    readonly aiReasoningExpander: Locator;

    // HITL
    readonly humanDecisionHeading: Locator;
    readonly notesTextArea: Locator;
    readonly approveButton: Locator;
    readonly rejectButton: Locator;

    // Post-decision
    readonly approvedSuccess: Locator;
    readonly rejectedError: Locator;
    readonly rejectWarning: Locator;
    readonly emptyKeywordWarning: Locator;
    readonly downloadButton: Locator;

    // History
    readonly historyHeading: Locator;
    readonly campaignExpanders: Locator;
    readonly noCampaignsMessage: Locator;

    // ── Constructor ────────────────────────────────────────────────────────────
    constructor(page: Page) {
        this.page = page;

        // Header
        this.title = page.locator('[data-testid="stHeading"]').first();
        this.caption = page.locator('[data-testid="stCaptionContainer"]');

        // Tabs
        this.generateTab = page.locator('[data-testid="stTab"]').first();
        this.historyTab = page.locator('[data-testid="stTab"]').nth(1);

        // Generate Campaign form
        this.keywordInput = page.getByLabel('Enter a keyword or industry');
        this.runButton = page.locator('[data-testid="stBaseButton-primary"]').first();
        this.generateHeading = page.getByText('Generate New Campaign');

        // Pipeline results
        this.trendSection = page.locator('[data-testid="stMarkdownContainer"]').filter({ hasText: '🔍 Trend:' });
        this.attemptsText = page.locator('[data-testid="stMarkdownContainer"]').filter({ hasText: '🔄 Attempts:' });
        this.adCopyHeading = page.getByText('📝 Generated Ad Copy');
        this.instagramLabel = page.getByText('📸 Instagram');
        this.tiktokLabel = page.getByText('🎵 TikTok');
        this.linkedinLabel = page.getByText('💼 LinkedIn');

        // Validation scores
        this.validationHeading = page.getByText('✅ Validation Scores');
        this.toneMetric = page.locator('[data-testid="stMetric"]').filter({ hasText: 'Tone' });
        this.brandFitMetric = page.locator('[data-testid="stMetric"]').filter({ hasText: 'Brand Fit' });
        this.accuracyMetric = page.locator('[data-testid="stMetric"]').filter({ hasText: 'Accuracy' });
        this.trendRelevanceMetric = page.locator('[data-testid="stMetric"]').filter({ hasText: 'Trend Relevance' });
        this.overallMetric = page.locator('[data-testid="stMetric"]').filter({ hasText: 'Overall' });
        this.aiReasoningExpander = page.locator('[data-testid="stExpander"]').filter({ hasText: 'AI Reasoning' });

        // HITL
        this.humanDecisionHeading = page.getByText('👤 Human Decision');
        this.notesTextArea = page.getByLabel('Notes (optional — required if rejecting)');
        this.approveButton = page.locator('[data-testid="stBaseButton-primary"]').filter({ hasText: 'Approve & Export PDF' });
        this.rejectButton = page.locator('[data-testid="stBaseButton-secondary"]');

        // Post-decision
        this.approvedSuccess = page.locator('[data-testid="stAlert"]').filter({ hasText: 'Campaign APPROVED' });
        this.rejectedError = page.locator('[data-testid="stAlert"]').filter({ hasText: 'Campaign REJECTED' });
        this.rejectWarning = page.locator('[data-testid="stAlert"]').filter({ hasText: 'Please add rejection notes' });
        this.emptyKeywordWarning = page.locator('[data-testid="stAlert"]').filter({ hasText: 'Please enter a keyword first' });
        this.downloadButton = page.getByText('📄 Download PDF Report');

        // History
        this.historyHeading = page.locator('[data-testid="stHeading"]').filter({ hasText: 'Campaign History' });
        this.campaignExpanders = page.locator('[data-testid="stExpander"]');
        this.noCampaignsMessage = page.getByText('No campaigns yet. Generate your first one!');
    }

    // ── Actions ────────────────────────────────────────────────────────────────

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async goToHistoryTab(): Promise<void> {
        await this.historyTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToGenerateTab(): Promise<void> {
        await this.generateTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async runPipeline(keyword: string): Promise<void> {
        await this.keywordInput.fill(keyword);
        await this.runButton.click();
        // Wait for pipeline to complete — trend section appears when done
        await this.trendSection.waitFor({ state: 'visible', timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }

    async clickRunWithoutKeyword(): Promise<void> {
        await this.keywordInput.clear();
        await this.runButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async approve(): Promise<void> {
        await this.approveButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async reject(notes: string): Promise<void> {
        await this.notesTextArea.fill(notes);
        await this.rejectButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async rejectWithoutNotes(): Promise<void> {
        await this.rejectButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openFirstCampaignExpander(): Promise<void> {
        await this.campaignExpanders.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    // ── Verifications ──────────────────────────────────────────────────────────

    async verifyPageLoaded(): Promise<void> {
        await expect(this.title).toBeVisible();
        await expect(this.caption).toBeVisible();
        await expect(this.generateTab).toBeVisible();
        await expect(this.historyTab).toBeVisible();
    }

    async verifyTitleText(): Promise<void> {
        await expect(this.title).toContainText('TrendJack');
    }

    async verifyCaptionText(): Promise<void> {
        await expect(this.caption).toContainText('AI-Powered Ad Campaign Generator');
    }

    async verifyGenerateTabElements(): Promise<void> {
        await expect(this.keywordInput).toBeVisible();
        await expect(this.runButton).toBeVisible();
        await expect(this.generateHeading).toBeVisible();
    }

    async verifyHistoryTabLoaded(): Promise<void> {
        await expect(this.historyHeading).toBeVisible();
    }

    async verifyEmptyKeywordWarning(): Promise<void> {
        await expect(this.emptyKeywordWarning).toBeVisible();
    }

    async verifyPipelineCompleted(): Promise<void> {
        await expect(this.trendSection).toBeVisible();
        await expect(this.adCopyHeading).toBeVisible();
        await expect(this.validationHeading).toBeVisible();
        await expect(this.humanDecisionHeading).toBeVisible();
    }

    async verifyAdCopyDisplayed(): Promise<void> {
        await expect(this.instagramLabel).toBeVisible();
        await expect(this.tiktokLabel).toBeVisible();
        await expect(this.linkedinLabel).toBeVisible();
    }

    async verifyValidationScoresDisplayed(): Promise<void> {
        await expect(this.toneMetric).toBeVisible();
        await expect(this.brandFitMetric).toBeVisible();
        await expect(this.accuracyMetric).toBeVisible();
        await expect(this.trendRelevanceMetric).toBeVisible();
        await expect(this.overallMetric).toBeVisible();
    }

    async verifyAttemptsVisible(): Promise<void> {
        await expect(this.attemptsText).toBeVisible();
    }

    async verifyApproveSuccess(): Promise<void> {
        await expect(this.approvedSuccess).toBeVisible();
        await expect(this.downloadButton).toBeVisible();
    }

    async verifyRejectSuccess(): Promise<void> {
        await expect(this.rejectedError).toBeVisible();
    }

    async verifyRejectWithoutNotesWarning(): Promise<void> {
        await expect(this.rejectWarning).toBeVisible();
    }

    async verifyCampaignsExist(): Promise<void> {
        await expect(this.campaignExpanders.first()).toBeVisible();
    }

    async verifyCampaignExpanderDetails(): Promise<void> {
        const details = this.page.locator('[data-testid="stExpanderDetails"]').first();
        await expect(details.getByText(/Trend:/)).toBeVisible();
        await expect(details.getByText(/Attempts:/)).toBeVisible();
        await expect(details.getByText(/Human Decision:/)).toBeVisible();
    }

    async verifyStatusIconsPresent(): Promise<void> {
        const text = await this.campaignExpanders.first().textContent();
        const hasIcon = text?.includes('✅') || text?.includes('❌') || text?.includes('⏳');
        expect(hasIcon).toBe(true);
    }
}