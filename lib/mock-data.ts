import { ContentDraft, AppConnection } from '@/types'

export const initialDrafts: ContentDraft[] = [
  {
    id: '1',
    platform: 'linkedin',
    contentType: 'post',
    title: 'Quality Score vs. Budget',
    topic: 'paid search strategy',
    body: `Paid search tip that most agencies won't tell you:

A high Quality Score is worth more than a high budget.

I've seen businesses spending $10K/month on Google Ads get crushed by competitors spending $2K -- because their Quality Score is terrible.

What drives Quality Score?
- Ad relevance (your headline actually matches the keyword)
- Expected CTR (compelling, specific copy -- not generic)
- Landing page experience (fast, relevant, clear CTA)

Fix these three things before you increase your budget. Every single time.

One client of mine cut their monthly spend by 40% after optimizing Quality Score and still generated more leads. That's not a fluke -- that's how the algorithm rewards relevance.

Running paid search and not sure why your CPL keeps climbing? I'd love to do a quick free audit.

-- Rudy
#GoogleAds #PaidSearch #SMBMarketing #WebSearchProfessionals`,
    hashtags: ['#GoogleAds', '#PaidSearch', '#SMBMarketing', '#WebSearchProfessionals'],
    status: 'pending',
    generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 3400,
    wordCount: 148,
  },
  {
    id: '2',
    platform: 'linkedin',
    contentType: 'post',
    title: 'Local SEO 3-Step Playbook',
    topic: 'local SEO for SMBs',
    body: `Stop overthinking your local SEO strategy.

I've been doing digital marketing for SMBs for 15+ years, and I keep seeing the same mistake: business owners obsess over the algorithm instead of answering their customers' real questions.

Here's what actually moves the needle for local businesses in 2025:

1. Google Business Profile optimized completely -- every field, photos, weekly posts
2. 10-20 locally relevant backlinks (Chamber of Commerce, local news, industry directories -- not spam)
3. A blog that answers what your customers actually Google before they call you

One of my Wisconsin clients went from page 3 to position #1 in 90 days using exactly these three things.

No tricks. No shortcuts. No $5,000/month retainer.

Just fundamentals, done right.

Want the exact checklist? Drop a comment or DM me.

-- Rudy
#LocalSEO #SMBMarketing #WebSearchProfessionals #DigitalMarketing #Wisconsin`,
    hashtags: ['#LocalSEO', '#SMBMarketing', '#WebSearchProfessionals'],
    status: 'pending',
    generatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 4100,
    wordCount: 162,
  },
  {
    id: '3',
    platform: 'email',
    contentType: 'email_campaign',
    title: 'Free SEO Audit Offer',
    subject: 'Is your website working as hard as you are?',
    topic: 'lead generation -- free audit offer',
    body: `Hi [First Name],

Quick question: when did you last check where your business actually ranks on Google?

If it's been more than 30 days, there's a good chance you're leaving customers on the table -- people who are actively searching for exactly what you offer, right now, in your area.

At Web Search Professionals, I help small and medium businesses get found online without the big-agency price tag.

This month, I'm opening up 5 spots for a complimentary SEO audit. No pitch, no pressure -- just a clear picture of where you stand and what it would actually take to rank #1 in your market.

What you'll get:
- Current ranking analysis for your top 10 keywords
- Competitor gap report
- 3 highest-ROI quick wins you can implement this week

[Claim Your Free Audit]

I've helped dozens of Wisconsin businesses go from invisible on Google to booked solid. I'd love to do the same for you.

Talk soon,
Rudy McCormick
Web Search Professionals

P.S. These spots go fast. If you're even slightly curious, grab a slot now.`,
    status: 'pending',
    generatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 850,
    wordCount: 196,
  },
  {
    id: '4',
    platform: 'blog',
    contentType: 'article',
    title: '7 Local SEO Mistakes Killing Your Rankings in 2025',
    topic: 'local SEO mistakes and fixes',
    body: `If you're a small business owner who's tried "doing SEO" and gotten nowhere, I want to be upfront with you: it's probably not your fault.

Most SEO advice out there is either outdated, built for big brands, or just wrong for local businesses. I've spent 15 years helping Wisconsin businesses rank higher on Google, and I see the same seven mistakes over and over.

Mistake #1: Ignoring Your Google Business Profile

This is the single highest-leverage move in local SEO, and most businesses treat it like an afterthought. Your GBP is often what shows up before your website.

Fill every field. Add photos every week. Post updates. Respond to every review. I've seen businesses jump from position 8 to position 2 in the local pack just by fully optimizing their GBP.

Mistake #2: Chasing National Rankings Instead of Local Ones

"Dentist" is not your target keyword. "Dentist near me" and "dentist in [your city]" are. The intent is different -- local modifiers bring people who are ready to book.

Mistake #3: No Consistent NAP (Name, Address, Phone)

If your address is listed differently across directories, Google gets confused. Consistent NAP is foundational -- run a citation audit annually and fix inconsistencies.

[Article continues with 4 more mistakes + action checklist...]`,
    hashtags: [],
    status: 'approved',
    generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 1200,
    wordCount: 246,
  },
  {
    id: '5',
    platform: 'instagram',
    contentType: 'caption',
    title: 'Link Building Truth',
    topic: 'link building myth busting',
    body: `"Link building is dead."

I hear this every year. Every year I help a client rank #1 by building the right links.

The truth: spammy link building is dead. Relevant, earned links from real local sources are more powerful than ever.

3 links that actually move rankings for local businesses:
- Local newspaper coverage
- Chamber of Commerce member page
- Sponsor a community event and get listed on their site

None of these require a tool or outreach software. Just community involvement and a phone call.

What's your go-to link building tactic? Drop it below.

#LocalSEO #LinkBuilding #DigitalMarketing #SMBGrowth #WebSearchProfessionals`,
    hashtags: ['#LocalSEO', '#LinkBuilding', '#DigitalMarketing', '#SMBGrowth'],
    status: 'pending',
    generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 2100,
    wordCount: 108,
  },
  {
    id: '6',
    platform: 'youtube',
    contentType: 'video_script',
    title: 'How to Rank #1 on Google Maps (No Budget Required)',
    topic: 'Google Maps ranking tutorial',
    body: `[HOOK -- 0:00-0:15]
"If your business isn't showing up in Google Maps, you're invisible to half your potential customers. Today I'm going to show you exactly how to fix that -- for free."

[INTRO -- 0:15-0:45]
"Hey, I'm Rudy McCormick from Web Search Professionals. I've been helping small and medium businesses dominate local search for over 15 years."

[SECTION 1: Google Business Profile -- 0:45-3:00]
Walk through complete GBP optimization: categories, description, service areas
Show the photo upload strategy: 5 photos/week minimum
Demonstrate the Posts feature most businesses ignore
Pro tip: use Q&A to pre-answer objections before customers even call

[SECTION 2: Getting Local Citations -- 3:00-5:30]
Explain NAP consistency and why it matters
Top 10 citation sources: Yelp, BBB, Yellow Pages, Chamber of Commerce
How to use Whitespark to find and fix inconsistencies

[SECTION 3: Getting Your First 20 Reviews -- 5:30-7:45]
How to ask for reviews without being annoying
Best timing: 24 hours after a positive interaction
How to respond to negative reviews the right way

[CTA -- 7:45-8:15]
"Grab the free checklist in the description. And if you want me to personally audit your local SEO setup -- that's free too, link below."`,
    status: 'pending',
    generatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 5000,
    wordCount: 243,
  },
  {
    id: '7',
    platform: 'linkedin',
    contentType: 'post',
    title: 'Marketing Automation for Small Business',
    topic: 'marketing automation',
    body: `Most small businesses think marketing automation is for enterprise companies.

It's not.

I just helped a 4-person HVAC company in Milwaukee set up a simple 3-email sequence that:
- Follows up with every quote request within 5 minutes
- Sends a check-in 30 days after service
- Asks for a Google review 60 days after installation

The result after 90 days?
- Lead-to-close rate up 28%
- Google reviews went from 12 to 47
- $0 in additional ad spend

They set it up once. It runs while they're on job sites.

If you're handling follow-up manually (or not at all), you're leaving revenue on the table every single day.

Comment "AUTOMATE" below and I'll send you the exact tool stack.

-- Rudy
#MarketingAutomation #SMBMarketing #WebSearchProfessionals #EmailMarketing`,
    hashtags: ['#MarketingAutomation', '#SMBMarketing', '#WebSearchProfessionals'],
    status: 'rejected',
    generatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    estimatedReach: 3800,
    wordCount: 170,
  },
]

export const appConnections: AppConnection[] = [
  { id: '1', name: 'LinkedIn',  slug: 'linkedin',  status: 'disconnected', description: 'Post thought leadership content & connect with SMB owners',  color: '#0077B5', postsDelivered: 0 },
  { id: '2', name: 'Gmail',     slug: 'gmail',     status: 'disconnected', description: 'Send email campaigns to your subscriber list',               color: '#EA4335', postsDelivered: 0 },
  { id: '3', name: 'Instagram', slug: 'instagram', status: 'disconnected', description: 'Share reels, carousels, and captions for brand awareness',    color: '#E4405F', postsDelivered: 0 },
  { id: '4', name: 'YouTube',   slug: 'youtube',   status: 'disconnected', description: 'Upload video scripts and long-form educational content',      color: '#FF0000', postsDelivered: 0 },
  { id: '5', name: 'HubSpot',   slug: 'hubspot',   status: 'disconnected', description: 'Sync leads, contacts, and track campaign performance',       color: '#FF7A59', postsDelivered: 0 },
  { id: '6', name: 'Facebook',  slug: 'facebook',  status: 'disconnected', description: 'Reach local businesses with targeted posts and ads',         color: '#1877F2', postsDelivered: 0 },
]
