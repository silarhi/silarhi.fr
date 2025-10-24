# Google Search Console Setup & SEO Monitoring

Complete guide to setting up Google Search Console and monitoring SILARHI.fr SEO performance.

---

## Part 1: Initial Setup

### Step 1: Add Property in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Choose "URL prefix" method
4. Enter: `https://silarhi.fr`
5. Click "Continue"

### Step 2: Verify Ownership

**Recommended method: Meta tag**

1. Copy the meta tag verification code from GSC
2. Add to `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
    // ... existing metadata ...
    verification: {
        google: 'YOUR_VERIFICATION_CODE_HERE', // Replace with code from GSC
    }
}
```

3. Save and deploy
4. Return to GSC and click "Verify"
5. GSC should confirm ownership in 1-2 days

### Step 3: Submit Sitemap

1. In GSC, go to "Sitemaps" (left sidebar)
2. Click "Add/test sitemaps"
3. Enter: `sitemap.xml`
4. Click "Submit"
5. GSC will validate and start indexing

---

## Part 2: Initial Checks (Week 1)

### After Deploying SEO Changes

**Day 1:**
- [ ] Verify property in GSC (may take 24 hours)
- [ ] Submit sitemap
- [ ] Run Mobile-Friendly Test
- [ ] Check for crawl errors

**Day 2-3:**
- [ ] Check "Coverage" report for index status
- [ ] Check "Enhancements" for structured data
- [ ] Request indexing for homepage

**Day 4-7:**
- [ ] Monitor crawl stats
- [ ] Check for new errors
- [ ] Verify pages appearing in SERP

### Useful GSC Reports

| Report | Purpose | Frequency |
|--------|---------|-----------|
| Coverage | Which pages indexed | Daily |
| Performance | Clicks, impressions, CTR | Daily |
| URL Inspection | Individual page status | As needed |
| Mobile Usability | Mobile issues | Weekly |
| Core Web Vitals | Performance metrics | Weekly |
| Enhancements | Rich snippets, AMP | Weekly |

---

## Part 3: Performance Monitoring

### Monthly Metrics Dashboard

Create a spreadsheet to track:

| Metric | Target | Week 1 | Week 4 | Week 12 |
|--------|--------|--------|--------|----------|
| **Organic Traffic** | +30% | [baseline] | +10% | +30% |
| **Avg Position** | -10 | [baseline] | -3 | -10 |
| **Impressions** | 50%+ | [baseline] | +25% | +50% |
| **Click-Through Rate** | 10%+ | [baseline] | +5% | +10% |
| **Indexed Pages** | 100 | [baseline] | 90+ | 100+ |
| **Page Speed Score** | 90+ | [measure] | 85+ | 90+ |
| **Mobile Usability** | 0 errors | [measure] | 0 | 0 |
| **Rich Snippets** | 10+ | 0 | 5+ | 10+ |

### Key Performance Indicators (KPIs)

#### Primary KPIs (Track Monthly)
1. **Organic Traffic**
   - Source: Google Analytics 4
   - Goal: 30% increase by month 3
   - Action: Increase if <5% growth monthly

2. **Average SERP Position**
   - Source: GSC Performance Report
   - Goal: 10 position improvement
   - Action: Optimize if improving <2 positions/month

3. **Click-Through Rate (CTR)**
   - Source: GSC Performance Report
   - Goal: 2-5% CTR improvement
   - Action: Improve if <1% improvement/month

#### Secondary KPIs (Track Quarterly)
4. **Pages Indexed**
   - Source: GSC Coverage
   - Goal: 90%+ indexing
   - Action: Investigate if <80%

5. **Page Speed**
   - Source: PageSpeed Insights
   - Goal: 90+ score
   - Action: Optimize if <75

6. **Rich Snippets**
   - Source: GSC Enhancements
   - Goal: 50%+ of project pages
   - Action: Fix schema if <20%

