export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  images: string[];
  published: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "best-areas-buy-land-diani-beach-2026",
    title: "Best Areas to Buy Land in Diani Beach (2026 Guide)",
    excerpt: "Exploring the top-performing neighborhoods in Diani for land investment, from Galu to central Diani. Learn about land prices and appreciation trends.",
    content: `
      <h2>Why Diani Beach is the Best Place for Land Investment</h2>
      <p>Diani Beach has consistently ranked as one of the best beaches in Africa. But beyond the tourism, it is a goldmine for real estate investors. In 2026, we are seeing a significant shift in property values as infrastructure projects near completion.</p>
      
      <h3>1. Galu Beach: The High-End Choice</h3>
      <p>Galu remains the premier destination for private luxury villas. The land here is freehold and highly sought after. Prices have seen a 15% year-on-year increase.</p>
      
      <h3>2. Central Diani: Commercial Potential</h3>
      <p>If you are looking for holiday home potential or commercial land for a boutique hotel, central Diani is where the action is. Connectivity to restaurants and shopping centers makes this area high-yielding for rentals.</p>
      
      <h3>3. Tiwi: The Untapped Frontier</h3>
      <p>Tiwi offers larger plots at more affordable rates compared to Diani. For those looking for long-term appreciation, Tiwi's cliff-top plots are a hidden gem.</p>
    `,
    author: "Alexiant Advisor",
    category: "Investment Guide",
    date: "March 10, 2026",
    images: ["/demo-media/blog/post-1.jpg"],
    published: true,
  },
  {
    id: "post-2",
    slug: "cost-of-land-in-ukunda-south-coast",
    title: "Cost of Land in Ukunda South Coast: What You Need to Know",
    excerpt: "A breakdown of land prices in Ukunda and Kwale County. From affordable residential plots to commercial land near the highway.",
    content: `
      <h2>Understanding Ukunda Land Prices</h2>
      <p>Ukunda is the gateway to Diani Beach. It offers a more accessible entry point for residential buyers and commercial developers. But what determines the price of land in Ukunda?</p>
      
      <h3>Distance from the Highway</h3>
      <p>Plots located along the Mombasa-Lunga Lunga highway command a premium due to their commercial viability. As you move further inland, prices drop significantly, offering great value for residential development.</p>
      
      <h3>Infrastructure Impacts</h3>
      <p>The expansion of the Ukunda Airstrip into Diani Airport is a major driver of land value in the immediate vicinity. Investors are currently locking in plots before the full commercial impact is felt.</p>
    `,
    author: "Alexiant Advisor",
    category: "Market Report",
    date: "February 24, 2026",
    images: ["/demo-media/blog/post-2.jpg"],
    published: true,
  },
  {
    id: "post-3",
    slug: "is-diani-beach-good-real-estate-investment",
    title: "Is Diani Beach Good for Real Estate Investment?",
    excerpt: "Analyzing the ROI on Diani Beach properties. We look at holiday rental yields, capital appreciation, and the growing demand for secondary homes.",
    content: `
      <h2>The Case for Diani Beach Real Estate</h2>
      <p>Investors often ask: Is the Diani market saturated? The short answer is no. While primary beachfront plots are scarce, the demand for high-quality holiday rentals is at an all-time high.</p>
      
      <h3>High Rental Yields</h3>
      <p>With platforms like Airbnb and the surge in remote work, Diani has become a year-round destination. Managed villas can achieve 8-12% annual rental returns in USD terms.</p>
      
      <h3>Capital Appreciation</h3>
      <p>Land in Kwale County has outpaced the national average for the last five years. The combination of limited supply and international demand ensures steady growth.</p>
    `,
    author: "Alexiant Advisor",
    category: "Market Report",
    date: "February 05, 2026",
    images: ["/demo-media/blog/post-3.jpg"],
    published: true,
  }
];