---

## Part 4: Keyword Ranking Tracker

### Setup with Google Search Console

GSC shows top keywords automatically. Track these:

**Every Week:**

| Keyword | Current Pos | 4-Week Avg | 12-Week Goal | Notes |
|---------|------------|-----------|--------------|-------|
| développement web Toulouse | 15 | 18 | 5 | Primary |
| agence web PHP | 22 | 25 | 10 | Primary |
| Symfony development | 45 | 48 | 20 | Secondary |
| Next.js Toulouse | 38 | 42 | 15 | Secondary |
| API development | 61 | 65 | 30 | Secondary |

### How to Extract Keywords from GSC

1. Go to "Performance" report in GSC
2. Click "Queries" tab
3. Sort by "Impressions" (highest first)
4. Export top 20 keywords
5. Paste into tracking spreadsheet

### Position Targets

| Current Position | 3-Month Target | 12-Month Target |
|------------------|----------------|-----------------|
| 1-10 | Maintain top 5 | Rank #1 |
| 11-20 | Move to top 10 | Move to top 5 |
| 21-50 | Move to top 20 | Move to top 10 |
| 51-100 | Move to top 50 | Move to top 20 |

---

## Part 5: Structured Data Monitoring

### Using GSC Enhancements Report

1. In GSC, go to "Enhancements" → "Rich Results"
2. Check each structured data type:
   - Article (project pages)
   - BreadcrumbList (navigation)
   - Organization (homepage)
   - FAQPage (if added)

### Expected Status

**Target (Green Status):**
- Article: 25/27 valid (93%)
- BreadcrumbList: 40/40 valid (100%)
- Organization: 1/1 valid (100%)

**If there are errors:**
1. Click the error type
2. Note the exact error
3. Check the example page
4. Fix in code
5. Resubmit in "Rich Results" tester
6. Deploy fix
7. Request re-crawl in GSC

---

## Part 6: Error Resolution

### Common Crawl Errors & Solutions

#### Issue: "Excluded by 'noindex' tag"
**Cause:** Page has `noindex` meta tag
**Solution:** Ensure projects have proper `published: true` in frontmatter

#### Issue: "Not indexed – soft 404"
**Cause:** Page returns 200 but has 404 content
**Solution:** Check project slug and frontmatter are correct

#### Issue: "Crawled but not indexed"
**Cause:** Google crawled but didn't index
**Solution:** Wait 1-2 weeks, pages usually index after
**Action:** If persistent, check content quality

#### Issue: "Duplicate without user-selected canonical"
**Cause:** Similar content on multiple URLs
**Solution:** Ensure each project has unique slug
**Action:** Check for typos in project filenames

### How to Check Specific Pages

1. In GSC, click "URL Inspection" (top search bar)
2. Enter full URL (e.g., `https://silarhi.fr/projets/api-iris`)
3. Check "Coverage" status
4. If not indexed, click "Request indexing"
5. Wait 1-7 days for Google to re-crawl

---

## Part 7: Weekly Monitoring Tasks

### Monday: Check Search Console
```
[ ] Open GSC Performance report
[ ] Review new top queries
[ ] Check for new errors in Coverage
[ ] Note any drops in impressions/CTR
```

### Wednesday: Update Tracking Spreadsheet
```
[ ] Record top 10 keywords and positions
[ ] Update organic traffic from Analytics
[ ] Update page speed scores
[ ] Note any issues found
```

### Friday: Review & Plan
```
[ ] Review this week's changes
[ ] Identify patterns or trends
[ ] Plan next week's optimizations
[ ] Document findings in notes
```

---

## Part 8: Monthly Review Meeting Agenda

### Review Metrics (30 min)
1. **Organic Traffic Trend**
   - Week-over-week change
   - Month-over-month change
   - Forecasted 3-month trend

2. **Keyword Rankings**
   - Top 10 keywords current positions
   - New keywords appearing
   - Keywords losing positions
   - Competitive analysis (if available)

3. **User Engagement**
   - Average session duration on project pages
   - Bounce rate trend
   - Scroll depth on long-form content
   - CTA click-through rates

### Identify Issues (20 min)
1. **Technical Issues**
   - New crawl errors
   - Index coverage problems
   - Mobile usability issues

2. **Content Issues**
   - Underperforming pages (<5 impressions/month)
   - High CTR but low traffic
   - Low CTR but high impressions

3. **Opportunity Gaps**
   - Missing keywords with volume
   - Competitors ranking for keywords we're not
   - Content gaps identified by queries

### Plan Next Month (10 min)
1. **Priority 1:** Fix any technical issues
2. **Priority 2:** Optimize underperforming pages
3. **Priority 3:** Create new content for gaps
4. **Priority 4:** Build links to top pages

---

## Part 9: Google Analytics 4 Setup for SEO

### Track Organic Search Engagement

1. **Organic Users Segment**
   - Go to "Segments" → "Create"
   - Name: "Organic Search"
   - Condition: `sessionDefaultChannelGroup` = "Organic Search"

2. **Project Page Engagement**
   - Go to "Engagement" → "Pages and screens"
   - Filter by `/projets/` path
   - Monitor: avg engagement time, scroll depth

3. **Tag Page Performance**
   - Filter by `/projets/tag/` path
   - Track: which tag pages get most traffic
   - Identify: most popular technologies

### Custom Events to Track

Add event tracking for:
- Project page views
- Internal link clicks (tag links)
- Scroll depth milestones (25%, 50%, 75%, 100%)
- CTA clicks (contact form, external links)

---

## Part 10: Monthly SEO Report Template

Use this template for stakeholder updates:

---

### SILARHI.fr SEO Performance Report
**Month:** [Month Year]
**Reporting Period:** [Date Range]

#### Executive Summary
- Organic traffic: [X]% [↑/↓]
- Keywords ranking: [X] keywords (#1-20)
- Average position: [X] (target: 5-10)
- Pages indexed: [X]/[Y] ([%])

#### Traffic Metrics
| Metric | This Month | Last Month | Change | Target |
|--------|-----------|-----------|--------|--------|
| Organic Users | XX,XXX | XX,XXX | +X% | +10% |
| Organic Sessions | XX,XXX | XX,XXX | +X% | +10% |
| Org. Conversion Rate | X.X% | X.X% | +X.X% | >2% |

#### Search Performance
| Metric | Value | Trend | Notes |
|--------|-------|-------|-------|
| Total Impressions | XXX,XXX | ↑ | +X% MoM |
| Total Clicks | XX,XXX | ↑ | +X% MoM |
| Avg. CTR | X.X% | → | Stable |
| Avg. Position | XX | ↑ | Improving |

#### Top Keywords
| Keyword | Position | Impressions | Clicks | CTR |
|---------|----------|------------|--------|-----|
| [kw1] | #X | XXX | XX | X.X% |
| [kw2] | #XX | XXX | XX | X.X% |
| [kw3] | #XX | XXX | X | X.X% |

#### Indexing Status
- Total indexed pages: X
- Excluded: X (sitemap)
- Errors: X
- Warnings: X

#### Technical Health
- Mobile Usability: ✓ No errors
- Core Web Vitals: ✓ All good
- Rich Snippets: X/40 valid

#### Content Added This Month
- New projects published: X
- Projects optimized: X
- New tag pages created: X
- Other content changes: [describe]

#### Issues & Actions
| Issue | Severity | Action | Owner | ETA |
|-------|----------|--------|-------|-----|
| [issue] | [High/Med/Low] | [action] | [person] | [date] |

#### Recommendations for Next Month
1. [Priority action based on data]
2. [Secondary action]
3. [Ongoing optimization]

---

## Part 11: Quarterly Deep Dive

### Every 3 Months: Comprehensive Audit

1. **Content Analysis**
   - Review top 10 pages by organic traffic
   - Identify gaps in top-performing categories
   - Plan topic cluster expansions

2. **Competitive Analysis**
   - Check 3 competitors' top keywords
   - Identify keywords we're missing
   - Analyze their content strategy

3. **Technical Audit**
   - Run PageSpeed Insights on 5 sample pages
   - Check for broken links (use crawler tool)
   - Verify all tag pages are indexing
   - Test mobile usability across devices

4. **Keyword Strategy Review**
   - Consolidate all ranked keywords
   - Identify clusters and patterns
   - Plan long-tail keyword content
   - Update content priorities

---

## Part 12: Link Building Tracking

### Monitor Link Growth

**Monthly Links Tracker:**

| Link Source | Count | Type | Authority | Status |
|-------------|-------|------|-----------|--------|
| Tech blogs | 3 | Guest post | High | Active |
| Dev communities | 5 | Directory | Medium | Active |
| Local listings | 2 | Business | Medium | Pending |

### Link Building Opportunities
1. Symfony community sites
2. PHP.net resource links
3. Tech blog guest posting
4. Industry award submissions
5. Developer resource directories
6. Local business pages

---

## Part 13: Automation & Tools

### Free Tools for Monitoring
- **Google Search Console:** Core SEO metrics
- **Google Analytics 4:** Traffic analysis
- **PageSpeed Insights:** Performance monitoring
- **Mobile-Friendly Test:** Mobile compliance
- **Structured Data Tester:** Schema validation

### Optional Paid Tools
- **SEMrush:** Keyword & competitor analysis
- **Ahrefs:** Backlink analysis
- **Moz Pro:** Rank tracking
- **Search Console Mobile App:** Real-time alerts

---

## Part 14: 90-Day SEO Plan

### Week 1-2: Setup & Verification
- [ ] Deploy SEO changes
- [ ] Verify Google Search Console
- [ ] Submit sitemap
- [ ] Request indexing for homepage

### Week 3-4: Initial Data Gathering
- [ ] First Google Search Console reports
- [ ] Baseline traffic metrics
- [ ] Keyword position tracking begins
- [ ] Mobile usability check

### Week 5-8: Optimization Phase 1
- [ ] Fix any crawl errors
- [ ] Optimize top 10 projects
- [ ] Create 3-5 new tag pages
- [ ] Publish 2-3 new projects

### Week 9-12: Analysis & Scaling
- [ ] Review keyword rankings
- [ ] Analyze which content converts
- [ ] Plan topic cluster expansion
- [ ] Build external links
- [ ] Scale successful content types

### Week 13: First Review Meeting
- [ ] Comprehensive performance review
- [ ] Set revised 6-month targets
- [ ] Plan next quarter priorities

---

## Checklist for Success

### Phase 1 Success (4 weeks)
- [ ] Google Search Console property created
- [ ] Sitemap submitted
- [ ] Homepage indexed
- [ ] 50%+ of project pages indexed
- [ ] 0 mobile usability errors
- [ ] Structured data validating

### Phase 2 Success (8 weeks)
- [ ] 100% project pages indexed
- [ ] 20+ keyword positions tracked
- [ ] 5-10% organic traffic increase
- [ ] 2-3 rich snippets appearing
- [ ] Average position improving

### Phase 3 Success (12 weeks)
- [ ] 30%+ organic traffic increase
- [ ] 10 position improvement for top keywords
- [ ] 30+ keywords tracking
- [ ] 10+ rich snippet appearances
- [ ] Monthly organic leads being generated

---

## Contact & Support

For issues with:
- **Search Console:** Check GSC Help Center
- **Analytics:** Check GA4 Help Center
- **Schema validation:** Use schema.org tester
- **Implementation:** Refer to SEO_IMPLEMENTATION.md
